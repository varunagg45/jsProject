/**
 * Author: Varun Aggarwal
 * email: agg.varun@gmail.com
 * 
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 * 
 * 
 * 
 * @param {String}: "txt": The string that would be added as the default text when nothing is provided.
 * @param {String}: "type": By default it considers the element as input field. But you can pass another parameter "PASSWORD" so that it produces the ghost text for the password field.
 * 
 */
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

