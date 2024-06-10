import {listdrivers,createdriver,updatedriver,getdriverid,deletedriver} from "./driver.controller"

import { Hono } from "hono";


export const driverRouter = new Hono();

     
driverRouter.get("/driver", listdrivers);    
driverRouter.get("/driver/:id",getdriverid )
driverRouter.post("/driver",createdriver)
driverRouter.put("/driver/:id", updatedriver)
driverRouter.delete("/driver/:id", deletedriver)

