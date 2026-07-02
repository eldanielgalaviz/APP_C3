import express, { Application } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { initBlobStorage } from "./shared/storage/configStorage";
import { pool } from "./shared/db/config/config";
import cookieParser from 'cookie-parser';
import { AppModule } from "./bootstrap/AppModule";
import { SecureYamlConfig } from "./config/SecureYamlConfig";

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

  static async create(): Promise<Server> {
    const server = new Server();
    await server.connectDB();
    server.middlewares()
    return server;
  }

  // Obtener la clave de descifrado
  private loadConfig(): void {
    const DECRYPTION_KEY = process.env.CONFIG_DECRYPTION_KEY;
    if (!DECRYPTION_KEY) {
      throw new Error("CONFIG_DECRYPTION_KEY no está definida");
    } 
    // Crear instancia del adaptador de configuración seguro
    this.config = new SecureYamlConfig(DECRYPTION_KEY);
    this.port = this.config.PORT;
  }

  // === Middlewares globales === Express y sus middlewares van en la capa de infraestructura, nunca en el dominio o aplicación. 
  private middlewares(): void {
    this.app.use(cookieParser())
    this.app.use(express.json());
    // You have two cors middlewares here. The second one overwrites the first if options are passed.
    // It's better to keep only the configured one.
    this.app.use(cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:4200',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    }));
    
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
      await initBlobStorage();
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
    if (!this.port) {
      throw new Error("Port is not defined");
    }

    // Start the server and capture the http.Server instance 
    const server = this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
      console.log(`Entorno: ${this.config.ENV}`);
    });

    // Capturar errores relacionados con el servidor
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Error: El puerto ${this.port} está en uso. Por favor, usa otro puerto o detén el proceso que lo está ocupando.`);
      } else {
        console.error('Error del servidor:', error);
      }
      // Optionally exit process on critical server errors
      process.exit(1); 
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