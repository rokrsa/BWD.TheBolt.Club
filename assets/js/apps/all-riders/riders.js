(function() {

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    function setCards(data) {


        for (i = 0; i < data.length; i++) {

            var lastReportedTime = data[i].last_reported_time;
            if (lastReportedTime && lastReportedTime) {
                lastReportedTimeDiv = '<div class=" company text-truncate px-1 d-none d-sm-flex">' + lastReportedTime.split(" ")[0] +
                    ' </div>';
            }
            var contact_item = '<div id="contact_item_' + data[i].user_id + '" class="contact-item ripple fuse-ripple-ready row no-gutters align-items-center py-2 px-3 py-sm-4 px-sm-6">' +
                '<label class="custom-control custom-checkbox">' +
                '<input type="checkbox" class="custom-control-input" />' +
                ' <span class="custom-control-indicator"></span>' +
                '</label>' +
                ' <img class="avatar mx-4" alt="Abbott" src="' + data[i].photo + '" />' +
                '<div class="col text-truncate font-weight-bold">' + data[i].name + '</div>' +
                '<div class="col email text-truncate px-6 d-none d-xl-flex">' + data[i].email +
                ' </div>' +
                ' <div class="col phone text-truncate px-6 d-none d-xl-flex">' + data[i].bike_model +
                '</div>' +
                '<div class="col job-title text-truncate px-1 d-none d-sm-flex">' + data[i].city_name +
                '</div>' + lastReportedTimeDiv +
                '<div class="col-auto actions">' +
                '<div class="row no-gutters">' +
                '<button type="button" class="btn btn-icon">' +
                ' <i class="icon-star-outline"></i>' +
                '</button>' +
                '<button type="button" class="btn btn-icon">' +
                '  <i class="icon icon-dots-vertical"></i>' +
                '</button>' +
                '</div>' +
                ' </div>' +
                '</div>';
            $(contact_item).insertAfter("#contact_list_header");

            $('#contact_item_' + data[i].user_id).on('click', { 'user_id': data[i].user_id }, function(event) {
                
                var win = window.open("./rider-profile.html");
                // win.user_id =event.data.user_id;
                window.localStorage.setItem("userId", event.data.user_id);

            });
        }


    }



    function getRecentRiders() {
        jQuery.ajax({
            type: "POST",
            url: "http://api.thebolt.club/admin/riders",
            headers: {
                "API_KEY": 'webapikey',
                "APP_VERSION": '1.0',
                "CONFIG_VERSION": '1.0',
                // 'AUTH_TOKEN': 16
                // "AID": getCookie("AID")
            },
            data: {
                // 'AID': getCookie("AID")
                'AID':1
            },
            success: function(response) {


                console.log(response.data.data);
                setCards(response.data.data);

            },
            error: function(errorObject, errorText, errorHTTP) {
                alert('Server busy. Please try again.');
                return true;
            }
        });


    }


    getRecentRiders();

})();