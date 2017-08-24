// @author - Vasu Sheoran

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

/*
    This function is used to format number
    @param num
    @return num
*/
function formatter(num) {
    if (num > 999999)
        return (num / 1000000).toFixed(1) + 'M';
    else if (num > 999)
        return (num / 1000).toFixed(1) + 'K';
    else
        return num;
}
/*
    Ajax call to get data for cards.
*/
function getCards() {
    jQuery.ajax({
        type: "POST",
        url: "http://api.thebolt.club/admin/user/cards",
        data: {
            "API_KEY": 'webapikey',
            "APP_VERSION": '1.0',
            "CONFIG_VERSION": '1.0',
            "AID": getCookie("AID")
        },
        success: function(response) {


            if (response.data.status) {

                var jsonData = response.dashboard[0];
                jsonData.riders_count != null ? $("#riders-count").text(jsonData.riders_count): $("#riders-count").text("---").css("font-size","2em");
                jsonData.check_in_count != null ? $("#check-in-count").text(jsonData.check_in_count): $("#check-in-count").text("---").css("font-size","2em");
                jsonData.images_count != null ? $("#ride-images-count").text(jsonData.images_count): $("#ride-images-count").text("---").css("font-size","2em");
                jsonData.rides_tracked_count != null ? $("#rides-tracked-count").text(jsonData.rides_tracked_count): $("#rides-tracked-count").text("---").css("font-size","2em");
                jsonData.registered_riders_mtd != null ? $("#registered_riders_mtd").text(jsonData.registered_riders_mtd): $("#registered_riders_mtd").text("---");
                jsonData.ride_images_mtd != null ? $("#ride-images-mtd").text(jsonData.ride_images_mtd): $("#ride-images-mtd").text("---");
                jsonData.checkins_mtd != null ? $("#checkins-mtd").text(jsonData.checkins_mtd): $("#checkins-mtd").text("---");
                
                if(jsonData.distance_covered != null){
                    var distance_covered = parseInt(jsonData.distance_covered);
                    $("#total-distance").text(formatter(distance_covered) + ' Km');
                }else{
                    $("#total-distance").text("---");
                }
                
               
                return true;
            } else {
                //TODO: put default values inside index
                return false;
            }
        },
        error: function(errorObject, errorText, errorHTTP) {
            
                $("#riders-count").text("Error..").css("font-size","2em");
                $("#check-in-count").text("Error..").css("font-size","2em");
                 $("#ride-images-count").text("Error..").css("font-size","2em");
                 $("#rides-tracked-count").text("Error..").css("font-size","2em");
                 $("#registered_riders_mtd").text("Error..");
                 $("#ride-images-mtd").text("Error..");
                 $("#checkins-mtd").text("Error..");
                 $("#total-distance").text("Error.");
            deleteAllCookies();
            alert('Server busy. Please try again.');
            return true;
        }
    });


}


getCards();