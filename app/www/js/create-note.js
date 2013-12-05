angular.module('snapnote')
    .controller('CreateNoteCtrl', function($scope, SampleDecks) {

        $scope.save = function() {
            SampleDecks.add();
        }
    });

function clickUndo() {
	alert("clicked undo");
}
function clickRedo() {
	alert("clicked redo.");
}
function clickBlur() {
	alert("clicked blur");
}
function clickCamera() {
	alert("clicked camera");
}