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

    $scope.columns = [];
    $scope.campaignQuery = wpAPIResource.get({
    	param1: 'posts',
    	param2: $stateParams.id,
    }).$promise.then(function(data){
    	if(data.type === 'campaign') {
    		$scope.campaign = data;
    		console.log($scope.campaign);
    		angular.forEach($scope.campaign.acf.columns, function(column, key) {
    			$scope.columnQuery = wpAPIResource.get({
    				param1: 'posts',
    				param2: column.ID,
    			}).$promise.then(function(d){
    				if(d.type === 'column') {
    					$scope.columns.push(d);
    				} else {
    					console.log('Found column attached that wasn\'t of type column');
    				}
    			});
    		});
    		console.log($scope.columns);
    	} else {
    		console.log('No campaign found!');
    	}
    });
  });
