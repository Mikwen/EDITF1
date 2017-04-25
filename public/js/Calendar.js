
// these are labels for the days of the week
cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// these are human-readable month name labels, in order
cal_months_labels = ['January', 'February', 'March', 'April',
                     'May', 'June', 'July', 'August', 'September',
                     'October', 'November', 'December'];

// these are the days of the week for each month, in order
cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


function Calendar(month, year) {
  this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
  this.year  = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
  this.html = '';
}
//generate next month 
function nextButton(){
document.getElementById("month_name").innerHTML = "Hello";

}
function genarateCalendar(){

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
  
  // do the header
  var extraDay = 0; //days added from previous month
  var todaysDate = new Date();
  var year = todaysDate.getFullYear()
  var monthName = cal_months_labels[todaysDate.getMonth()]
  var monthLength = cal_days_in_month[todaysDate.getMonth()];
  var lastMonthLength = cal_days_in_month[todaysDate.getMonth()-1]
  var firstDayOfMonth = new Date(year, todaysDate.getMonth(), 1).getDay();
  document.getElementById("month_name").innerHTML = monthName+" "+year;
  var dayOne=0;
  if(firstDayOfMonth ==1){
        dayOne=1;
  }else if (firstDayOfMonth ==2){
        dayOne=lastMonthLength;
		extraDay=1;
   }else if (firstDayOfMonth ==3){
        dayOne=lastMonthLength-1;
		extraDay=2;
    }else if (firstDayOfMonth ==4){
        dayOne=lastMonthLength-2;
		extraDay=3;
    }else if (firstDayOfMonth ==5){
        dayOne=lastMonthLength-3;   
		extraDay=4;
    }else if (firstDayOfMonth ==6){
        dayOne=lastMonthLength-4; 
		extraDay=6;
    }else if (firstDayOfMonth ==7){
        dayOne=lastMonthLength-5; 
		extraDay=6;
    }else {
        dayOne= 0;
    }    
    
    
     
  var dayGrid='';
  for (i=0; i< firstDayOfMonth -1; i++){
     dayGrid += '<div class="w3-light-gray w3-opacity  w3-center w3-col w3-padding-12 w3-border w3-border-teal" style="width:14.28%"><p id="lastMonth'+dayOne+'">'+ dayOne + '</p></div>';
     dayOne++;
  } 
  
  dayOne = 1;
  
  for (i=firstDayOfMonth; i< monthLength+extraDay; i++){
     dayGrid += '<div class="  w3-center w3-col w3-padding-12 w3-border w3-border-teal" style="width:14.28%"><p id="thisMonth'+dayOne+'">'+ dayOne + '</p></div>';
     dayOne++;
  }
    document.getElementById("daysInGrid").innerHTML = dayGrid;
    
 
  
}

//// Register a helper
  //Handlebars.registerHelper('generateNextMonth', function(){
	//document.getElementById("month_name").innerHTML = "hello";
  //});
    //// Grab the template script
  //var theTemplateScript = $("#index-template").html();

  //// Compile the template
  //var theTemplate = Handlebars.compile(theTemplateScript);

