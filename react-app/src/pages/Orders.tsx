import { useEffect, useState } from 'react';
import { nestApi, laravelApi } from '../api/axiosInstances';

export const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCust, setSelectedCust] = useState('');
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    nestApi.get('/orders').then(res => setOrders(res.data));
    laravelApi.get('/customers').then(res => setCustomers(res.data));
  }, []);

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await nestApi.post('/orders', { customerId: Number(selectedCust), amount });
      const res = await nestApi.get('/orders');
      setOrders(res.data);
    } catch (err) { alert('Create Order failed'); }
  };

  return (
    <div>
      <h2>Orders (NestJS Service)</h2>
      <form onSubmit={handleCreateOrder}>
        <select value={selectedCust} onChange={e => setSelectedCust(e.target.value)} required>
          <option value="">-- Select Customer --</option>
          {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input type="number" placeholder="Amount" onChange={e => setAmount(Number(e.target.value))} required />
        <button type="submit">Create Order</button>
      </form>
      <ul>
        {orders.map((o: any) => (
          <li key={o.id}>Order ID: {o.id} - Customer ID: {o.customerId} - Amount: {o.amount}</li>
        ))}
      </ul>
    </div>
  );
};