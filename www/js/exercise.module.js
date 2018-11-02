var exercisebot = {
    current_id : null,
    
    getExercises : function () {
		if($('#mobile-nav-button').attr('aria-expanded')){
			$('#mobile-nav-button').click();
		}
        $.ajax({
			url: ajxURL,
			type: "GET",
			data: {
                'do' : "get_exercises",
                'client_id' : clientbot.id
            },
            success: function (result) {
                console.log(result);
				//result = JSON.stringify(result);
                exercisebot.showHome(JSON.parse(result));
                
            },
            error : function (req, txtStatus, err) {
                console.log('[NOTICE] Error fetching user information from server [STATUS:' + txtStatus + '] [ERROR:' + err + ']'); 
            }
        });
    },
    
    showHome : function (exercises=0) {
        var $screen = $('#module_content');
        var $accordion = $('#accordion').clone();
        var _toggleClass, _expanded, _collapse;
        var video_link;
        
        $screen.html('');
        
        $accordion.attr('id', 'exercise_container')
        
        for (var i = 0; i < exercises.length; i++) {
            if (i === -1) {
                _toggleClass = "";
                _expanded = "true";
                _collapse = "collapse in";
            } else {
                _toggleClass = "collapsed";
                _expanded = "false";
                _collapse = "collapse";
            }
            
            video_link = exercises[i]['exercise_video_link'].split('/');
            
            $accordion.append("<div class='panel panel-default' id='panel_" + exercises[i]['exercise_id'] + "'><div class='panel-heading' role='tab' id='heading" + i + "'><h4 class='panel-title'><a role='button' data-toggle='collapse' data-parent='#exercise_container' href='#collapse" + i + "' aria-expanded='" + _expanded + "' aria-controls='collapse" + i + "' class='" + _toggleClass + "'>" + exercises[i]['exercise_name'] + "</a></h4></div><div id='collapse" + i + "' class='panel-collapse " + _collapse + "' role='tabpanel' aria-labelledby='heading" + i + "'><div class='panel-body'><p>" + exercises[i]['exercise_description'] + "</p><div class='' style='margin-bottom: 5px;'><button class='btn btn-primary btn-sm' onclick='$(this).parent().next().slideToggle();'>Show/Hide Video</button></div><div style='display: none;'><iframe src='https://www.youtube.com/embed/" + video_link[video_link.length - 1] + "?loop=1&modestbranding=1&rel=0'></iframe><div class='form-group'><div class='input-group'><span class='input-group-addon'>Difficulty</span><select class='form-control' name='difficulty'><option value='1'>Easy</option><option value='2'>Medium</option><option value='3'>Hard</option></select></div></div><div class='form-group'><div class='input-group'><span class='input-group-addon'>Feedback</span><textarea class='form-control' name='feedback' rows='3'></textarea></div><button class='btn btn-success btn-sm pull-right' onclick='exercisebot.complete($(this));' exercise-id='" + exercises[i]['exercise_id'] + "' style='margin-top: 5px;'><span class='glyphicon glyphicon-check'></span> Complete Exercise</button></div></div></div></div></div>");
        }
        
        $screen.append($accordion);
    },
    
    complete : function ($context) {
        var $exercise_panel = $context.parent().parent().parent();
        
        exercisebot.current_id = $context.attr('exercise-id');
        
        $.ajax({
			url: ajxURL,
			type: "POST",
            data: {
                'do' : "complete_exercise",
                'client_id' : clientbot.id,
                'exercise_id' : $context.attr('exercise-id'),
                'difficulty' : $exercise_panel.find('select[name=difficulty]').val(),
                'feedback' : $exercise_panel.find('textarea[name=feedback]').val()
            },
            success: function (result) {
				console.log(result);
				//result = JSON.stringify(result);
                result = JSON.parse(result);
                
                if (typeof result.affected !== 'undefined' && result.affected === true) {
                    //exercisebot.getExercises();
                    $('#panel_' + exercisebot.current_id).fadeOut();
                } else {
                    alert("Your exercise feedback could not be saved - please contact support");
                }
            },
            error : function (req, txtStatus, err) {
                console.log('[NOTICE] Error fetching user information from server [STATUS:' + txtStatus + '] [ERROR:' + err + ']'); 
            }
        });
        
    }
};
