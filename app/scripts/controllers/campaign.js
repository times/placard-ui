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
    $scope.columns = [];
    $scope.totalColumns = 0;
    $scope.campaignQuery = wpAPIResource.get({
        param1: 'posts',
        param2: $stateParams.id
    }).$promise.then(function(data) {
        $scope.campaign = data;
        angular.forEach($scope.campaign.acf.columns, function(value, key) {
            wpAPIResource.get({
                param1: 'posts',
                param2: value.ID,
            }).$promise.then(function(data){
                ++$scope.totalColumns;

                var currentColumns = $scope.columns;
                var newColumns = currentColumns.concat(data);
                $scope.columns = newColumns;

                $scope.width = $filter('number')((1/$scope.totalColumns)*100, 2) + '%';
            });
        });
    }); 

    // Get the intro columns
    $scope.introColumns = [];
    $scope.campaignQuery = wpAPIResource.get({
        param1: 'posts',
        param2: $stateParams.id
    }).$promise.then(function(data) {
        $scope.campaign = data;
        angular.forEach($scope.campaign.acf.introduction_columns, function(value, key) {
            wpAPIResource.get({
                param1: 'posts',
                param2: value.ID,
            }).$promise.then(function(data){
                ++$scope.totalColumns;

                var currentIntroColumns = $scope.introColumns;
                var newIntroColumns = currentIntroColumns.concat(data);
                $scope.introColumns = newIntroColumns;

                $scope.width = $filter('number')((1/$scope.totalColumns)*100, 2) + '%';
            });
        });
    }); 

    $scope.$watch('columnCount', function(data) {
        $scope.width = $filter('number')((data/$scope.totalColumns)*100, 2) + '%';
    });

    $scope.$watch('totalColumns', function(data) {
        $scope.maxOffset = $scope.move*$scope.totalColumns;
    });
  });
