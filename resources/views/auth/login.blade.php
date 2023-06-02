<x-guest-layout>
    <div style="display: inline-block; position: absolute; left: 50%;top: 50%; transform: translate(-50%,-50%)">
        <x-jet-authentication-card>
            <x-slot name="logo" >
                <div style="width: 100px; display: inline-block;position: relative; left: 50%; transform: translateX(-50%)">
                    <x-jet-authentication-card-logo/>

                </div>
            </x-slot>

            <x-jet-validation-errors class="mb-4" />

            @if (session('status'))
                <div class="mb-4 font-medium text-sm text-green-600">
                    {{ session('status') }}
                </div>
            @endif

            <form method="POST" action="{{ route('login') }}">
                @csrf

                <div style="display: flex; justify-content: space-between; align-items: center">
                    <x-jet-label style="margin: 0" for="email" value="{{ __('Email') }}" />
                    <x-jet-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus />
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center" class="mt-4">
                    <x-jet-label style="margin: 0" for="password" value="{{ __('Password') }}" />
                    <x-jet-input id="password" class="block mt-1 w-full" type="password" name="password" required autocomplete="current-password" />
                </div>

                <div class="block mt-4 text-left">
                    <label for="remember_me" class="flex items-center">
                        <x-jet-checkbox id="remember_me" name="remember" />
                        <span class="ml-2 text-sm text-gray-600">{{ __('Remember me') }}</span>
                    </label>
                </div>

                <div class="flex items-center justify-end mt-4">
                    @if (Route::has('password.request'))
                        <a class="underline text-sm text-gray-600 hover:text-gray-900" href="{{ route('password.request') }}">
                            {{ __('Forgot your password?') }}
                        </a>
                    @endif

                    <x-jet-button class="ml-4"  style="background-color:rgb(104, 117, 245)">
                        {{ __('Log in') }}
                    </x-jet-button>
                </div>
            </form>
        </x-jet-authentication-card>
        <div id='tat_login' data-return-url='{{env('APP_URL')}}social-login/tat'></div>
        <script>var sso_data = sso_data || [];(function(d, i, dm){ sso_data['ssoId'] = i;sso_data['tatDomain'] = dm; var script = d.createElement('script');script.type = 'text/javascript';script.async=true;script.src = 'https://cdn.tatmart.com/js/addons/tat_single_sign_on/sso.js';d.getElementsByTagName('head')[0].appendChild(script);})(document, 'SSO-1', 'https://www.tatmart.com');</script>

    </div>
</x-guest-layout>
