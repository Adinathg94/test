@extends('index')
@section('content')
    <div class="content-wrapper">

        <!-- Page header -->
        <div class="page-header page-header-default">
            <div class="page-header-content">
                <div class="page-title">
                    <h4>  <span class="text-semibold">Edit</span> - User</h4>
                </div>

            </div>


            <div class="breadcrumb-line">



            </div>
        </div>
        

        <!-- /page header -->


        <!-- Content area -->
        <div class="content">

            <!-- Info alert -->

            <!-- /info alert -->


            <!-- Sidebars overview -->
            <div class="panel panel-flat panel-body">
                <div class="panel-heading">
                    <h5 class="panel-title">Users</h5>
                    <!-- <div class="heading-elements">
                        <ul class="icons-list">
                            <li><a data-action="collapse"></a></li>
                            <li><a data-action="reload"></a></li>
                            <li><a data-action="close"></a></li>
                        </ul>
                    </div> -->
                </div>

                <div class="panel-body">

                </div>
                <div id="msg" class=""></div>


		<div class="row">
			<div class="col-md-12">
				{!! Form::open(array('url'=>'users'.'/'.$user->id,'id'=>'edituser','method'=>'PUT', 'class' => 'form-register')) !!}
				{!! Form::hidden('myprofile',$value ='',['id'=>'myprofile']) !!}



				<?php
				$name = $user->name;
				if (strpos($name, " ") !== false) {
					$exacconame = explode(" ", $name);
					$firstname   = $exacconame[0];
					$lastname   = $exacconame[1];
				}else{
					$firstname   = $name;
					$lastname = "";
				}



				?>

				<div class="panel panel-default">
					<div class="panel-body">
						<div align="left">	<h2><i class="icon-edit-sign teal"></i>{{ $name}}</h2></div>
						<hr>
						<fieldset>
							<div class="row">
								<div class="col-md-12">
									@foreach($errors->all() as $error)
										<div class="errorHandler alert alert-danger">
											<i class="icon-remove-sign"></i> {!!$error!!}
										</div>
									@endforeach
								</div>



								<div class="col-md-6">
									<div class="form-group">
										{!! Form::text('firstname',$value = $firstname,['id'=>'firstname','class'=>'form-control','style'=>'width:100%;','placeholder'=>'First Name']) !!}
										<div class="form-control-feedback">
											<i class="  icon-user"></i>
										</div><div id="error-firstname"></div>
									</div>

									<div class="form-group">

										{!! Form::text('phone',$value = $user->phone,['id'=>'phone','class'=>'form-control','placeholder'=>'Phone number with country code']) !!}
										<div class="form-control-feedback">
											<i class=" icon-mobile"></i>
										</div>
									</div>


									<div class="form-group">

										{!! Form::password('password',['id' => 'password','class' => 'form-control','placeholder'=>'Password']) !!}
										<div class="form-control-feedback">
											<i class=" icon-key"></i>
										</div>
										<div id="error-password"></div>
									</div>


									
								</div>
								<div class="col-md-6">
									<div class="form-group">

										{!! Form::text('lastname',$value = $lastname,['id'=>'lastname','class'=>'form-control']) !!}
										<div class="form-control-feedback">
											<i class="  icon-user"></i>
										</div>
										<div id="error-lastname"></div>
									</div>


									<div class="form-group">
										<select name="status" id="status" class="form-control" >
											<option value="1">Active</option>
											<option value="0">Inactive</option>
										</select>
									</div>


								</div>
							</div>

							<div class="row">

								<div class="col-md-3" align="center" style="padding-top: 15px;">
									{!!Form::submit('Submit',['class'=>'btn bg-teal-400 btn-block'])!!}
								</div>

							</div>

						</fieldset>

					</div>
				</div>

				{!! Form::close() !!}
			</div>
		</div>
            </div></div></div>
@endsection

@push('script')

{!! HTML::script('assets/js/pages/form_multiselect.js') !!}

<script>
	$(document).ready(function() {

        $('.search-select').select2();
		$("#edituser").validate({
			rules : {
				firstname : {
					required : true,
				},
				email : {
					required : true,
					email : true
				},
				password : {
					minlength : 6
				},
				password_confirmation : {
					minlength : 6,
					equalTo : "#password"
				},
				oldpassword : {
					minlength : 6
				}
			},
			messages : {
				firstname : "Please enter first name!",
				email : "Please enter a valid email address",

			}
		});
	});
</script>

@endpush
