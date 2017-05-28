var userSelect;
//Global variables for Zomato functions
var queryURL, city="", cityId, cuisineId, apiKey = "0740f7fe7643fb4e802a336372f83206", newQueryURL;

function chooseBox() {
	$("#"+userSelect+"-text").css("margin", "0%");
	$("#"+userSelect).animate({'left' : '3%', 'width' : '90%', 'height' : '800px'},1000, function(){
        $("#"+userSelect+"-zip").css("visibility", "visible");
    });
    
}

$("#in").on("click", function(){
    event.preventDefault();
	userSelect=$(this).attr("id");
    $("#out, #either").css("visibility", "hidden");
    chooseBox();
});
$("#out").on("click", function(){
    event.preventDefault();
	userSelect=$(this).attr("id");
    $("#in, #either").css("visibility", "hidden");
    chooseBox();
});
$("#either").on("click", function(){
    event.preventDefault();
	userSelect=$(this).attr("id");
    $("#out, #in").css("visibility", "hidden");
    chooseBox();
});

$("#ingredient-submit").on("click", function(){
    yummly.callYummly();
});

var zomato = {
    lookupUser: function(){
        //whatever
    },
    coinFlip: function(){

    },
    queryCity: function(city){
        queryURL = "https://developers.zomato.com/api/v2.1/cities?q="+city+"&count=5"+"&apikey="+apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response){
            console.log(response);
            $("#location-results").empty();
            var result=response.location_suggestions;
            for(var i=0; i < result.length; i++){
                //create buttons based on city selected and append city id into a data-type
                var locationbtn = $("<button>");
                locationbtn.attr("data-type", result[i].id);
                locationbtn.text(result[i].name);
                locationbtn.addClass("city-select");
                $("#location-results").append(locationbtn);
            }
            $("#location-results").append("<p>Select your location</p>")
        });
    },
    cuisineOptions: function(){
        //Clear cuisine buttons when new cuisine selection is chosen
        $("#cuisine-results").html("");
        //Array to hold cuisine options
        var cuisineOptions = 
            [
                {
                    cuisine_name: "Italian",
                    cuisine_id: 55
                },
                {
                    cuisine_name: "Chinese",
                    cuisine_id: 25
                },
                {
                    cuisine_name: "American",
                    cuisine_id: 1                    
                },
                {
                    cuisine_name: "Mexican",
                    cuisine_id: 73
                },
                {
                    cuisine_name: "Pizza",
                    cuisine_id: 82
                },
                {
                    cuisine_name: "Pub Food",
                    cuisine_id: 983
                },
                {
                    cuisine_name: "Sandwich",
                    cuisine_id: 304                    
                },
                {
                    cuisine_name: "Vegetarian",
                    cuisine_id: 308
                }
            ];
            //Loop through cuisine options array to add buttons for each option
            for (var i=0; i<cuisineOptions.length; i++){
                var cuisineBtn = $("<button>");
                cuisineBtn.text(cuisineOptions[i].cuisine_name);
                cuisineBtn.attr("data-type", cuisineOptions[i].cuisine_id);
                cuisineBtn.addClass("cuisine-select");
                $("#cuisine-results").append(cuisineBtn);
            }
        $("#cuisine-results").append("<p>Select your cuisine</p>")
    },
    filterCuisine: function(){
        //Clear returned results when new cuisine selection is chosen
        $("#option-results").html("");
        //Build new query URL with city and cuisine ID's
        newQueryURL = "https://developers.zomato.com/api/v2.1/search?entity_id="+cityId+"&entity_type=city&cuisines="+cuisineId+"&apikey="+apiKey;
        //Ajax request for restaurant data
        $.ajax({
            url: newQueryURL,
            method: "GET"
        }).done(function(response){
            //Dynamically create table
            var resultTable = $("<table class='table'>");
            resultTable.append("<thead><tr><th>Restaurant</th>"+
                "<th>Price Range <i class='glyphicon glyphicon-triangle-bottom sort-price'></i>"+
                "</th><th>Rating <i class='glyphicon glyphicon-triangle-bottom sort-rating'></i></th></tr></thead>");
            resultTable.append("<tbody>");
            $("#option-results").append(resultTable);
            //Add restaurant results as a new row to the table
            var results=response.restaurants;
            for (var i=0; i<results.length; i++){
                console.log(results[i].restaurant.name);
                var optionResults = $("<tr>");
                optionResults.append("<td>"+results[i].restaurant.name+"</td>");
                optionResults.append("<td>"+results[i].restaurant.price_range+"</td>");
                optionResults.append("<td>"+results[i].restaurant.user_rating.aggregate_rating+"</td>");
                resultTable.append(optionResults);
            }
        });
    },
    sortPrice: function(){
        //Clear returned results when new cuisine selection is chosen
        $("#option-results").html("");
        //Build new query URL with price sort option
        priceURL = newQueryURL+"&sort=cost&order=desc";
        //Ajax request for restaurant data
        $.ajax({
            url: priceURL,
            method: "GET"
        }).done(function(response){
            //Dynamically create table
            console.log(priceURL);
            var resultTable = $("<table class='table'>");
            resultTable.append("<thead><tr><th>Restaurant</th>"+
                "<th>Price Range <i class='glyphicon glyphicon-triangle-bottom sort-price'></i>"+
                "</th><th>Rating <i class='glyphicon glyphicon-triangle-bottom sort-rating'></i></th></tr></thead>");
            resultTable.append("<tbody>");
            $("#option-results").append(resultTable);
            //Add restaurant results as a new row to the table
            var results=response.restaurants;
            for (var i=0; i<results.length; i++){
                console.log(results[i].restaurant.name);
                var optionResults = $("<tr>");
                optionResults.append("<td>"+results[i].restaurant.name+"</td>");
                optionResults.append("<td>"+results[i].restaurant.price_range+"</td>");
                optionResults.append("<td>"+results[i].restaurant.user_rating.aggregate_rating+"</td>");
                resultTable.append(optionResults);
            }
        });
    },
    sortRating: function(){
        //Clear returned results when new cuisine selection is chosen
        $("#option-results").html("");
        //Build new query URL with rating sort option
        ratingURL = newQueryURL+"&sort=rating&order=desc";
        //Ajax request for restaurant data
        $.ajax({
            url: ratingURL,
            method: "GET"
        }).done(function(response){
            //Dynamically create table
            console.log(priceURL);
            var resultTable = $("<table class='table'>");
            resultTable.append("<thead><tr><th>Restaurant</th>"+
                "<th>Price Range <i class='glyphicon glyphicon-triangle-bottom sort-price'></i>"+
                "</th><th>Rating <i class='glyphicon glyphicon-triangle-bottom sort-rating'></i></th></tr></thead>");
            resultTable.append("<tbody>");
            $("#option-results").append(resultTable);
            //Add restaurant results as a new row to the table
            var results=response.restaurants;
            for (var i=0; i<results.length; i++){
                console.log(results[i].restaurant.name);
                var optionResults = $("<tr>");
                optionResults.append("<td>"+results[i].restaurant.name+"</td>");
                optionResults.append("<td>"+results[i].restaurant.price_range+"</td>");
                optionResults.append("<td>"+results[i].restaurant.user_rating.aggregate_rating+"</td>");
                resultTable.append(optionResults);
            }
        });
    },
    displayResultZomato: function(){

    },
    randomRestaurant: function(){
        //For feeling adventurous under zamato api
    }
}

