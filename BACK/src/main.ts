import express, { Application, } from "express";
import * as dotenv from "dotenv";
import { AppModule } from "./app/AppModule";
import cors from "cors";
import { SecureYamlConfig } from "./shared/config/SecureYamlConfig";
import pool from '../src/shared/db/config/config';

// Cargar solo la clave de descifrado (opcional desde .env o variable del sistema)
dotenv.config();

export class Server {
  private readonly app: Application;
  private port?: number;
  private config!: SecureYamlConfig;
  constructor() {
    this.app = express();
    this.loadConfig();
    this.middlewares();
    this.connectDB();
    this.loadAppModule();
    this.setupErrorHandling();
  }

  // Obtener la clave de descifrado
  private loadConfig(): void {
    const DECRYPTION_KEY = process.env.CONFIG_DECRYPTION_KEY;
    if (!DECRYPTION_KEY) {
      throw new Error("CONFIG_DECRYPTION_KEY no está definida");
    } // Crear instancia del adaptador de configuración seguro
    this.config = new SecureYamlConfig(DECRYPTION_KEY);
    this.port = this.config.PORT;
  }
  // === Middlewares globales === Express y sus middlewares van en la capa de infraestructura, nunca en el dominio o aplicación. 
  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
     this.app.use(cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:4200',
      credentials: true
    }));
      // Cookie parser for refresh tokens
    
    this.app.use(express.static("public"));
    this.app.use(express.urlencoded({ extended: true }));

     // Security headers
    this.app.use((req, res, next) => {
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('X-XSS-Protection', '1; mode=block');
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
      next();
    });
  }
  
  // === Conexión a base de datos ===
  private async connectDB(): Promise<void> {
    try {
      const connection = await pool.getConnection();
      console.log('Conexión a la base de datos establecida.');
      connection.release();
    } catch (err) {
      console.error('Error al conectar a la base de datos:', err);
      process.exit(1);
    }
  }
    private loadAppModule(): void {
    new AppModule(this.app);
  }

  private setupErrorHandling(): void {
    this.app.use((error: any, req: any, res: any, next: any) => {
      console.error("Error: ", error);
      res.status(500).json({ error: "Something went wrong!" });
    });
  }
  // Iniciar servidor
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`);
      console.log(`Entorno: ${this.config.ENV}`);
    });
  }

  // Para testing
  public getApp(): Application {
    return this.app;
  }

}

// Ejecutar solo si es el entry point
if (require.main === module) {
  const server = new Server();
  server.listen();
}

export default Server;
