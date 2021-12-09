<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class OnlyOneUser
{

    public function handle(Request $request, Closure $next)
    {
        $allUsersCount = User::all()->count();

        if ($allUsersCount != 0) {
            return redirect("/");
        }

        return $next($request);
    }
}
