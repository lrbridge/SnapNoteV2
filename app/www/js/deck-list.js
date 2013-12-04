angular.module('snapnote').controller('DeckListCtrl',
    function ($scope, SampleDecks) {
        SampleDecks.loadMyDecks();
		
		$scope.decks = SampleDecks.getMyDecks();
      	
		$scope.edit = function() {
		};
	});