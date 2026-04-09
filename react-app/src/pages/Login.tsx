import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // <--- ต้องมีบรรทัดนี้
import { laravelApi } from '../api/axiosInstances';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await laravelApi.post('/login', { email, password });
            const token = response.data.access_token || response.data.token;
            localStorage.setItem('token', token);
            navigate('/customers');
        } catch (err) {
            // เมื่อ import axios มาแล้ว บรรทัดนี้จะทำงานได้สมบูรณ์
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
            } else {
                setError('เกิดข้อผิดพลาดที่ไม่คาดคิด');
            }
        }
    };

    return (
        <div className="login-container">
            {/* 1. ผูกฟังก์ชัน handleLogin เข้ากับฟอร์ม */}
            <form onSubmit={handleLogin}>
                <h2>Login</h2>

                {/* 2. นำ error มาแสดงผล (ถ้ามี) */}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        /* 3. ใช้ setEmail เพื่ออัปเดตค่าเมื่อพิมพ์ */
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        /* 4. ใช้ setPassword เพื่ออัปเดตค่าเมื่อพิมพ์ */
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;