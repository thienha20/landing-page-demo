<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Route;
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

//Route::get('/',[LandingPage::class,'listLandingPage']);
//Route::get('editcomponent/{idLp?}', [ComponentHanding::class,'getComponentFromLpId'])->name('editcomponent');
//Route::get('listlandingpage', [LandingPage::class,'listLandingPage'])->name('listlandingpage');
//Route::get('createlandingpage/{idLP?}',[LandingPage::class,'createLandingPage']);
Route::get('landingpage/{slug}',[LandingPage::class,'showLandingPage']);
Route::get('review-landingpage/{slug}',[LandingPage::class,'reviewLandingPage']);
//Route::post('insertComponent',[ComponentHanding::class,'insertComponent']);
//Route::get('convertdomain',[ComponentHanding::class,'convertDomain']);
//Route::post('insertlandingpage',[LandingPage::class,'insertLandingPage']);
//Route::get('updatestatus',[LandingPage::class,'statusLandingPage']);

Route::middleware(['auth:sanctum', 'verified'])->get('/', [LandingPage::class,'listLandingPage']);
Route::middleware(['auth:sanctum', 'verified'])->get('/listlandingpage', [LandingPage::class,'listLandingPage'])->name('listlandingpage');
Route::middleware(['auth:sanctum', 'verified'])->get('editcomponent/{idLp?}', [ComponentHanding::class,'getComponentFromLpId'])->name('editcomponent');
Route::middleware(['auth:sanctum', 'verified'])->get('createlandingpage/{idLP?}',[LandingPage::class,'createLandingPage'])->name('createlandingpage');
Route::middleware(['auth:sanctum', 'verified'])->get('/updatestatus', [LandingPage::class,'statusLandingPage'])->name('updatestatus');
Route::middleware(['auth:sanctum', 'verified'])->post('/insertlandingpage', [LandingPage::class,'insertlandingpage'])->name('insertlandingpage');
Route::middleware(['auth:sanctum', 'verified'])->post('/insertComponent', [ComponentHanding::class,'insertComponent'])->name('insertComponent');
Route::middleware(['auth:sanctum', 'verified'])->get('/convertdomain', [ComponentHanding::class,'convertdomain'])->name('convertdomain');
Route::middleware(['auth:sanctum', 'verified'])->get('/register', [LandingPage::class,'listLandingPage'])->name('register');

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

Route::get('social-login/tat',[LandingPage::class,'loginSSO']);

Route::post('import_products',[LandingPage::class,'importProducts']);
