@extends('index')
@section('content')
	<div class="content-wrapper">

		<!-- Page header -->
		<div class="page-header page-header-default">
			<div class="page-header-content">
				<div class="page-title">
					<h4>  <span class="text-semibold">Add</span> - Users</h4>
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
					<h5 class="panel-title">User</h5>
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
						{!! Form::open(array('url'=>'users/','id'=>'adduser','method'=>'POST', 'class' => 'form-register')) !!}



						<div class="panel panel-default">
							<div class="panel-body">

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

											<div class="form-group has-feedback has-feedback-left">
												{!! Form::text('firstname',Input::old('firstname'),['id'=>'firstname','class'=>'form-control','placeholder'=>'First Name','style'=>'width:100%;']) !!}
												<div class="form-control-feedback">
													<i class="  icon-user"></i>
												</div><div id="error-firstname"></div>
											</div>


											<div class="form-group has-feedback has-feedback-left">

												{!! Form::number('phone',Input::old('phone'),['id'=>'phone','class'=>'form-control','placeholder'=>'Mobile  number with country code']) !!}
												<div class="form-control-feedback">
													<i class=" icon-mobile"></i>
												</div>
											</div>







											<!-- <div class="form-group has-feedback has-feedback-left">

												{!! Form::password('password',['id' => 'password','class' => 'form-control','placeholder'=>'Password']) !!}
												<div class="form-control-feedback">
													<i class=" icon-key"></i>
												</div>
												<div id="error-password"></div>
											</div> -->

										</div>
										<div class="col-md-6">
											<div class="form-group has-feedback has-feedback-left">

												{!! Form::text('lastname',Input::old('lastname'),['id'=>'lastname','class'=>'form-control','placeholder'=>'Last name']) !!}
												<div class="form-control-feedback">
													<i class="  icon-user"></i>
												</div>
												<div id="error-lastname"></div>
											</div>
											<div class="form-group">
												<div class="form-group has-feedback has-feedback-left">
													{!! Form::text('email',Input::old('email'),['id'=>'email','class'=>'form-control','placeholder'=>'Email']) !!}
													<div class="form-control-feedback">
														<i class=" icon-mention"></i>
													</div>
													<div id="error-email"></div>
												</div>


											</div>



											</div>
											<div class="form-group has-feedback has-feedback-left">
												<select name="status" id="status" class="form-control" >
													<option value="1" class="label-success">Active</option>
													<option value="0" class="label-danger">Inactive</option>
												</select>
												<div class="form-control-feedback">
													<i class=" icon-bookmark2"></i>
												</div>
											</div>



										</div>
									<div class="row">
										<div class="col-md-12">
											<div class="form-group has-feedback">
												<label >Profile Picture <font color="#ff1493"> <span class="required" >*</span></font></label>
												<input type="file" required name="images" id="pics" accept="image/*" onchange="readURL(this);">
												<img id='loading' src='{{asset('assets/images/loading.gif')}}' style='visibility: hidden;'>
												<input type="text" style="display: none" name="image" id="img_name">
												<div class="form-control-feedback">
													<i class="icon-user-check text-muted"></i>
												</div>

											</div>
											<img id="screenshot" class="screen" src="#" alt="your image" />
										</div>
									</div>

									<div class="row">

										<div class="col-md-12" align="center" style="padding-top: 15px;">
											{!!Form::submit('Submit',['class'=>'btn bg-teal-400 btn-block','style'=>'width:70px;'])!!}
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
        $("#adduser").validate({
            rules : {
                firstname : {
                    required : true,
                    minlength : 2
                },
                lastname :{
                    required : true
                },
                email : {
                    required : true,
                    email : true
                },
                password :{
                    required:true,
                    minlength:5
                },


            },
            messages : {
                firstname : "Please enter first name!",
                email : "Please enter a valid email address",


            },
            errorPlacement: function (error, element) {
                var name = $(element).attr("name");
                if(name)
                {
                    error.appendTo($("#error-"+name));
                }
                else
                {
                    error.insertAfter(element);
                }

            },
        });


    });
</script>

@endpush
