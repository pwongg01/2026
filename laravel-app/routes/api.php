<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Protected Routes (ต้องมี JWT Token)
Route::middleware('auth:api')->group(function () {
    // Auth APIs
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);

    // Customer APIs (CRUD)
    Route::apiResource('customers', CustomerController::class);
});
