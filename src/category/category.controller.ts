import { Context } from "hono";
import {categoriesLister,categoryCreate,categoryUpdate,categoryDelete,categoryGetid} from "./category.service"




//list all records
export const listCategory=async (c: Context) => {
    try {
        //limit the number of categories to be returned
        const limit = Number(c.req.query('limit'))
        const data = await categoriesLister(limit);
        if (data == null || data.length == 0) {
            return c.text("category not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

//create a record
export const createCategory=async (c: Context) => {
    try {
        const cat = await c.req.json();
        const createdcat = await categoryCreate(cat);
        if (!createdcat) return c.text("category not created", 404);
        return c.json({ msg: createdcat }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

//update a record
export const updateCategory = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const cat = await c.req.json();
    try {
        // search for the state
        const searchedcat = await categoryGetid(id);
        if (searchedcat == undefined) return c.text("category not found", 404);
        // get the data and update it
        const res = await categoryUpdate(id, cat);
        // return a success message
        if (!res) return c.text("category not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

//get a record by id
export const getCategoryid = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const cats = await categoryGetid(id);
    if (cats == undefined) {
        return c.text("category not found", 404);
    }
    return c.json(cats, 200);
}

//delete a record
export const deleteCategory= async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the state
        const ct = await categoryGetid(id);
        if (ct == undefined) return c.text("category not found", 404);
        //deleting the state
        const res = await categoryDelete(id);
        if (!res) return c.text("category not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}