import db from "../drizzle/db"
import { categoryInsert,categorySelect } from "../drizzle/schema"
import { eq } from "drizzle-orm";
import { category } from "../drizzle/schema";


export const categoriesLister = async (limit?: number): Promise<categorySelect[] | null> => {
    if (limit) {
        return await db.query.category.findMany({
            limit: limit
        });
    }
    return await db.query.category.findMany();
}

//create record

export const categoryCreate=async (cat: categoryInsert) => {
    await db.insert(category).values(cat)
    return "category created successfully";
}

// update record

export const categoryUpdate=async (id: number, cat: categoryInsert) => {
    await db.update(category).set(cat).where(eq(category.id, id))
    return "category updated successfully";
}

//delete record
export const categoryDelete= async (id: number) => {
    await db.delete(category).where(eq(category.id, id))
    return "category deleted successfully";
}

//get a state by id
export const categoryGetid= async (id: number): Promise<categoryInsert | undefined> => {
    return await db.query.category.findFirst({
        where: eq(category.id, id)
    })
}