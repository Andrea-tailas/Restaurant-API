import "dotenv/config";
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { userRouter } from "./users/user.router";
import { usersRouter } from "./city/city.router";
import { statcatRouter } from "./status-catalog/statcat.router";
import { stateRouter } from "./state/state.router";
import { orderstatRouter } from "./order-status/orderstat.router";
import { driverRouter } from "./driver/driver.router";
import { catRouter } from "./category/category.router";
import { addRouter } from "./address/address.router";
import {commentRouter} from "./comments/comment.router"
import { restRouter } from "./restaurant/restaurant.router";
import {restownerRouter} from "./restaurant-owner/restowner.router"
import { orderRouter } from "./orders/order.router";
import { menuRouter } from "./menu-item/menu.router";
import { ordermenuRouter } from "./order-menu-item/orderm.router";
const app = new Hono()


//default route
app.get('/', (c) => {
  return c.text('Hello Hono!')
})


//custom route
app.route('/api',userRouter)
app.route('/',usersRouter)
app.route('/',statcatRouter)
app.route('/',stateRouter)
app.route('/',orderstatRouter)
app.route('/',driverRouter)
app.route('/',catRouter)
app.route('/',addRouter)
app.route('/',commentRouter)
app.route('/',restRouter)
app.route('/',restownerRouter)
app.route('/',orderRouter)
app.route('/',menuRouter)
app.route('/',ordermenuRouter)

console.log(`Server is running on port ${process.env.PORT}`)

serve({
  fetch: app.fetch,
  port:Number(process.env.PORT) || 3000
})
