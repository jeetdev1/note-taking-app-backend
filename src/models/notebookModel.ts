import { query } from "../db";
import BaseModel from "./baseModel";
class NoteModel extends BaseModel {
  constructor() {
    super("notebooks");
  }
  async save(title: string, body: string) {
    const data = await query(
      `INSERT INTO ${this.table} (title, body) VALUES ($1,$2) RETURNING id`,
      [title, body]
    );
    return data;
  }
  async updateOne(id: string, body: { title: string; body: string }) {
    const data = await query(
      `UPDATE ${this.table} SET title=$1, body=$2 WHERE id=$3 RETURNING *`,
      [body.title, body.body, id]
    );
    return data;
  }
}
export default NoteModel;
