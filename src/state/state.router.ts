import { listState,createState,updateState,deleteState,getStateid } from "./state.controller";
import { Hono } from "hono";


export const stateRouter = new Hono();

//get all state      
stateRouter.get("/states", listState);
//get a single state    
stateRouter.get("/states/:id",getStateid )
// create a state 
stateRouter.post("/states",createState)
//update a state
stateRouter.put("/states/:id", updateState)
//remove a state
stateRouter.delete("/states/:id", deleteState)