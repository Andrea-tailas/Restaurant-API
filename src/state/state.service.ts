import db from "../drizzle/db"
import { stateInsert,stateSelect} from "../drizzle/schema"
import {stateTable } from "../drizzle/schema"
import { eq } from "drizzle-orm";

export const statesServiceLister = async (limit?: number): Promise<stateSelect[] | null> => {
    if (limit) {
        return await db.query.stateTable.findMany({
            limit: limit
        });
    }
    return await db.query.stateTable.findMany();
}

//create record

export const stateTableCreate=async (stat: stateInsert) => {
    await db.insert(stateTable).values(stat)
    return "state created successfully";
}

// update record

export const stateTableUpdate=async (id: number, stat: stateInsert) => {
    await db.update(stateTable).set(stat).where(eq(stateTable.id, id))
    return "state updated successfully";
}

//delete record
export const stateTableDelete= async (id: number) => {
    await db.delete(stateTable).where(eq(stateTable.id, id))
    return "state deleted successfully";
}

//get a state by id
export const stateTableGetid= async (id: number): Promise<stateInsert | undefined> => {
    return await db.query.stateTable.findFirst({
        where: eq(stateTable.id, id)
    })
}