import { Hono } from "hono";
import { listrest, getrest, createrest, updaterest, deleterest } from "./restaurant.controller"
export const restRouter = new Hono();

restRouter.get("/rest", listrest);
restRouter.get("/rest/:id", getrest)
restRouter.post("/rest", createrest)
restRouter.put("/rest/:id", updaterest)
restRouter.delete("/rest/:id", deleterest)