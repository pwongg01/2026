<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth; // [1] เพิ่มการนำเข้า Auth Facade

class AuthController extends Controller
{
    // POST /api/register - สมัครสมาชิก [cite: 45]
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Password ต้องถูก Hash [cite: 59]
        ]);

        return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
    }

    // POST /api/login - คืนค่า JWT Token [cite: 46, 60]
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        // [2] ใช้ Auth::guard('api')->attempt แทน auth()->attempt
        if (!$token = Auth::guard('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401); // [cite: 139]
        }

        return $this->respondWithToken($token);
    }

    // GET /api/me - ดูข้อมูลผู้ใช้ปัจจุบัน (Protected) [cite: 47, 61]
    public function me()
    {
        // [3] ใช้ Auth::guard('api')->user()
        return response()->json(Auth::guard('api')->user());
    }

    // POST /api/logout - ยกเลิก Token [cite: 48, 62]
    public function logout()
    {
        // [4] ใช้ Auth::guard('api')->logout()
        Auth::guard('api')->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    protected function respondWithToken($token)
    {
        /** @var \Tymon\JWTAuth\JWTGuard $auth */
        $auth = Auth::guard('api');

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $auth->factory()->getTTL() * 60 // เส้นแดงจะหายไปแล้วครับ
        ]);
    }
}
