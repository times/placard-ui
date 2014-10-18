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
    $scope.id = $stateParams.id;

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

    $scope.columns = [
    	{
    		cards: [
		    	{
		    		icon: 'fa fa-file-o',
		    		header: 'Title Card 1',
		    		stand: 'Stand!',
		    		body: '<p>This is my body text in <strong>HTML</strong> form!</p>',
		    		footer: 'My footer!'
		    	},
		    	{
		    		icon: 'fa fa-video-camera',
		    		header: 'Title Card 2',
		    		stand: 'Stand!',
		    		body: '<ul><li>Check</li><li>out</li><li>my</li><li>list</li></ul>',
		    		footer: null,
		    	},
		    	{
		    		icon: 'fa fa-quote-right',
		    		header: 'Title Card 3',
		    		stand: 'Stand!',
		    		body: 'Test!',
		    		footer: ''
		    	}
		    ],
		    title: 'Col 1!',
		},
		{
    		cards: [
		    	{
		    		icon: 'fa fa-file-o',
		    		header: 'Title Card 1',
		    		stand: 'Stand!',
		    		body: '<p>This is my body text in <strong>HTML</strong> form!</p>',
		    		footer: 'My footer!'
		    	},
		    	{
		    		icon: 'fa fa-video-camera',
		    		header: 'Title Card 2',
		    		stand: 'Stand!',
		    		body: '<ul><li>Check</li><li>out</li><li>my</li><li>list</li></ul>',
		    		footer: null,
		    	},
		    	{
		    		icon: 'fa fa-quote-right',
		    		header: 'Title Card 3',
		    		stand: 'Stand!',
		    		body: 'Test!',
		    		footer: ''
		    	}
		    ],
		    title: 'Col 2!',
		},
		{
    		cards: [
		    	{
		    		icon: 'fa fa-file-o',
		    		header: 'Title Card 1',
		    		stand: 'Stand!',
		    		body: '<p>This is my body text in <strong>HTML</strong> form!</p>',
		    		footer: 'My footer!'
		    	},
		    	{
		    		icon: 'fa fa-video-camera',
		    		header: 'Title Card 2',
		    		stand: 'Stand!',
		    		body: '<ul><li>Check</li><li>out</li><li>my</li><li>list</li></ul>',
		    		footer: null,
		    	},
		    	{
		    		icon: 'fa fa-quote-right',
		    		header: 'Title Card 3',
		    		stand: 'Stand!',
		    		body: 'Test!',
		    		footer: ''
		    	}
		    ],
		    title: 'Col 3!',
		},
		{
    		cards: [
		    	{
		    		icon: 'fa fa-file-o',
		    		header: 'Title Card 1',
		    		stand: 'Stand!',
		    		body: '<p>This is my body text in <strong>HTML</strong> form!</p>',
		    		footer: 'My footer!'
		    	},
		    	{
		    		icon: 'fa fa-video-camera',
		    		header: 'Title Card 2',
		    		stand: 'Stand!',
		    		body: '<ul><li>Check</li><li>out</li><li>my</li><li>list</li></ul>',
		    		footer: null,
		    	},
		    	{
		    		icon: 'fa fa-quote-right',
		    		header: 'Title Card 3',
		    		stand: 'Stand!',
		    		body: 'Test!',
		    		footer: ''
		    	}
		    ],
		    title: 'Col 4!',
		},
    ];

    $scope.maxOffset = 95*$scope.columns.length;

    $scope.cards = $scope.columns[$stateParams.colid];
  });
