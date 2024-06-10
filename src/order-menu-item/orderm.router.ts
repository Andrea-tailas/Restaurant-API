import { Hono } from "hono";
import { listordermenu, getorder, createorder, updateorder, deleteorder } from "./orderm.controller"
export const ordermenuRouter = new Hono();

ordermenuRouter.get("/ordermenu", listordermenu);
ordermenuRouter.get("/ordermenu/:id", getorder)
ordermenuRouter.post("/ordermenu", createorder)
ordermenuRouter.put("/ordermenu/:id", updateorder)
ordermenuRouter.delete("/ordermenu/:id", deleteorder)