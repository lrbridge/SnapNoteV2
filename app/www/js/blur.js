angular.module('snapnote').controller('BlurCtrl',
    function ($scope, SampleDecks) {
		
		$scope.decks = SampleDecks.getMyDecks();
		$scope.deck = SampleDecks.getDeck({id: 1});
		
		$scope.cardId = SampleDecks.getCardId($scope.deck.id);
      	  
		$scope.card = SampleDecks.getFront($scope.cardId);

		$scope.height = "300px";
		$scope.width = "300px";
      	
		$scope.edit = function() {
		};

		var blur = document.getElementById("blur"),
    		ctx = blur.getContext("2d"),
    		blurring = false,
    		lastX = 0,
    		lastY = 0,
    		lineThickness = 1;

		$('#hideBtn').click(function () {
		    $('#hider').toggle();
		});

		$('#clearBtn').click(function () {
		    ctx.clearRect(0, 0, $scope.height, $scope.width);
		});

		console.log("width ", blur.offsetWidth);
		console.log("height ", blur.offsetHeight);

		var ongoingTouches = new Array;

		var handleStart = function(evt) {

		  evt.preventDefault();
		  log("touchstart.");
		  var el = document.getElementsByTagName("canvas")[0];
		  var ctx = el.getContext("2d");
		  var touches = evt.changedTouches;
		        
		  for (var i=0; i < touches.length; i++) {
		    log("touchstart:"+i+"...");
		    ongoingTouches.push(copyTouch(touches[i]));
		    var color = colorForTouch(touches[i]);
		    ctx.beginPath();
		    ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0,2*Math.PI, false);  // a circle at the start
		    ctx.fillStyle = color;
		    ctx.fill();
		    log("touchstart:"+i+".");
		  }
		}

		var handleMove = function(evt) {
		  evt.preventDefault();
		  var el = document.getElementsByTagName("canvas")[0];
		  var ctx = el.getContext("2d");
		  var touches = evt.changedTouches;

		  for (var i=0; i < touches.length; i++) {
		    var color = colorForTouch(touches[i]);
		    var idx = ongoingTouchIndexById(touches[i].identifier);

		    if(idx >= 0) {
		      log("continuing touch "+idx);
		      ctx.beginPath();
		      log("ctx.moveTo("+ongoingTouches[idx].pageX+", "+ongoingTouches[idx].pageY+");");
		      ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
		      log("ctx.lineTo("+touches[i].pageX+", "+touches[i].pageY+");");
		      ctx.lineTo(touches[i].pageX, touches[i].pageY);
		      ctx.lineWidth = 15;
		      ctx.strokeStyle = color;
		      ctx.stroke();

		      ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
		      log(".");
		    } else {
		      log("can't figure out which touch to continue");
		    }
		  }
		}

		var handleEnd = function(evt) {
		  evt.preventDefault();
		  log("touchend/touchleave.");
		  var el = document.getElementsByTagName("canvas")[0];
		  var ctx = el.getContext("2d");
		  var touches = evt.changedTouches;

		  for (var i=0; i < touches.length; i++) {
		    var color = colorForTouch(touches[i]);
		    var idx = ongoingTouchIndexById(touches[i].identifier);

		    if(idx >= 0) {
		      ctx.lineWidth = 4;
		      ctx.fillStyle = color;
		      ctx.beginPath();
		      ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
		      ctx.lineTo(touches[i].pageX, touches[i].pageY);
		      ctx.fillRect(touches[i].pageX-4, touches[i].pageY-4, 8, 8);  // and a square at the end
		      ongoingTouches.splice(idx, 1);  // remove it; we're done
		    } else {
		      log("can't figure out which touch to end");
		    }
		  }
		}

		function ongoingTouchIndexById(idToFind) {
		  for (var i=0; i < ongoingTouches.length; i++) {
		    var id = ongoingTouches[i].identifier;
		    
		    if (id == idToFind) {
		      return i;
		    }
		  }
		  return -1;    // not found
		}

		function log(msg) {
		  console.log(msg);
		}

		function colorForTouch(touch) {
		  return "#000000";
		}

		function copyTouch(touch) {
		  return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
		}

		var blurStart = function (e) {
		    blurring = true;
		    ctx.shadowColor = "black"
		    ctx.shadowBlur = 40;
		    //blur.style.webkitFilter = 'blur(5px)';
		    ctx.fillStyle = "rgba(0,0,0,.1)";
		    lastX = e.pageX// - this.offsetLeft;
		    lastY = e.pageY// - this.offsetTop;
		};

		var blurEnd = function (e) {
		    blurring = false;
		}

		var blurMove = function (e) {
		    if (blurring) {
		        mouseX = e.pageX;// - this.offsetLeft;
		        mouseY = e.pageY;// - this.offsetTop;

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

		        lineThickness = 15;
		        for (var x = x1; x < x2; x++) {
		        	//console.log(y, x, lineThickness);
		            if (steep) {
		                ctx.fillRect(y, x, lineThickness, lineThickness);
		            } else {
		                ctx.fillRect(x, y, lineThickness, lineThickness);
		            }

		            error += de;
		            if (error >= 0.5) {
		                y += yStep;
		                error -= 1.0;
		            }
		        }



		        lastX = mouseX;
		        lastY = mouseY;

		    }
		}

		blur.onmousedown = blurStart;
    	blur.onmouseup = blurEnd;
    	blur.onmousemove = blurMove;
    	blur.ontouchstart = handleStart;
    	blur.ontouchend = handleEnd;
    	blur.ontouchmove = handleMove;
		
	});