import { query } from "../db";
import BaseModel from "./baseModel";

class NoteModel extends BaseModel {
  constructor() {
    super("notes");
  }
}
export default NoteModel;
// export const fetchAll = async () => {
//   try {
//     return await query(`select * from notes`);
//   } catch (err) {
//     console.log(err);
//   }
// };
// export const save = async (title: string, body: string) => {
//   try {
//     const data = await query(
//       `INSERT INTO notes (title, body) VALUES ($1,$2) RETURNING id`,
//       [title, body]
//     );
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };
// export const findById = async (id: string) => {
//   try {
//     const data = await query(`SELECT * FROM notes WHERE id = $1`, [id]);
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const updateOne = async (
//   id: string,
//   body: { title: string; body: string }
// ) => {
//   try {
//     const data = await query(
//       `UPDATE notes SET title=$1, body=$2 WHERE id=$3 RETURNING *`,
//       [body.title, body.body, id]
//     );
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };
// export const deleteOne = async (id: string) => {
//   try {
//     return await query(`DELETE FROM notes WHERE id=$1`, [id]);
//   } catch (err) {
//     console.log(err);
//   }
// };
