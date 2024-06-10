import { Hono } from "hono";
import { listcomments, getcomment, createcomment, updatecomment, deletecomment } from "./comment.controller"
export const commentRouter = new Hono();

commentRouter.get("/comment", listcomments);
commentRouter.get("/comment/:id", getcomment)
commentRouter.post("/comment", createcomment)
commentRouter.put("/comment/:id", updatecomment)
commentRouter.delete("/comment/:id", deletecomment)