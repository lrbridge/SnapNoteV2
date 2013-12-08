angular.module('snapnote').controller('DeckListCtrl',
    function ($scope, SampleDecks) {

		// Get the deck list view's elements
		var $view = $('div#deck-list-view'),
			$searchBox = $view.find('input#deck-search'),
			$searchBackBtn = $view.find('button#deck-search-back'),
			$searchResults = $view.find('div#search-results'),
			$mainContent = $view.find('div#main-content'),
			$downloadModal = $('#download-progress-modal'),
			$progressBar = $downloadModal.find('.progress-bar');

		// Create flag to track when user is performing a search. 
		var inSearchMode = false;

		// Get sample decks
		$scope.decks = SampleDecks.getMyDecks();

		// Setup search box behavior
		$searchBox.focus(function() {
			if(!inSearchMode) {
				// set flag
				inSearchMode = true;
				// float deck-list and newnote button downwards
			    $mainContent.css('top', $view.height());
			    // shrink search box width to show the back button
			    var newWidth = $searchBox.width() - $searchBackBtn.outerWidth();
			    $searchBox.css('width', newWidth);
			}
		});

		// Setup search back button behavior
		$searchBackBtn.click(function() {
			if(inSearchMode) {
				// unset flag
				inSearchMode = false;
				// clear the search box
		    	$searchBox.val('');
			    // hide the search results
			    $searchResults.css('display', 'none');
				// float deck-list and newnote button upwards
			    $mainContent.css('top', '');
			    // expand search box width to hide the back button
			    $searchBox.css('width','');
			}	
		});

		// Make search results visible after the main content has finished its 'float downward' animation
		$mainContent.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
			if(inSearchMode) {
			    $searchResults.css('display', 'block');
			}
		});

		/**
		 * Downloads the specified deck of notecards.
		 */
		$scope.download = function(deck) {
			// % download complete
		    var progress = 0;
		    
		    // set title of modal
		    $downloadModal.find('#title').html('Downloading Deck...');

		    // set deck name shown in modal
		    $downloadModal.find('#deck-name').html(deck.name);

			// make progress bar visible
			$progressBar.parent().show();

		    // show the modal
		    $downloadModal.modal('toggle');
		    
		    // start the download animation
		    setTimeout(updateDownloadProgress, 1000);

		    /**
		     * Updates the download progress bar.
		     */
		   	function updateDownloadProgress() {
		        if(progress < 100) {
		        	// update progress in steps of 25
		            progress += 25;
		            $progressBar.css('width', progress + '%');

		            // continue the animation
		            setTimeout(updateDownloadProgress, 800);
		        } else {
		        	// deck is now owned by user
		        	deck.owned = true;
		        	
		        	// force angular to update the search results
		    		$scope.$apply();

					// hide the progress bar
					$progressBar.parent().hide();

		        	/// change title of modal
		        	$downloadModal.find('#title').html('Download Complete');

		        	// hide the modal after 1.5s
		            setTimeout(function() {
		            	$downloadModal.modal('hide');
		            	$progressBar.css('width', '0%');
		            }, 1500);
		        }
		    }
		}; // end of $scope.download

	});
