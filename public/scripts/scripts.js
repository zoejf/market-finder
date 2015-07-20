$(function() {
    //underscore function to compile both templates
    var resultsTemplate = _.template($('#results-template').html());
    var detailsTemplate = _.template($('#market-details-template').html());

    //html elements to hold search results and market details
    var $resultsList = $('#results-list');
    var $detailsPanel = $('#market-details');

    var marketResults = [];
    
    //results list: render test data to the page
    $.get('/api/markets', function(data) {
        var markets = data;

        //renders template to the page
        _.each(markets, function(result) {
          var $resultItem = $(resultsTemplate(result));
            $resultsList.append($resultItem);
        });
    });

    //on click of the 'Go' button
    $('#search-zip').on('submit', function() {
        
        var zip = $('#zipcode').val();
        console.log('zipcode: ', zip);

        //get all results with that zip code from form
        $.ajax({
              type: 'GET',
              contentType: 'application/json; charset=utf-8',
              // submit a get request to the restful service zipSearch or locSearch
              url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip,
              // or
              // url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=" + lat + "&lng=" + lng,
              dataType: 'jsonp',
              jsonpCallback: 'searchResultsHandler', 
              success: function() {
                console.log("success");

              }
          });

   
       //iterate through each item in marketResults array

            //get details for the item with that id

            //push the new details into the existing object



        //for each item in marketResults array, append data to html page



    });


    //on click of the info icon, find that market's details
    $resultsList.on('click', '.glyphicon-info-sign', function (event) {
            //find the market's id
            var marketId = $(this).closest('.market').attr('data-id');
            // console.log('marketId: ' + marketId);

            //render data to the page for that market
            $.ajax({
                type: 'PUT',
                url: '/api/markets/' + marketId,
                success: function(data) {
                    var marketDetails = data;

                    //replace existing data in 'details' section with newest selection
                    var $detailsHtml = $(detailsTemplate(marketDetails));
                    // console.log('detailsHtml: ' + $detailsHtml);
                    // console.log('details-id: ' + marketId);
                    // $('#market-details').append($detailsHtml);
                    $('.market-details').replaceWith($detailsHtml);
                }
            });
    });
    


});