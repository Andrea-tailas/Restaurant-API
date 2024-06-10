import db from "../drizzle/db"
import { commentsTable } from "../drizzle/schema"
import { commentInsert,commentSelect } from "../drizzle/schema"
import { eq } from "drizzle-orm";

export const commentsService = async (limit?: number): Promise<commentSelect[] | null> => {
    if (limit) {
        return await db.query.commentsTable.findMany({
            limit: limit
        });
    }
    return await db.query.commentsTable.findMany();
}

export const getcommentService = async (id: number): Promise<commentInsert | undefined> => {
    return await db.query.commentsTable.findFirst({
        where: eq(commentsTable.id, id)
    })
}

export const createcommentService = async (comment: commentInsert) => {
    await db.insert(commentsTable).values(comment)
    return "comment created successfully";
}

export const updatecommentService = async (id: number, comment:commentInsert) => {
    await db.update(commentsTable).set(comment).where(eq(commentsTable.id, id))
    return "comment updated successfully";
}

export const deletecommentService = async (id: number) => {
    await db.delete(commentsTable).where(eq(commentsTable.id, id))
    return "comment deleted successfully";
}
