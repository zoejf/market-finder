$(function() {
    //underscore function to compile results template
    var resultsTemplate = _.template($('#results-template').html());

    //html element to hold all results
    var $resultsList = $("#results-list");

    var markets = [
    	{name: "Inner Richmond", 
    	location: "Clement St", 
    	day: "Sunday", 
    	hours: "7am - 2pm" }, 
    	{name: "Ferry Building",
    	 location: "Embarcadero", 
    	 day: "Wednesday", 
    	 hours: "12pm - 4pm"}, 
    	 {name: "Heart of the City",
    	  location: "UN Plaza", 
    	  day: "Wednesday", 
    	  hours: "7:30am - 5:30pm"}
    ]

    //compiles template to the page
    _.each(markets, function(result) {
      var $listItem = $(resultsTemplate(result));
    	$resultsList.append($listItem)
    });
    


});