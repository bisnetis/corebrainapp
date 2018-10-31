var generalbot = {
    loginState : 0,
    
    signIn : function () {
        var $screen = $('#login_screen');
        var $home = $('#main_screen');
        
        $.getJSON(
			ajxURL,
			{
                'do' : "sign_in",
                'email' : $screen.find('input[name=email]').val(),
                'password' : $screen.find('input[name=password]').val()
            },
            function (result) {
				//console.log(result);
				result = JSON.stringify(result);
                var json = JSON.parse(result);
                //console.log(json);
                if (typeof json.result === 'undefined') {
                    clientbot.id = json[0]['id'];
                    clientbot.firstName = json[0]['first_name'];
                    clientbot.lastName = json[0]['last_name'];
                    clientbot.email = json[0]['email'];
                    
                    generalbot.loginState = 1;
                    
                    $home.removeClass('hide');
                    exercisebot.getExercises();
                    $screen.fadeOut();
					console.log(clientbot);
                } else {
                    alert('Incorrect login credentials - please try again.');
                }
                
            }
        );
        
    },
    
    checkSignin : function (e) {
        if (e.keyCode == 13) {
            $('#login_button').click();
        }
    }
};