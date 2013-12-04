angular.module('snapnote').controller('StudyCtrl',
    function ($scope, $routeParams, SampleDecks) {
        	
		$scope.deck = SampleDecks.getDeck({id: $routeParams.id});
		
		$scope.topCard = SampleDecks.getNextCard($scope.deck.id);
      	  
		$scope.nextCard = function() {
		    $scope.topCard = SampleDecks.getNextCard($scope.deck.id);
		};
	});