import db from "../drizzle/db"
import { restaurantTable } from "../drizzle/schema"
import { restInsert,restSelect} from "../drizzle/schema"
import { eq } from "drizzle-orm";


export const restService = async (limit?: number): Promise<restSelect[] | null> => {
    if (limit) {
        return await db.query.restaurantTable.findMany({
            limit: limit
        });
    }
    return await db.query.restaurantTable.findMany();
}

export const getrestService = async (id: number): Promise<restInsert | undefined> => {
    return await db.query.restaurantTable.findFirst({
        where: eq(restaurantTable.id, id)
    })
}

export const createrestService = async (rest: restInsert) => {
    await db.insert(restaurantTable).values(rest)
    return "restaurant created successfully";
}

export const updaterestService = async (id: number, rest: restInsert) => {
    await db.update(restaurantTable).set(rest).where(eq(restaurantTable.id, id))
    return "restaurant updated successfully";
}

export const deleterestService = async (id: number) => {
    await db.delete(restaurantTable).where(eq(restaurantTable.id, id))
    return "restaurant deleted successfully";
}
