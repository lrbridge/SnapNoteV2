angular.module('snapnote').controller('DeckListCtrl',
    function ($scope, SampleDecks) {
		
		$scope.decks = SampleDecks.getMyDecks();
      	
        $scope.photos = [
            "img/demoslides/book1.png",
            "img/demoslides/book2.png",
            "img/demoslides/whiteboard1.png",
            "img/demoslides/whiteboard2.png"
        ];
        
	});