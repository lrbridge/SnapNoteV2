angular.module('snapnote').controller('DeckListCtrl',
    function ($scope, SampleDecks) {
		
		$scope.decks = SampleDecks.getMyDecks();
      	
		$scope.edit = function() {
		};
	});