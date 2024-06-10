import { Hono } from "hono";
import { listmenu,getmenu,createmenu,updatemenu,deletemenu } from "./menu.controller";


export const menuRouter = new Hono();

menuRouter.get("/menu/", listmenu)
menuRouter.get("/menu/:id", getmenu)
menuRouter.post("/menu", createmenu)
menuRouter.put("/menu/:id", updatemenu)
menuRouter.delete("/menu/:id", deletemenu)