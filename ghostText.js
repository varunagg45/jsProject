(function( $ ) {
  $.fn.addGhostText = function( txt, type){
  	if( $.trim(txt) == ""){
		if( !!console && !!console.log){
			console.log( "Empty value passed to the ghost text." )
		}
		return;	
	}
  	
	var element = $(this);
	var _txt = txt;
	var _type = type;
	var p_classes = null;
	var p_id = null;
	var p_element = null;

	if(type=="PASSWORD"){
		p_classes = $(element).attr("class");
		p_id = $(element).attr("id");
		p_element = element;
		$(element).after("<input type='text' class='" + p_classes + "' id='" + p_id + "'>");
		var _element = $(element).next();
		$(element).remove();
		element = _element;
	}

	// Do not add the value if there is already some value available.
	if( $.trim(element.val()) == ""){
		element.css({"color":"#cccccc"});
		element.val(txt);
	}

	element.bind("focus", function(){
		if( $(this).val() == _txt && ($(this).css("color") == "#cccccc" || $(this).css("color") == "rgb(204, 204, 204)") ){
			$(this).css({"color":"#000000"}).val("");
			if( _type == "PASSWORD"){
				$(this).before(p_element).remove();
				$(p_element).css({"color": "#000000"}).focus();
			}
		}
	});

	element.bind("blur", function(){
		var value = ($(this).val()).replace(/(^\s*)|(\s*$)/g, '');
		if( value == "" ){
			$(this).css({"color":"#cccccc"}).val(_txt);
		}
	});
}
})( jQuery );

