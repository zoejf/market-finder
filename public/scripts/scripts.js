$(function() {
    //underscore function to compile results template
    var resultsTemplate = _.template($('#results-template').html());

    //html element to hold all results
    var $resultsList = $("#results-list");

    
    
    //render existing data to the page
    $.get('/api/markets', function(data) {
        var markets = data;

        //renders template to the page
        _.each(markets, function(result) {
          var $resultItem = $(resultsTemplate(result));
            $resultsList.append($resultItem)
        });
    })


});