// global angular snapnote module object
var snapnote = angular.module("snapnote", ["ngRoute"]);
     
snapnote.config(function($routeProvider) {
	$routeProvider.when("/",
	{
	  templateUrl: "partials/deck-list.html",
	  controller: "DeckListCtrl"
	})
	.when("/create",
	{
		templateUrl: "partials/create-note.html",
		controller: "CreateNoteCtrl"
	})
	.when("/save",
	{
		templateUrl: "partials/save-note.html",
		controller: "SaveNoteCtrl"
	})
	.when('/:id/view', 
	{
		templateUrl: 'partials/deck.html', 
		controller: 'DeckCtrl'
	})
	.when('/:id/study', 
	{
		templateUrl: 'partials/study.html', 
		controller: 'StudyCtrl'
	});
    
});


snapnote.factory('SampleDecks', function() {
	var decks = [
         {"id": 0, "name": "Animal Colors", "topId": 0,
        	 "cards": [
	        	{ id: 0, front: "Frog", back: "Green" },
	        	{ id: 1, front: "Snake", back: "Yellow" },
	        	{ id: 2, front: "Tiger", back: "Orange" }                            
        	  ]
         },
         {"id": 1, "name": "Animal Sounds", "topId": 0,
        	 "cards": [
        	     { id: 0, front: "Dog", back: "Woof" },
        	     { id: 1, front: "Cat", back: "Meow" },
        	     { id: 2, front: "Bird", back: "Tweet" },
        	     { id: 3, front: "Mouse", back: "Squeak" },
        	     { id: 4, front: "Cow", back: "Moo" },
        	     { id: 5, front: "Fox", back: "Joff-tchoff-tchoffo-tchoffo-tchoff!" }                            
        	  ]
         },         
         {"id": 2, "name": "Math", "topId": 0, 
        	 "cards": [
        	     { id: 0, front: "2+2", back: "4" }                            
              ]
         },         
         {"id": 3, "name": "Chocolate", "topId": 0, 
        	 "cards": [
        	     { id: 0, front: "chocolate", back: "chips" }                            
              ]
         }
         
    ];

	
	return {
		getMyDecks: function() {
			return decks;
		},
		loadMyDecks: function() {
		},
		getDeck: function(deckIdObj) {
			for(i=0; i<decks.length; i++) {
				if(decks[i].id == deckIdObj.id) {
					return decks[i];
				}
			}
			return null;
		},
		getNextCard: function(deckId) {
			var cards = decks[deckId].cards;
			var cardId = decks[deckId].topId;
			cardId++;
			if(cardId >= cards.length) {
				cardId = 0;
			}
			decks[deckId].topId = cardId;
			for(i=0; i<cards.length; i++) {
				if(cards[i].id == cardId) {
					return cards[i];
				}
			}
			return null;
		}
	}
	
});