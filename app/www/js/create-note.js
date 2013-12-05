angular.module('snapnote')
    .controller('CreateNoteCtrl', function($scope, SampleDecks) {
        $scope.save = function() {
            SampleDecks.add();
        }

    });
