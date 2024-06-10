import db from "../drizzle/db"
import { ordersTable } from "../drizzle/schema"
import { orderInsert,orderSelect} from "../drizzle/schema"
import { eq } from "drizzle-orm";


export const orderService = async (limit?: number): Promise<orderSelect[] | null> => {
    if (limit) {
        return await db.query.ordersTable.findMany({
            limit: limit
        });
    }
    return await db.query.ordersTable.findMany();
}

export const getorderService = async (id: number): Promise<orderInsert | undefined> => {
    return await db.query.ordersTable.findFirst({
        where: eq(ordersTable.id, id)
    })
}

export const createorderService = async (order: orderInsert) => {
    await db.insert(ordersTable).values(order)
    return "order created successfully";
}

export const updateorderService = async (id: number, order: orderInsert) => {
    await db.update(ordersTable).set(order).where(eq(ordersTable.id, id))
    return "order updated successfully";
}

export const deleteorderService = async (id: number) => {
    await db.delete(ordersTable).where(eq(ordersTable.id, id))
    return "order deleted successfully";
}
