<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    // GET /api/customers - รายการลูกค้า [cite: 65]
    public function index()
    {
        return response()->json(Customer::all());
    }

    // POST /api/customers - เพิ่มลูกค้าใหม่ [cite: 67]
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:customers', // Email ต้องไม่ซ้ำ 
            'phone' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $customer = Customer::create($request->all());
        return response()->json($customer, 201);
    }

    // GET /api/customers/{id} - ดูข้อมูลรายคน [cite: 66]
    public function show($id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }
        return response()->json($customer);
    }

    // PUT /api/customers/{id} - แก้ไขข้อมูล [cite: 68]
    public function update(Request $request, $id)
    {
        $customer = Customer::find($id);
        if (!$customer) return response()->json(['message' => 'Not found'], 404);

        $customer->update($request->all());
        return response()->json($customer);
    }

    // DELETE /api/customers/{id} - ลบข้อมูล [cite: 69]
    public function destroy($id)
    {
        $customer = Customer::find($id);
        if (!$customer) return response()->json(['message' => 'Not found'], 404);

        $customer->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
