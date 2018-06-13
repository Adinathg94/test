<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('auth.register');
});

Auth::routes();

Route::get('users/data','UserController@getData');
Route::get('/home', 'HomeController@index')->name('home');
Route::get('change_password','UserController@change_password');

Route::post('update_password','UserController@update_password')->name('update_password');
Route::post('uploadImage','Auth\RegisterController@saveImage');
Route::get('/verify-user/{code}', 'Auth\RegisterController@activateUser')->name('activate.user');
Route::resource('users', 'UserController');
