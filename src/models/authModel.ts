import { query } from "../db";
import BaseModel from "./baseModel";

class AuthModel extends BaseModel {
  constructor() {
    super("users");
  }
  async getUser(email: string) {
    const sql = `SELECT * FROM ${this.table} WHERE email=$1`;
    const res = await query(sql, [email]);
    return res.rows;
  }
}
export default AuthModel;
