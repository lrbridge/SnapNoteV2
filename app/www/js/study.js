angular.module('snapnote').controller('StudyCtrl',
    function ($scope, $routeParams, SampleDecks) {
        $scope.flipCount = 0;
		$scope.tutorialCount = 0;
		
		$scope.deck = SampleDecks.getDeck({id: $routeParams.id});
		
		$scope.cardId = SampleDecks.getCardId($scope.deck.id);
      	  
		$scope.card = SampleDecks.getFront($scope.cardId);
		
		$scope.nextCard = function() {
		//alert($scope.deck.id);
		    $scope.cardId = SampleDecks.getNextCardId($scope.deck.id);
			//alert("cardid: "+$scope.cardId);
			$scope.card = SampleDecks.getFront($scope.cardId);
			$scope.flipCount = 0;
		};
		
		$scope.previousCard = function() {
		//alert($scope.deck.id);
		    $scope.cardId = SampleDecks.getPreviousCardId($scope.deck.id);
			//alert("cardid: "+$scope.cardId);
			$scope.card = SampleDecks.getFront($scope.cardId);
			$scope.flipCount = 0;
		};
		
		$scope.flipCard = function(e) {
		var note = document.getElementById('note');
		var noteRect = note.getBoundingClientRect();
		var nextNote = document.getElementById('nextNote');
		var nextRect = nextNote.getBoundingClientRect();
			if(e.y < nextRect.top) {
				var img = document.getElementById('note');
				if($scope.flipCount%2==0) //src here will become the card's back
					$scope.card = SampleDecks.getBack($scope.cardId);
				else //src here will become the card's front
					$scope.card = SampleDecks.getFront($scope.cardId);
				$scope.flipCount++;
			}
		};
		
		$scope.deleteDeck = function() {
			var confirmation = confirm("Are you sure you want to delete this deck?");
			if( confirmation ) {
				$scope.deck.deleted = true;
                sn.lastAddedToDeckId = SampleDecks.getNextLiveDeckId();
				location.href = "#";
			}
		};
		
		$scope.addReminder = function() {
		};
		
		$scope.showOptions = function() {
			$('#optionsModal').modal('show');
		};
		
		$scope.showTutorial = function() {
			if(sn.showStudyTutorial == true) {
				$('#studyModal').modal('show');
			}
		};
		
		$scope.tutorialClose = function() {
			var checkbox = document.getElementById('studyTutorialCheck');
			if(checkbox.checked == true) {
				sn.showStudyTutorial = false;
			}
			checkbox.checked = false;
		};
		
		$scope.nextStudyTutorial = function() {
			var img = document.getElementById('studyTutorialImg');
			if($scope.tutorialCount == 0) {
				img.src = "img/study-tutorial-move.png";
				$("h4.studyBodyLabel").text("Tap 'Previous Note' or 'Next Note' to advance to the previous or next note, respectively.");
			}
			else if($scope.tutorialCount == 1){
				img.src = "img/study-tutorial-options.png";
				$("h4.studyBodyLabel").text("Tap 'Options' to add a reminder for this deck or to delete this deck.");
				var nextBtn = document.getElementById('nextStudyTutorialBtn');
				nextBtn.innerHTML = 'Done';
			}
			else {
				$('#studyModal').modal('hide');
				$scope.tutorialCount = -1;
				$scope.tutorialClose();
			}
			$scope.tutorialCount++;
		};
	});