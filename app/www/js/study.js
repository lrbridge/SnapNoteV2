angular.module('snapnote').controller('StudyCtrl',
    function ($scope, $routeParams, SampleDecks) {
        var flipCount = 0;
		var start = 0;
			
		$scope.deck = SampleDecks.getDeck({id: $routeParams.id});
		
		$scope.topCard = SampleDecks.getNextCard($scope.deck.id);
      	  
		$scope.nextCard = function() {
		    $scope.topCard = SampleDecks.getNextCard($scope.deck.id);
		};
		
		$scope.flipCard = function(e) {
			if(e.x > 350) {
				var img = e.srcElement;
				if(flipCount%2==0) //src here will become the card's back
					img.src = "img/wrong-slide2.JPG";
				else //src here will become the card's front
					img.src = "img/wrong-slide2-blurred.jpg";
				flipCount++;
			}
		};
		
		$scope.start = function(e) {
			start = e.x;
		};
		
		$scope.end = function(e) {
			if(start - e.x > 0) {
				var img = e.srcElement;
				if(flipCount%2==0)
					img.src = "img/wrong-slide2.JPG";
				else
					img.src = "img/wrong-slide2-blurred.jpg";
				flipCount++;
			}
		};
	});