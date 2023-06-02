<nav class="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm {{isset($cp['fix'])? 'menu-fix' :''}} navbar-landing-page-v1">
    <div class="container container-landing-page-v1">
        <div id="navbarContent" class="collapse navbar-collapse ">
            <ul class="navbar-nav mr-auto">
                <!-- Level one dropdown -->
                @foreach($menus as $menu)
                    @if($menu['deleted'] != 1)
                    <li class="nav-item dropdown">
                        <a id="dropdownMenu1" href="{{$menu['slug']}}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link @if(!empty($menu['children'])) dropdown-toggle @endif">{{$menu['name']}}</a>
                        @if(!empty($menu['children']))
                        <ul aria-labelledby="dropdownMenu1" class="dropdown-menu border-0 shadow">
                            @foreach($menu['children'] as $child)
                                @if($child['deleted'] != 1)
                                    <li>
                                        <a href="{{$child['slug']}}" class="dropdown-item">{{$child['name']}}</a>
                                    </li>
                                @endif
                                    @if(!empty($child['children']) && $child['deleted'] != 1)
                                    <li class="dropdown-submenu">
                                        <a id="dropdownMenu2" href="{{$child['slug']}}" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-item dropdown-toggle">Hover for action</a>
                                        <ul aria-labelledby="dropdownMenu2" class="dropdown-menu border-0 shadow">
                                            @foreach($child['children'] as $item)
                                                @if($item['deleted'] != 1)
                                                    <li>
                                                        <a tabindex="-1" href="{{$item['slug']}}" class="dropdown-item">{{$item['name']}}</a>
                                                    </li>
                                                @endif
                                            @endforeach
                                        </ul>
                                    </li>
                                    <!-- End Level two -->
                                    @endif
                            @endforeach
                        </ul>
                        @endif
                    </li>
                    @endif
                @endforeach
                <!-- End Level one -->
            </ul>
        </div>
    </div>
</nav>
