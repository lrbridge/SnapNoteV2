angular.module('snapnote')
    .controller('CreateNoteCtrl', function($scope, $rootScope, $routeParams, SampleDecks) {
        $scope.decks = SampleDecks.getMyDecks();
        $scope.deck = SampleDecks.getDeck({
            id: sn.lastAddedToDeckId
        });

        $scope.cardId = SampleDecks.getCardId($scope.deck.id);
        $scope.card = SampleDecks.getFront($scope.cardId);
        $scope.height = "440px";
        $scope.width = "340px";

        $scope.photo = $routeParams.photo;
        
        // chooseDeckModal options
        $scope.options = [
            {"value": "true", "label": "Select Existing Deck"},
            {"value": "false", "label": "Create New Deck"}
        ];
        $scope.existing = "true";
        
        // not valid if new deck & input field empty
        $scope.isNotValid = function(inputFull) {
            return ($scope.existing == "false") && !inputFull; 
        }
        
        $scope.createCard = function() {
            
            var deckId = $scope.deck.id;
            
            if($scope.existing == "false") {
                deckId = SampleDecks.addDeck($scope.newDeckName);  
            }
            
            var back = $scope.photo;
            var front = back.replace(".png","-blurred.png");
            SampleDecks.addCard(deckId, front, back);   
        };

        $scope.clickUndo = function() {
        	if (undoables.length == 0)
        		return;

        	ctx.clearRect(0, 0, blur.width, blur.height);
			ctx.shadowColor = "black"
            ctx.shadowBlur = 40;
            ctx.fillStyle = "rgba(0,0,0,.1)";
        	redoables.push(undoables.pop());
        	for (var s = 0; s < undoables.length; s++) {
        		var stroke = undoables[s]
        		for (var i = 0; i < stroke.length; i++) {
        			var clearX = stroke[i].x;
        			var clearY = stroke[i].y;
        			var clearHeight = stroke[i].height;
        			var clearWidth = stroke[i].width;
        			ctx.fillRect(clearX, clearY, clearHeight, clearWidth);
        		}
        	}
        };

        $scope.clickRedo = function() {
        	if (redoables.length == 0)
        		return;

        	ctx.shadowColor = "black"
            ctx.shadowBlur = 40;
            ctx.fillStyle = "rgba(0,0,0,.1)";
        	stroke = redoables.pop();
        	for (var i = 0; i < stroke.length; i++) {
        		var fillX = stroke[i].x;
        		var fillY = stroke[i].y;
        		var fillHeight = stroke[i].height;
        		var fillWidth = stroke[i].width;
        		ctx.fillRect(fillX, fillY, fillHeight, fillWidth);
        	}
        	undoables.push(stroke);
        };
        
        // All blurring logic below here
        
        var blur = document.getElementById("blur"),
            ctx = blur.getContext("2d"),
            blurring = false,
            lastX = 0,
            lastY = 0,
            lastTouchX = new Array,
            lastTouchY = new Array,
            lineThickness = 1,
            undoables = [],
            redoables = [];

        $('#hideBtn').click(function() {
            $('#hider').toggle();
        });

        $('#clearBtn').click(function() {
            ctx.clearRect(0, 0, $scope.height, $scope.width);
        });

        console.log("width ", blur.offsetWidth);
        console.log("height ", blur.offsetHeight);

        var ongoingTouches = new Array;

        var handleStart = function(evt) {
            evt.preventDefault();
            log("touchstart.");
            var touches = evt.changedTouches;
            ctx.shadowColor = "black"
            ctx.shadowBlur = 40;
            ctx.fillStyle = "rgba(0,0,0,.1)";
            undoables.push(new Array)
            for (var i = 0; i < touches.length; i++) {
                ongoingTouches.push(copyTouch(touches[i]));
                lastTouchX.push(touches[i].pageX - this.offsetParent.offsetLeft);
                lastTouchY.push(touches[i].pageY - this.offsetParent.offsetTop);
            }
        };

        var handleMove = function(evt) {
            evt.preventDefault();
            var el = document.getElementsByTagName("canvas")[0];
            var touches = evt.changedTouches;

            for (var i = 0; i < touches.length; i++) {
                var touchX = touches[i].pageX - this.offsetParent.offsetLeft;
                var touchY = touches[i].pageY - this.offsetParent.offsetTop;
                var lastTx = lastTouchX[i];
                var lastTy = lastTouchY[i];
                var idx = ongoingTouchIndexById(touches[i].identifier);

                if (idx >= 0) {
                    drawBlur(touchX, touchY, lastTx, lastTy);
                    lastTouchX[i] = touchX;
                    lastTouchY[i] = touchY;
                    ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
                } else {
                    log("can't figure out which touch to continue");
                }
            }
        };

        var handleEnd = function(evt) {
            evt.preventDefault();
            var el = document.getElementsByTagName("canvas")[0];
            var ctx = el.getContext("2d");
            var touches = evt.changedTouches;

            for (var i = 0; i < touches.length; i++) {
                var idx = ongoingTouchIndexById(touches[i].identifier);
                if (idx >= 0) {
                    ongoingTouches.splice(idx, 1); // remove it; we're done
                    lastTouchX.splice(idx, 1);
                    lastTouchY.splice(idx, 1);
                } else {
                    log("can't figure out which touch to end");
                }
            }
        };

            function ongoingTouchIndexById(idToFind) {
                for (var i = 0; i < ongoingTouches.length; i++) {
                    var id = ongoingTouches[i].identifier;

                    if (id == idToFind) {
                        return i;
                    }
                }
                return -1; // not found
            };

            function log(msg) {
                console.log(msg);
            };

            function colorForTouch(touch) {
                return "#000000";
            };

            function copyTouch(touch) {
                return {
                    identifier: touch.identifier,
                    pageX: touch.pageX,
                    pageY: touch.pageY
                };
            };

        var blurStart = function(e) {
            e.preventDefault();
            blurring = true;
            ctx.shadowColor = "black"
            ctx.shadowBlur = 40;
            ctx.fillStyle = "rgba(0,0,0,.1)";
            lastX = e.offsetX;
            lastY = e.offsetY;
            undoables.push(new Array);
        };

        var blurEnd = function(e) {
            e.preventDefault();
            blurring = false;
        };

        var blurMove = function(e) {
            e.preventDefault();
            if (blurring) {
                drawBlur(e.offsetX, e.offsetY, lastX, lastY);
                lastX = e.offsetX;
                lastY = e.offsetY;
            }
        };

        var drawBlur = function(mouseX, mouseY, lastX, lastY) {
            // find all points between        
            var x1 = mouseX,
                x2 = lastX,
                y1 = mouseY,
                y2 = lastY;


            var steep = (Math.abs(y2 - y1) > Math.abs(x2 - x1));
            if (steep) {
                var x = x1;
                x1 = y1;
                y1 = x;

                var y = y2;
                y2 = x2;
                x2 = y;
            }
            if (x1 > x2) {
                var x = x1;
                x1 = x2;
                x2 = x;

                var y = y1;
                y1 = y2;
                y2 = y;
            }

            var dx = x2 - x1,
                dy = Math.abs(y2 - y1),
                error = 0,
                de = dy / dx,
                yStep = -1,
                y = y1;

            if (y1 < y2) {
                yStep = 1;
            }

            lineThickness = 15 - Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) / 10;
            if (lineThickness < 1) {
                lineThickness = 1;
            }

            for (var x = x1; x < x2; x++) {
                //console.log(y, x, lineThickness);
                if (steep) {
                    ctx.fillRect(y, x, lineThickness, lineThickness);
                    undoables[undoables.length - 1].push( { "x": y, "y": x, "width": lineThickness, "height": lineThickness} )
                } else {
                    ctx.fillRect(x, y, lineThickness, lineThickness);
					undoables[undoables.length - 1].push( { "x": x, "y": y, "width": lineThickness, "height": lineThickness} )
                }

                error += de;
                if (error >= 0.5) {
                    y += yStep;
                    error -= 1.0;
                }
            }
        };

        blur.onmousedown = blurStart;
        blur.onmouseup = blurEnd;
        blur.onmousemove = blurMove;
        blur.ontouchstart = handleStart;
        blur.ontouchend = handleEnd;
        blur.ontouchmove = handleMove;	
    });
