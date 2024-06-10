import {listCategory,createCategory,updateCategory,getCategoryid,deleteCategory} from "./category.controller"
import { Hono } from "hono";


export const catRouter = new Hono();

//get all category      
catRouter.get("/category", listCategory);
//get a single category    
catRouter.get("/category/:id",getCategoryid )
// create a category 
catRouter.post("/category",createCategory)
//update a category
catRouter.put("/category/:id", updateCategory)
//remove a category
catRouter.delete("/category/:id", deleteCategory)