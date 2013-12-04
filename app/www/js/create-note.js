angular.module('snapnote')
    .controller('CreateNoteCtrl', function($scope) {
        $scope.model = {
            message: "This is my app!!!";
        };

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