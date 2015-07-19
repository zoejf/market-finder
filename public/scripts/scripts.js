$(function() {
    //underscore function to compile both templates
    var resultsTemplate = _.template($('#results-template').html());
    var detailsTemplate = _.template($('#market-details-template').html());

    //html elements to hold search results and market details
    var $resultsList = $('#results-list');
    var $detailsPanel = $('#market-details');

    
    
    //results list: render test data to the page
    $.get('/api/markets', function(data) {
        var markets = data;

        //renders template to the page
        _.each(markets, function(result) {
          var $resultItem = $(resultsTemplate(result));
            $resultsList.append($resultItem);
        });
    });

    //on click of the info icon, find that market's details
    $resultsList.on('click', '.glyphicon-info-sign', function (event) {
            //find the market's id
            var marketId = $(this).closest('.market').attr('data-id');
            console.log('marketId: ' + marketId);

            //render data to the page for that market
            $.ajax({
                type: 'PUT',
                url: '/api/markets/' + marketId,
                success: function(data) {
                    var marketDetails = data;

                    //replace existing data in 'details' section with newest selection
                    var $detailsHtml = $(detailsTemplate(marketDetails));
                    console.log('detailsHtml: ' + $detailsHtml);
                    console.log('details-id: ' + marketId);
                    // $('#market-details').append($detailsHtml);
                    $('.market-details').replaceWith($detailsHtml);
                }
            });
    });
    


});