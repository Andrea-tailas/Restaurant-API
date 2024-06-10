import {liststatcat,createStatcat,updateStatcat,getStatcatid,deleteStatcat} from "./statcat.controller"
import { Hono } from "hono";


export const statcatRouter = new Hono();
     
statcatRouter.get("/statcat", liststatcat);    
statcatRouter.get("/statcat/:id",getStatcatid )
statcatRouter.post("/statcat",createStatcat)
statcatRouter.put("/statcat/:id", updateStatcat)
statcatRouter.delete("/statcat/:id", deleteStatcat)