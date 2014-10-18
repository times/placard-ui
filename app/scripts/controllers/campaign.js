'use strict';

/**
 * @ngdoc function
 * @name placardUiApp.controller:CampaignCtrl
 * @description
 * # CampaignCtrl
 * Controller of the placardUiApp
 */
angular.module('placardUiApp')
  .controller('CampaignCtrl', function ($scope, wpAPIResource, $stateParams, $timeout) {
    $scope.transform = 'translateX(0)';
    $scope.offset = 0;
    $scope.move = 100;

    $scope.$watch('offset', function(val) {
    	$scope.transform = 'translateX(-' + val + '%)';
    	console.log($scope.transform);
    });

    $scope.nextColumn = function() {
    	if($scope.dragging == false) {
    		if($scope.maxOffset - $scope.offset > $scope.move) {
	    		$scope.offset += $scope.move;
	    	}
	    }
    };

    $scope.prevColumn = function() {
    	if($scope.dragging == false) {
    		if($scope.offset - $scope.move >= 0) {
	    		$scope.offset -= $scope.move;
	    	}
	    }
    };

    $scope.dragging = false;

    $scope.dragPrevColumn = function() {
    	if($scope.dragging == false) {
    		$scope.dragging = true;
    		if($scope.offset - $scope.move >= 0) {
	    		$scope.offset -= $scope.move;
	    	}

	    	$timeout(function(){
	    		$scope.dragging = false;
	    	}, 1000);
	    }
    };

    $scope.dragNextColumn = function() {
    	if($scope.dragging == false) {
    		$scope.dragging = true;
    		if($scope.maxOffset - $scope.offset > $scope.move) {
	    		$scope.offset += $scope.move;
	    	}

	    	$timeout(function(){
	    		$scope.dragging = false;
	    	}, 1000);
    	}
    };

    $scope.columnQuery = wpAPIResource.query({
    	param1: 'posts',
    	type: 'column',
    });

    $scope.$watch('columnQuery', function(value) {
    	value.$promise.then(function(data){
			$scope.columns = data;
			$scope.maxOffset = 95*$scope.columns.length;
			console.log($scope.columns);
		});
    });
  });
