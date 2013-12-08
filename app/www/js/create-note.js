angular.module('snapnote')
    .controller('CreateNoteCtrl', function($scope, $rootScope, $routeParams, SampleDecks) {

        $scope.photo = $routeParams.photo;
        
        $scope.decks = SampleDecks.getMyDecks();

        $scope.deck = $scope.decks[0].id;

        $scope.capturePhoto = function() {
            
            alert("about to capture a photo");
            
              // Take picture using device camera and retrieve image as base64-encoded string
              navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
                destinationType: sn.phonegap.destinationType.DATA_URL });
        }

        $scope.save = function(deckId) {
            SampleDecks.add(deckId, $scope.photo);
        }

        $scope.create = function(newDeckName) {
            SampleDecks.create(newDeckName);

            // Refresh decks (I think there should be a less hacky way to do this)
            $scope.decks = SampleDecks.getMyDecks();

            // Set selected deck to new deck
            $scope.deck = $scope.decks[$scope.decks.length - 1].id;
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
