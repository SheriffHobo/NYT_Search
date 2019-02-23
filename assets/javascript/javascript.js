$(function () {

    // VARIABLES

    var authKey = "G72ZUgaDuqCiIzK0kL5B9cn5azhlGGEf";

    // Search parameters
    var queryTerm = "";
    var numResults = 0;
    var startYear = 0;
    var endYear = 0;

    // URL Base
    var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

    // Variables to track number of articles
    var articleCounter = 0;

    // FUNCTIONS

    function runQuery(numArticles, queryURL) {

        //AJAX
        $.ajax({ url: queryURL, method: "GET" })
            .done(function (NYTData) {

                // Grabbing the pertinant details 
                $('#cardsection').empty();
                for (var i = 0; i < numArticles; i++) {

                    // Dump to HTML
                    var cardsection = $('<div>');
                    cardsection.addClass("card mb-2");
                    cardsection.attr('id', 'articleCard-' + i);
                    $('#cardsection').append(cardsection);

                    // Check if acticle sections exist
                    if (NYTData.response.docs[i].headline !== "null") {
                        $("#articleCard-" + i).append('<h3 class="card-header">' + NYTData.response.docs[i].headline.main + '</h3>');
                    };

                    if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty('original')) {
                        $("#articleCard-" + i).append('<p>' + NYTData.response.docs[i].byline.original + '</p>');
                    };

                    // Attach article content to a card
                    $("#articleCard-" + i).append('<p>' + NYTData.response.docs[i].section_name + '</p>');
                    $("#articleCard-" + i).append('<p>' + NYTData.response.docs[i].pub_date + '</p>');
                    $("#articleCard-" + i).append('<p>' + NYTData.response.docs[i].snippet + '</p>');
                    $("#articleCard-" + i).append('<a href=' + NYTData.response.docs[i].web_url + ' target="blank"> Click here for full article </a>');
                };
            })
    };

    // CLick listeners

    // Fetch button click listener
    $("#fetch-btn").on('click', function () {
        queryTerm = $("#search").val().trim();

        // Add new search term
        var newURL = queryURLBase + "&q=" + queryTerm;

        // Number of records
        numResults = $("#records").val();

        // Get start/end years
        startYear = $("#startyear").val().trim();
        endYear = $("#endyear").val().trim();

        // If these exist, pass them on...
        if (parseInt(startYear)) {
            startYear = startYear + "0101";
            newURL = newURL + "&begin_date=" + startYear;
        };

        if (parseInt(endYear)) {
            endYear = endYear + "0101";
            newURL = newURL + "&end_date=" + endYear;
        };

        // Send AJAX call the assembeled URL
        runQuery(numResults, newURL);
        return false;
    });

    // Clearing old results
    $("#reset-btn").on('click', function () {
        $('#cardsection').empty();
    });
});