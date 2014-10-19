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
      'http://placard-wp.timesdev.tools/wp-json/:param1/:param2/:param3/:param4/:param5/:param6/:param7/'
    );
  }]);