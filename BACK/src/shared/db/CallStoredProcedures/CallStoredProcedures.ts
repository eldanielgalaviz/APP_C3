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

export async function executeViews<T = any>(
  nombreVista: string
): Promise<any[]> {
  const query = `SELECT * FROM ${nombreVista}`;
  console.log(nombreVista, "---", new Date());
  const rows = await dbconnection.query(query);

  return rows;
}

export async function getCatalogs(tableName: string): Promise<any> {
  const sql = `SELECT * FROM ${tableName}`;
  console.log(sql, "---", new Date());

  try {
    const [results] = await dbconnection.execute(sql);
    return results;
  } catch (error) {
    console.error(`Error al ejecutar query en "${tableName}":`, error);
    throw error;
  }
}

export async function getMunicipalities(idState: number): Promise<any> {
  const sql = `SELECT Id_municipalities, municipality_name FROM cat_municipalities WHERE state_id = ${idState}`;
  console.log(sql, "---", new Date());

  try {
    const [results] = await dbconnection.execute(sql);
    return results;
  } catch (error) {
    console.error(`Error al ejecutar query en "cat_municipalities":`, error);
    throw error;
  }
}

export async function getNeighborhoodsByMunicipality(idNeigborhood: number): Promise<any> {
  const sql = `SELECT nh.Id_neighborhood, nh.neighborhood_name, cp.postal_code FROM cat_neighborhoods nh JOIN cat_postal_codes cp ON cp.Id_postal_code = nh.postal_code_id WHERE cp.municipality_id = ${idNeigborhood} ORDER BY nh.neighborhood_name, cp.postal_code;`;
  console.log(sql, "---", new Date());

  try {
    const [results] = await dbconnection.execute(sql);
    return results;
  } catch (error) {
    console.error(`Error al ejecutar query en "cat_neighborhoods":`, error);
    throw error;
  }
}

export async function getNeighborhoods(idNeigborhood: number): Promise<any> {
  const sql = `SELECT nh.Id_neighborhood, nh.neighborhood_name FROM cat_neighborhoods nh JOIN cat_postal_codes cp ON cp.Id_postal_code = nh.postal_code_id WHERE nh.Id_neighborhood = ${idNeigborhood}`;
  console.log(sql, "---", new Date());

  try {
    const [results] = await dbconnection.execute(sql);
    return results;
  } catch (error) {
    console.error(`Error al ejecutar query en "cat_neighborhoods":`, error);
    throw error;
  }
}

export async function getLocationByCP(cp: number): Promise<any> {
  const sql = `SELECT 
        e.state_name,
        m.municipality_name,
        c.neighborhood_name,
        cp.postal_code,
        cp.Id_postal_code
    FROM cat_postal_codes cp
    JOIN cat_states e ON e.Id_states = cp.state_id
    JOIN cat_municipalities m ON m.Id_municipalities = cp.municipality_id
    JOIN cat_neighborhoods c ON c.postal_code_id = cp.Id_postal_code
    WHERE cp.postal_code = ${cp}
    ORDER BY c.neighborhood_name;`;
  console.log(sql, "---", new Date());

  try {
    const [results] = await dbconnection.execute(sql);
    return results;
  } catch (error) {
    console.error(`Error al ejecutar query en "cat_postal_codes":`, error);
    throw error;
  }
}