import {statcatLister,statcatTableCreate,statcatTableUpdate,statcatTableDelete,statcatTableGetid} from "./statcat.service"
import { Context } from "hono";



//list all records
export const liststatcat=async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'))
        const data = await statcatLister(limit);
        if (data == null || data.length == 0) {
            return c.text("Status category not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

//create a record
export const createStatcat=async (c: Context) => {
    try {
        const stat = await c.req.json();
        const createdscat = await statcatTableCreate(stat);
        if (!createdscat) return c.text("Status category not created", 404);
        return c.json({ msg: createdscat }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

//update a record
export const updateStatcat = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const stat = await c.req.json();
    try {
        const searchedscat = await statcatTableGetid(id);
        if (searchedscat == undefined) return c.text("status category not found", 404);
        const res = await statcatTableUpdate(id, stat);
        if (!res) return c.text("status category not updated", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

//get a record by id
export const getStatcatid = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const scat = await statcatTableGetid(id);
    if (scat == undefined) {
        return c.text("status category not found", 404);
    }
    return c.json(scat, 200);
}

//delete a record
export const deleteStatcat= async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const scat = await statcatTableGetid(id);
        if (scat == undefined) return c.text("statuscategory not found", 404);
        const res = await statcatTableDelete(id);
        if (!res) return c.text("stateus category not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}