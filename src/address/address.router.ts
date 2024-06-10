import {alladdresses,createaddress,getaddressByid,updateaddress,deleteaddress} from "./address.controller"
import { Hono } from "hono";


export const addRouter = new Hono();

      
addRouter.get("/add", alladdresses);    
addRouter.get("/add/:id",getaddressByid )
addRouter.post("/add",createaddress)
addRouter.put("/add/:id", updateaddress)
addRouter.delete("/add/:id", deleteaddress)


