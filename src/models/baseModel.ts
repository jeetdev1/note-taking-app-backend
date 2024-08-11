import { StatusCodes } from "http-status-codes";
import QueryString from "qs";
import { query } from "../db";
import ApiError from "../utils/ApiError";
import { QUERY_PARAM_STR } from "../utils/constant";
import { validateWithRegex } from "../utils/helpers";

class BaseModel {
  protected table: string;
  constructor(tableName: string) {
    this.table = tableName;
  }
  async fetchAll(fields?: string[], queryParams?: QueryString.ParsedQs) {
    const fieldStr = fields && fields.length > 0 ? fields.join(",") : "*";
    let unformattedSql = `SELECT ${fieldStr} FROM ${this.table}`;
    const order =
      queryParams?.order === "ASC" || queryParams?.order === "DESC"
        ? queryParams.order
        : "ASC";
    const orderByColumn = queryParams?.order_by
      ? String(queryParams.order_by)
      : "updated_at";
    if (!validateWithRegex(orderByColumn, QUERY_PARAM_STR)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid order field");
    }
    if (orderByColumn) {
      unformattedSql += ` ORDER BY ${orderByColumn}`;
      if (order) {
        unformattedSql += ` ${order}`;
      }
    }
    return await query(unformattedSql);
  }

  async findById(id: string, fields?: string[]) {
    const fieldStr = fields && fields.length > 0 ? fields.join(",") : "*";
    const data = await query(
      `SELECT ${fieldStr} FROM ${this.table} WHERE id = $1`,
      [id]
    );
    return data;
  }
  async deleteOne(id: string) {
    return await query(`DELETE FROM ${this.table} WHERE id=$1`, [id]);
  }

  async create(data: { [key: string]: string | number }) {
    let fieldsList: string[] = [];
    let valuesList: (string | number)[] = [];
    for (const key in data) {
      fieldsList.push(key);
      valuesList.push(data[key]);
    }
    const sql = `INSERT INTO ${this.table} (${fieldsList.join(
      ","
    )}) VALUES (${Array.from(
      { length: fieldsList.length },
      (_, i) => `$${i + 1}`
    ).join(",")}) RETURNING id`;
    return await query(sql, valuesList);
  }
  async updateById(id: number, data: { [key: string]: string }) {
    let fieldArr = [];
    let valuesArr = [];
    let count = 1;
    for (const key in data) {
      fieldArr.push(`${key}=$${count}`);
      count++;
      valuesArr.push(data[key]);
    }
    const sql = `UPDATE ${this.table} SET ${fieldArr.join(
      ","
    )} WHERE id=$${count} RETURNING id, ${Object.keys(data).join(",")}`;
    return await query(sql, [...valuesArr, id]);
  }
}
export default BaseModel;
