'use strict';

/**
 * @ngdoc overview
 * @name hadaAdminApp
 * @description
 * # hadaAdminApp
 *
 * Main module of the application.
 */
angular
  .module('hadaAdminApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMaterial',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-momentjs'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'vm'
      })
      .when("/meals/:date", {
        templateUrl: 'views/create-day-menu.html',
        controller: 'DayMenuCtrl',
        controllerAs: 'vm'
      })
      .when("/dish", {
        templateUrl: 'views/create-dish.html',
        controller: 'CreateDishCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

