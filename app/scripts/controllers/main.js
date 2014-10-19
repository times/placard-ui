'use strict';

/**
 * @ngdoc function
 * @name placardUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the placardUiApp
 */
angular.module('placardUiApp')
  .controller('MainCtrl', function ($scope, wpAPIResource) {
    $scope.campaigns = wpAPIResource.query({
    	param1: 'posts',
    	type: 'campaign',
    });
  });
