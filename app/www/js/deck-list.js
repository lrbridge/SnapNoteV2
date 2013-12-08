angular.module('snapnote').controller('DeckListCtrl',
    function ($scope, SampleDecks) {
		
		$scope.decks = SampleDecks.getMyDecks();
      	$scope.photos = ["img/demoslides/whiteboard1.png"];
        
        // Do an ajax call to get all the files in the demoslides directory
        // this runs each time the deck-list page is loaded
        /*var dir = "img/demoslides";
        var fileextension = ".png";
        alert("before ajax");
        $.ajax({
            url: dir,
            success: function (data) {
                $(data).find("a:contains(" + fileextension + ")").each(function () {
                    var filename = this.href.replace(window.location.host, "").replace("http:///", "");
                    alert(dir+"/"+filename);
                    $scope.photos.push(dir+"/"+filename);
                });
                alert("apply");
                $scope.$apply();
            },
            error: function(x) {
                alert(x);   
            }
        });*/
        
	});