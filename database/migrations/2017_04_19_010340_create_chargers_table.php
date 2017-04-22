<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChargersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chargers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->enum('status', ['OPEN', 'CLOSED', 'CONSTRUCTION', 'PERMIT'])->index();
            $table->string('source_id')->nullable();
            $table->string('street')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zip')->nullable();
            $table->string('country')->index()->nullable();
            $table->string('region')->nullable();
            $table->decimal('latitude', 10, 8)->index()->nullable();
            $table->decimal('longitude', 11, 8)->index()->nullable();
            $table->integer('elevation')->nullable();
            $table->integer('stall_count')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chargers');
    }
}
