import {addressSelect,addressInsert} from "../drizzle/schema"
import db from "../drizzle/db"
import { eq } from "drizzle-orm";
import { addressTable } from "../drizzle/schema";


export const listaddresses= async (limit?: number): Promise<addressSelect[] | null> => {
    if (limit) {
        return await db.query.addressTable.findMany({
            limit: limit
        });
    }
    return await db.query.addressTable.findMany();
}


export const addressTableCreate=async (add: addressInsert) => {
    await db.insert(addressTable).values(add)
    return "address created successfully";
}



export const addressTableGetid= async (id: number): Promise<addressInsert | undefined> => {
    return await db.query.addressTable.findFirst({
        where: eq(addressTable.id, id)
    })
}


export const addressTableUpdate=async (id: number, add: addressInsert) => {
    await db.update(addressTable).set(add).where(eq(addressTable.id, id))
    return "address updated successfully";
}

export const addressTableDelete=async (id: number) => {
    await db.delete(addressTable).where(eq(addressTable.id, id))
    return "address deleted successfully";
}
