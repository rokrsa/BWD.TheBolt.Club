(function() {
    $('.icon-close-circle').on('click', function() {
        window.close();
    });



    // if(window.user_id != null)
    // localStorage.setItem("userId", window.user_id);

    function setUserProfile(data) {
        console.log(data);
        $('#user_profile').text(data.name);
        $("#user_profile_img").attr('src', data.photo);

        if (data.activation_code)
            $('#activation_code').text(data.activation_code);
        else
            $('#activation_code').text("NA");
        if (data.last_reported_time)
            $('#last_reported_time').text(data.last_reported_time);
        else
            $('#last_reported_time').text("NA");
        if (data.country_name && data.city_name)
            $('#location').text(data.city_name + ", " + data.country_name);
        else
            $('#location').text("NA");
        if (data.bike_model)
            $('#bike_model').text(data.bike_model);
        else
            $('#bike_model').text("NA");
        if (data.profile_email)
            $('#profile_email').text(data.profile_email);
        else
            $('#profile_email').text("NA");
    }

    function getRiderProfile() {
        jQuery.ajax({
            type: "POST",
            url: "http://api.thebolt.club/admin/rider/profile",
            headers: {
                "API_KEY": 'webapikey',
                "APP_VERSION": '1.0',
                "CONFIG_VERSION": '1.0',
            },
            data: {
                'UID': localStorage.getItem("userId")
            },
            success: function(response) {
                setUserProfile(response.data.data[0]);

            },
            error: function(errorObject, errorText, errorHTTP) {
                alert('Server busy. Please try again.');
                return true;
            }
        });


    }



    function getFollowedByRiders() {
        jQuery.ajax({
            type: "POST",
            url: "http://api.thebolt.club/user/getfollowedbylistforrider",
            headers: {
                "API_KEY": 'webapikey',
                "APP_VERSION": '1.0',
                "CONFIG_VERSION": '1.0',
                // "AUTH_TOKEN": '680211ab280fa8f9374e3d16a87995e1'
                // "AID": getCookie("AID")
            },
            data: {
                'rider_id': localStorage.getItem("userId")
            },
            success: function(response) {
                console.log(response);
                var list = response.data.response;
                for (var index in list) {

                    var friend_div = '<div id="friend_div_' + index + '" class = "friend col-3 p-1" ><img class = "w-100" src = "' +
                        list[index][0].photo + '" ></div>';
                    $("#friend_images").append(friend_div);
                    
                    $('#friend_div_' + index).on('click', { 'user_id': list[index][0].user_id }, function(event) {
                        
                        var win = window.open("./rider-profile.html");
                        // win.user_id =event.data.user_id;
                        window.localStorage.setItem("userId", event.data.user_id);

                    });
                }

                if (list.length > 8)
                    $('#see_all_friends').text(list.length)
            },
            error: function(errorObject, errorText, errorHTTP) {
                alert('Server busy. Please try again.');
                return true;
            }
        });


    }


    getRiderProfile();
    getFollowedByRiders();

})();