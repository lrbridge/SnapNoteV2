// global sn object to access outside of angular
var sn = {
	
	showCreateNoteTutorial: true,
	showDeckListTutorial: true,
	showStudyTutorial: true,
    
    lastAddedToDeckId: 1,

    // phonegap 
    phonegap: {
        pictureSource: {},
        destinationType: {},
        onDeviceReady: function() { // device APIs are available
            pictureSource = navigator.camera.PictureSourceType;
            destinationType = navigator.camera.DestinationType;
        }
    },
    
	// view namespace for functions
	createnote: {
		clickBlur: function() {
			alert("this feature needs to be demoed on the desktop interface");
		}
	},
	
	classes: {
		Deck: function(_id, _name, _topCard, _cards, _created, _deleted, _owned) {
			this.id=_id;
			this.name=_name;
			this.topCard=_topCard;
			this.cards=_cards;
			this.created=_created;
			this.deleted=_deleted;
			this.owned=_owned;
			this.reminders=[];
			this.remindersClass = function() {
				if (this.reminders.length > 0) return 'hasreminders';
				return '';
			}
		},
		Note: function(_id, _front, _back) {
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

// Create deck: Addition
sn.decks[sn.decks.length] = new sn.classes.Deck(1,"Addition",0,[1,2,3,4],false,false,true);
sn.notes[sn.notes.length] = new sn.classes.Note(1,"img/decks/addition/notecard-1-blur.png","img/decks/addition/notecard-1.png");
sn.notes[sn.notes.length] = new sn.classes.Note(2,"img/decks/addition/notecard-2-blur.png","img/decks/addition/notecard-2.png");
sn.notes[sn.notes.length] = new sn.classes.Note(3,"img/decks/addition/notecard-3-blur.png","img/decks/addition/notecard-3.png");
sn.notes[sn.notes.length] = new sn.classes.Note(4,"img/decks/addition/notecard-4-blur.png","img/decks/addition/notecard-4.png");

// Create deck: Subtraction
sn.decks[sn.decks.length] = new sn.classes.Deck(2,"Subtraction",0,[5,6,7,8],false,false,false);
sn.notes[sn.notes.length] = new sn.classes.Note(5,"img/decks/subtraction/notecard-1-blur.png","img/decks/subtraction/notecard-1.png");
sn.notes[sn.notes.length] = new sn.classes.Note(6,"img/decks/subtraction/notecard-2-blur.png","img/decks/subtraction/notecard-2.png");
sn.notes[sn.notes.length] = new sn.classes.Note(7,"img/decks/subtraction/notecard-3-blur.png","img/decks/subtraction/notecard-3.png");
sn.notes[sn.notes.length] = new sn.classes.Note(8,"img/decks/subtraction/notecard-4-blur.png","img/decks/subtraction/notecard-4.png");

// Create deck: Chemistry
sn.decks[sn.decks.length] = new sn.classes.Deck(3,"Chemistry",0,[9,10,11,12],false,false,false);
sn.notes[sn.notes.length] = new sn.classes.Note(9,"img/decks/chemistry/notecard-1-blur.png","img/decks/chemistry/notecard-1.png");
sn.notes[sn.notes.length] = new sn.classes.Note(10,"img/decks/chemistry/notecard-2-blur.png","img/decks/chemistry/notecard-2.png");
sn.notes[sn.notes.length] = new sn.classes.Note(11,"img/decks/chemistry/notecard-3-blur.png","img/decks/chemistry/notecard-3.png");
sn.notes[sn.notes.length] = new sn.classes.Note(12,"img/decks/chemistry/notecard-4-blur.png","img/decks/chemistry/notecard-4.png");

// Create deck: Geography
sn.decks[sn.decks.length] = new sn.classes.Deck(4,"Geography",0,[13,14,15,16],false,false,true);
sn.notes[sn.notes.length] = new sn.classes.Note(13,"img/decks/geography/notecard-1-blur.png","img/decks/geography/notecard-1.png");
sn.notes[sn.notes.length] = new sn.classes.Note(14,"img/decks/geography/notecard-2-blur.png","img/decks/geography/notecard-2.png");
sn.notes[sn.notes.length] = new sn.classes.Note(15,"img/decks/geography/notecard-3-blur.png","img/decks/geography/notecard-3.png");
sn.notes[sn.notes.length] = new sn.classes.Note(16,"img/decks/geography/notecard-4-blur.png","img/decks/geography/notecard-4.png");

// Create deck: My Dessert Facts
sn.decks[sn.decks.length] = new sn.classes.Deck(5,"My Dessert Facts",0,[17],false,false,false);
sn.notes[sn.notes.length] = new sn.classes.Note(17,"img/wrong-slide2-blurred.jpg","img/wrong-slide2.jpg");

// Create deck: Sesame Street
sn.decks[sn.decks.length] = new sn.classes.Deck(6,"Sesame Street",0,[18,19,20],false,false,false);
sn.notes[sn.notes.length] = new sn.classes.Note(18,"img/cookiemonster-blurred.png","img/cookiemonster.png");
sn.notes[sn.notes.length] = new sn.classes.Note(19,"img/elmo-blurred.png","img/elmo.png");
sn.notes[sn.notes.length] = new sn.classes.Note(20,"img/thecount-blurred.png","img/thecount.png");

// Create deck: UI Design
sn.decks[sn.decks.length] = new sn.classes.Deck(7,"UI Design",0,[21,22,23,24],true,false,true);
sn.notes[sn.notes.length] = new sn.classes.Note(21,"img/decks/uidesign/slide1-blurred.png","img/decks/uidesign/slide1.png");
sn.notes[sn.notes.length] = new sn.classes.Note(22,"img/decks/uidesign/slide2-blurred.png","img/decks/uidesign/slide2.png");
sn.notes[sn.notes.length] = new sn.classes.Note(23,"img/decks/uidesign/slide3-blurred.png","img/decks/uidesign/slide3.png");
sn.notes[sn.notes.length] = new sn.classes.Note(24,"img/decks/uidesign/slide4-blurred.png","img/decks/uidesign/slide4.png");
sn.decks[sn.decks.length - 1].reminders = [{day:'Monday', time:"12:45 PM"}];
// global angular snapnote module object
var snapnote = angular.module("snapnote", ["ngRoute"]);

snapnote.config(function($routeProvider) {
	$routeProvider.when("/",
	{
	  templateUrl: "partials/deck-list.html",
	  controller: "DeckListCtrl"
	})
	.when("/create/:photo*",
	{
		templateUrl: "partials/create-note.html",
		controller: "CreateNoteCtrl"
	})
	.when('/:id/study', 
	{
		templateUrl: 'partials/study.html', 
		controller: 'StudyCtrl'
	})
    .when('/chooseImage', 
	{
		templateUrl: 'partials/choose-image.html', 
		controller: 'ChooseImageCtrl'
	})
	.when("/camera",
	{
		templateUrl: 'partials/camera.html',
		controller: 'CameraCtrl'
	})
	.when("/:id/reminder",
	{
		templateUrl: 'partials/reminder.html',
		controller: 'ReminderSetup'
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
        getNextLiveDeckId: function() {
			for(i=0; i<sn.decks.length; i++) {
				if(sn.decks[i].owned && !sn.decks[i].deleteed) {
					return sn.decks[i].id;
				}
			}
			return 0;
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
		getPreviousCardId: function(deckId) {
			var _deckId = 0;
			for(var i=0;i<sn.decks.length;i++) {
				if(sn.decks[i].id == deckId) {
					_deckId = i;
				}
			}
			var topCard = sn.decks[_deckId].topCard;
			if(topCard == 0)
			{
				sn.decks[_deckId].topCard = sn.decks[_deckId].cards.length - 1;
			} else {
				sn.decks[_deckId].topCard--;
			}
			return sn.decks[_deckId].cards[sn.decks[_deckId].topCard];
		},
		addCard: function(deckId, front, back) {
			// Pick next value for card id
			var newCardId = sn.notes.length + 1;

			// Create a new note from card
			sn.notes[sn.notes.length] = new sn.classes.Note(newCardId,front,back);

			// Add new card to supplied deck id
			this.getDeck({id: deckId}).cards.push(newCardId);
            
            // set lastAddToDeck to this deckId so it comes up by default next time
            sn.lastAddedToDeckId = deckId;
		},
		addDeck: function(deckName) {
			// Create a new deck with specified name
            var newDeckId = sn.decks.length + 1;
			sn.decks.push(new sn.classes.Deck(newDeckId, deckName, 0, [], true, false, true));
            return newDeckId;
		}
	}
	
});

snapnote.filter("nonBlankFilter", function($filter) {
    return function(array, params) {
        if (params) {
            return $filter('filter')(array, params);
        } else {
            return [];
        }
    }
});

// Wait for device API libraries to load
document.addEventListener("deviceready", sn.phonegap.onDeviceReady, false);
