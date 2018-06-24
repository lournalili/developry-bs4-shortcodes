// Available shortcode tags.
var shortcodes = [
	'alert', 
	'button',
];

// Set of functions that handle shortcode addition and editing done via the 
// TinyMCE editor Window Manager.
var Developry_BS4_Shortcode_Window = {
	// ALERTS
	alert : function( editor, code2html = false ) { 	

		editor.windowManager.open({
			
			title    : 'Develop(ry) Shortcodes > Elements > Alert',
			minWidth : 640,
			body 	 : Developry_BS4_Shortcode_Helpers.get_shortcode( 
				'alert', 
				editor.selection.getContent( { 'format' : 'html' } ), 
				developry_bs4_shortcode_alert 
			),
			onsubmit : function( event ) {
				editor.insertContent('[' + event.data.shortcode + ' ' 
					+ Developry_BS4_Shortcode_Helpers.get_shortcode_atts( event.data ) + ' ]' 
						+ event.data.content 
						+ '[/' + event.data.shortcode + ']'
				);

				// If ture is passed the added shortcode will be automatically converted to HTML.
				if ( code2html === true ) {

					Developry_BS4_Editor.wpcode2html( event.data.shortcode );
				}
			}
		} );
	},
	// BUTTON
	button : function( editor, code2html = false ) {

		editor.windowManager.open({			
		
			title    : 'Develop(ry) Shortcodes > Elements > Button',
			minWidth : 640,
			body 	 : Developry_BS4_Shortcode_Helpers.get_shortcode( 
				'button', editor.selection.getContent( { 'format' : 'html' } ), 
				developry_bs4_shortcode_button 
			),
			onsubmit : function( event ) {
	
				editor.insertContent('[' + event.data.shortcode + ' ' 
					+ Developry_BS4_Shortcode_Helpers.get_shortcode_atts( event.data ) + ' ]' 
						+ event.data.content 
						+ '[/' + event.data.shortcode + ']'
				);

				// If ture is passed the added shortcode will be automatically converted to HTML.
				if ( code2html === true ) {

					Developry_BS4_Editor.wpcode2html( event.data.shortcode );
				}
			}
		} );
	},
}

