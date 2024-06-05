<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Course;
use App\Models\Activity;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function adminDashboard()
    {
        if (Auth::user()->role !== 'admin') {
            abort(401);
        }
    
        $courses = Course::with(['users' => function ($query) {
            $query->select('users.id', 'users.name', 'course_user.course_id', 'course_user.status');
        }, 'activity', 'slot'])->get();
    
        return response()->json($courses);
    }
    


    public function updateBookingStatus(Request $request, $courseId, $userId)
    {
        if (Auth::user()->role !== 'admin') {
            abort(401);
        }
    
        $status = $request->input('status');
        if (!in_array($status, ['accepted', 'rejected'])) {
            return response()->json(['message' => 'Invalid status'], 400);
        }
    
        $user = User::findOrFail($userId);
        $user->courses()->updateExistingPivot($courseId, ['status' => $status]);
    
        return response()->json(['message' => "Booking status updated to $status"]);
    }
    


    public function createActivity(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|string',
        ]);
        $activity = new Activity();
        $activity->name = $request->name;
        $activity->description = $request->description;
        $activity->image = $request->image;
        $activity->timestamps = false;
        $activity->save();

        return response()->json(['message' => 'Activity created successfully'], 201);
    }
}
