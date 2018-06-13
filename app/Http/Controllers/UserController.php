<?php

namespace App\Http\Controllers;

use App\User;
use Auth;
use Illuminate\Http\Request;
use Log;
use Yajra\Datatables\Datatables as Datatables;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::find(Auth::id());
        return View('usermanagement/users')->with('user',$user);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $user = User::find(Auth::id());
        return View('usermanagement/adduser')->with('user',$user);
    }

    public  function getData(){
        Log::info("test");
        $user = User::select('id', 'status', 'email')->get();
        return Datatables::of($user)->make(true);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user=User::find($id);
        return view('usermanagement.myProfile')->with('user',$user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user=User::find($id);
        return view('usermanagement/edituser')->with('user',$user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user=User::find($id);
        $name=$request->firstname." ".$request->lastname;
        Log::info($request->firstname);
        $user->name=$name;
        $user->phone=$request->phone;
        if(isset($request->password)){
            $user->password=bcrypt($request->password);

        }
        if(isset($request->image)){
            $user->image=$request->image;
        }
        $user->status=isset($request->status)?$request->status:'1';
        $user->save();
        return redirect('users')->with('message', 'User updated successfully');

    }
    public function change_password(){

        $user = User::find(Auth::id());

        return View('auth.passwords.changePassword',compact('user'));

    }

    public function update_password(Request $request){

        Log::info("in update_password-====",$request->all());
        $id = Auth::user()->id;

        Log::info($id);

        $cupassword = bcrypt($request->password);

        $npassword = bcrypt($request->oldpassword);

        $check =User::where('id',$id)
            ->select('password')
            ->first();
        Log::info("ckeck password  " .$check);
        if($check){
            $hash = $check->password;
            Log::info("ckeck password  " .$request->oldpassword);

            if (password_verify($request->oldpassword, $hash)) {
                Log::info("update");
                $edit =	User::where('id', $id)
                    ->update(['password' => $cupassword]);
                               return \Redirect::back()->with('message', 'Password Changed Successfully');


            }
            return \Redirect::back()->withErrors([ 'Authentication Failed']);
        }
        return \Redirect::back()->withErrors([ 'User not found']);

    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user=User::find($id);
        $user->status=0;
        $user->save();
    }
}
