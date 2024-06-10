import {getCities,cityTableCreate,cityTableGetid,cityTableUpdate,cityTableDelete} from "./city.service"
import { Context } from "hono";


//get all cities
export const allCities=async (c: Context) => {
    try {
        //limit the number of cities to be returned
        const limit = Number(c.req.query('limit'))
        const data = await getCities(limit);
        if (data == null || data.length == 0) {
            return c.text("city not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}


//create a new city
export const createCity=async (c: Context) => {
    try {
        const cty = await c.req.json();
        const createdcity = await cityTableCreate(cty);
        if (!createdcity) return c.text("city not created", 404);
        return c.json({ msg: createdcity }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}


//get city by id
export const getcityByid= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const city = await cityTableGetid(id);
    if (city == undefined) {
        return c.text("city not found", 404);
    }
    return c.json(city, 200);
}

//update a city
export const updateCity= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const cty = await c.req.json();
    try {
        // search for the city
        const searchedcity = await cityTableGetid(id);
        if (searchedcity == undefined) return c.text("city not found", 404);
        // get the data and update it
        const res = await cityTableUpdate(id, cty);
        // return a success message
        if (!res) return c.text("city not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

//delete a city
export const deleteCity=async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the city
        const cy = await cityTableGetid(id);
        if (cy == undefined) return c.text("city not found", 404);
        //deleting the city
        const res = await cityTableDelete(id);
        if (!res) return c.text("city not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}