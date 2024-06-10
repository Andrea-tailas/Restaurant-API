import { Hono } from "hono";
import { listrestowner, getrestowner, createrestowner, updaterestowner, deleterestowner } from "./restowner.controller"
export const restownerRouter = new Hono();

restownerRouter.get("/restowner", listrestowner);
restownerRouter.get("/restowner/:id", getrestowner)
restownerRouter.post("/restowner", createrestowner)
restownerRouter.put("/restowner/:id", updaterestowner)
restownerRouter.delete("/restowner/:id", deleterestowner)