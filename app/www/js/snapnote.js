
// global sn object to access outside of angular
var sn = {
	// view namespace for functions
	createnote: {
		clickCamera: function() {
			alert("clicked the camera");
		},
		clickBlur: function() {
			alert("this feature needs to be demoed on the desktop interface");
		}
	},
	
	classes: {
		Deck: function(_id,_name) {
			this.id=_id;
			this.name=_name;
		},
		Note: function(_id,_deckId,_front,_back) {
			this.id=_id;
			this.deckId=_deckId;
			this.front=_front;
			this.back=_back;
		}
	},
	
	// data objects containing "database" of decks and notes
	decks: [
	],
	notes: [
	]
};
// initialize data
sn.decks[sn.decks.length] = new sn.classes.Deck(1,"Test Deck");
sn.notes[sn.notes.length] = new sn.classes.Note(1,1,"img/blur_icon.png","img/logo.png");
sn.notes[sn.notes.length] = new sn.classes.Note(2,1,"img/blur_icon.png","img/logo.png");
	

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
	
	return {
		getMyDecks: function() {
			return sn.decks;
		},
		getDeck: function(deckIdObj) {
			for(i=0; i<sn.decks.length; i++) {
				if(sn.decks[i].id == deckIdObj.id) {
					return sn.decks[i];
				}
			}
			return null;
		},
		getNextCard: function(deckId) {
			/*var cards = decks[deckId].cards;
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
			}*/
			return sn.notes[0];
		}
	}
	
});