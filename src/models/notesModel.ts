import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Title is a required field"],
    unique: true,
  },
  body: {
    type: String,
    trim: true,
    required: [true, "Title is a required field"],
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const Note = mongoose.model("Note", noteSchema);
export default Note;
