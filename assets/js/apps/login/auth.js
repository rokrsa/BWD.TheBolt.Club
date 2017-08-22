function setUser(){
    var email = $("#loginFormInputEmail").val();
    var pwd = $("#loginFormInputPassword").val();
    if(email === ''){
        alert('Please enter a valid username.');
        return;
    }
    if(pwd === '' ){
        alert('Please enter a valid password.');
        return;
    }
    checkCreds(email, pwd);
}
function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
function checkCreds(e, p){
    //$('<div />').addClass('form-loading').insertBefore($("#free_trial_confirmation")).css('border', '3px solid rgba(255, 0, 0, 0.85)');
    jQuery.ajax({
        type: "POST",
        url: "http://api.thebolt.club/admin/login",
        data: {
            'username': e,
            'password': p,
            'type': 'w'
        },
        headers: {
            "API_KEY": 'webapikey',
            "APP_VERSION": '1.0',
            "CONFIG_VERSION": '1.0'
        },
        success: function (response,data ,headers) {
            if(response.data.status == 1) {
                document.cookie = "isLoggedIn=TRUE";
                //Setting cookie for AdminId. 
                //TODO: via request header.
				document.cookie= "AID=" +response.data.AID;
                window.location.href = "index.html?n="+encodeURI(response.data.name);
                alert('Welcome to the Bolt Wildcard License Management Tool');
                return true;
            } else{
                deleteAllCookies();
                alert('Your login failed. Please try again.');
                return false;
            }
        },
        error: function (errorObject, errorText, errorHTTP) {
            deleteAllCookies();
            alert('Your login failed. Please try again.');
            return false;
        }
    });
}