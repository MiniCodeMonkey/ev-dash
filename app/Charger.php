<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Charger extends Model
{
    /**
     * The attributes that should be visible in arrays.
     *
     * @var array
     */
    protected $visible = [
        'id',
        'name',
        'street',
        'city',
        'state',
        'zip',
        'country',
        'region',
        'latitude',
        'longitude',
        'elevation',
        'stall_count',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'status',
        'source_id',
        'street',
        'city',
        'state',
        'zip',
        'country',
        'region',
        'latitude',
        'longitude',
        'elevation',
        'stall_count',
    ];
}
