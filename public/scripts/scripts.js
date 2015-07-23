$(function() {
    //underscore function to compile both templates
    var resultsTemplate = _.template($('#results-template').html());
    var detailsTemplate = _.template($('#market-details-template').html());

    //html elements to hold search results and market details
    var $resultsList = $('#results-list');
    var $detailsPanel = $('#market-details');
    var map;

    var marketResultsArray = [];
    
    //results list: render test data to the page
    // $.get('/api/markets', function(data) {
    //     var markets = data;

        //renders template to the page
    //     _.each(markets, function(result) {
    //       var $resultItem = $(resultsTemplate(result));
    //         $resultsList.append($resultItem);
    //     });
    // });

//DEFINE FUNCTIONS FOR USDA API 
    //get all results with that zip code 
    var searchZip = function (zip) {
        $.ajax({
            type: 'GET', 
            url: 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=' + zip, 
            async: false,
            datatype: 'jsonp', 
            crossdomain: true,
            success: function (data) {
                // console.log('data: ', data);
                //push each of the found results to my temp marketResults array
                var marketResults = data.results;
                // _.each(results, function(el) {
                //     marketResults.push(el);
                // });
                console.log('market results in function: ', marketResults);
                searchId(marketResults);
            }
        })
        // console.log('market results in function: ', marketResults);
        // return marketResults;
    };

    //search by id of each of the items in an array
    var searchId = function(marketResults) {
       
        //iterate through each item in marketResults array
        for (i = 0; i < marketResults.length; i ++) {
             //define id for each of the objects in marketResults array
             var id = parseInt(marketResults[i].id);
             console.log('marketResults[i].id', id);

             var marketResult = marketResults[i];
             console.log('market result: ', marketResult);
             //get details for the item with that id
             if (id) {
                $.ajax({
                    type: 'GET',
                    url: 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=' + id,
                    async: false,
                    datatype: 'jsonp', 
                    crossdomain: true,
                    success: function (data) {
                       console.log('id data: ', data);
                       console.log('market result inside success', marketResult);
                       marketResult.address = data.marketdetails.Address;
                       marketResult.google = data.marketdetails.GoogleLink;
                       marketResult.products = data.marketdetails.Products;
                       marketResult.schedule = data.marketdetails.Schedule;
                       console.log('marketResults after new keys: ', marketResult);
                       appendResult(marketResult);  
                    }
                })
              }
        };
    };

    var appendResult = function (marketResult) {
        var $resultItem = $(resultsTemplate(marketResult));
          $resultsList.append($resultItem);

        //set geocode address to equal address from marketResult
        var address = marketResult.address;

        geocoder.query(address, showMap);


        //store each market result in my temp results array
        marketResultsArray.push(marketResult);
    };

//DEFINE FUNCTIONS FOR MAP API
function showMap(err, data) {
    if (data.lbounds) {
        map.fitBounds(data.lbounds);
        var marker = L.marker([data.latlng[0], data.latlng[1]]).addTo(map);
    } else if (data.latlng) {
        map.setView([data.latlng[0], data.latlng[1]], 13);
    }
}


// ! end of defining functions

L.mapbox.accessToken = 'pk.eyJ1Ijoiem9lamYiLCJhIjoiYzZkYzk3YTg0NjlhMWMzN2YxMzE3MjRlYjdhYTY2NTcifQ.4o17DQScL_qZlKTOYSXrXQ';
// Set up map in the div #map
map = L.mapbox.map('map', 'zoejf.d3e46a92');

//set variables
var geocoder = L.mapbox.geocoder('mapbox.places-v1');

    //on click of the 'Go' button
    $('#search-zip').on('submit', function(event) {
        event.preventDefault();

        $resultsList.empty();

        var zip = $('#zipcode').val();
        console.log('zipcode: ', zip);


        //search by specific zip entered in form
        //inside this function, it searches again by each id and appends to page
        searchZip(zip);

        console.log('marketResultsArray after append: ', marketResultsArray);

        geocoder.query(zip, showMap);

    });


    //on click of the info icon, find that market's details
    $resultsList.on('click', '.glyphicon-info-sign', function (event) {

            //find the market's id
            var marketId = $(this).closest('.market').attr('data-id');

            console.log('marketId: ' + marketId);

            // render data to the page for that market
            $detailsHtml = $(detailsTemplate())

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

