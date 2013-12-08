angular.module('snapnote').controller('StudyCtrl',
    function ($scope, $routeParams, SampleDecks) {
        $scope.flipCount = 0;
		$scope.start = 0;
			
		$scope.deck = SampleDecks.getDeck({id: $routeParams.id});
		
		$scope.cardId = SampleDecks.getCardId($scope.deck.id);
      	  
		$scope.card = SampleDecks.getFront($scope.cardId);
		
		$scope.nextCard = function() {
		//alert($scope.deck.id);
		    $scope.cardId = SampleDecks.getNextCardId($scope.deck.id);
			//alert("cardid: "+$scope.cardId);
			$scope.card = SampleDecks.getFront($scope.cardId);
			$scope.flipCount = 0;
			$scope.start = 0;
		};
		
		$scope.flipCard = function(e) {
			if(e.x > (screen.width/2)*.75) {
				var img = document.getElementById('note');
				if($scope.flipCount%2==0) //src here will become the card's back
					$scope.card = SampleDecks.getBack($scope.cardId);
				else //src here will become the card's front
					$scope.card = SampleDecks.getFront($scope.cardId);
				$scope.flipCount++;
			}
		};
		
		$scope.start = function(e) {
			start = e.x;
		};
		
		$scope.end = function(e) {
			if(start - e.x > 0) {
				var img = e.srcElement;
				if(flipCount%2==0)
					$scope.card = SampleDecks.getFront($scope.cardId);
				else
					$scope.card = SampleDecks.getFront($scope.cardId);
				flipCount++;
			}
		};
	});