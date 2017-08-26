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
        return (Math.floor(num/100000) / 10) + 'M';
    else if (num > 999)
        return  (Math.floor(num/100)/10 )+ 'K';
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

            debugger;
            if (response.data.status) {

                var jsonData = response.dashboard[0];

                for(item in jsonData){
                    if(jsonData[item] != null){
                        var text = formatter(parseInt(jsonData[item]))

                        if(item == "distance_covered")
                            text += ' KM'
                        jsonData[item] != null ? $("#"+item).text(text): $("#"+item).text("---");
                    }
                }
                
                
                return true;
            } else {
                //TODO: put default values inside index
                return false;
            }
        },
        error: function(errorObject, errorText, errorHTTP) {
            
                $("#riders_count").text("Error..").css("font-size","2em");
                $("#check_in_count").text("Error..").css("font-size","2em");
                 $("#images_count").text("Error..").css("font-size","2em");
                 $("#rides_tracked_count").text("Error..").css("font-size","2em");
                 $("#registered_riders_mtd").text("Error..");
                 $("#ride_images_mtd").text("Error..");
                 $("#checkins_mtd").text("Error..");
                 $("#distance_covered").text("Error.");
            deleteAllCookies();
            alert('Server busy. Please try again.');
            return true;
        }
    });


}


getCards();