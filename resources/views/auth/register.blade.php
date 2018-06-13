<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>OTFCoder</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Global stylesheets -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
    <link href="assets/css/icons/icomoon/styles.css" rel="stylesheet" type="text/css">
    <link href="assets/css/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="assets/css/core.css" rel="stylesheet" type="text/css">
    <link href="assets/css/components.css" rel="stylesheet" type="text/css">
    <link href="assets/css/colors.css" rel="stylesheet" type="text/css">
    <link href="assets/css/mystyle.css" rel="stylesheet" type="text/css">
    <!-- /global stylesheets -->

    <!-- Core JS files -->
    <script type="text/javascript" src="assets/js/plugins/loaders/pace.min.js"></script>
    <script type="text/javascript" src="assets/js/core/libraries/jquery.min.js"></script>
    <script type="text/javascript" src="assets/js/core/libraries/bootstrap.min.js"></script>
    <script type="text/javascript" src="assets/js/plugins/loaders/blockui.min.js"></script>
    <!-- /core JS files -->

    <!-- Theme JS files -->
    <script type="text/javascript" src="assets/js/plugins/forms/styling/uniform.min.js"></script>

    <script type="text/javascript" src="assets/js/core/app.js"></script>
    <script type="text/javascript" src="assets/js/pages/login.js"></script>
    <script type="text/javascript" src="assets/js/plugins/forms/validation/validate.min.js">
    </script>
    <script type="text/javascript" src="assets/js/login-validate.js"></script>
    <!-- /theme JS files -->

</head>

<body class="login-container">

<!-- Main navbar -->
<div class="navbar navbar-inverse">
    <div class="navbar-header">
        <a class="navbar-brand" href="{{env('host')}}"><img width="77%" src="{{asset('assets/images/logo.png')}}"
                                                            alt=""></a>

        <ul class="nav navbar-nav pull-right visible-xs-block">
            <li><a data-toggle="collapse" data-target="#navbar-mobile"><i class="icon-tree5"></i></a></li>
        </ul>
    </div>


</div>
    <div class="page-container">

        <!-- Page content -->
        <div class="page-content">

            <!-- Main content -->
            <div class="content-wrapper">

                <!-- Content area -->
                <div class="content">

                    <!-- Registration form -->
                        <div class="row">
                            <div class="col-lg-6 col-lg-offset-3">
                                <div class="panel registration-form">
                                    <div class="panel-body">
                                        <div class="text-center">

                                            <div class="icon-object border-success text-success"><i class="icon-plus3"></i></div>
                                            <h5 class="content-group-lg">Create account <small class="display-block">All fields are required</small></h5>
                                        </div>
                                        <form  action="{{ route('register') }}" class="form-horizontal form-register" id="form-register"  role="form" method="POST" >
                                            {{ csrf_field() }}
                                            @if(session()->has('message'))
                                                <div class="alert alert-danger">
                                                    {{ session()->get('message') }}
                                                </div>
                                            @endif
                                            <div id="success-alert" class="alert alert-success" hidden="true">
                                                <strong>Success!</strong> File Uploaded succesfully.
                                            </div>
                                            <div class="alert alert-danger" hidden id="error-alert">
                                                <strong>Error!</strong> Something went wrong
                                            </div>
                                        <div class="form-group has-feedback">
                                            <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                                <input id="email" type="email" class="form-control" name="email" placeholder="Your email" value="{{ old('email') }}" >
                                                @if ($errors->has('email'))
                                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                                @endif
                                            <div class="form-control-feedback">
                                                <i class="icon-user-plus text-muted"></i>
                                            </div>
                                        </div>
                                            </div>

                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group has-feedback">
                                                    <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                                                    <input id="name" type="text" class="form-control" placeholder="First name" name="name" value="{{ old('name') }}"  autofocus>
                                                    @if ($errors->has('name'))
                                                        <span class="help-block">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                                    @endif
                                                    <div class="form-control-feedback">
                                                        <i class="icon-user-check text-muted"></i>
                                                    </div>
                                                    </div></div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group has-feedback">
                                                    <input type="text" name="secoundname" class="form-control" placeholder="Second name">
                                                    <div class="form-control-feedback">
                                                        <i class="icon-user-check text-muted"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group has-feedback">
                                                    <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                                                        <input id="password" type="password" class="form-control" name="password" placeholder="Create password" >
                                                        @if ($errors->has('password'))
                                                            <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                                        @endif
                                                    <div class="form-control-feedback">
                                                        <i class="icon-user-lock text-muted"></i>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group has-feedback">
                                                    <input id="password-confirm" type="password" class="form-control" name="password_confirmation"  placeholder="Repeat ">
                                                    <div class="form-control-feedback">
                                                        <i class="icon-user-lock text-muted"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group has-feedback">
                                                        <div class="form-group{{ $errors->has('phone') ? ' has-error' : '' }}">
                                                            <input id="phone" type="text" class="form-control" placeholder="Phone" name="phone" value="{{ old('phone') }}" required autofocus>
                                                            @if ($errors->has('phone'))
                                                                <span class="help-block">
                                                    <strong>{{ $errors->first('phone') }}</strong>
                                                </span>
                                                            @endif
                                                            <div class="form-control-feedback">
                                                                <i class="icon-user-check text-muted"></i>
                                                            </div>
                                                        </div></div>
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


                                        <div class="text-right">
                                             <button id="form-submit" type="submit" class="btn bg-teal-400 btn-labeled btn-labeled-right ml-10"><b><i class="icon-plus3"></i></b> Create account</button>
                                        </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <!-- /registration form -->


                    <!-- Footer -->
                    <!-- /footer -->

                </div>
                <!-- /content area -->

            </div>
            <!-- /main content -->

        </div>
        <!-- /page content -->

    </div>
</body>
<script>
    var imageId;
    function showLoading(){
        document.getElementById("loading").style = "visibility: visible";
    }
    function hideLoading(){
        document.getElementById("loading").style = "visibility: hidden";
    }
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#screenshot')
                    .attr('src', e.target.result)
                    .width(75)
                    .height(75);
            };

            reader.readAsDataURL(input.files[0]);
                var file_data = input.files[0];// Getting the properties of file from file field
                    $("#form-submit").prop('disabled', true);
                    showLoading();
                    var form_data = new FormData();                  // Creating object of FormData class
                    form_data.append("file", file_data)   ;
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
                        success: function(response) {
                            $("#form-submit").prop('disabled', false);
                            if(response.status==200){
                                $("#img_name").val(response.name);
                                hideLoading();
                                $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
                                    $("#success-alert").slideUp(500);
                                });
                            }else {
                                hideLoading();
                                $("#error-alert").fadeTo(2000, 500).slideUp(500, function(){
                                    $("#error-alert").slideUp(500);
                                    $("#pics").val(null);

                                });
                            }
                        },
                        error: function () {
                            hideLoading();
                            $("#error-alert").fadeTo(2000, 500).slideUp(500, function(){
                                $("#error-alert").slideUp(500);
                                $("#pics").val(null);
                            });
                        }

                    });

        }
    }
    $(document).ready(function () {
        Login.init();
    });
</script>

</html>
