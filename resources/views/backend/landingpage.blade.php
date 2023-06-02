<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Laravel</title>
    <link rel="stylesheet" type="text/css" href="/css/app.css?v=1.12">
    <link href="/bootstrap/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.5.0/min/dropzone.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.5.0/dropzone.js"></script>
    <script src="/js/libs/jquery.js"></script>
    <script src="/js/libs/jquery-ui.min.js"></script>
    <script src="/js/libs/bootstrap.min.js"></script>
    <script src="/js/libs/jquery.nestable.js "></script>
    <script src="/js/libs/select2.js "></script>
{{--    <link href="css/vendor/font/css/datepicker.css" rel="stylesheet" type="text/css">--}}

    <!-- import components -->
    <script src="/js/backend/components/content.js?v=1.13"></script>
    <script src="/js/backend/components/product.js?v=1.21"></script>
    <script src="/js/backend/components/banner.js?v=1.13"></script>
    <script src="/js/backend/components/menu.js?v=1.13"></script>
    <!-- call code general form component -->
    <script src="/js/backend/components/index.js?v=1.12"></script>
    <script src="{{ asset('node_modules/tinymce/tinymce.min.js') }}"></script>
    <script>
        tinyMCE.init({
            selector: 'textarea.tinymce',
            body_class: "wysiwyg-content",
            extended_valid_elements: "i[*],span[*],div[*],a[*],script[language|type|src]",
            remove_script_host: false,
            // toolbar: undefined,
            theme: "modern",
            statusbar: true,
            force_p_newlines: true,
            strict_loading_mode: true,
            convert_urls: false,
            plugins: [
                'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
                'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                'save table contextmenu directionality emoticons template paste textcolor'
            ],
            // content_css: 'css/content.css',
            toolbar: 'undo redo | styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons | fullscreen code'
        })
    </script>
    <script>var obj = []</script>
</head>
{{--<button type="button" class="btn btn-warning make-landingpage">--}}
{{--    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">--}}
{{--        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>--}}
{{--        <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>--}}
{{--    </svg>--}}
{{--</button>--}}
<div class="import-loading" style="display:none;">
    <img src="{{ url('/image/tenor.gif') }}">
</div>
<div class="landingpage-header">
    <div class="btn-control-navbar">
        <button type="button" href="" target="_blank" class="btn btn-control">
            <i class="fa fa-bars"></i>
        </button>
    </div>
    <div class="btn-action buttonAction">
        <a href="{{url('/review-landingpage')}}/{{$landingpage['slug']}}" target="_blank" class="btn btn-info">
            <i class="fas fa-eye"></i>
        </a>

        <button type="button" onclick="saveTemplate()" class="btn btn-success ">
            <i class="fa fa-floppy-o" aria-hidden="true"></i>
        </button>

        <a href="{{url('/')}}" class="btn btn-danger">
            <i class="fa fa-times" aria-hidden="true"></i>
        </a>
    </div>
</div>
<input type="hidden" name="landingpageid" id="LandingPageId" value="{{ app('request')->input('id')}}">
<input type="hidden"  id="use-for-page" value="{{$landingpage['use_for_page']}}">
<input type="hidden"  id="url_cscart" value="{{env('URL_CSCART')}}">
<input type="hidden" id="authorization_v2" value="{{config('constants.authorization_v2')}}">
<input type="hidden" id="authorization_v1" value="{{config('constants.authorization_v1')}}">
<input type="hidden" id="authorization_mrtho" value="{{config('constants.authorization_mrtho')}}">
<input type="hidden"  id="url_tatmart" value="{{env('URL_TATMART')}}">
<input type="hidden" id="url-insert" url="{{url('insertComponent')}}" />

<div style="display: flex; position: relative; width: 100%">
    <div class="navbar-landingpage" align="center" style="left: 0">
        <div class="logo" style="margin-top: 0; padding: 0">
            <div class="logo-large"><img src="https://cdn.tatmart.com/design/themes/responsive/media/images/TATMart_Logo_Small.svg" class="logo-img-large"></div>
            <div class="logo-small d-none"><img src="https://cdn.tatmart.com/images/fav.png" class="logo-img-small"></div>
        </div>
        @yield('contents',View::make('backend.components.contents'))
        @yield('products',View::make('backend.components.products'))
        @yield('banners',View::make('backend.components.banners'))
        @yield('menu',View::make('backend.components.menu'))
        {{--    @yield('tab',View::make('backend.components.tab'))--}}
        {{--    @yield('grids',View::make('backend.components.grids'))--}}

    </div>
    <div class="main_contain" style="width: 100%">
        <div class="canvas">
        @foreach($listComponent as $component)
                <div class="child item-{{$component['type']}}">
                    @if($component['type'] == "content")
                        @include('backend.commons.contents', ['id' => $component['position'],'description'=>$component['description']])
                    @elseif($component['type'] == "menu")
                        @include('backend.commons.menu', ['id' => $component['position'],'menu'=>$component['data'][0]])
                        <script>
                            $('#nestable').nestable({
                                maxDepth: 3
                            }).on('change', saveMenuBlock);
                        </script>
                    @elseif($component['type'] == "product")
                        @include('backend.commons.products', ['id' => $component['position']])
                    @elseif($component['type'] == "banner")
                        @include('backend.commons.banners', ['id' => $component['position']])
                    @endif
                </div>
            @endforeach
        </div>


    </div>
</div>
<button onclick="toTopFunction()"  class="button-to-top" id="button-to-top" title="Go to top"><i class="fa fa-angle-up"></i></button>

<script>

    window.onscroll = function() {scrollFunction()};

    toTopBtn = document.getElementById("button-to-top")
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            toTopBtn.style.display = "block";
        } else {
            toTopBtn.style.display = "none";
        }
    }
    function toTopFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    $('.btn-control-navbar').click((e) => {
        $(e.target).closest('.btn-control-navbar').toggleClass('btn-control-navbar-click');
        $('.logo-large').toggleClass('d-none',);
        $('.logo-small').toggleClass('d-block');
        $('.navbar-landingpage').toggleClass('navbar-landingpage-small');
        if($('.menu-item-span').is(':visible') == true) {
            $('.menu-item-span').toggleClass('d-none',10);
        }
        else {
            $('.menu-item-span').toggleClass('d-none',100);
        }
        $('.canvas').toggleClass('mgl-5');
    })

</script>
<style>
    .product-import-file {
        margin-left: 30px;
    }
    .dropzone-custom {
        min-height: 35px;
        padding: unset;
        background-color: #007bff;
        border-color: #007bff;
        color: #fff;
        padding: 5px;
    }
    .dropzone-custom .dz-message {
        text-align: unset;
        margin: unset;
    }
    .product-remove-all {
        margin-left: 30px;
    }

    .product-remove-all .content {
        height: 35px;
        padding: 8px;
        border: 1px solid #DC3545;
        color: #DC3545;
    }

    div.import-loading img {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: darkred;
        z-index: 999999;
        width: 5%;
    }
    div.import-loading{
        position: relative;
    }
    div.import-loading::before {
        content:"";
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background-color: black;
        opacity: 0.3;
        top: 0;
        left: 0;

    }
</style>

</html>
