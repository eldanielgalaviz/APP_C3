import dbconnection from "../config/config";
import mysql from "mysql2";

export async function executeStoredProcedure(
  nombreSP: string,
  parametros: any[] = []
): Promise<any> {
  const placeholders = parametros.map(() => '?').join(',');
  const sql = `CALL ${nombreSP}(${parametros.map(param => mysql.escape(param)).join(',')})`;
  console.log(sql, "---", new Date());
  
  try {
    const [results] = await dbconnection.execute(sql, parametros);
    return results;
  } catch (error) {
    console.error(`Error al ejecutar el SP "${nombreSP}":`, error);
    throw error;
  }
}