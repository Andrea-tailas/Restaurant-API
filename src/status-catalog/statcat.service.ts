import db from "../drizzle/db"
import { statcatInsert,statcatSelect } from "../drizzle/schema"
import { eq } from "drizzle-orm";
import { statuscatalogTable } from "../drizzle/schema";



export const statcatLister = async (limit?: number): Promise<statcatSelect[] | null> => {
    if (limit) {
        return await db.query.statuscatalogTable.findMany({
            limit: limit
        });
    }
    return await db.query.statuscatalogTable.findMany();
}

//create record

export const statcatTableCreate=async (stat: statcatInsert) => {
    await db.insert(statuscatalogTable).values(stat)
    return "status category created successfully";
}

// update record

export const statcatTableUpdate=async (id: number, stat: statcatInsert) => {
    await db.update(statuscatalogTable).set(stat).where(eq(statuscatalogTable.id, id))
    return "status category updated successfully";
}

//delete record
export const statcatTableDelete= async (id: number) => {
    await db.delete(statuscatalogTable).where(eq(statuscatalogTable.id, id))
    return "status category deleted successfully";
}

//get a state by id
export const statcatTableGetid= async (id: number): Promise<statcatInsert | undefined> => {
    return await db.query.statuscatalogTable.findFirst({
        where: eq(statuscatalogTable.id, id)
    })
}