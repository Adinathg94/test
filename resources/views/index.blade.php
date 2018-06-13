@extends('layout.app')
@section('main')
    <div class="navbar navbar-inverse">
        <div class="navbar-header">
            <a class="navbar-brand" href="#"><img width="77%" src="{{asset('assets/images/logo.png')}}" alt=""></a>

            <ul class="nav navbar-nav visible-xs-block">
                <li><a data-toggle="collapse" data-target="#navbar-mobile"><i class="icon-tree5"></i></a></li>
                <li><a class="sidebar-mobile-main-toggle"><i class="icon-paragraph-justify3"></i></a></li>
            </ul>
        </div>

        <div class="navbar-collapse collapse" id="navbar-mobile">
            <ul class="nav navbar-nav">
                <li><a class="sidebar-control sidebar-main-toggle hidden-xs"><i class="icon-paragraph-justify3"></i></a></li>

            </ul>



            <div class="navbar-right">
                <ul class="nav navbar-nav">

                     <li class="dateli"> <p class="date"></p> </li>
                    <li class="dropdown dropdown-user">
                        <a class="dropdown-toggle" data-toggle="dropdown">
                             
                            <img src="{{asset('assets/images/placeholder.jpg')}}" alt="">
                            <span>{{Auth::user()->name}}</span>
                            <i class="caret"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-right">

                            <li><a href="{{url('/users/').'/'.Auth::user()->id}}"><i class="icon-user-plus"></i> My profile</a></li>

                            <!-- <li><a href="#"><i class="icon-coins"></i> My balance</a></li> -->
                            <!-- <li><a href="#"><span class="badge bg-blue pull-right">58</span> <i class="icon-comment-discussion"></i> Messages</a></li> -->
                            <li class="divider"></li>

                            <li><a href="{{url('/change_password')}}"><i class=" icon-lock"></i>Change Password</a></li>


                            <li>
                                <a href="{{ url('/logout') }}"
                                   onclick="event.preventDefault();
         document.getElementById('logout-form').submit();"><i class="icon-switch2"></i>
                                    Logout
                                </a>
                                <form id="logout-form"
                                      action="{{ url('/logout') }}"
                                      method="POST"
                                      style="display: none;">
                                    {{ csrf_field() }}
                                </form>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
@endsection
@section('contents')
    <!-- Page container -->
    <div class="page-container">

        <!-- Page content -->
        <div class="page-content">

            <!-- Main sidebar -->
            <div class="sidebar sidebar-main">
                <div class="sidebar-content">

                    <!-- User menu -->
                    <div class="sidebar-user">
                        <div class="category-content">
                            <div class="media">
                                <a href="#" class="media-left"><img src="{{asset('assets/images/placeholder.jpg')}}" class="img-circle img-sm" alt=""></a>
                                <div class="media-body">
                                    <span class="media-heading text-semibold">{{Auth::user()->name}}</span>
                                    <div class="text-size-mini text-muted">
                                        <i class=" icon-mail5 text-size-small"></i> &nbsp;{{Auth::user()->email}}
                                    </div>
                                </div>

                                <div class="media-right media-middle">
                                    <ul class="icons-list">
                                        <li>
                                            <a href="{{asset('/users')}}"><i class="icon-cog3"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /user menu -->


                    <!-- Main navigation -->
                    <div class="sidebar-category sidebar-category-visible">
                        <div class="category-content no-padding">
    <ul class="navigation navigation-main navigation-accordion">

        <!-- Main -->
        <li class="navigation-header"><span>Main</span> <i class="icon-menu" title="Main pages"></i></li>


         <li>
            <a href="#"><i class="icon-users4"></i> <span>User Management</span></a>
            <ul>
                  


                <li class="list add edit">
                    <a href={{asset('users')}}> Users  </a>
                </li>



            </ul>


        </li>

        <!-- /forms -->

     
       
        <!-- /page kits -->

    </ul>
                        </div>
                    </div>
                    <!-- /main navigation -->

                </div>
                <div class="footer text-muted text-center">
                        &copy; 2017. <a href="#">test</a> by <a href="http://test.com/">test</a>
                    </div>
            </div>
            {{-- End of nav--}}
    
                @yield('content')

        </div>

        </div>

    @endsection
@section('scripts')
    {!! HTML::script('/js/jspdf.js') !!}
    {!! HTML::script('/js/svg2pdf.js') !!}
    {!! HTML::script('/js/rgbcolor.js') !!}
    <script>
        $(document).ready(function () {
            // get current URL path and assign 'active' class
            var proto = window.location.protocol + "//";
            $('.hidden-ul > li > a[href="' + proto + window.location.host + window.location.pathname + '"]').parent().addClass('active').parent().show();


             setInterval('updateClock()', 1000);
        });
       function updateClock(){
            var currentdate = new Date(); 
            var datetime = "" + currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + (currentdate.getMinutes()<10?('0'+currentdate.getMinutes()):currentdate.getMinutes()) + ":" 
                + (currentdate.getSeconds()<10?('0'+currentdate.getSeconds()):currentdate.getSeconds());
            $('.date').html(datetime);
       }

    </script>
    @stack('script')
    @endsection