var yummly = {
        callYummly: function() {
        var queryItem = $("#ingredient-input").val().trim();
        var queryUrl = "http://api.yummly.com/v1/api/recipes?_app_id=804bf8b9&_app_key=41611fa0ed256dc5c5378bdf87593e25&allowedIngredient[]=";
        $.ajax({
            url: queryUrl + encodeURIComponent(queryItem),
            method: "GET"
        }).done(function(response){
            console.log(response);

            var result=response.matches;
            var recipeName = "";
            var table = $("<table class=\"result-table\"></table>")
            console.log(result[1].recipeName);


            for (var i=0; i < result.length;i++){
                
                recipeName=result[i].recipeName;
                console.log(recipeName);
                var ingredients=result[i].ingredients;
                
                var newRow="<tr class=\"table-row\"><td>" + recipeName + "</td><td>" + ingredients + "</td></tr>";
                table.append(newRow)
            }
            $("#recipe-results").append(table);
        });
    }
}

//Go Out Option
$("#city-submit").on("click", function(event){
    event.preventDefault();

    city = $("#city-input").val().trim();
    zomato.queryCity(city);
    $("#city-input").val('');

    console.log(queryURL);
});
//City selection
$("#location-results").on("click", ".city-select", function(event){
    event.preventDefault();
    cityId = $(this).attr("data-type");
    zomato.cuisineOptions();
});
//Cuisine selection
$("#cuisine-results").on("click", ".cuisine-select", function(event){
    event.preventDefault();
    cuisineId = $(this).attr("data-type");
    zomato.filterCuisine();
});
//Sort by price
$("#option-results").on("click", ".sort-price", function(event){
    event.preventDefault();
    zomato.sortPrice();
});
//Sort by rating
$("#option-results").on("click", ".sort-rating", function(event){
    event.preventDefault();
    zomato.sortRating();
});