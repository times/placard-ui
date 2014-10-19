'use strict';

describe('Directive: hidescroll', function () {

  // load the directive's module
  beforeEach(module('placardUiApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<hidescroll></hidescroll>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the hidescroll directive');
  }));
});
