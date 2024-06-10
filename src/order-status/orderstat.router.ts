
import {listorderstat,createorderstat,updateorderstat,getorderstatid,deleteorderstat} from "./orderstat.controller"

import { Hono } from "hono";


export const orderstatRouter = new Hono();

//get all orderstat     
orderstatRouter.get("/orderstat", listorderstat);
//get a single orderstat  
orderstatRouter.get("/orderstat/:id",getorderstatid )
// create a orderstat 
orderstatRouter.post("/orderstat",createorderstat)
//update a orderstat
orderstatRouter.put("/orderstat/:id", updateorderstat)
//remove a orderstat
orderstatRouter.delete("/orderstat/:id", deleteorderstat)