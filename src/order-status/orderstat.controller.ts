import {orderstatLister,orderstatTableCreate,orderstatTableUpdate,orderstatTableDelete,orderstatTableGetid} from "./orderstat.service"
import { Context } from "hono";



//list all records
export const listorderstat=async (c: Context) => {
    try {
        //limit the number of order status to be returned
        const limit = Number(c.req.query('limit'))
        const data = await orderstatLister(limit);
        if (data == null || data.length == 0) {
            return c.text("order status not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

//create a record
export const createorderstat=async (c: Context) => {
    try {
        const stat = await c.req.json();
        const createdUser = await orderstatTableCreate(stat);
        if (!createdUser) return c.text("order status not created", 404);
        return c.json({ msg: createdUser }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

//update a record
export const updateorderstat = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const stat = await c.req.json();
    try {
        // search for the order status
        const searchedostat = await orderstatTableGetid(id);
        if (searchedostat == undefined) return c.text("order status not found", 404);
        // get the data and update it
        const res = await orderstatTableUpdate(id, stat);
        if (!res) return c.text("order status not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

//get a record by id
export const getorderstatid = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const ostat = await orderstatTableGetid(id);
    if (ostat == undefined) {
        return c.text("order status not found", 404);
    }
    return c.json(ostat, 200);
}

//delete a record
export const deleteorderstat= async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the order status
        const orderstat = await orderstatTableGetid(id);
        if (orderstat == undefined) return c.text("order status not found", 404);
        //deleting the order status
        const res = await orderstatTableDelete(id);
        if (!res) return c.text("order status not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}