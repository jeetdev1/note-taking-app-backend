import { query } from "../db";

class BaseModel {
  private table: string;
  constructor(tableName: string) {
    this.table = tableName;
  }
  async fetchAll() {
    try {
      return await query(`select * from ${this.table}`);
    } catch (err) {
      console.log(err);
    }
  }
  async save(title: string, body: string) {
    try {
      const data = await query(
        `INSERT INTO ${this.table} (title, body) VALUES ($1,$2) RETURNING id`,
        [title, body]
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  async findById(id: string) {
    try {
      const data = await query(`SELECT * FROM ${this.table} WHERE id = $1`, [
        id,
      ]);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  async updateOne(id: string, body: { title: string; body: string }) {
    try {
      const data = await query(
        `UPDATE ${this.table} SET title=$1, body=$2 WHERE id=$3 RETURNING *`,
        [body.title, body.body, id]
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  async deleteOne(id: string) {
    try {
      return await query(`DELETE FROM ${this.table} WHERE id=$1`, [id]);
    } catch (err) {
      console.log(err);
    }
  }
}
export default BaseModel;
