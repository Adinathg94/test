@extends('index')

@section('content')
    <div class="content-wrapper">

        <!-- Page header -->
        <div class="page-header page-header-default">
            <div class="page-header-content">
                <div class="page-title">
                    <h4>  <span class="text-semibold">Details of</span> - Users</h4>
                </div>

            </div>

        
            <div class="breadcrumb-line">
                <ul class="breadcrumb">
                    <li><a href="{{url('/home')}}"><i class="icon-home2 position-left"></i> Home</a></li>
                    <li><a href="{{url('users/list')}}">User Management</a></li>
                    <li><a href="{{url('users/list')}}">Users</a></li>
                </ul>

               
            </div>
        </div>
        <!-- /page header -->


        <!-- Content area -->
        <div class="content">

            <!-- Info alert -->

            <!-- /info alert -->


            <!-- Sidebars overview -->
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <h5 class="panel-title">Users</h5>
                 <!--    <div class="heading-elements">
                        <ul class="icons-list">
                            <li><a data-action="collapse"></a></li>
                            <li><a data-action="reload"></a></li>
                            <li><a data-action="close"></a></li>
                        </ul>
                    </div> -->
                </div>
<div class="col-md-8">
                <div class="panel-body">
                    You can create and edit users from below

                </div></div>
<div class="col-md-4">



                <div align="right"><a href="{{asset('users/create')}}" class="btn button_color"><i class="icon-add"></i> Add User</a></div>




</div>

			<div class="row">
							<div class="col-md-12">
                                 @if(session()->has('message'))
                                    <div class="alert alert-success">
                                        {{ session()->get('message') }}
                                    </div>
                                @endif
								@foreach($errors->all() as $error)
								<div class="errorHandler alert alert-danger">
									<i class="icon-remove-sign"></i> {!!$error!!}
								</div>
								@endforeach
							</div>
			</div>
            <div id="msg" class=""></div>
        <table class="table datatable-basic" id="users-table">
            <thead>
            <tr>
                <th>Sl No</th>
                 <th>Email</th>
                <th>Actions</th>
            </tr>
            </thead>
        </table>
            </div></div></div>

@stop

@push('script')
        {!! HTML::script('/assets/js/plugins/tables/datatables/datatables.min.js') !!}
<script>
    $('.errorHandler').delay(3200).fadeOut(300);
    var table;
    $(document).ready(function(){
        table =  $('#users-table').DataTable( {
            autoWidth: false,
            searching: true,
            dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
            language: {
                search: '<span>Filter:</span> _INPUT_',
                lengthMenu: '<span>Show:</span> _MENU_',
                paginate: {'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;'}
            },
            ajax: "{{asset('users/data')}}",
            columns: [
                { data: "id"},
                { data: "email"},
                // { data: "sitename"},
                {
                    data: null,render: function ( data, type, row ) {
                    if (data.status == 1) {

                        var editurl = "{{asset('users/')}}/"+data.id+"/edit";
                        var editfield = '<a id="edit" href="'+editurl+'" class="editor_edit btn btn-sm btn-teal"><i class=" glyphicon glyphicon-edit"></i></a>';


                        var deletefield = '<button class="editor_remove btn btn-sm btn-danger" data-id=' + data.id + '><i class="icon-close2 icon-white"></i></button>';

                         return editfield + ' ' + deletefield;

                    }

                   
                }
                }

            ],
            "order" : [[1, 'asc']]
        });
        table.on('order.dt', function() {
            table.column(0, {
                order : 'applied'
            }).nodes().each(function(cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();

        $('#users-table').on('click', 'button.editor_remove', function (e) {
            var id = $(this).attr('data-id');
            console.log(id);
            var result = confirm("Are you sure you want to delete?");
            if (result) {
                $.ajax({


                    type:'DELETE',
                    url:"{{asset('users/')}}/"+id,
                    dataType:'json',
                    success: function(data) {
                        console.log(data);
                        table.ajax.reload();
                        if(data ==1){
                            var message = "User deleted successfully";
                            $('#msg').show();
                            $('#msg').removeClass().addClass('alert alert-success').html(message);
                        }else if (data ==0){
                            var message = "You can't delete yourself";
                            $('#msg').show();
                            $('#msg').removeClass().addClass('alert alert-danger').html(message);
                        }

                        $('html,body').animate({
                                    scrollTop: $(".page-header").offset().top},
                                500);
                        $('#msg').delay(3200).fadeOut(300);
                    }

                })
            }
        });
    });

</script>
@endpush