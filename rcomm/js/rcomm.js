var rcomm_fl = 0;$(document).on('ready ajaxSuccess', function() {	$('#ajax_display').on('click', '.rcomm_rl', function() {		var rt1 = $(this).attr('value1');		var rt2 = $(this).attr('value2');		scroll_to_view_reply_elem(rt1,rt2, false );	    return false;	});	$('#ajax_display').on('mouseleave', '.rcomm_rl', function() {      if(rcomm_fl == 1){		var rt1 = $(this).attr('value1');		var rt2 = $(this).attr('value2');		scroll_to_view_reply_elem(rt1,rt2, true );        }	})});function rcomm_ajaxSend(settings) {if(settings.ckeditor && (CKEDITOR.instances)){	var editor_data = CKEDITOR.instances.rtext.getData();	$('#commentform input[name=rtext2]').val(editor_data);	if(settings.ckeditor_id){	var editor_data = CKEDITOR.instances.rcomm_minieditor.getData();	$('form[id^=comreply_box_form] input[name=rtext3]').val(editor_data);		}}	var method = settings.method ? settings.method.toUpperCase() : 'GET';	var data = settings.data || '';	var url = settings.url || $('#' + settings.formId).attr('action');	if (method == 'POST') {		data += '&' + $('#' + settings.formId).serialize();	} else if (settings.formId) {		var sep = url.indexOf('?') > 0 ? '&' : '?';		url += sep + $('#' + settings.formId).serialize();	}	$.ajax({		type: method,		url: encodeURI(url),		data: data,		beforeSend: function() {			if (!settings.nonshowloading && !settings.ajaxId) $('#' + settings.divId).append('<span style="position:absolute; left:' + ($('#' + settings.divId).width()/2 - 110) + 'px;top:' + ($('#' + settings.divId).height()/2 - 9) + 'px;" class="loading" id="loading"><img src="./images/spinner.gif" alt="loading"/></span>').css('position', 'relative');		    if(settings.ajaxId) $('#' + settings.ajaxId).append('<span style="position:absolute; right:-25px;top:6px;" class="loading" id="loading"><img src="plugins/rcomm/js/ajax-loader.gif" alt="loading"/></span>').css('position', 'relative');		},		success: function(msg) {			if (settings.ckeditor_clr && settings.ckeditor)CKEDITOR.instances.rtext.setData('');			if (!settings.nonshowloading) $('#loading').remove();			if(settings.removeId){$('#'+settings.removeId).remove();}            if(settings.clearTxT){$('#commentform').trigger( 'reset' );            }			if (settings.append){			$('.rcomm_line').remove();			$('#' + settings.divId).append(msg); }			else {$('#' + settings.divId).html(msg);			}			for (var i = 0; i < ajaxSuccessHandlers.length; i++) {				ajaxSuccessHandlers[i]();			}		},		error: function(msg) {			if (!settings.nonshowloading) $('#loading').remove();			if (ajaxErrorHandlers.length > 0) {				for (var i = 0; i < ajaxErrorHandlers.length; i++) {					if (ajaxErrorHandlers[i].divId == settings.divId)						ajaxErrorHandlers[i].func(msg);				}			} else {				alert('AJAX error: ' + msg);				ajaxError = true;			}		}	});	return false;}function scroll_to_elem(elem,speed,speedshow ) {	if(document.getElementById(elem)) {		$('#'+elem).css("opacity", 0.1);		var destination = (jQuery('#'+elem).offset().top)-200;		jQuery("html,body").animate({scrollTop: destination}, speed, "linear", function(){         $('#'+elem).animate({"opacity": 1},speedshow);		});	}}function scroll_to_view_reply_elem(replyId,thisId,out ) {   if(document.getElementById('pos'+replyId) ) {     var destination_r = (jQuery('#pos'+replyId).offset().top);     var destination_th = (jQuery('#pos'+thisId).offset().top);     var hg = destination_th -  destination_r  - 20 -  $('#pos'+replyId).height()- parseInt($("#pos"+thisId).css('marginBottom'),10) - 2 ;     if(out){        rcomm_fl = 0        $('#pos'+thisId +' .authorbox').removeClass("scroll_comments");     	$('#pos'+replyId).animate({"opacity": 0},300).animate({"top": 0}, 0, "linear",     	 function(){			     	$('#pos'+replyId +' .authorbox').removeClass("scroll_comments_r");			     	$('#pos'+replyId+' .rcomm_rl').removeClass("rcomm_rl_none");			     	$('.rcomm_line').removeClass("rcomm_rl_none");			        $('#pos'+replyId).animate({"opacity": 1},300).removeClass("scroll_comments_r");					}		);     }else{        $('#pos'+replyId).animate({"opacity": 0},200).animate({"top": hg}, 0).animate({"opacity": 1},0, "linear",	         function(){				        $('#pos'+replyId +' .authorbox').addClass("scroll_comments_r");				        $('#pos'+thisId +' .authorbox').addClass("scroll_comments");				        $('#pos'+replyId+' .rcomm_rl').addClass("rcomm_rl_none");				        $('.rcomm_line').addClass("rcomm_rl_none");				        rcomm_fl = 1;				        }        );         }    }} function insert_line (reply, start, end, colorline, only, desc, mline, mbox) {        var leftpadding = mline;        if(desc == 'yes'){leftpadding = -(mbox-mline);}        var border_line = '1';        var border_style = 'dashed';        var h_aj = $("#ajax_display").height();        var p_aj = $("#ajax_display").offset().top;        var m_t =  parseInt($(".authorbox").css('marginTop'),10);        var m_b =  parseInt($(".authorbox").css('marginBottom'),10);        var h_r = $("#pos"+reply).height();        var h_e = $("#pos"+end).height();        var h_p = $("#rcomm_page").height();        var noreply = nostart = noend = false;        var t_h = 0;        console.log('h_aj='+h_aj, 'p_aj='+p_aj, 'reply='+reply, 'start='+start, 'end='+end);        // reply        if($("div").is("#pos"+reply))        {   var p_r = $("#pos"+reply).offset().top;        }else{noreply = true;}        // end        if($("div").is("#pos"+end)){	        	p_e = $("#pos"+end).offset().top;        	}else{	        	noend = true;                if(only){t_h = h_p + m_b + m_t;}        	}        // start        if($("div").is("#pos"+start)){p_s = $("#pos"+start).offset().top;        }else{nostart = true;}     if((start = end && nostart && !noend && desc == 'no') || (start = end && nostart && desc == 'yes')){     	var m_e = p_aj + h_aj - (p_r + (h_r/2) + t_h) ;     	var top = h_r/2;     	$("#pos"+reply).append("<div class='rcomm_line'  style='position:absolute;top:"+top+"px;left:"+leftpadding+"px;height:"+m_e+"px;border-left:"+border_line+"px "+border_style+" "+colorline+";'></div>");      }     if(start != end && !noend){     	var m_e = p_e  - p_r - h_r + (h_e/2) ;     	var top = h_r;     	if(desc == 'yes'){var m_e = p_e  - p_r - (h_r/2)  ; var top = h_r/2; }     	$("#pos"+reply).append("<div class='rcomm_line'  style='position:absolute;top:"+top+"px;left:"+leftpadding+"px;height:"+m_e+"px;border-left:"+border_line+"px "+border_style+" "+colorline+";'></div>");      }     if(start != end && noend){     	var m_e = p_aj + h_aj - (p_r + h_r + t_h) ;     	var top = h_r;     	if(desc == 'yes'){var top = h_r/2;}     	$("#pos"+reply).append("<div class='rcomm_line'  style='position:absolute;top:"+top+"px;left:"+leftpadding+"px;height:"+m_e+"px;border-left:"+border_line+"px "+border_style+" "+colorline+";'></div>");      }}