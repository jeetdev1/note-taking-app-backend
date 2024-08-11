import { Router } from "express";
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
} from "../../controllers/usersController";
import { handleAsync } from "../../utils/handleAsync";
const userRouter = Router();

userRouter.get("/", handleAsync(getUsers));
userRouter.post("/create", handleAsync(createUser));
userRouter.get("/:id", handleAsync(getUser));
userRouter.patch("/:id", handleAsync(updateUser));

export default userRouter;
