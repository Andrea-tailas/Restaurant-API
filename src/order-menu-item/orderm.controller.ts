import { ordermenuService, createservice, updateordermenu, deleteordermenu, getordermenu } from "./orderm.service";
import { Context } from "hono";


export const listordermenu = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'))
        const data = await ordermenuService(limit)
        if (data == null || data.length == 0) {
            return c.text('order menu item not found', 404)
        }
        return c.json(data, 200)

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getorder = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const order = await getordermenu(id);
    if (order == undefined) {
        return c.text("order menu not found", 404);
    }
    return c.json(order, 200);
}
export const createorder = async (c: Context) => {
    try {
        const rest = await c.req.json();
        const createdorder = await createservice(rest);
        if (!createdorder) return c.text("order menu not created", 404);
        return c.json({ msg: createdorder }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}


export const deleteorder = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const order = await getordermenu(id);
        if (order == undefined) return c.text("order menu not found", 404);
        const res = await deleteordermenu(id);
        if (!res) return c.text("order menu not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateorder = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const order= await c.req.json();
    try {
        const searchedorder = await getordermenu(id);
        if (searchedorder == undefined) return c.text("order menu not found", 404);
        const res = await updateordermenu(id, order);
        if (!res) return c.text("order menu not updated", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
