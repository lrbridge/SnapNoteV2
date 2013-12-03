
function Deck(new_id, new_name, new_topId) {
	this.id = new_id;
	this.name = new_name;
	this.topId = new_topId;
	this.cards = [];
}


function Note(_id,_deckId,_imgFullPath,_front,_back) {
	this.id=_id;
	this.deckId=_deckId;
	this.imgFullPath=_imgFullPath;
	this.front=_front;
	this.back=_back;
}

// global snapnote object
//
// NOTE - use this to contain plugin related functions
var sn = {

	database: {
		// handle for database object
		handle: false,
		
		// boolean to detect whether
		wasEmpty: false,
		
		// object to hold latest decks from database
		decks: [],
		
		_decks: [],
		
		// function to initialize database
		openDatabase: function() {
			var db = window.openDatabase("Database", "1.0", "Snapnote Database", 2 * 1024 * 1024/* 2MB */);
			
			// create the tables
			db.transaction(function(tx) {
				tx.executeSql('CREATE TABLE IF NOT EXISTS DECKS (id unique, name, topId)');
				tx.executeSql('CREATE TABLE IF NOT EXISTS NOTES (id unique, deckId, imgFullPath, text, front, back)');
				
				tx.executeSql('SELECT * FROM DECKS', [], function (tx, results) {
				  var len = results.rows.length;
				  if(len == 0) {
					sn.database.wasEmpty = true;
				  }
				});
				//alert("wasEmpty: "+sn.database.wasEmpty);
				// initialize database contents if no DECKS are present
				if(sn.database.wasEmpty) {
					tx.executeSql('INSERT INTO DECKS (id, name, topId) VALUES (1, "Test Deck", 0)');
					tx.executeSql('INSERT INTO NOTES (id, deckId, imgFullPath, text, front, back) VALUES (1, 1, "", "back text", "2+2","4")');
				}
				
				
				tx.executeSql('SELECT * FROM DECKS', [], function (tx, results) {
				  var len = results.rows.length;
				  sn.database._decks = [];
				  for (i = 0; i < len; i++) {
					//alert("name,topId: "+results.rows.item(i).name+", "+results.rows.item(i).topId);
					sn.database._decks[sn.database._decks.length] = new Deck(results.rows.item(i).id, results.rows.item(i).name, results.rows.item(i).topId);
				  }
				});
				
			},sn.database.transactionErrorCallback, sn.database.openDatabaseSuccessCallback);
		},
		
		openDatabaseSuccessCallback: function() {
			sn.database.decks = sn.database._decks;
			alert("opendatabase success");
		},
		
		// Transaction error callback
		transactionErrorCallback: function(tx, err) {
			alert("Error processing SQL: "+err);
		},

		// Transaction success callback
		transactionSuccessCallback: function() {
			alert("success!");
		}
	}
};

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
	/*
	var decks = [];
	var newdecks = [
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
         }
         
    ];*/

	
	return {
		getMyDecks: function() {
			return sn.database.decks;
		},
		loadMyDecks: function() {
			var deviceIsReady = true;
			if(deviceIsReady) {
				sn.database.openDatabase();
			} else {
				alert("DEVICE IS NOT READY - CAN'T LOAD DB");
			}
		},
		getDeck: function(deckIdObj) {
			for(i=0; i<sn.database.decks.length; i++) {
				if(sn.database.decks[i].id == deckIdObj.id) {
					return sn.database.decks[i];
				}
			}
			return null;
		},
		getNextCard: function(deckId) {
			var cards = sn.database.decks[deckId].cards;
			var cardId = sn.database.decks[deckId].topId;
			cardId++;
			if(cardId >= cards.length) {
				cardId = 0;
			}
			sn.database.decks[deckId].topId = cardId;
			for(i=0; i<cards.length; i++) {
				if(cards[i].id == cardId) {
					return cards[i];
				}
			}
			return null;
		}
	}
	
});