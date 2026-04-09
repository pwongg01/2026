<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // [cite: 17]
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject; // [cite: 21]

class User extends Authenticatable implements JWTSubject
{
    /**
     * ใช้ HasFactory เพื่อให้เรียกใช้ User::factory() ใน Seeder ได้
     * และใช้ Notifiable สำหรับระบบแจ้งเตือนพื้นฐาน
     */
    use HasFactory, Notifiable; 

    /**
     * กำหนดฟิลด์ที่สามารถบันทึกข้อมูลได้ (Mass Assignment)
     * ตามข้อกำหนด User fields: name, email, password [cite: 49, 52, 53]
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * ฟิลด์ที่ต้องซ่อนไว้เมื่อแปลงเป็น Array หรือ JSON
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * ส่วนของ JWT Authentication [cite: 60]
     */

    /**
     * คืนค่า Identifier ที่จะถูกเก็บใน JWT (โดยปกติคือ Primary Key)
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * คืนค่า Custom Claims ที่ต้องการเก็บเพิ่มใน Token (ถ้ามี)
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}