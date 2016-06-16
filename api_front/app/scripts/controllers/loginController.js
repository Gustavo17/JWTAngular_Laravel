'use strict';

angular.module('apiFrontApp')
    .controller('LoginCtrl', function(authUser){
        var vm = this;
        vm.loginForm = {
            email: 'kevin.c@myapi.com',
            password: '123456789'
        };
        
        vm.login = function () {
            authUser.loginApi(vm.loginForm);
        }

        vm.loginGooglePlus = function(){
            authUser.loginGooglePlus();
        }
    });