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
		
		$scope.previousCard = function() {
		//alert($scope.deck.id);
		    $scope.cardId = SampleDecks.getPreviousCardId($scope.deck.id);
			//alert("cardid: "+$scope.cardId);
			$scope.card = SampleDecks.getFront($scope.cardId);
			$scope.flipCount = 0;
			$scope.start = 0;
		};
		
		$scope.flipCard = function(e) {
		var note = document.getElementById('note');
		var noteRect = note.getBoundingClientRect();
		var nextNote = document.getElementById('nextNote');
		var nextRect = nextNote.getBoundingClientRect();
			if(e.x > noteRect.right*.75 && e.y < nextRect.top) {
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
		
		$scope.deleteDeck = function() {
			var confirmation = confirm("Are you sure you want to delete this deck?");
			if( confirmation ) {
				$scope.deck.deleted = true;
				location.href = "#";
			}
		};
		
		$scope.addReminder = function() {
		};
	});