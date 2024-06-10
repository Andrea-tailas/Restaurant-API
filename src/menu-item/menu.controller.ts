import { Context } from "hono";
import { menuService, getmenuService, createmenuService, updatemenuService, deletemenuService } from "./menu.service";

export const listmenu = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'))
        const data = await menuService(limit);
        if (data == null || data.length == 0) {
            return c.text("menu item not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getmenu = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const menu = await getmenuService(id);
    if (menu == undefined) {
        return c.text("menu item not found", 404);
    }
    return c.json(menu, 200);
}
export const createmenu= async (c: Context) => {
    try {
        const rest = await c.req.json();
        const createdmenu = await createmenuService(rest);
        if (!createdmenu) return c.text("menu item not created", 404);
        return c.json({ msg: createdmenu }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatemenu = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const menu= await c.req.json();
    try {
        const searchedmenu = await getmenuService(id);
        if (searchedmenu == undefined) return c.text("menu item not found", 404);
        const res = await updatemenuService(id, menu);
        if (!res) return c.text("menu item not updated", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletemenu = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const menu = await getmenuService(id);
        if (menu == undefined) return c.text("menu item not found", 404);
        const res = await deletemenuService(id);
        if (!res) return c.text("menu item not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}