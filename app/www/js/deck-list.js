angular.module('snapnote').controller('DeckListCtrl',
    function ($scope, SampleDecks) {
		
		$scope.decks = SampleDecks.getMyDecks();
      	
        $scope.photos = [
            "img/demoslides/book1.png",
            "img/demoslides/book2.png",
            "img/demoslides/whiteboard1.png",
            "img/demoslides/whiteboard2.png",
            "img/demoslides/screen1.png",
            "img/demoslides/screen2.png"
        ];
        
        $scope.capturePhoto = function() {
            
            alert("about to capture a photo");
            
              // Take picture using device camera and retrieve image as base64-encoded string
              navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
                destinationType: sn.phonegap.destinationType.DATA_URL });
        }
        
	});


    // Called when a photo is successfully retrieved
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);
        alert("success!");
      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }


    // Called if something bad happens.
    //
    function onFail(message) {
      alert('Failed because: ' + message);
    }
