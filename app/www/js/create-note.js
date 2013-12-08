angular.module('snapnote')
    .controller('CreateNoteCtrl', function($scope, $rootScope, $routeParams, SampleDecks) {

        $scope.photo = $routeParams.photo;
        
        $scope.decks = SampleDecks.getMyDecks();

        $scope.save = function(deck) {
            console.log(deck);
            console.log($scope.photo);
            SampleDecks.add();
        }

    });