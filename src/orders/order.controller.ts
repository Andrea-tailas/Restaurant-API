import { Context } from "hono";
import { orderService, getorderService, createorderService, updateorderService, deleteorderService } from "./order.service";

export const listorder = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'))
        const data = await orderService(limit);
        if (data == null || data.length == 0) {
            return c.text("order not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getorder = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const order = await getorderService(id);
    if (order == undefined) {
        return c.text("order not found", 404);
    }
    return c.json(order, 200);
}
export const createorder = async (c: Context) => {
    try {
        const order = await c.req.json();
        const createdorder = await createorderService(order);
        if (!createdorder) return c.text("order not created", 404);
        return c.json({ msg: createdorder }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateorder = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const rest= await c.req.json();
    try {
        const searchedorder = await getorderService(id);
        if (searchedorder == undefined) return c.text("order not found", 404);
        const res = await updateorderService(id, rest);
        if (!res) return c.text("order not updated", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteorder = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const order = await getorderService(id);
        if (order == undefined) return c.text("order not found", 404);
        const res = await deleteorderService(id);
        if (!res) return c.text("order not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}