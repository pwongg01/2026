import React, { useEffect, useState } from 'react';
import { laravelApi } from '../api/axiosInstances';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string; // เพิ่มฟิลด์ phone ใน interface
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  
  // 1. เพิ่ม State สำหรับฟอร์ม
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // <--- เพิ่ม state นี้

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await laravelApi.get('/customers');
      setCustomers(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 3. ส่งค่า phone ไปยัง API
      await laravelApi.post('/customers', { 
        name, 
        email, 
        phone // <--- แนบค่า phone ไปด้วย
      });
      
      // ล้างค่าในฟอร์มหลังจากเพิ่มสำเร็จ
      setName('');
      setEmail('');
      setPhone('');
      
      // โหลดข้อมูลใหม่
      fetchCustomers();
      alert('เพิ่มข้อมูลสำเร็จ!');
    } catch (err: any) {
      console.error("Add error:", err.response?.data);
      alert('เกิดข้อผิดพลาด: ' + JSON.stringify(err.response?.data));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Customer Management</h1>

      {/* 2. เพิ่ม Input Field ในส่วนของ Form */}
      <form onSubmit={handleAddCustomer} style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ddd' }}>
        <h3>Add New Customer</h3>
        <div style={{ marginBottom: '10px' }}>
          <input 
            placeholder="ชื่อ-นามสกุล" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            style={{ marginRight: '10px' }}
          />
          <input 
            placeholder="อีเมล" 
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ marginRight: '10px' }}
          />
          {/* ช่องกรอกเบอร์โทรศัพท์ที่เพิ่มใหม่ */}
          <input 
            placeholder="เบอร์โทรศัพท์" 
            type="text"
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            required 
            style={{ marginRight: '10px' }}
          />
          <button type="submit" style={{ backgroundColor: '#28a745', color: 'white' }}>
            เพิ่มลูกค้า
          </button>
        </div>
      </form>

      {loading ? <p>กำลังโหลดข้อมูล...</p> : (
        <table border={1} width="100%" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th> {/* เพิ่มหัวตาราง */}
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td style={{ padding: '8px' }}>{c.id}</td>
                <td style={{ padding: '8px' }}>{c.name}</td>
                <td style={{ padding: '8px' }}>{c.email}</td>
                <td style={{ padding: '8px' }}>{c.phone}</td> {/* แสดงเบอร์โทร */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Customers;