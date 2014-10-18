'use strict';

/**
 * @ngdoc service
 * @name placardUiApp.wpAPIResource
 * @description
 * # wpAPIResource
 * Factory in the placardUiApp.
 */
angular.module('placardUiApp')
  .factory('wpAPIResource', ['$resource', function ($resource) {
    return $resource(
      'http://ec2-54-171-79-22.eu-west-1.compute.amazonaws.com/wp-json/:param1/:param2/:param3/:param4/:param5/:param6/:param7/'
    );
  }]);