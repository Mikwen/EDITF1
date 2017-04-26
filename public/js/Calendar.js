
// these are labels for the days of the week
cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// these are human-readable month name labels, in order
cal_months_labels = ['January', 'February', 'March', 'April',
                     'May', 'June', 'July', 'August', 'September',
                     'October', 'November', 'December'];

// these are the days of the week for each month, in order
cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// this is the current date
cal_current_date = new Date(); 

function Calendar(month, year) {
  this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
  this.year  = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
  this.html = '';
  
  this.render = function() {
	  // get first day of month
	  var firstDay = new Date(this.year, this.month, 1);
	  var startingDay = firstDay.getDay();
	  
	  // find number of days in month
	  var monthLength = cal_days_in_month[this.month];
	  
	  // compensate for leap year
	  if (this.month == 1) { // February only!
		if((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
		  monthLength = 29;
		}
	  }
	  
	  var monthName = cal_months_labels[this.month]
	  var monthLength = cal_days_in_month[this.month];
	  var lastMonthLength = cal_days_in_month[this.month-1]
	  var firstDayOfMonth = new Date(this.year, this.month, 1).getDay();
	  document.getElementById("month_name").innerHTML = monthName+" "+this.year;
	  var daysFromlastMonth = firstDayOfMonth-1; //number days added from previous month
	  var dayOne= lastMonthLength-daysFromlastMonth+1;
	  var currentMonth = this.month;
		  
	  var dayGrid='';
	  for (i=0; i< daysFromlastMonth; i++){
		if( i==4 || i==1 || i==0){
			dayGrid += '<div class=" w3-light-gray w3-opacity  w3-center w3-col w3-padding-12 w3-border w3-border-teal" style="width:14.28%"><p id="thisMonth'+dayOne+'">'+ dayOne + '</p><p class="w3-teal"id="lecture'+dayOne+'"> TDT4140</p></div>';
		}else{
			dayGrid += '<div class="w3-light-gray w3-opacity  w3-center w3-col w3-padding-12 w3-border w3-border-teal" style="width:14.28%"><p id="lastMonth'+dayOne+'">'+ dayOne + '</p><p class="w3-text-light-gray"id="lecture'+dayOne+'"> noe</p></div>';
		} dayOne++;
	  } 
	  
	  dayOne = 1; //setting first day of the month to 1
	  
	  for (i=monthLength; i>0; i--){
		if( i%7==3 || i%7==0 || i%7==6){
		dayGrid += '<div class="  w3-center w3-col w3-padding-12 w3-border w3-border-teal" style="width:14.28%"><p id="thisMonth'+dayOne+'">'+ dayOne + '</p><p class="w3-teal"id="lecture'+dayOne+'"> TDT4140</p></div>';
		}else{
		dayGrid += '<div class="  w3-center w3-col w3-padding-12 w3-border w3-border-teal" style="width:14.28%"><p id="thisMonth'+dayOne+'">'+ dayOne + '</p><p class="w3-text-white"id="lecture'+dayOne+'"> noe</p></div>';
		}
			
		 dayOne++;
	  }
	document.getElementById("daysInGrid").innerHTML = dayGrid;
	this.populate();
  }
  
  this.renderNextMonth = function() {
	this.month++;
	if (this.month == 12) {
		this.month = 0;
		this.year++;
	}
	this.render();
  }
    
  this.renderPrevMonth = function() {
	this.month--;
	if (this.month == -1) {
		this.month = 11;
		this.year--;
	}
	this.render();
  }
  
  this.populate = function() {
	$.ajax({
		//url: '192.168.1.247:3330/lecture/lecture',
		url: 'http://192.168.1.247:3330/lecture/lecture?course=TDT4100&month='+(this.month+1)+'&year='+this.year,
		type: 'GET',
		/*data: { 
			course: 'TDT4100', 
			month: '04', 
			year: '2017'
		},*/
		success: function(response) {
			console.log(response[0].course);
		}
	});
  }
}

//populate funksjon
/*	function Lecture (var lecture[]) {
	if (lecture.lenght() == 0) { return null}
	for (i=0; i<lecture.length(); i++){
		lecture[i]
		//kall populate fuksjon
    }
}*/
var cal = new Calendar();