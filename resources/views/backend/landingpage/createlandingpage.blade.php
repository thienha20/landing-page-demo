<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Landing Page - Dashboard</title>

    <!-- Custom fonts for this template-->
{{--    <link href="/css/admin.css" rel="stylesheet">--}}
    <link href="css/admin.css" rel="stylesheet">
    <link href="/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="/bootstrap/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="/bootstrap/css/bootstrap-datetimepicker-standalone.css" rel="stylesheet" type="text/css">
    <link href="/bootstrap/css/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css">
    <!-- Custom styles for this template-->
    <script src="/js/libs/jquery.js"></script>
    <script src="/js/libs/jquery-ui.min.js"></script>
    <script src="/js/libs/moment.min.js"></script>
    <script src="/bootstrap/js/bootstrap.min.js"></script>
    <script src="/js/libs/bootstrap-datetimepicker.min.js"></script>
    <script src="/js/backend/createlandingpage.js "></script>

</head>

<body class="bg-gradient-primary">

<div class="container">

    <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row" style="padding: 60px 20px">
                <div class="offset-lg-2 col-lg-8 col-md-12">
                    @if(isset($dataLp->_id))
                        <div class="p-5">
                            <div class="text-center">
                                <h1 class="h4 text-gray-900 mb-4">Chỉnh sửa landing page</h1>
                            </div>
                            <form class="form-menu user" id="createLandingPage" method="POST" action="{{ url('insertlandingpage') }}">
                                {{ csrf_field()}}
                                <input type="hidden" id="gotolayout" name="gotolayout" value="0">
                                <div class="w-100">
                                    <div class="form-group  ">
                                        <div class="row">
                                            <div class="col-md-2">
                                                <label for="addInputName">Tên landing page</label>
                                            </div>
                                            <div class="col-md-10">
                                                <input type="text" class="form-control " name="name" id="nameEditLandingPage" value="{{$dataLp->name}}" placeholder="Tên landing page" required>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group ">
                                        <div class="row">
                                            <div class="col-md-2">
                                                <label for="addInputSlug">Slug</label>
                                            </div>
                                            <div class="col-md-10">
                                                <input type="text" class="form-control "  name="slug" readonly value="{{$dataLp->slug}}" id="slugLandingPage" placeholder="Đường dẫn landing page" required>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-2">
                                                <label for="">Thời gian bắt đầu</label>
                                            </div>
                                            <div class='col-md-6'>
                                                <div class="form-group">
                                                    <div class='input-group date' id='start-time'>
                                                        <input type='text' name="start_time" value="{{$dataLp->start_time}}" required class="form-control" />
                                                        <span class="input-group-addon">
                                                <span class="glyphicon glyphicon-calendar"></span>
                                                </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-2">
                                                <label for="">THời gian kết thúc</label>
                                            </div>
                                            <div class='col-md-6'>
                                                <div class="form-group">
                                                    <div class='input-group date' id='end-time'>
                                                        <input type='text' name="end_time" value="{{$dataLp->end_time}}" required class="form-control" />
                                                        <span class="input-group-addon">
                                                <span class="glyphicon glyphicon-calendar"></span>
                                                </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group ">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <label for="addInputSlug">Được dùng cho website</label>
                                                </div>
                                                <div class='col-md-6'>
                                                    <div class="form-group">
                                                        <select class="form-control " name = "use_for_page" id="useforpage">
                                                            <option value="tatmartv1"  @if($dataLp->use_for_page == 'tatmartv1') selected @endif>Tatmartv1</option>
                                                            <option value="tatmartv2" @if($dataLp->use_for_page == 'tatmartv2') selected @endif>Tatmartv2</option>
                                                            <option value="mrtho" @if($dataLp->use_for_page == 'mrtho') selected @endif>Mr.Tho</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group ">
                                        <div class="row">
                                            <div class="col-md-2" style="margin-top: 7px;">
                                                <label class="active-landingpage">Hoạt động</label>
                                            </div>
                                            <div class='col-md-6'>
                                                <div class="form-group">
                                                    <input style="width: 40px; height: 30px;" type="checkbox" name="status" value="1" {{$dataLp->status == 1?'checked':''}}>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>&nbsp
                                        <input type="hidden" name="landingPageId" value="{{$dataLp->_id}}">
                                    </div>
                                    <div class="form-group">
                                        <div class='col-md-6'>
                                            <button type="submit" class="btn btn-info button-add-menu create-landingpage-bt" >Lưu và trở về danh sách landing page</button>
                                        </div>
                                        <div class='col-md-6'>
                                            <button type="submit" onclick="$('#gotolayout').val(1)" class="btn btn-info button-add-menu create-landingpage-bt" >Lưu và tời giao diện chỉnh sửa</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    @else
                    <div class="p-5">
                        <div class="text-center">
                            <h1 class="h4 text-gray-900 mb-4">Tạo mới landing page</h1>
                        </div>
                        <form class="form-menu user" id="createLandingPage" method="POST" action="{{ url('insertlandingpage') }}">
                            {{ csrf_field()}}
                            <div class="w-100">
                                <div class="form-group  ">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="addInputName">Tên landing page</label>
                                        </div>
                                        <div class="col-md-10">
                                            <input type="text" class="form-control " name="name" id="nameLandingPage" placeholder="Tên landing page" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group ">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="addInputSlug">Slug</label>
                                        </div>
                                        <div class="col-md-10">
                                            <input type="text" class="form-control " name = "slug" id="slugLandingPage" placeholder="Đường dẫn landing page" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="">Thời gian bắt đầu</label>
                                        </div>
                                        <div class='col-md-6'>
                                            <div class="form-group">
                                                <div class='input-group date' id='start-time'>
                                                    <input type='text' name="start_time" required class="form-control" />
                                                    <span class="input-group-addon">
                                                <span class="glyphicon glyphicon-calendar"></span>
                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="">Thời gian kết thúc</label>
                                        </div>
                                        <div class='col-md-6'>
                                            <div class="form-group">
                                                <div class='input-group date' id='end-time'>
                                                    <input type='text' name="end_time" required class="form-control" />
                                                    <span class="input-group-addon">
                                                <span class="glyphicon glyphicon-calendar"></span>
                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group ">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-2">
                                                <label for="addInputSlug">Dùng cho website</label>
                                            </div>
                                            <div class='col-md-6'>
                                                <div class="form-group">
                                                    <select class="form-control " name = "use_for_page" id="useforpage">
                                                        <option value="tatmartv1">Tatmartv1</option>
                                                        <option value="tatmartv2">Tatmartv2</option>
                                                        <option value="mrtho">Mr.Tho</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group ">
                                    <div class="row">
                                        <div class="col-md-2" style="margin-top: 7px;">
                                            <label class="active-landingpage">Hoạt động</label>
                                        </div>
                                        <div class='col-md-6'>
                                            <div class="form-group">
                                                <input style="width: 40px; height: 30px;" type="checkbox" name="status" value=1 checked>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>&nbsp;</div>
                                <input type="hidden" id="gotolayout" name="gotolayout" value="0">
                                <div class="form-group">

                                    <div class='col-md-6'>
                                        <button type="submit" class="btn btn-info button-add-menu create-landingpage-bt" >Tạo mới và trở về danh sách landing page</button>
                                    </div>
                                    <div class='col-md-6'>
                                        <input type="hidden" name="gotolayout" value="1">
                                        <button type="submit" onclick="$('#gotolayout').val(1)" class="btn btn-info button-add-menu create-landingpage-bt" >Tạo mới và tới giao diện chi tiết</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    @endif
                </div>
            </div>
        </div>
    </div>

</div>
<script src="js/backend/libs/sb-admin-2.min.js"></script>
<script type="text/javascript">
    $(function () {
        if (window.jQuery().datetimepicker) {
            $('#start-time, #end-time').datetimepicker({
                format: 'YYYY-MM-DD HH:mm:ss',
                icons: {
                    time: 'fa fa-clock',
                    date: 'fa fa-calendar',
                    up: 'fa fa-chevron-up',
                    down: 'fa fa-chevron-down',
                    previous: 'fa fa-chevron-left',
                    next: 'fa fa-chevron-right',
                    today: 'fa fa-check',
                    clear: 'fa fa-trash',
                    close: 'fa fa-times'
                },

            });
        }
    });
</script>
</body>

</html>
