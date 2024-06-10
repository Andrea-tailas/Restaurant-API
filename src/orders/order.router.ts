import { Hono } from "hono";
import { listorder, getorder, createorder, updateorder, deleteorder } from "./order.controller"
export const orderRouter = new Hono();

orderRouter.get("/order", listorder);
orderRouter.get("/order/:id", getorder)
orderRouter.post("/order", createorder)
orderRouter.put("/order/:id", updateorder)
orderRouter.delete("/order/:id", deleteorder)