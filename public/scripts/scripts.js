$(function() {

//DEFINE ALL THE VARIABLES/SETUP
    
    //current user data
    var globalUserData;

    //underscore function to compile both templates
    var resultsTemplate = _.template($('#results-template').html());
    var detailsTemplate = _.template($('#market-details-template').html());

    //html elements to hold search results and market details
    var $resultsList = $('#results-list');
    var $detailsPanel = $('#market-details');

    var marketResultsArray = [];

    L.mapbox.accessToken = 'pk.eyJ1Ijoiem9lamYiLCJhIjoiYzZkYzk3YTg0NjlhMWMzN2YxMzE3MjRlYjdhYTY2NTcifQ.4o17DQScL_qZlKTOYSXrXQ';
    // Set up map in the div #map on page load
    var map = L.mapbox.map('map', 'zoejf.d3e46a92');

    //set up geocoding function for getting longitude and latitude
    var geocoder = L.mapbox.geocoder('mapbox.places-v1');

    //feature layer is where the markers will be plotted on the map
    var featureLayer = L.mapbox.featureLayer()

    $.get('/me', function (data) {
      console.log('I ran');
      if (data === 'no current user') {
        $('#current-user-greet').html('Hello, guest!');
      } else {
        globalUserData = data;
        $('#current-user-greet').html('Hello ' + globalUserData.email);
      }
    });

//DEFINE FUNCTIONS FOR USDA and MAPBOX API 
    //get all results with that zip code 
    var searchZip = function (zip) {
        $.ajax({
            type: 'GET', 
            url: 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=' + zip, 
            async: false,
            datatype: 'jsonp', 
            crossdomain: true,
            success: function (data) {
                var marketResults = data.results;

                // console.log('market results in function: ', marketResults);
                searchId(marketResults);
            }
        })
    };

    //search by id of each of the items in an array
    var searchId = function(marketResults) {
       
        //iterate through each item in marketResults array
        for (i = 0; i < marketResults.length; i ++) {
             //define id for each of the objects in marketResults array
             var id = parseInt(marketResults[i].id);
             // console.log('marketResults[i].id', id);

             var marketResult = marketResults[i];
             // console.log('market result: ', marketResult);
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
                       // console.log('market result inside success', marketResult);
                       marketResult.address = data.marketdetails.Address;
                       marketResult.google = data.marketdetails.GoogleLink;
                       marketResult.products = data.marketdetails.Products;
                       marketResult.schedule = data.marketdetails.Schedule;
                       // console.log('marketResults after new keys: ', marketResult);
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
        var name = marketResult.marketname;

        if (address) {
            geocoder.query(address, function(err, result) {
                console.log('result.latlng[1]: ', result.latlng[1], '  result.latlng[0]: ', result.latlng[0]);
                 if (err) {
                   console.log(err);
                 }
                 else {
                   showMarker(address, name, result.latlng[1], result.latlng[0]);
                 }
               });

            //store each market result in my temp results array
            marketResultsArray.push(marketResult);
        }
    };


    //adds marker to the page based on geocoder lng and lat
    var showMarker = function(address, name, lng, lat) {
      L.mapbox.featureLayer({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            lng,
            lat
          ]
        },
        properties: {
          description: name + " at " + address,
          'marker-size': 'small',
          'marker-color': '#19B919',
          'marker-symbol': 'embassy'
        }
      }).addTo(map);
    };

    //zooms map to the a certain place -- works with geocoder function 
    function showMap(err, data) {
        // The geocoder can return an area, like a city, or a
        // point, like an address. Here we handle both cases,
        // by fitting the map bounds to an area or zooming to a point.
        if (data.lbounds) {
            map.fitBounds(data.lbounds);
        } else if (data.latlng) {
            map.setView([data.latlng[0], data.latlng[1]], 13);
        }
    }

// ! end of defining functions


//on click of the 'Go' button
    $('#search-zip').on('submit', function(event) {
        event.preventDefault();

        //empty results from previous searches
        $resultsList.empty();

        //make welcome box disappear
        $('.welcome').addClass('display');

        var zip = $('#zipcode').val();
        console.log('zipcode: ', zip);


        //search by specific zip entered in form
        //inside this function, it searches again by each id and appends to page
        searchZip(zip);

        console.log('marketResultsArray after append: ', marketResultsArray);

        geocoder.query(zip, showMap);

        // featureLayer.on('ready', function() {
        // //     // featureLayer.getBounds() returns the corners of the furthest-out markers,
        // //     // and map.fitBounds() makes sure that the map contains these.
        //     map.fitBounds(featureLayer.getBounds());
        // });

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

