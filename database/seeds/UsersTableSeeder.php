<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info('Creating sample users...');
      $this->command->getOutput()->progressStart(1000);
        for($count=1000;$count>0;$count--){
            $this->command->getOutput()->progressAdvance();
            DB::table('users')->insert([
                'name' => str_random(10),
                'email' => str_random(10).'@gmail.com',
                'password' => bcrypt('secret'),
                'phone'=>rand(pow(10, 10-1), pow(10, 10)-1),
                'image'=>null
            ]);
        }
        $this->command->getOutput()->progressFinish();


    }
}
