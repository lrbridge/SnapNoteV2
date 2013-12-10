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
				$("h4.createNoteBodyLabel").text("Tap an existing image to use it in the new note.");
				var nextBtn = document.getElementById('createNoteTutorialBtn');
				nextBtn.innerHTML = 'Done';
			}
			/*else if($scope.tutorialCount == 1){
				img.src = "img/study-tutorial-options.png";
				$("h4.studyBodyLabel").text("Tap 'Options' to add a reminder for this deck or to delete this deck.");
				var nextBtn = document.getElementById('nextStudyTutorialBtn');
				nextBtn.innerHTML = 'Done';
			}*/
			else {
				$('#createNoteModal').modal('hide');
				$scope.tutorialCount = -1;
				$scope.tutorialClose();
			}
			$scope.tutorialCount++;
		};
      	  
	});