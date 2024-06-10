import { Hono } from "hono";
import { listUsers, getUser, createUser, updateUser, deleteUser } from "./user.controller"
export const userRouter = new Hono();

//get all users      api/users
userRouter.get("/users", listUsers);
//get a single user    api/users/1
userRouter.get("/users/:id", getUser)
// create a user 
userRouter.post("/users", createUser)
//update a user
userRouter.put("/users/:id", updateUser)

userRouter.delete("/users/:id", deleteUser)