
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
		Deck: function(_id,_name, _topCard,_cards) {
			this.id=_id;
			this.name=_name;
			this.topCard=_topCard;
			this.cards=_cards;
		},
		Note: function(_id,_front,_back) {
			this.id=_id;
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
sn.decks[sn.decks.length] = new sn.classes.Deck(1,"Dessert Facts",0,[1]);
sn.notes[sn.notes.length] = new sn.classes.Note(1,"img/wrong-slide2-blurred.jpg","img/wrong-slide2.JPG");

sn.decks[sn.decks.length] = new sn.classes.Deck(2,"Sesame Street Chars",0,[2,3,4]);
sn.notes[sn.notes.length] = new sn.classes.Note(2,"img/cookiemonster-blurred.png","img/cookiemonster.png");
sn.notes[sn.notes.length] = new sn.classes.Note(3,"img/elmo-blurred.png","img/elmo.png");
sn.notes[sn.notes.length] = new sn.classes.Note(4,"img/thecount-blurred.png","img/thecount.png");
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
			alert("couldn't find: "+deckIdObj.id);
			return null;
		},
		getCardId: function(deckId) {
			for(var i=0;i<sn.decks.length;i++) {
				if(sn.decks[i].id == deckId) {
					return sn.decks[i].cards[0];
				}
			}
		},
		getFront: function(cardId) {
			for(var i=0;i<sn.notes.length;i++) {
				if(sn.notes[i].id == cardId) {
					return sn.notes[i].front;
				}
			}
			return null;
		},
		getBack: function(cardId) {
			for(var i=0;i<sn.notes.length;i++) {
				if(sn.notes[i].id == cardId) {
					return sn.notes[i].back;
				}
			}
			return null;
		},
		getNextCardId: function(deckId) {
			var _deckId = 0;
			for(var i=0;i<sn.decks.length;i++) {
				if(sn.decks[i].id == deckId) {
					_deckId = i;
				}
			}
			var topCard = sn.decks[_deckId].topCard;
			if(topCard == (sn.decks[_deckId].cards.length - 1))
			{
				sn.decks[_deckId].topCard = 0;
			} else {
				sn.decks[_deckId].topCard++;
			}
			return sn.decks[_deckId].cards[sn.decks[_deckId].topCard];
		},
		add: function() {
            alert("add");
		}
	}
	
});