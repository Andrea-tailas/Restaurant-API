import {driverInsert,driverSelect} from "../drizzle/schema"
import { eq } from "drizzle-orm";
import db from "../drizzle/db"
import { driversTable } from "../drizzle/schema";


export const driversLister = async (limit?: number): Promise<driverSelect[] | null> => {
    if (limit) {
        return await db.query.driversTable.findMany({
            limit: limit
        });
    }
    return await db.query.driversTable.findMany();
}

//create record

export const driverTableCreate=async (stat: driverInsert) => {
    await db.insert(driversTable).values(stat)
    return "driver created successfully";
}

// update record

export const driverTableUpdate=async (id: number, stat: driverInsert) => {
    await db.update(driversTable).set(stat).where(eq(driversTable.id, id))
    return "driver updated successfully";
}

//delete record
export const driverTableDelete= async (id: number) => {
    await db.delete(driversTable).where(eq(driversTable.id, id))
    return "driver deleted successfully";
}

//get a state by id
export const driverTableGetid= async (id: number): Promise<driverInsert | undefined> => {
    return await db.query.driversTable.findFirst({
        where: eq(driversTable.id, id)
    })
}