<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>OTFCoder</title>

    <!-- Global stylesheets -->
    {!! HTML::style('https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900') !!}
    {!! HTML::style('assets/css/icons/icomoon/styles.css') !!}
    {!! HTML::style('assets/css/bootstrap.css') !!}
    {!! HTML::style('assets/css/core.css') !!}
    {!! HTML::style('assets/css/components.css') !!}
    {!! HTML::style('assets/css/colors.css') !!}
    {!! HTML::style('assets/css/mystyle.css') !!}
    {!! HTML::script('assets/js/plugins/loaders/pace.min.js') !!}
    {!! HTML::script('assets/js/core/libraries/jquery.min.js') !!}
    {!! HTML::script('assets/js/core/libraries/bootstrap.min.js') !!}
    {!! HTML::script('assets/js/plugins/loaders/blockui.min.js') !!}

    {!! HTML::script('assets/js/plugins/forms/styling/uniform.min.js') !!}
    {!! HTML::script('assets/js/core/app.js') !!}
    {!! HTML::script('assets/js/pages/login.js') !!}
    {!! HTML::script('assets/js/plugins/forms/validation/validate.min.js') !!}
    {!! HTML::script('assets/js/login-validate.js') !!}

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

<div class="navbar-collapse collapse" id="navbar-mobile">
<ul class="nav navbar-nav navbar-right">
<li>
<a href="#">
<i class="icon-display4"></i> <span class="visible-xs-inline-block position-right"> Go to website</span>
</a>
</li>

<li>
<a href="#">
<i class="icon-user-tie"></i> <span class="visible-xs-inline-block position-right"> Contact admin</span>
</a>
</li>

<li class="dropdown">
<a class="dropdown-toggle" data-toggle="dropdown">
<i class="icon-cog3"></i>
<span class="visible-xs-inline-block position-right"> Options</span>
</a>
</li>
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
<div class="container">
<div class="row">
<div class="col-md-8 col-md-offset-2">
<div class="panel panel-default">
<div class="panel-heading">Reset Password</div>

<div class="panel-body">
@if (session('status'))
<div class="alert alert-success">
{{ session('status') }}
</div>
@endif
{!! Form::open(array('url'=>'userpassword/reset','id'=>'resetPassword','method'=>'POST', 'class' => 'form-horizontal')) !!}
<!-- <form class="form-horizontal" id="resetPassword" role="form" method="POST" action="{{ route('password.request') }}"> -->
{{ csrf_field() }}

<input type="hidden" name="token" value="{{ $token }}">

<div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
<label for="email" class="col-md-4 control-label">E-Mail Address</label>

<div class="col-md-6">
<input id="email" type="email" class="form-control" name="email" value="{{ $email or old('email') }}" required autofocus>

@if ($errors->has('email'))
<span class="help-block">
<strong>{{ $errors->first('email') }}</strong>
</span>
@endif
</div>
</div>

<div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
<label for="password" class="col-md-4 control-label">Password</label>

<div class="col-md-6">
<input id="password" type="password" class="form-control" name="password" required>

@if ($errors->has('password'))
<span class="help-block">
<strong>{{ $errors->first('password') }}</strong>
</span>
@endif
</div>
</div>

<div class="form-group{{ $errors->has('password_confirmation') ? ' has-error' : '' }}">
<label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>
<div class="col-md-6">
<input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>

@if ($errors->has('password_confirmation'))
<span class="help-block">
<strong>{{ $errors->first('password_confirmation') }}</strong>
</span>
@endif
</div>
</div>

<div class="form-group">
<div class="col-md-6 col-md-offset-4">
<button type="submit" class="btn btn-primary">
Reset Password
</button>
</div>
</div>
<!-- </form> -->
{!! Form::close() !!}
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>


</body>
<script>
    $(document).ready(function () {
        // Login.init();
         $("#resetPassword").validate({
            rules : {
                password : {
                    required : true,
                    minlength:5
                },
                password_confirmation : {
                    required: true,
                    minlength: 5,
                    equalTo: "#password"
                },
            },
            messages : {
                password : "Please enter a valid password",
                password_confirmation : "Please enter confirm password same as password",
            },
        });
    });
</script>
</html>