import {allCities,createCity,getcityByid,updateCity,deleteCity} from "./city.controller"
import { Hono } from "hono";


export const usersRouter = new Hono();

//get all city      
usersRouter.get("/city", allCities)
//get a single city    
usersRouter.get("/city/:id",getcityByid )
// create a city
usersRouter.post("/city",createCity)
//update a city
usersRouter.put("/city/:id", updateCity)
//remove a city
usersRouter.delete("/city/:id", deleteCity)