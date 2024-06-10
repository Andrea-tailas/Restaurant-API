import { mitemInsert,mitemSelect } from "../drizzle/schema";
import { menuitemTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import db from "../drizzle/db";



export const menuService = async (limit?: number): Promise<mitemSelect[] | null> => {
    if (limit) {
        return await db.query.menuitemTable.findMany({
            limit: limit
        });
    }
    return await db.query.menuitemTable.findMany();
}

export const getmenuService = async (id: number): Promise<mitemInsert | undefined> => {
    return await db.query.menuitemTable.findFirst({
        where: eq(menuitemTable.id, id)
    })
}

export const createmenuService = async (menu: mitemInsert) => {
    await db.insert(menuitemTable).values(menu)
    return "menu item created successfully";
}

export const updatemenuService = async (id: number, menu: mitemInsert) => {
    await db.update(menuitemTable).set(menu).where(eq(menuitemTable.id, id))
    return "menu item updated successfully";
}

export const deletemenuService = async (id: number) => {
    await db.delete(menuitemTable).where(eq(menuitemTable.id, id))
    return "menu item deleted successfully";
}
