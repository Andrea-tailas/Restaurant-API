import { Context } from "hono";
import { restownerService, getrestownerService, createrestownerService, updaterestownerService, deleterestownerService } from "./restowner.service";

export const listrestowner = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'))
        const data = await restownerService(limit);
        if (data == null || data.length == 0) {
            return c.text("restaurant owner not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getrestowner = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const rest = await getrestownerService(id);
    if (rest == undefined) {
        return c.text("restaurant owner not found", 404);
    }
    return c.json(rest, 200);
}
export const createrestowner = async (c: Context) => {
    try {
        const rest = await c.req.json();
        const createdrest = await createrestownerService(rest);
        if (!createdrest) return c.text("restaurant owner not created", 404);
        return c.json({ msg: createdrest }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updaterestowner = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const rest= await c.req.json();
    try {
        const searchedrest = await getrestownerService(id);
        if (searchedrest == undefined) return c.text("restaurant owner not found", 404);
        const res = await updaterestownerService(id, rest);
        if (!res) return c.text("restaurant owner not updated", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleterestowner = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const rest = await getrestownerService(id);
        if (rest == undefined) return c.text("restaurant owner not found", 404);
        const res = await deleterestownerService(id);
        if (!res) return c.text("restaurant owner not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}