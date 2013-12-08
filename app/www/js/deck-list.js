angular.module('snapnote').controller('DeckListCtrl',
    function ($scope, SampleDecks) {
		
		$scope.decks = SampleDecks.getMyDecks();
      	$scope.photos = [];
        
        // Do an ajax call to get all the files in the demoslides directory
        // this runs each time the deck-list page is loaded
        var dir = "img/demoslides";
        var fileextension = ".png";
        $.ajax({
            url: dir,
            success: function (data) {
                $(data).find("a:contains(" + fileextension + ")").each(function () {
                    var filename = this.href.replace(window.location.host, "").replace("http:///", "");
                    $scope.photos.push(dir+"/"+filename);
                });
                $scope.$apply();
            }
        });
        
	});