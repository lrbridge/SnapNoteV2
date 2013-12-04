angular.module('snapnote')
    .controller('SaveNoteCtrl', function($scope) {
        $scope.model = {
            message: "This is my app!!!";
        };
		
		$scope.decks = SampleDecks.getMyDecks();

    });