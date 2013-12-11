angular.module('snapnote').controller('ChooseImageCtrl',
    function ($scope) {
		$scope.tutorialCount = 0;
		
		// The user's photo library
		$scope.photos = [
            "img/demoslides/whiteboard1.png",
            "img/demoslides/whiteboard2.png",
            "img/demoslides/screen1.png"
        ];
		
		$scope.showTutorial = function() {
			if(sn.showCreateNoteTutorial == true) {
				$('#createNoteModal').modal('show');
			}
		};
		
		$scope.tutorialClose = function() {
			var checkbox = document.getElementById('createNoteTutorialCheck');
			if(checkbox.checked == true) {
				sn.showCreateNoteTutorial = false;
			}
			checkbox.checked = false;
		};
		
		$scope.nextCreateNoteTutorial = function() {
			var img = document.getElementById('createNoteTutorialImg');
			if($scope.tutorialCount == 0) {
				img.src = "img/create-tutorial-use-existing.png";
				$("h4.createNoteBodyLabel").text("Tap an existing image to use one previously captured as the base of a new note.");
			}
			else if($scope.tutorialCount == 1){
				img.src = "img/create-tutorial-options.png";
				$("h4.studyBodyLabel").text("Tap 'Options' to use the undo or redo commands.");
			}
			else if($scope.tutorialCount == 2){
				img.src = "img/create-tutorial-save.png";
				$("h4.studyBodyLabel").text("Tap 'Save' to save the new note.");
			}
			else if($scope.tutorialCount == 3){
				img.src = "img/create-tutorial-existing-deck.png";
				$("h4.studyBodyLabel").text("Use 'Select Existing Deck' to save the new note to an existing deck.");
			}
			else if($scope.tutorialCount == 4){
				img.src = "img/create-tutorial-existing-deck.png";
				$("h4.studyBodyLabel").text("Use 'Create New Deck' to save the new note to a new deck.");
			}
			else if($scope.tutorialCount == 5){
				img.src = "img/create-tutorial-add-another.png";
				$("h4.studyBodyLabel").text("Tap 'Yes' or 'No' to create another note for the current deck or return to the homescreen, respectively.");
				var nextBtn = document.getElementById('nextStudyTutorialBtn');
				nextBtn.innerHTML = 'Done';
			}
			else {
				$('#createNoteModal').modal('hide');
				$scope.tutorialCount = -1;
				$scope.tutorialClose();
			}
			$scope.tutorialCount++;
		};
      	  
	});