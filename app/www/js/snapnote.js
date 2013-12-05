
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
            return sn.notes[0];
            
        },
        add: function() {
            alert("add");
		}
	}
	
});