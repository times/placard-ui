'use strict';

describe('Controller: ColumnCtrl', function () {

  // load the controller's module
  beforeEach(module('placardUiApp'));

  var ColumnCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ColumnCtrl = $controller('ColumnCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
