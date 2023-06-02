<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="robots" content="noindex, nofollow" />
    <title>Tatmart.com</title>
    <link rel="stylesheet" type="text/css" href="/css/app.css">
    <link rel="stylesheet" type="text/css" href="/css/product.css">
    <link href="/bootstrap/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <script src="/js/libs/jquery.js"></script>
    <script src="/js/libs/jquery-ui.min.js"></script>
    <script src="/js/libs/bootstrap.min.js"></script>
    <script src="/js/frontend/index.js"></script>
    <script src="/js/libs/jquery.lazy.min.js"></script>

</head>
<body class="body-landing-page">
    <main class="bd-masthead main-landing-page" id="content" role="main">
        <div class="wrap-nav">

        </div>
        <div class="container-landing-page-v1">
            @foreach ($listComponent as $cp)
                @if ($cp['type'] == "menu")
                    {{--                menu handing--}}
                    @include('frontend.components.menu', ['menus' => $cp['data'][0]])

                @elseif($cp['type'] == "content")
                    {{--                content handing--}}
                    @include('frontend.components.content', ['description' => $cp['description']])
                @elseif($cp['type'] == "banner")
                    {{--                banner handing--}}
                    @include('frontend.components.banner', ['banners' => $cp['data']])
                @elseif($cp['type'] == "product")
                    {{--                product handing--}}
                    @include('frontend.components.product', ['cp' => $cp])
                @endif
            @endforeach
        </div>
    </main>
    <script>
        if (window.location !== window.parent.location) {

            var height;
            const sendPostMessage = () => {
                if (height !== document.getElementById('content').offsetHeight) {
                    height = document.getElementById('content').offsetHeight;
                    window.parent.postMessage({
                        frameHeight: height
                    }, '*');
                }
            }
            window.onload = () => sendPostMessage();
            window.onresize = () => sendPostMessage();

        }
    </script>
</body>
</html>
