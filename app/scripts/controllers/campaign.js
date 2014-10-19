'use strict';

/**
 * @ngdoc function
 * @name placardUiApp.controller:CampaignCtrl
 * @description
 * # CampaignCtrl
 * Controller of the placardUiApp
 */
angular.module('placardUiApp')
  .controller('CampaignCtrl', function ($scope, wpAPIResource, $stateParams, $timeout, $filter, hotkeys) {
    /**
    * Setup some vars to deal with the transform
    */
    $scope.transform = 'translateX(0)';
    $scope.offset = 0;
    $scope.move = 100;
    $scope.dragging = false;
    $scope.columnCount = 1;

    hotkeys.add({
        combo: 'right',
        description: 'Next!',
        callback: function() {
          $scope.nextColumn();
        }
    });

    hotkeys.add({
        combo: 'left',
        description: 'Previous!',
        callback: function() {
          $scope.prevColumn();
        }
    });

    // Change the value of transform 
    $scope.$watch('offset', function(val) {
    	$scope.transform = 'translateX(-' + val + '%)';
    });

    // Skip to the next column
    $scope.nextColumn = function() {
    	if($scope.dragging === false) {
    		if($scope.maxOffset - $scope.offset > $scope.move) {
	    		$scope.offset += $scope.move;
                ++$scope.columnCount;
	    	}
	    }
    };

    // Skip to the previous column
    $scope.prevColumn = function() {
    	if($scope.dragging === false) {
    		if($scope.offset - $scope.move >= 0) {
	    		$scope.offset -= $scope.move;
                --$scope.columnCount;
	    	}
	    }
    };

    // Skip to previous column on drag (as sometimes a swipe isn't always detected perfectly)
    $scope.dragPrevColumn = function() {
    	if($scope.dragging === false) {
    		$scope.dragging = true;
    		if($scope.offset - $scope.move >= 0) {
	    		$scope.offset -= $scope.move;
                --$scope.columnCount;
	    	}

	    	$timeout(function(){
	    		$scope.dragging = false;
	    	}, 1000);
	    }
    };

    // Skip to next column on drag (as sometimes a swipe isn't always detected perfectly
    $scope.dragNextColumn = function() {
    	if($scope.dragging === false) {
    		$scope.dragging = true;
    		if($scope.maxOffset - $scope.offset > $scope.move) {
	    		$scope.offset += $scope.move;
                ++$scope.columnCount;
	    	}

	    	$timeout(function(){
	    		$scope.dragging = false;
	    	}, 1000);
    	}
    };

    // Get the columns
    $scope.columnQuery = wpAPIResource.query({
    	param1: 'posts',
    	type: 'column',
    }).$promise.then(function(data){
        $scope.columns = data;
        $scope.maxOffset = 95*$scope.columns.length;
        $scope.totalColumns = data.length;

        $scope.$watch('columnCount', function(data) {
            $scope.width = $filter('number')((data/$scope.totalColumns)*100, 2) + '%';
        });
    });
  });
