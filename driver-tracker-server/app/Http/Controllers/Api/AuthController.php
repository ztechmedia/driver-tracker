<?php

namespace App\Http\Controllers\Api;

use App\User;
use App\Kurir;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt', ['except' => ['login', 'checkPhone', 'createPassword']]);
    }

    public function checkPhone(Request $request)
    {
        $phone = $request->phone;
        $kurir = Kurir::where('Phone', $phone)->first();

        if(!$kurir) {
            return response()->json(["error" => "Kurir tidak ditemukan"], 404);
        }

        return response()->json([
            "kurir" => new UserResource($kurir)
        ]);
    }

    public function createPassword(Request $request)
    {
        $phone = $request->phone;
        $user = User::where('phone', $phone)->first();

        if($user) {
            return response()->json(["error" => "Nomor telpon sudah terdaftar"], 400);
        }

        $user = User::create([
            'phone' => $phone,
            'password' => Hash::make('123456')
        ]);

        return response()->json([
            'message' => 'Akun berhasil dibuat, Password: 123456',
            'success' => true
        ]);
    }

    public function login()
    {
        $credentials = request(['phone', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Login gagal'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        $user = Kurir::where('phone', auth()->user()->phone)->first();
        return response()->json([
            'token' => $token,
            'tokenType' => 'bearer',
            'expiresIn' => auth()->factory()->getTTL() * 60 * 12,
            'user' => new UserResource($user)
        ]);
    }
}
