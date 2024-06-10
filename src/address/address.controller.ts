import {listaddresses,addressTableCreate,addressTableGetid,addressTableUpdate,addressTableDelete} from "./address.service"
import { Context } from "hono";




export const alladdresses=async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'))
        const data = await listaddresses(limit);
        if (data == null || data.length == 0) {
            return c.text("address not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}



export const createaddress=async (c: Context) => {
    try {
        const add = await c.req.json();
        const createdadd = await addressTableCreate(add);
        if (!createdadd) return c.text("address not created", 404);
        return c.json({ msg: createdadd }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}



export const getaddressByid= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const add = await addressTableGetid(id);
    if (add == undefined) {
        return c.text("address not found", 404);
    }
    return c.json(add, 200);
}


export const updateaddress= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const add = await c.req.json();
    try {
        const searchedadd = await addressTableGetid(id);
        if (searchedadd == undefined) return c.text("address not found", 404);
        const res = await addressTableUpdate(id, add);
        if (!res) return c.text("address not updated", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}


export const deleteaddress=async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const add = await addressTableGetid(id);
        if (add == undefined) return c.text("address not found", 404);
        const res = await addressTableDelete(id);
        if (!res) return c.text("address not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}