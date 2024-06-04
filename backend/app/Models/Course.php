<?php

namespace App\Models;

use App\Models\Slot;
use App\Models\Activity;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Course extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function activity(): BelongsTo
    {
        return $this->belongsTo(Activity::class);
    }
    public function slot(): BelongsTo
    {
        return $this->belongsTo(Slot::class);
    }
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->withPivot('status');
    }
}
