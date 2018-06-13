@extends('index')

@section('content')
	<div class="content-wrapper">

		<!-- Page header -->
		<div class="page-header page-header-default">
			<div class="page-header-content">
				<div class="page-title">
					<h4>  <span class="text-semibold">{{ $user->name}} </span> - Profile</h4>
				</div>

			</div>



			<div class="breadcrumb-line">
				<ul class="breadcrumb">
					<li><a href="{{asset('home')}}"><i class="icon-home2 position-left"></i> Home</a></li>
					<li class="active">My Profile</li>
				</ul>


			</div>
		</div>
		<!-- /page header -->


		<!-- Content area -->
		<div class="content">

			<!-- Info alert -->
			<div class="row">
				<div class="col-lg-9">
					<div class="tabbable">
						<div class="tab-content">


						<!-- Profile info -->
						<div class="panel panel-flat">
							<div class="panel-heading">
								<h6 class="panel-title">Profile information</h6>
								<!-- <div class="heading-elements">
									<ul class="icons-list">
										<li><a data-action="collapse"></a></li>
										<li><a data-action="reload"></a></li>
										<li><a data-action="close"></a></li>
									</ul>
								</div> -->
							</div>
							<meta name="_token" content="{{ csrf_token() }}" />


							<div class="panel-body">
								{!! Form::open(array('url'=>'users/'.$user->id,'id'=>'edituser','method'=>'PUT', 'class' => 'form-register')) !!}
								{!! Form::hidden('userid',$value = $user->userid,['id'=>'id']) !!}
								{!! Form::hidden('myprofile',$value ='myprofile',['id'=>'myprofile']) !!}
								<div class="form-group">
										<div class="row">
											<div class="col-md-6">
												<label>Email</label>
												{!! Form::email('email',$value = $user->useremail,['id'=>'email','class'=>'form-control','style'=>'width:100%;','required'=>'required','readonly'=>'readonly']) !!}
											</div>
											<div class="col-md-6">
												<label>Full name</label>
												{!! Form::text('firstname',$value = $user->name,['id'=>'firstname','class'=>'form-control','style'=>'width:100%;','required'=>'required']) !!}
											</div>
										</div>
									</div>




									<div class="form-group">
										<div class="row">
											<div class="col-md-12">
												<label>Phone #</label>
												{!! Form::number('phone',$value = $user->phone,['id'=>'phone','class'=>'form-control','style'=>'width:100%;']) !!}
												{!! Form::hidden('image',$value = null,['id'=>'img_name']) !!}

											</div>


										</div>
									</div>

									<div class="text-right">
										{!!Form::submit('Save',['class'=>'btn btn-primary','id'=>'submit1','type'=>'button'])!!}
										{{--<button type="submit" class="">Save <i class="icon-arrow-right14 position-right"></i></button>
									--}}</div>
						{{Form::close()}}
							</div>
						</div>
						<!-- /profile info -->


						<!-- Account settings -->

						<!-- /account settings -->

					</div>

				</div>
				</div>
				<div class="col-lg-3">

					<!-- User thumbnail -->
					<div class="thumbnail">
						<div class="thumb thumb-rounded thumb-slide">
							<img src="../downloads/{{$user->image}}" alt="">
							<div class="caption">
										<span>
											<a href="#" class="btn bg-success-400 btn-icon btn-xs"><i class="icon-upload"> <input type="file" required name="images" id="pics" accept="image/*" onchange="readURL(this);">
												</i></a>
										</span>
							</div>
						</div>

						<div class="caption text-center">
							<h6 class="text-semibold no-margin">{{Auth::user()->name}} <small class="display-block">

								</small></h6>

						</div>
					</div>
					<!-- /user thumbnail -->


					<!-- Navigation -->

					<!-- /navigation -->


					<!-- Share your thoughts -->

					<!-- /share your thoughts -->


					<!-- Balance chart -->
					<!-- /balance chart -->


					<!-- Connections -->
					<!-- /connections -->

				</div>
@endsection

@push('scripts')

				{!! HTML::script('assets/js/pages/form_validation.js') !!}
<script>
	$(document).ready(function() {

		$("#edituser").validate({
			rules : {
				firstname : {
					required : true,
				},
				email : {
					required : true,
					email : true
				}
			},
			messages : {
				firstname : "Please enter name!",
				email : "Please enter a valid email address",
				
			}
		});

	});
    function readURL(input) {
        var file_data = input.files[0];// Getting the properties of file from file field
        var form_data = new FormData();                  // Creating object of FormData class
        form_data.append("file", file_data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });// Adding extra parameters to form_data
        $.ajax({

            url: "{{asset('uploadImage')}}",
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,                         // Setting the data attribute of ajax with file_data
            type: 'post',
            success: function (response) {
                if (response.status == 200) {
                    $("#img_name").val(response.name);
                    $("#success-alert").fadeTo(2000, 500).slideUp(500, function () {
                        $("#success-alert").slideUp(500);
                    });
                } else {
                    $("#error-alert").fadeTo(2000, 500).slideUp(500, function () {
                        $("#error-alert").slideUp(500);
                        $("#pics").val(null);

                    });
                }
            },
            error: function () {
                $("#error-alert").fadeTo(2000, 500).slideUp(500, function () {
                    $("#error-alert").slideUp(500);
                    $("#pics").val(null);
                });
            }

        });
    }
</script>

@endpush
