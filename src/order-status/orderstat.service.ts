import {orderSSelect,orderSInsert} from "../drizzle/schema"
import db from "../drizzle/db"
import { orderstatusTable } from "../drizzle/schema"
import { eq } from "drizzle-orm";



export const orderstatLister = async (limit?: number): Promise<orderSSelect[] | null> => {
    if (limit) {
        return await db.query.orderstatusTable.findMany({
            limit: limit
        });
    }
    return await db.query.orderstatusTable.findMany();
}

//create record

export const orderstatTableCreate=async (stat: orderSInsert) => {
    await db.insert(orderstatusTable).values(stat)
    return "order status created successfully";
}

// update record

export const orderstatTableUpdate=async (id: number, stat: orderSInsert) => {
    await db.update(orderstatusTable).set(stat).where(eq(orderstatusTable.id, id))
    return "order status updated successfully";
}

//delete record
export const orderstatTableDelete= async (id: number) => {
    await db.delete(orderstatusTable).where(eq(orderstatusTable.id, id))
    return "order statusdeleted successfully";
}

//get a state by id
export const orderstatTableGetid= async (id: number): Promise<orderSInsert | undefined> => {
    return await db.query.orderstatusTable.findFirst({
        where: eq(orderstatusTable.id, id)
    })
}