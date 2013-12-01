angular.module('snapnote').controller('DeckCtrl',
    function ($scope, $routeParams, SampleDecks) {
        	
		$scope.deck = SampleDecks.getDeck({id: $routeParams.id});
      	  
	});