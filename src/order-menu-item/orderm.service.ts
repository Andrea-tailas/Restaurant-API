import db from "../drizzle/db"
import { ordermenuitemTable } from "../drizzle/schema"
import { omiInsert, omiSelect } from "../drizzle/schema"
import { eq } from "drizzle-orm";


export const ordermenuService = async (limit?: number): Promise<omiSelect[] | null> => {
    if (limit) {
        return await db.query.ordermenuitemTable.findMany({
            limit: limit
        });
    }
    return await db.query.ordermenuitemTable.findMany();
}

export const createservice = async (item: omiInsert) => {
    await db.insert(ordermenuitemTable).values(item)
    return "order item created successfully"
}

export const getordermenu = async (id: number): Promise<omiInsert | undefined> => {
    return await db.query.ordermenuitemTable.findFirst({
        where: eq(ordermenuitemTable.id, id)
    })
}

export const updateordermenu = async (id: number,item: omiInsert) => {
    await db.update(ordermenuitemTable).set(item).where(eq(ordermenuitemTable.id, id))
    return "order menu item updated successfully"
}

export const deleteordermenu=async(id:number) =>{
    await db.delete(ordermenuitemTable).where(eq(ordermenuitemTable.id,id))
    return "order menu item deleted successfully"
}