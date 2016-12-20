<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddGroupIdToLogTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('log_charge', function (Blueprint $table) {
            $table->string('group_id')->after('id');
        });

        Schema::table('log_climate', function (Blueprint $table) {
            $table->string('group_id')->after('id');
        });

        Schema::table('log_driving', function (Blueprint $table) {
            $table->string('group_id')->after('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('log_charge', function (Blueprint $table) {
            $table->dropColumn('group_id');
        });

        Schema::table('log_climate', function (Blueprint $table) {
            $table->dropColumn('group_id');
        });

        Schema::table('log_driving', function (Blueprint $table) {
            $table->dropColumn('group_id');
        });
    }
}
