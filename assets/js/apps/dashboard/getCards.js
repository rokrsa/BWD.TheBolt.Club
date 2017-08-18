// @author - Vasu Sheoran

/*
    This function is used to format number
    @param num
    @return num
*/
function formatter(num) {
    if(num > 999999)
        return (num/1000000).toFixed(1) + 'M';
    else if(num>999)
        return (num/1000).toFixed(1) + 'K';
    else 
        return num;
}

/*
    Ajax call to get data for cards.
*/
function getCards(){ 
    jQuery.ajax({
        type: "GET",
        url: "http://api.thebolt.club/admin/user/cards",
        success: function (response) {
            var jsonData = response[0];
            if(response.length != 0) {

                //TODO: error handling
                $("#riders-count").text(jsonData.riders_count);
                $("#check-in-count").text(jsonData.check_in_count);
                $("#ride-images-count").text(jsonData.images_count);
                $("#rides-tracked-count").text(jsonData.rides_tracked_count);

                //Parse to Kth Notation
                var distance_covered = parseInt(jsonData.distance_covered)
                $("#total-distance").text(formatter(distance_covered) + ' Km');
                return true;
            } else{
                $("#registeredRiders").text("Loading...");
                return false;
            }
        },
        error: function (errorObject, errorText, errorHTTP) {
            deleteAllCookies();
            alert('Server busy. Please try again.');
            return true;
        }
    });

    
}



getCards();