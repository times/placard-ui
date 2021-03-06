'use strict';

/**
 * @ngdoc directive
 * @name placardUiApp.directive:hidescroll
 * @description
 * # hidescroll
 */
angular.module('placardUiApp')
  .directive('hidescroll', ['$timeout', function ($timeout){
    return {
      templateUrl: 'partials/hidescroll.html',
      restrict: 'E',
      link: function postLink(scope, element) {
        var previousScroll = 0;
        var currentColumn;
        angular.element('.zoom-button i').bind('click', function(){
          angular.element('body').toggleClass('zoom-out');
          angular.element('.bs-column').scrollTop(0);

          if (angular.element('body').hasClass('zoom-out')) {
            angular.element('.bs-card').bind('click.zoom', function(){
              angular.element('body').removeClass('zoom-out');
              scope.columnCount = this.parent().parent().parent().index() + 1;
              this.parent().parent().parent().scrollTop(this.offset().top);
            });
          } else {
            angular.element('.bs-card').unbind('click.zoom');
          }
        });
        $timeout(function(){
          scope.$watch('columnCount', function(){
            angular.element(currentColumn).unbind('scroll');
            currentColumn = angular.element('.bs-column')[scope.columnCount - 1];
            angular.element(currentColumn).bind('scroll', function(){
              var currentScroll = this.scrollTop;
              if (currentScroll < previousScroll) {
                element.addClass('visible');
              } else {
                element.removeClass('visible');
              }
              previousScroll = currentScroll;
            });
          });
        }, 500);
      }
    };
  }]);