var Developry_BS4_Shortcode_Helpers = {

	//
	edit_shortcode : function ( editor ) {

		var regexp = new RegExp('\\[(' 
			+ shortcodes.join( '|' ) + ')(\\s[\\s\\S]*?)?\\]' + '(?:((?!\\s*?(?:\\[(' 
			+ shortcodes.join( '|' ) + ')|\\[\\/(?!(' 
			+ shortcodes.join( '|' ) + '))))[\\s\\S]*?)' + '(\\[\/(' 
			+ shortcodes.join( '|' ) + ')\\]))?');

		editor.on( 'click', function ( elem ) {

			if ( regexp.test( elem.target.innerText ) )  {

				// Clear selection.
				editor.selection.collapse(); 
				editor.selection.select( elem.target );

				// Shortcode tag is shortcode[1].
				var shortcode = elem.target.innerText.match( regexp ); 

				// Call the exec function.
				window['Developry_BS4_Shortcode_Window'][shortcode[1]]( editor ); 
			};
		});
	},
	// Helper func that will check if the user is adding a new shortcode all the params field would empty; 
	// OR if the user is selected a shorcode from the editor and would like to edit/update it, this option 
	// would have the current shortcode params already populated.
	get_shortcode : function( type, shortcode, body ) {

		Developry_BS4_Shortcode_Helpers.reset_shortcode_atts( body );

		// Regex to check if the selection has valid shortcode structure.
		var regexp = new RegExp('\\[' + type + '(\\s[\\s\\S]*?)?\\]' + '(?:((?!\\s*?(?:\\[' + type + '|\\[\\/(?!' 
			+ type + ')))[\\s\\S]*?)' + '(\\[\/' + type + '\\]))?');
		
		var selected_arr = shortcode.match(regexp);

		// Check if the shorcode exists.
		if ( regexp.test( shortcode ) ) {

			if (selected_arr[1] !== undefined
				&& selected_arr[1] !== null
				&& selected_arr[1] !== '') {

				var selected_atts = selected_arr[1].trim();
					selected_atts = selected_atts.split(/\s+(?=(?:[^\'"]*[\'"][^\'"]*[\'"])*[^\'"]*$)/);

				$.each( selected_atts, function ( id, att ) {

					att = att.replace(/\"/g, '');

					var parted_att = att.split('=');

					$.each( body, function ( id, option ) {

						if ( parted_att[0] === option.name ) {

							// populate all the parameters
							option.value = parted_att[1];
						}
					} );
				} );
			}

			// Populate the content area.
			body[0].value = selected_arr[2];

		} else {

			// Populate only the content are with the selected text ?!?
			body[0].value = shortcode;
		}

		return body;
	},
	// Helper fnc that will skip all the empty shortcode attributes and reformat the keys spaces 
	// from '_' to '-'.
	get_shortcode_atts : function( obj ) {

		var atts = '';

		$.each( obj, function ( key, val ) {

			if ( 'shortcode' !== key 
				&& 'content' !== key 
				&& ! key.startsWith( '_column' ) 
				&& val !== undefined
				&& val !== null
				&& val !== '' ) {

				atts += key.replace( '_', '-' ) + '="' + val + '" ';
			}
		} );

		return atts;
	},
	// Helper fnc that will reset populated from the previous element attributes.
	reset_shortcode_atts : function( obj ) {

		$.each( obj, function ( key, option ) {

			option.value = '';
		});

		return true;
	},
}

var Developry_BS4_Shortcodes = {

	// Initialize.
	init : function ( shortcode ) {

		var tag = shortcode.tag;

		// Call the exce function.
		return window['Developry_BS4_Shortcodes'][tag]( shortcode );
	},
	// Build the ALERT html from shortcode
	alert : function( shortcode, cls = '' ) {

		$.each( shortcode.attrs.named, function( key, val) {

			if ( 'color' === key ) {

				cls += ' alert-' + val;

			} else if ( 'dismissable' === key ) {

				cls 			 += ' alert-dismissable fade show';
				shortcode.content = '<button color="button" class="close" data-dismiss="alert" aria-label="close">'
					+ '<span aria-hidden="true">&times;</span></button>' + shortcode.content; 
			}
			else if ( null !== key) {

				cls += ' ' + val;
			}
		});

		return '<div class="alert ' + cls + '">' + shortcode.content + '</div>';
	},
	// Build the BUTTON html from shortcode
	button : function( shortcode, cls = '' ) {

		$.each( shortcode.attrs.named, function( key, val) {

			if ( 'color' === key
				|| 'size' === key
				|| 'fluid' === key ) {

				cls += ' btn-' + val;

			} else if ( 'outline' === key ) {

				cls += ' btn-outline-' + val;

			} else if ( 'href' === key ) {

				var onclick = 'location.href=\'' + val + '\'';

			} else if ( null !== key) {

				cls += ' ' + val;
			} 
		});

		return '<button class="btn ' + cls + '" ' + onclick + '>' + shortcode.content + '</button>';
	},
}

// Customize tinyMCE editor buttons and actions.
var Developry_BS4_Editor = {

	// Add toggle ON and active class the our custom preview buttons.
	toggle : function( state, elem ) {

		$( '.button-developry-bs4-shortcodes' ).attr( 'disabled', true );

		if ( 'on' === state ) {
			
			$( elem ).attr( 'disabled', false);

			$( '.button-text', elem ).addClass( 'on' );
			$( '.button-text', elem ).text( $( '.button-text', elem ).text() + ' (ON)');
			$( elem ).toggleClass( 'button-primary' );
		} else {
		
			$( '.button-developry-bs4-shortcodes' ).attr( 'disabled', false);

			$( '.button-text', elem ).removeClass('on');
			$( '.button-text', elem ).text( $( '.button-text', elem ).text().replace( ' (ON)', '' ) );
			$( elem ).toggleClass( 'button-primary' );
		}
	},
	// Switch between WP content and previewer windows.
	previewer : function ( tinymce ) {

		var html = tinymce.get('content').getContent( { 'format' : 'raw' } );

		$.each( shortcodes, function( id, shortcode ) {

			html = wp.shortcode.replace(shortcode, html, Developry_BS4_Editor.shortcode2html);
		});
	 	
	 	tinymce.get('developry-shortcodes-preview-editor').setContent( html, { format: 'raw' } );

		$( '.preview-editor-container, .preview-editor-container .wp-editor-container' ).toggle();
		$( '.wp-editor-tabs, .wp-editor-container').toggle();
	},
	// Shortcode to HTML & HTML to shortcode
	converter : function( state, tinymce ) {

		if ( ! state.length || ! tinymce.get('content').initialized ) {
		
			return false;
		}
	 
		var html = tinymce.get('content').getContent( { format : 'raw' } );

		if ( 'on' === state ) {

			$.each( shortcodes, function( id, shortcode ) {

				html = wp.shortcode.replace(shortcode, html, Developry_BS4_Editor.shortcode2html);
			});
			
			tinymce.get('content').setContent( html, { format: 'raw' } );

		} else {

			Developry_BS4_Editor.html2shortcode( html, tinymce );
		}
	},
	// Convert all shortcodes to HTML blocks
	shortcode2html : function( shortcode ) {

		var html = '';

		if ( ! shortcode ) {
    	
    		return;
  		}

		html += '<div class="wpview wpview-wrap" data-wpview-text="' 
			+ encodeURIComponent( wp.shortcode.string( shortcode ) ) + '" data-wpview-type="' 
			+ shortcode.tag + '" contenteditable="false">';

		html += Developry_BS4_Shortcodes.init(shortcode);

  		html += '<span class="wpview-end"></span></div>'

  		if ( null !== html ) {

  			return html;
  		}
  	},
  	// Covert all HTML blocks associated with shortcodes back to shortcodes.
  	html2shortcode : function( html, tinymce ) {

  		var dom  = tinymce.get( 'content' ).dom;
		var wrap = $( '<div/>' ).html( html );

		for (var idx = 0; idx < wrap.find( '.wpview' ).length; idx++) {

			var shorcode_obj   = wrap.find( '.wpview' ).get(idx);
			var shortcode_text = decodeURIComponent( shorcode_obj.getAttribute( 'data-wpview-text' ) );

			var shortcode_el = $( '<p/>' ).html( shortcode_text );
			var tinymce_el   = dom.get( dom.select( 'div[data-wpview-text="' + encodeURIComponent(shortcode_text) + '"]' ) );

			dom.replace(shortcode_el.get(0), tinymce_el);
		}
  	},
  	// Conver the WP main editor shortcode to html on edit/update
  	wpcode2html : function( shortcode ) {

  		var html = tinymce.get( 'content' ).getContent( { 'format' : 'raw' } );
			html = wp.shortcode.replace(shortcode, html, Developry_BS4_Editor.shortcode2html );

		tinymce.get('content').setContent( html, { format: 'raw' } );
  	},
	// Highlight all shortcodes with <mark></mark> around them.
	highlighter : function ( state, tinymce ) {	

		if ( ! state.length || ! tinymce.get('content').initialized ) {

			return false;
		}
		
		var html = tinymce.get('content').getContent( { format : 'raw' } );

		if ( 'on' === state ) { 
		
			$.each( shortcodes, function( id, shortcode ) {
		
				var regexp = wp.shortcode.regexp( shortcode );
		
				html = html.replace(regexp, function( match ) {
		
					return '<mark>' + match + '</mark>';
				} );
			} );
		} else {
		
			html = html.replace( /<\/?mark[^>]*>/g, '' );
		}
		
		tinymce.get('content').setContent( html, { format: 'raw' } );
	},
}

/* CONVERT THE ABOVE CODE INTO THE FOLLOWING EXAMPLE USING A CLASS
===============================================================================
	var MyClass = (function(){

	    var static_var; //static private var

	    var MyClass = function () {

	        var privateVar; //private
	        var privateFn = function(){}; //private 

	        this.someProperty = 5;  //public
	        this.anotherProperty = false;  //public
	        this.someFunction = function () {  //public
	            //do something
	        };
	    };

	    return MyClass;

	})();

	MyNamespace.MyClass = new MyClass();
*/
