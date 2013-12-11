angular.module('snapnote').controller('ReminderSetup',
    function ($scope, $routeParams, SampleDecks) {
        $scope.toggleclass = function(id) {
        	console.log('#'+id);//$(''))
        	$('#'+id).toggleClass('active');
            console.log($('#'+id).class);
        }
    });