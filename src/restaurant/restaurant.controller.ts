import { Context } from "hono";
import { restService, getrestService, createrestService, updaterestService, deleterestService } from "./restaurant.service";

export const listrest = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'))
        const data = await restService(limit);
        if (data == null || data.length == 0) {
            return c.text("restaurant not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getrest = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const rest = await getrestService(id);
    if (rest == undefined) {
        return c.text("restaurant not found", 404);
    }
    return c.json(rest, 200);
}
export const createrest = async (c: Context) => {
    try {
        const rest = await c.req.json();
        const createdrest = await createrestService(rest);
        if (!createdrest) return c.text("restaurant not created", 404);
        return c.json({ msg: createdrest }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updaterest = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const rest= await c.req.json();
    try {
        const searchedrest = await getrestService(id);
        if (searchedrest == undefined) return c.text("restaurant not found", 404);
        const res = await updaterestService(id, rest);
        if (!res) return c.text("restaurant not updated", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleterest = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const rest = await getrestService(id);
        if (rest == undefined) return c.text("restaurant not found", 404);
        const res = await deleterestService(id);
        if (!res) return c.text("restaurant not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}