var generalbot = {
    loginState : 0,
    
    signIn : function () {
        var $screen = $('#login_screen');
        var $home = $('#main_screen');
        
        $.ajax({
			url: ajxURL,
			type: "POST",
			data:  {
                'do' : "sign_in",
                'email' : $screen.find('input[name=email]').val(),
                'password' : $screen.find('input[name=password]').val()
            },
            success: function (result) {
				//console.log(result);
                var json = JSON.parse(result);
                //console.log(json);
                if (typeof json.result === 'undefined') {
                    clientbot.id = json[0]['id'];
                    clientbot.firstName = json[0]['first_name'];
                    clientbot.lastName = json[0]['last_name'];
                    clientbot.email = json[0]['email'];
                    
                    generalbot.loginState = 1;
                    $('#client_name']).html(clientbot.firstname + " " + clientbot.lastname);
                    $home.removeClass('hide');
                    exercisebot.getExercises();
                    $screen.fadeOut();
					//console.log(clientbot);
                } else {
                    alert('Incorrect login credentials - please try again.');
                }
                
            },
        	error : function (req, txtStatus, err) {
                console.log('[NOTICE] Error fetching user information from server [STATUS:' + txtStatus + '] [ERROR:' + err + ']'); 
            }
        }); 
        
    },
    
    checkSignin : function (e) {
        if (e.keyCode == 13) {
            $('#login_button').click();
        }
    }
};
