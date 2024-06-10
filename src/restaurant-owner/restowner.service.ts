import db from "../drizzle/db"
import { restaurantownerTable } from "../drizzle/schema"
import { restownerInsert,restownerSelect} from "../drizzle/schema"
import { eq } from "drizzle-orm";


export const restownerService = async (limit?: number): Promise<restownerSelect[] | null> => {
    if (limit) {
        return await db.query.restaurantownerTable.findMany({
            limit: limit
        });
    }
    return await db.query.restaurantownerTable.findMany();
}

export const getrestownerService = async (id: number): Promise<restownerInsert | undefined> => {
    return await db.query.restaurantownerTable.findFirst({
        where: eq(restaurantownerTable.id, id)
    })
}

export const createrestownerService = async (rest: restownerInsert) => {
    await db.insert(restaurantownerTable).values(rest)
    return "restaurant owner created successfully";
}

export const updaterestownerService = async (id: number, rest: restownerInsert) => {
    await db.update(restaurantownerTable).set(rest).where(eq(restaurantownerTable.id, id))
    return "restaurant owner updated successfully";
}

export const deleterestownerService = async (id: number) => {
    await db.delete(restaurantownerTable).where(eq(restaurantownerTable.id, id))
    return "restaurant owner deleted successfully";
}
