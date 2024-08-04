import { Pool } from "pg";
export const pool = new Pool();

export const query = (text: string, params?: string[]) => {
  const res = pool.query(text, params);
  return res;
};
