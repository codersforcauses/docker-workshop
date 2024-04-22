import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();
let i = 3;

const orders = [
  {
    id: 2,
    name: "Coffee",
    status: "Ready",
  },
  {
    id: 1,
    name: "Tea",
    status: "Pending",
  },
];

app.get("/", (c) => {
  return c.text("Hello there!");
});

app.get("/ping", (c) => {
  return c.json({ message: "pong" });
});

app.get("/orders", (c) => {
  return c.json(orders);
});

app.post("/orders", async (c) => {
  const { name } = await c.req.json();
  const order = { id: i++, name, status: "Pending" };
  orders.unshift(order);
  return c.json(order);
});

const port = 3001;
console.log(`Backend server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default app;
