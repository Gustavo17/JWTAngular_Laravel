'use strict';

/**
 * @ngdoc overview
 * @name apiFrontApp
 * @description
 * # apiFrontApp
 *
 * Main module of the application.
 */
angular
    .module('apiFrontApp', [
        'authService',
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'satellizer',
        'toastr',
        'googleplus',
        'ngFacebook'
    ])
    .config(function ($routeProvider, $authProvider, $facebookProvider, GooglePlusProvider) {
        $authProvider.loginUrl = 'http://api.jwtaut.dev/auth_login';
        $facebookProvider.setAppId('583425428484059');
        $facebookProvider.setPermissions('email, public_profile');

        GooglePlusProvider.init({
            clientId: '215416903727-hs875ho3d9o5vff2ooq6qrivcgf1h29i.apps.googleusercontent.com',
            apiKey: 'v_XKyTRNup7Y2ORrQo5iLVeX',
            scopes: ['email', 'profile']
        });

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function ($rootScope, $location, authUser, toastr) {
        var rutasPrivadas = ['/', '/about'];

        $rootScope.$on('$routeChangeStart', function () {
            if (($.inArray($location.path(), rutasPrivadas) !== -1) && !authUser.isLoggedIn()) {
                toastr.error('Debe iniciar sesión para poder continuar.', 'Mensaje');
                $location.path('/login');
            }
        });
    });
