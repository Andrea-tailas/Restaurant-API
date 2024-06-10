import { Context } from "hono";
import {statesServiceLister,stateTableCreate,stateTableUpdate,stateTableDelete,stateTableGetid} from "./state.service"

//list all records
export const listState=async (c: Context) => {
    try {
        //limit the number of states to be returned
        const limit = Number(c.req.query('limit'))
        const data = await statesServiceLister(limit);
        if (data == null || data.length == 0) {
            return c.text("State not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

//create a record
export const createState=async (c: Context) => {
    try {
        const stat = await c.req.json();
        const createdstate = await stateTableCreate(stat);
        if (!createdstate) return c.text("State not created", 404);
        return c.json({ msg: createdstate }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

//update a record
export const updateState = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const stat = await c.req.json();
    try {
        // search for the state
        const searchedstate = await stateTableGetid(id);
        if (searchedstate == undefined) return c.text("state not found", 404);
        // get the data and update it
        const res = await stateTableUpdate(id, stat);
        if (!res) return c.text("state not updated", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

//get a record by id
export const getStateid = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const state = await stateTableGetid(id);
    if (state == undefined) {
        return c.text("state not found", 404);
    }
    return c.json(state, 200);
}

//delete a record
export const deleteState= async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the state
        const state = await stateTableGetid(id);
        if (state == undefined) return c.text("state not found", 404);
        //deleting the state
        const res = await stateTableDelete(id);
        if (!res) return c.text("state not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}