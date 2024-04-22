import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import DataTable from "./components/orders/data-table";
import { columns } from "./components/orders/columns";
import { Order } from "./lib/types";

const getOrders = async () => {
  const response = await fetch("/api/orders");
  return response.json() as Promise<Order[]>;
};

const sendOrder = async (name: string) => {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  return response.json() as Promise<Order>;
};

function App() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [order, setOrder] = useState<string>("");
  const [orders, setOrders] = useState<Order[]>([]);

  const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);
    const createdOrder = await sendOrder(order);
    setOrder("");
    setSubmitting(false);
    setOrders((prev) => [createdOrder, ...prev]);
  };

  const handleRefresh = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  useEffect(() => {
    getOrders().then((data) => setOrders(data));
  }, []);

  return (
    <div className="container py-6">
      <header className="text-4xl font-semibold text-center my-4">
        Welcome to Coders for Coffee 🐳
      </header>
      <main className="space-y-4">
        <form className="flex gap-2" onSubmit={handleOrder}>
          <Input
            id="order_name"
            type="text"
            placeholder="Order a drink..."
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            disabled={submitting}
          />
          <Button type="submit" disabled={!order || submitting}>
            Order ☕
          </Button>
          <Button type="button" variant="secondary" onClick={handleRefresh}>
            🔄
          </Button>
        </form>
        <DataTable className="w-full" columns={columns} data={orders} />
      </main>
    </div>
  );
}

export default App;
