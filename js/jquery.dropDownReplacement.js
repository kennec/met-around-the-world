//   DROPDOWNREPLACEMENT - A JQUERY PLUGIN BETA
//   REPLACES / SIMULATES DROPDOWNS USING UL AND LI 
//   DEVELOPED AS FIX FOR CROSS BROWSER DISPLAY ISSUES

(function( $ ){

  $.fn.dropDownReplacement = function( options ) {  

    // DEFAULTS OVERWRITTEN IF SPECIFIED IN IMPLEMENTATION
    var settings = $.extend( {
    //  ID OF INPUT BOX FOR FORM SUBMISSION   
      'inputRef'      : '#formInput',
    // THE ID OF THE UNORDERED LIST
        'ulListRef'    : '#ul',
    // THE ATTRIBUTE THAT CONTAINS THE SERVER SIDE VALUE THAT WILL BE PUT INTO THE INPUT
        'ulAttrVal'     : 'rel', 
    // THE SPEED OF TRANSISTION WHEN SHOWING OR HIDING THE UNORDERED LIST (ulListRef)
    'speed'        : '500'
    }, options);

    return this.each(function() {      
    // HIDE SELECTABLE ITEMS WHEN PAGE IS LOADED
    $(settings.ulListRef).hide();

    // SHOW SELECTABLE ITEMS WHEN INPUT IS CLICKED
    $(settings.inputRef).click( function() { 
      if (!$(settings.ulListRef).is(":visible")) {  
          $(settings.ulListRef).toggle();            
      }
    });     

    // UPDATE INPUT VALUE WHEN SELECTABLE ITEM IS CLICKED
    $(settings.ulListRef+" li").click( function() {  

        // SET THE INPUT VALUE TO THE ulAttrVal OF THE CLICKED LI
		if (settings.uAttrVal == "html") {
			console.log ("html");			
			$(settings.inputRef).html();
		} else {
			console.log ("htm2l");			
			$(settings.inputRef).val($(this).attr(settings.ulAttrVal)); 
		}
      
      // HIDE THE UL
        $(settings.ulListRef).hide(); 
          
      // MAKE ALL LIs VIEWABLE
      $(settings.ulListRef+' li').each(function(index) { 
             $(this).show();
      });   
      
    });
    
    // UPDATE VIEWABLE LIs THAT HAVE A TEXT VALUE MATCHING THE USER INPUT
    $(settings.inputRef).focus(function() {                        
      
      // UPDATE LI DISPLAY TO NONE AS INPUT RESTRICTS THE MATCHES     
      $(settings.inputRef).keyup(function() {      
        var current = $(this);
        
        // CONVERT USER INPUT TO LOWERCASE 
            var value = $(settings.inputRef).val().toLowerCase();
          
          $(settings.ulListRef+' li').each(function(index) {                   
            
            // NOTICE VALUES ARE CONVERTED TO LOWERCASE FOR MATCHING PURPOSES
            if ($(this).text().toLowerCase().indexOf(value) == -1) {      
                      
              // IF THERE IS NO MATCH HIDE THE LI             
                $(this).hide(settings.speed); 
            
                } else {
              
              // IF THERE IS A MATCH DISPLAY THE LI
                 $(this).show(settings.speed);
            }
        });                                  
      }); 
    // CLOSE IF FOCUS CHANGES                  
    }).focusout(function() {  
      timeout = window.setTimeout(function () {
		$(settings.ulListRef).hide().delay(100);                       
      }, settings.speed);
    }); 
  }); 
  };     

})( jQuery );                             