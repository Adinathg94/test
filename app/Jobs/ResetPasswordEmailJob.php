<?php

namespace App\Jobs;

use Log;
use App;
use App\Jobs\Job;
use Illuminate\Contracts\Mail\Mailer;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Queue\ShouldQueue;


class ResetPasswordEmailJob extends Job implements  ShouldQueue
{
	use InteractsWithQueue, SerializesModels;

	protected $data;
	protected $emailType;

	private $views          =   array(  "register"        =>   'register');

    private $subjects      =   array(   "register"        =>   'register');

	public function __construct($data,$emailType){

		Log::info("Inside Transaction Email Job");
		$this->data 		=	$data;
		$this->emailType 	=	$emailType;

	}
    
	public function handle(){
		

		Log::info("Inside Transaction Email Job Handle !!!");
		$pathToFile=null;
		$display=null;
		$mime=null;
		$data = $this->data;
		$type = $this->emailType;
        Log::info("type  :-  ",$data);
        \Mail::send($this->views[$type], $data, function ($message) use ($data,$type,$pathToFile,$display,$mime)
        {
            Log::info("Here Inside");
            $message->to($data['email'], $data['name'])->subject($this->subjects[$type])
           ->from(env('MAIL_USERNAME'), 'test');
        });

    }

}