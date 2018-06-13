@extends('index')

@section('content')

    <div class="content-wrapper">

        <!-- Page header -->
        <div class="page-header page-header-default">
            <div class="page-header-content">
                <div class="page-title">
                    <h4>  <span class="text-semibold">Change</span> Password</h4>
                </div>


            </div>

            <div class="breadcrumb-line">
                <ul class="breadcrumb">
                    <li><a href="{{url('/home')}}"><i class="icon-home2 position-left"></i> Home</a></li>
                    <!-- <li><a href="{{url('/home')}}">Account Settings</a></li> -->
                    <li class="active">Change Password</li>
                </ul>


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
                    <h5 class="panel-title">Change Password</h5>
                   <!--  <div class="heading-elements">
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
                @if(session()->has('message'))
                    <div class="alert alert-success">
                        {{ session()->get('message') }}
                    </div>
                @endif
                @if (count($errors) > 0)
                    <div class="alert alert-danger">
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
                <form class="form-horizontal" id="changePassword" role="form" method="POST" action="{{ route('update_password') }}">
                    {{ csrf_field() }}


                    <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                        <label for="password" class="col-md-4 control-label">Old Password</label>

                        <div class="col-md-6">
                            <input id="oldpassword" type="password" class="form-control" name="oldpassword" required>

                            @if ($errors->has('oldpassword'))
                                <span class="help-block">
                                        <strong>{{ $errors->first('oldpassword') }}</strong>
                                    </span>
                            @endif
                        </div>
                    </div>
                    <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                        <label for="password" class="col-md-4 control-label">New Password</label>

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
                </form>



            </div></div></div>
    @endsection
@push('script')
<script>
    $(document).ready(function() {

        $("#changePassword").validate({
            rules : {
                password : {
                    required : true,
                    minlength:5
                },
                oldpassword:{
                    required:true,
                    minlength:5
                },
                password_confirmation : {
                    required: true,
                    minlength: 5,
                    equalTo: "#password"
                },
            },
            messages : {
                password_confirmation : {
                    equalTo: "Password does not match!"
                }
            },
        });
    });
</script>
@endpush