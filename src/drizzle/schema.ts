
import { relations } from "drizzle-orm";
import { pgTable, serial, text, varchar, integer, decimal, boolean,timestamp } from "drizzle-orm/pg-core";

//users table
export const usersTable = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    contact_phone: varchar('contact_phone', { length: 255 }).notNull(),
    phone_verified: boolean("phone_verified").notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    email_verified: boolean('email_verified').notNull(),
    confirmation_code: text('comfirmation_code'),
    password: varchar('password', { length: 255 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
    address: varchar('address', { length: 255 }).notNull(),
    Comment: text('comment').notNull(),
    driver: varchar('driver', { length: 255 }).notNull(),
    orders: varchar('orders', { length: 255 }).notNull(),
    restaurant_owner: varchar(' restaurant_owner', { length: 255 }).notNull(),
})


//address table
export const addressTable = pgTable('address', {
    id:serial('id').primaryKey().notNull(),
    street_address_1: varchar('street_address_1', { length: 255 }).notNull(),
    street_address_2: varchar('street_address_2', { length: 255 }),
    zip_code: varchar('zip_code', { length: 255 }).notNull(),
    delivery_instructions: text('delivery_instructions'),
    user_id: integer('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    city_id: integer('city_id').notNull().references(() => cityTable.id, { onDelete: 'cascade' }),
    created_at:timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
    city: varchar('city', { length: 255 }).notNull(),
    users: varchar('users', { length: 255 }).notNull(),
    orders: varchar('orders', { length: 255 }).notNull(),

})


//driver table
export const driversTable = pgTable('drivers', {
    id: serial('id').primaryKey().notNull(),
    car_make: varchar('car_make', { length: 255 }).notNull(),
    car_model: varchar('car_model', { length: 255 }).notNull(),
    car_year: integer('car_year').notNull(),
    user_id: integer('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    online: boolean('online').notNull(),
    delivering: boolean('delivering').notNull(),
    created_at:timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
    users: varchar('users', { length: 255 }).notNull(),
    orders: varchar('orders', { length: 255 }).notNull(),


})


//comments table
export const commentsTable = pgTable('comments', {
    id: serial('id').primaryKey(),
    order_id: integer('order_id').notNull().references(() => ordersTable.id, { onDelete: 'cascade' }),
    user_id: integer('user_id').notNull().references(()=>usersTable.id,{onDelete:'cascade'}),
    comment_text: text('comment_text').notNull(),


})


//state table
export const stateTable=pgTable('state',{
id:serial('id').primaryKey(),
name:varchar('name',{length:255}).notNull(),
code:varchar('code',{length:255}).notNull(),
city:varchar('city',{length:255}).notNull(),
})


//city table
export const cityTable = pgTable('city', {
    id:serial('id').primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    state_id: integer('state_id').notNull().references(() => stateTable.id, { onDelete: 'cascade' }),   
    address: varchar('address', { length: 255 }).notNull(),
    state: varchar('state', { length: 255 }).notNull(),
    reataurant: varchar('restaurant', { length: 255 }).notNull(),

})


//restaurant table
export const restaurantTable=pgTable('restaurant',{
id:serial('id').primaryKey(),
name:varchar('name',{length:255}).notNull(),
street_address:varchar('street_address',{length:255}).notNull(),
zip_code:varchar('zip_code',{length:255}).notNull(),
city_id:integer('city_id').notNull().references(()=>cityTable.id),
created_at:timestamp('created_at').notNull().defaultNow(),
updated_at:timestamp('updated_at').notNull().defaultNow(),
menu_item:varchar('menu_item',{length:255}).notNull(),
orders:varchar('orders',{length:255}).notNull(),   
city:varchar('city',{length:255}).notNull(),
restaurant_owner:varchar('restaurant_owner',{length:255}).notNull(),
})


//restaurant owner table
export const restaurantownerTable=pgTable('restaurant_owner',{
id:serial('id').primaryKey(),
restaurant_id:integer('restaurant_id').notNull().references(()=>restaurantTable.id,{onDelete:'cascade'}),
owner_id:integer('owner_id').notNull().references(()=>usersTable.id,{onDelete:'cascade'}),
users:varchar('users',{length:255}).notNull(),
restaurant:varchar('restaurant',{length:255}).notNull(),
})


//orders table
export const ordersTable = pgTable('orders', {
    id: serial('id').primaryKey().notNull(),
    restaurantId: integer('restaurant_id').notNull().references(() => restaurantTable.id, { onDelete: 'cascade' }),
    estimatedDeliveryTime: timestamp('estimated_delivery_time').notNull(),
    actualDeliveryTime: timestamp('actual_delivery_time'),
    deliveryAddressId: integer('delivery_address_id').notNull().references(() => addressTable.id,{onDelete:'cascade'}),
    userId: integer('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    driverId: integer('driver_id').notNull().references(() => driversTable.id, { onDelete: 'cascade' }),
    price: decimal('price',{precision:10,scale:2}).notNull(),
    discount: decimal('discount',{precision:10,scale:2}).notNull(),
    finalPrice: decimal('final_price',{precision:10,scale:2}).notNull(),
    comment: varchar('comment', { length: 255 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    comments: varchar('comments', { length: 255 }),
    orderMenuItemId: integer('order_menu_item_id').notNull(),
    orderStatusId: integer('order_status_id').notNull(),
})


//menu item table
export const menuitemTable = pgTable('menu_item', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    restaurant_id: integer('restaurant_id').notNull().references(() => restaurantTable.id, { onDelete: 'cascade' }),
    category_id: integer('category_id').notNull().references(() => category.id, { onDelete: 'cascade' }),
    description: varchar('description', { length: 255 }).notNull(),
    ingredients: varchar('ingredients', { length: 255 }).notNull(),
    price: decimal('price',{precision:10,scale:2}).notNull(),
    active: boolean('active').notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at:timestamp('updated_at').notNull().defaultNow(),
    category: varchar('category', { length: 255 }).notNull(),
    restaurant: varchar('restaurant', { length: 255 }).notNull(),
    order_menu_item: varchar('order_menu_item', { length: 255 }).notNull(),

})


//category table
export const category = pgTable('category', {
    id:serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    menu_item: varchar('menu_item', { length: 255 }).notNull()
});


//order menu item table
export const ordermenuitemTable = pgTable('order_menu_item', {
    id: serial('id').primaryKey(),
    order_id: integer('order_id').notNull().references(() => ordersTable.id, { onDelete: 'cascade' }),
    menu_item_id: integer('menu_item_id').notNull().references(() => menuitemTable.id, { onDelete: 'cascade' }),
    quantity: integer('quantity').notNull(),
    item_price: decimal('item_price',{precision:10,scale:2}).notNull(),
    price: decimal('price').notNull(),
    comment: varchar('comment'),
    menu_item: varchar('menu_item', { length: 255 }).notNull(),
    orders: varchar('orders', { length: 255 }).notNull(),
})


//order status table
export const orderstatusTable = pgTable('order_status', {
    id: serial('id').primaryKey(),
    order_id: integer('order_id').notNull().references(() => ordersTable.id, { onDelete: 'cascade' }),
    status_catalog_id: integer('status_catalog_id').notNull().references(() => statuscatalogTable.id, { onDelete: 'cascade' }),
    created_at: timestamp('created_at').notNull().defaultNow(),
    orders: varchar('orders', { length: 255 }).notNull(),
    status_catalog: varchar('status_catalog', { length: 255 }).notNull(),
})

//status catalog table
export const statuscatalogTable = pgTable('status_catalog', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    order_status: varchar('order_status', { length: 255 }).notNull(),
})


//RELATIONS
//usertable relations
export const userTableRelation=relations(usersTable,({many})=>({
    address:many(addressTable),
    driver:many(driversTable),
    comment:many(commentsTable),
    restaurant_owner:many(restaurantownerTable),
    orders:many(ordersTable),
}))


//address table relations
export const addressTableRelation=relations(addressTable,({one,many})=>({
    user:one(usersTable,{
        fields:[addressTable.user_id],
        references:[usersTable.id] 
    }),
    city:one(cityTable,{
        fields:[addressTable.city_id],
        references:[cityTable.id]
    }),
    orders:many(ordersTable),
}))


//driver table relations
export const driverTableRelation=relations(driversTable,({one,many})=>({
    user:one(usersTable,{
        fields:[driversTable.user_id],
        references:[usersTable.id]
    }),
    orders:many(ordersTable),
}))


//comments table relations
export const commentTableRelation=relations(commentsTable,({one})=>({
    user:one(usersTable,{
        fields:[commentsTable.user_id],
        references:[usersTable.id]
    }),
    order:one(ordersTable,{
        fields:[commentsTable.order_id],
        references:[ordersTable.id]
    })
}))


//state table relations
export const stateTableRelation=relations(stateTable,({many})=>({
    city:many(cityTable),
}))


//city table relations
export const cityTableRelation=relations(cityTable,({one,many})=>({
    state:one(stateTable,{
        fields:[cityTable.state_id],
        references:[stateTable.id]
    }),
    restaurant:many(restaurantTable),
    address:many(addressTable),
}))


//restaurant table relations
export const restaurantTableRelation=relations(restaurantTable,({one,many})=>({
    city:one(cityTable,{
        fields:[restaurantTable.city_id],
        references:[cityTable.id]
    }),
    restaurant_owner:many(restaurantownerTable),
    orders:many(ordersTable),
    menu_item:many(menuitemTable),
}))


//restaurant owner table relations
export const restaurantownerTableRelation=relations(restaurantownerTable,({one})=>({
    restaurant:one(restaurantTable,{
        fields:[restaurantownerTable.restaurant_id],
        references:[restaurantTable.id]
    }),
    user:one(usersTable,{
        fields:[restaurantownerTable.owner_id],
        references:[usersTable.id]
    })
}))


//orders table relations
export const ordersTableRelation=relations(ordersTable,({one,many})=>({
    restaurant:one(restaurantTable,{
        fields:[ordersTable.restaurantId],
        references:[restaurantTable.id]
    }),
    user:one(usersTable,{
        fields:[ordersTable.userId],
        references:[usersTable.id]
    }),
    driver:one(driversTable,{
        fields:[ordersTable.driverId],
        references:[driversTable.id]
    }),
    address:one(addressTable,{
        fields:[ordersTable.deliveryAddressId],
        references:[addressTable.id]
    }),
    comments:many(commentsTable),
    order_menu_item:many(ordermenuitemTable),
    order_status:many(orderstatusTable),
}))

//menu item table relations
export const menuitemTableRelation=relations(menuitemTable,({one,many})=>({
    restaurant:one(restaurantTable,{
        fields:[menuitemTable.restaurant_id],
        references:[restaurantTable.id]
    }),
    category:one(category,{
        fields:[menuitemTable.category_id],
        references:[category.id]
    }),
    order_menu_item:many(ordermenuitemTable),
}))

//category table relations
export const categoryTableRelation=relations(category,({many})=>({
    menu_item:many(menuitemTable),
}))

//order menu item table relations
export const ordermenuitemTableRelation=relations(ordermenuitemTable,({one})=>({
    order:one(ordersTable,{
        fields:[ordermenuitemTable.order_id],
        references:[ordersTable.id]
    }),
    menu_item:one(menuitemTable,{
        fields:[ordermenuitemTable.menu_item_id],
        references:[menuitemTable.id]
    })
}))

//order status table relations
export const orderstatusTableRelation=relations(orderstatusTable,({one,many})=>({
    order:one(ordersTable,{
        fields:[orderstatusTable.order_id],
        references:[ordersTable.id]
    }),
    status_catalog:one(statuscatalogTable,{
        fields:[orderstatusTable.status_catalog_id],
        references:[statuscatalogTable.id]
    })
}))

//status catalog table relations
export const statuscatalogTableRelation=relations(statuscatalogTable,({many})=>({
    order_status:many(orderstatusTable),
}))

export type UserInsert=typeof usersTable.$inferInsert
export type UserSelect=typeof usersTable.$inferSelect
export type stateInsert=typeof stateTable.$inferInsert
export type stateSelect=typeof stateTable.$inferSelect
export type cityInsert=typeof cityTable.$inferInsert
export type citySelect=typeof cityTable.$inferSelect
export type categoryInsert=typeof category.$inferInsert
export type categorySelect=typeof category.$inferSelect
export type orderSInsert=typeof orderstatusTable.$inferInsert
export type orderSSelect=typeof orderstatusTable.$inferSelect
export type statcatInsert=typeof statuscatalogTable.$inferInsert
export type statcatSelect=typeof statuscatalogTable.$inferSelect
export type driverSelect=typeof driversTable.$inferSelect
export type driverInsert=typeof driversTable.$inferInsert
export type addressInsert=typeof addressTable.$inferInsert
export type addressSelect=typeof addressTable.$inferSelect
export type restownerSelect=typeof restaurantownerTable.$inferSelect
export type restownerInsert=typeof restaurantownerTable.$inferInsert
export type orderSelect=typeof ordersTable.$inferSelect
export type orderInsert=typeof ordersTable.$inferInsert
export type restSelect=typeof restaurantTable.$inferSelect
export type restInsert=typeof restaurantTable.$inferInsert
export type omiSelect =typeof ordermenuitemTable.$inferSelect
export type omiInsert =typeof ordermenuitemTable.$inferInsert
export type mitemSelect =typeof menuitemTable.$inferSelect
export type mitemInsert=typeof menuitemTable.$inferInsert
export type commentInsert=typeof commentsTable.$inferInsert
export type commentSelect=typeof commentsTable.$inferSelect