angular.module('snapnote').controller('ReminderSetup',
    function ($scope, $routeParams, SampleDecks) {

    	$scope.deck = SampleDecks.getDeck({id: $routeParams.id});
    	$scope.reminders = $scope.deck.reminders;
    	console.log('loading reminders');
    	for (var i = 0; i < $scope.reminders.length; i++) {
    		console.log('setting up reminders', $scope.reminders.length);
    		var day = $scope.reminders[i].day;
    		var time = $scope.reminders[i].time;
    		var dayBtn = $('#'+day+'Button');
    		var timeBtn = $('#'+day+'Time');
    		dayBtn.removeClass('btn-default');
    		dayBtn.addClass('btn-primary');
    		timeBtn.html(time);
    	}

        $scope.toggleclass = function(id) {
        	console.log('#'+id);//$(''))
        	$('#'+id).toggleClass('active');
            console.log($('#'+id).class);
        }
    
        // show the modal
        $scope.setupTime = function(day) {
        	$('#timepickertitle').html(day);
        	var time = $('#'+day+'Time').text();
        	if (time !== '-') {	
        		var hour = time.split(':')[0];
        		var minute = time.split(':')[1].split(' ')[0];
        		var meridian = time.split(':')[1].split(' ')[1];

        		$('#hourtext').html(hour);
	        	$('#minutetext').html(minute);
     	   		$('#meridiantext').html(meridian);
        	}
			$('#timepicker-modal').modal('toggle');
        }

        $scope.closePicker = function() {
        	var day = $('#timepickertitle').text();
        	var hour = $('#hourtext').text();
        	var minute = $('#minutetext').text();
        	var meridian = $('#meridiantext').text();

        	console.log(day, hour, minute, meridian);

        	$('#'+day+'Time').html(hour + ':' + minute + ' ' + meridian);
        	$('#'+day+'Button').addClass('btn-primary');
        	$('#'+day+'Button').removeClass('btn-default');
			$('#timepicker-modal').modal('toggle');
        }

        $scope.setReminders = function() {
        	var deck = SampleDecks.getDeck({id: $routeParams.id});
        	deck.reminders.length = 0;
        	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        	console.log('saving reminders');
        	for (var i = 0; i < days.length; i++) {
        		console.log('saving reminder for day ', days[i])
        		var day = days[i];
        		var dayButton = $('#'+day+'Button');
        		if (dayButton.hasClass('btn-primary')) {
        			var time = $('#'+day+'Time').text();
        			var reminderInfo = {};
        			reminderInfo.day = day;
        			reminderInfo.time = time;
        			deck.reminders.push(reminderInfo);
        			$scope.reminders.push(reminderInfo);
        			console.log('pushing reminder');
        		}
        	}
        	history.back();
        }

        $scope.cancel = function() {
        	history.back();
        }

        $scope.toggleDay = function(day) {
        	console.log('toggling day', day);
        	var dayButton = $('#'+day+'Button');
        	var dayTime = $('#'+day+'Time');
        	if (dayButton.hasClass('btn-default')) {
        		$scope.setupTime(day);
			}
			else {
				dayButton.removeClass('btn-primary');
				dayButton.addClass('btn-default');
				dayTime.html("-");
			}
        }

        $scope.incrementHour = function() {
        	var hour = $('#hourtext').text();
        	console.log('incrementing hour ', hour);
        	hour = Number(hour) + 1;
        	if (hour === 13) { hour = 1; }
        	if (hour === 12) { $scope.toggleMeridian(); }

        	$('#hourtext').html(hour);
        }

        $scope.incrementMinute = function() {
			var minute = $('#minutetext').text();
        	console.log('incrementing minute ', minute);
        	minute = Number(minute) + 15;
        	if (minute >= 60) { minute = 0; $scope.incrementHour(); }
        	if (minute === 0) { minute = "00"; }

        	$('#minutetext').html(minute);
        }

        $scope.toggleMeridian = function() {
        	var meridian = $('#meridiantext').text();
        	if (meridian === "AM") { $('#meridiantext').html("PM"); }
        	if (meridian === "PM") { $('#meridiantext').html("AM"); }
        }

        $scope.decrementHour = function() {
        	var hour = $('#hourtext').text();
        	console.log('decrementing hour ', hour);
        	hour = Number(hour) - 1;
        	if (hour === 0) { hour = 12; }   	
        	if (hour === 11) { $scope.toggleMeridian(); }
        	$('#hourtext').html(hour);
        }

        $scope.decrementMinute = function() {
        	var minute = $('#minutetext').text();
        	console.log('decrementing minute ', minute);
        	minute = Number(minute) - 15;
        	if (minute < 0) { minute = 45; $scope.decrementHour(); }
        	if (minute === 0) { minute = "00"; }

        	$('#minutetext').html(minute);
        }

    });