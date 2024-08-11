import { query } from "../db";
import BaseModel from "./baseModel";

class UserModel extends BaseModel {
  constructor() {
    super("users");
  }
  async validateUserDuplicateEmail(email: string, id?: number) {
    let sql = `SELECT email FROM users WHERE email=$1`;
    const values: (string | number)[] = [email];
    if (id) {
      sql += ` WHERE id !=$2`;
      values.push(id);
    }
    const res = await query(sql, values);
    let ret = true;
    if (res.rows.length > 0) {
      ret = false;
    }
    return ret;
  }
}
export default UserModel;
