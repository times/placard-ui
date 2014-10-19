'use strict';

/**
 * @ngdoc overview
 * @name placardUiApp
 * @description
 * # placardUiApp
 *
 * Main module of the application.
 */
angular
  .module('placardUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'hmTouchEvents',
    'cfp.hotkeys'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    
    // If no matching state found
    $urlRouterProvider.otherwise('/home');

    // Setup our states
    var home = {
      name: 'home',
      url: '/home',
      templateUrl: 'partials/home.html',
      controller: 'MainCtrl',
    };

    var campaign = {
      name: 'campaign',
      url: '/campaign/:id',
      templateUrl: 'partials/campaign.html',
      controller: 'CampaignCtrl',
    };

    // Do the states!
    $stateProvider
      .state(home)
      .state(campaign);
  });
