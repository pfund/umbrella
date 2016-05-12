(function(){
    'use strict';

    angular
        .module('starterApp', ['ngRoute', 'ngMaterial', 'users'])
        .config(
            function ($routeProvider) {
                $routeProvider.when('/recherche', {
                    templateUrl: 'view-recherche/recherche.html'
                }).when('/admin', {
                    templateUrl: 'view-admin/admin.html'
                }).otherwise({
                redirectTo: '/recherche'
            });
        })
        .config(function ($mdThemingProvider, $mdIconProvider) {

            $mdIconProvider
                .defaultIconSet("./assets/svg/avatars.svg", 128)
                .icon("menu", "./assets/svg/menu.svg", 24)
                .icon("share", "./assets/svg/share.svg", 24)
                .icon("google_plus", "./assets/svg/google_plus.svg", 512)
                .icon("hangouts", "./assets/svg/hangouts.svg", 512)
                .icon("twitter", "./assets/svg/twitter.svg", 512)
                .icon("phone", "./assets/svg/phone.svg", 512)

                .icon("ambulance", "./assets/svg/assurances/ambulance.svg", 512)
                .icon("dommages", "./assets/svg/assurances/dommages.svg", 512)
                .icon("home", "./assets/svg/assurances/home.svg", 512)
                .icon("juridique", "./assets/svg/assurances/juridique.svg", 512)
                .icon("medical", "./assets/svg/assurances/medical.svg", 512)
                .icon("placement", "./assets/svg/assurances/placement.svg", 512)
                .icon("vie", "./assets/svg/assurances/vie.svg", 512)
                .icon("voiture", "./assets/svg/assurances/voiture.svg", 512)
                .icon("voyage", "./assets/svg/assurances/voyage.svg", 512)

                .icon("cover", "./assets/svg/assurances/cover.svg", 512)
                .icon("halfCover", "./assets/svg/assurances/halfCover.svg", 512)
                .icon("noCover", "./assets/svg/assurances/noCover.svg", 512)

                .icon("info", "./assets/svg/information.svg", 512)

                .icon("summary", "./assets/svg/summary.svg", 512)
                .icon("choose", "./assets/svg/choose.svg", 512)
                .icon("quiz", "./assets/svg/quiz.svg", 512)
                .icon("ok", "./assets/svg/ok.svg", 512)
                .icon("notok", "./assets/svg/notok.svg", 512)

            ;

            $mdThemingProvider.theme('default')
                .primaryPalette('grey')
                .accentPalette('red');

        })}) ();