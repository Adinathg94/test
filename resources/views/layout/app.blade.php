<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>test</title>

    <!-- Global stylesheets -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
    {!! HTML::style('assets/css/icons/icomoon/styles.css') !!}
    {!! HTML::style( 'assets/css/bootstrap.css') !!}
    {!!  HTML::style('assets/css/core.css') !!}
    {!!  HTML::style('assets/css/components.css')!!}
    {!!  HTML::style('assets/css/colors.css') !!}
    {!! HTML::style('assets/css/mystyle.css') !!}
{!! HTML::style('assets/css/icons/fontawesome/styles.min.css') !!}
{!! HTML::style('assets/plugins/calendar-master/zabuto_calendar.min.css') !!}


<!-- /global stylesheets -->


<!-- /theme JS files -->
@yield('style')
</head>

<body>

<!-- Main navbar -->
@yield('main')
<!-- /main navbar -->



                   @section('contents')
                       @show
<!-- Core JS files -->
{!! HTML::script('assets/js/plugins/loaders/pace.min.js') !!}
{!! HTML::script('assets/js/core/libraries/jquery.min.js') !!}
{!! HTML::script('assets/js/core/libraries/bootstrap.min.js') !!}
{!! HTML::script('assets/js/plugins/loaders/blockui.min.js') !!}
<!-- /core JS files -->

<!-- Theme JS files -->
{!! HTML::script('assets/js/plugins/forms/validation/validate.min.js') !!}
{!! HTML::script('assets/js/plugins/forms/selects/bootstrap_multiselect.js') !!}
{!! HTML::script('assets/js/plugins/forms/inputs/touchspin.min.js') !!}
{!! HTML::script('assets/js/plugins/forms/selects/select2.min.js') !!}
{!! HTML::script('assets/js/plugins/forms/styling/switch.min.js') !!}
{!! HTML::script('assets/js/plugins/forms/styling/switchery.min.js') !!}
{!! HTML::script('assets/js/plugins/forms/styling/uniform.min.js') !!}
{!! HTML::script('assets/js/core/app.js') !!}

{!! HTML::script('assets/plugins/calendar-master/zabuto_calendar.min.js') !!}
@yield('scripts')
</body>
</html>