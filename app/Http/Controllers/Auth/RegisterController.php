<?php

namespace App\Http\Controllers\Auth;

use App\Notifications\UserRegisteredSuccessfully;
use App\password_reset;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Input;
use Log;
use Carbon\Carbon;
class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/users';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */


    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function register(Request $request)
    {
        /** @var User $user */
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'phone'=>'required|min:9',
            'image'=>'required'
        ]);
        if ($validator->fails()) {
            return redirect()->back()->with('message', 'Unable to create new user.');
        }
        try {
            $user=User::create([
                'name' => $request['name'].' '.$request['secoundname'],
                'email' => $request['email'],
                'password' => bcrypt($request['password']),
                'phone' => $request['phone'],
                'image'=>$request['image'],
                'activation_code'=>str_random(30).time()
            ]);
           /* $validatedData['password']        = bcrypt(array_get($validatedData, 'password'));
            $validatedData['activation_code'] = str_random(30).time();
            $user                             = app(User::class)->create($validatedData);
       */ } catch (\Exception $exception) {
            logger()->error($exception);
            return redirect()->back()->with('message', 'Unable to create new user.');
        }
        Log::info("",[$user]);
        $user->notify(new UserRegisteredSuccessfully($user));
        return redirect()->back()->with('message', 'Successfully created a new account. Please check your email and activate your account.');
    }

    public function activateUser($activationCode)
    {
        try {
            $user = User::where('activation_code', $activationCode)->first();
            if (!$user) {
                return "Invalid code.";
            }
            $user->status          = 1;
            $user->activation_code = null;
            $user->save();
        } catch (\Exception $exception) {
            logger()->error($exception);
            return "Whoops! something went wrong.";
        }
        return redirect()->to('/login');
    }


    public function saveImage(Request $request){

        $destinationPath = './downloads'; // upload path
        $extension = Input::file('file')->getClientOriginalExtension(); // getting image extension
            try{
                Log::info($extension);
                $dt= Carbon::now();
                $fileName =$dt->toAtomString().rand(11111,99999).'.'.$extension; // renameing image
                Input::file('file')->move($destinationPath, $fileName);
                Log::info($fileName);
                return response()->json(['status'       =>      200,'name'  => $fileName]);

            }catch (\Exception $exception)
            {
                Log::error("",[$exception]);
                return response()->json(['status'       =>      400]);
            }

    }
}
