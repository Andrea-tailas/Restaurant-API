import {driversLister,driverTableCreate,driverTableUpdate,driverTableDelete,driverTableGetid} from "./driver.service"
import { Context } from "hono";


//list all records
export const listdrivers=async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'))
        const data = await driversLister(limit);
        if (data == null || data.length == 0) {
            return c.text("driver not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

//create a record
export const createdriver=async (c: Context) => {
    try {
        const stat = await c.req.json();
        const createddriver = await driverTableCreate(stat);
        if (!createddriver) return c.text("driver not created", 404);
        return c.json({ msg: createddriver }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

//update a record
export const updatedriver = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const stat = await c.req.json();
    try {
        const searcheddriver = await driverTableGetid(id);
        if (searcheddriver == undefined) return c.text("driver not found", 404);
        const res = await driverTableUpdate(id, stat);
        if (!res) return c.text("driver not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

//get a record by id
export const getdriverid = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const driver = await driverTableGetid(id);
    if (driver == undefined) {
        return c.text("driver not found", 404);
    }
    return c.json(driver, 200);
}

//delete a record
export const deletedriver= async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const dv = await driverTableGetid(id);
        if (dv == undefined) return c.text("driver not found", 404);
        const res = await driverTableDelete(id);
        if (!res) return c.text("driver not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}