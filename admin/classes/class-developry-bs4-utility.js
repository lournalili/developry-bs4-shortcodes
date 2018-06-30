'use strict';

// Utility functions to manipulate our plugin shortcodes.
var Developry_BS4_Utils = ( function( $, dev ) {

    var Developry_BS4_Utils = function () {

    	// ### Private static variables.

		var shortcode_tags = [
			'alert',
			'badge',
			'blockquote',
			'hr',
			'br',
			'button',
			'image',
			'jumbotron',
			'link',
			'list',
			'list-item',
			'text',
		];

    	// ### Public functions.

		// Invoke on editor click, highlight the shortcode and 
		// open the modal window with attributes to edit
		this.editShortcode = function ( editor ) {

			var regexp = new RegExp('\\[(' 
				+ shortcode_tags.join( '|' ) + ')(\\s[\\s\\S]*?)?\\]' 
				+ '(?:((?!\\s*?(?:\\[(' 
				+ shortcode_tags.join( '|' ) + ')|\\[\\/(?!(' 
				+ shortcode_tags.join( '|' ) + '))))[\\s\\S]*?)' + '(\\[\/(' 
				+ shortcode_tags.join( '|' ) + ')\\]))?');

			editor.on( 'dblclick', function ( elem ) {

				if ( regexp.test( elem.target.innerText ) )  {

					// Clear selection.
					editor.selection.collapse(); 
					editor.selection.select( elem.target );

					// Shortcode tag is shortcode[1].
					var shortcode = elem.target.innerText.match( regexp ); 

					// Call the exec function.
					dev.window[shortcode[1]]( editor, true ); 

					// Need to remove the bind for dblclick, 
					// otherwise it is called after the button is highlight OFF.
					editor.off('dblclick');
				};
			});
		};

		// Utility func that will check if the user is adding a new shortcode all the params field would empty; 
		// OR if the user is selected a shorcode from the editor and would like to edit/update it, this option 
		// would have the current shortcode params already populated.
		this.getShortcode = function( type, shortcode, body ) {

			this.resetShortcodeAtts( body );

			shortcode = decodeURIComponent( shortcode );

			// Regex to check if the selection has valid shortcode structure.
			var regexp = new RegExp('\\[' 
				+ type + '(\\s[\\s\\S]*?)?\\]'
				+ '(?:((?!\\s*?(?:\\[' 
				+ type + '[(.?)+]|\\[\\/(?!' 
				+ type + ')))[\\s\\S]*?)' + '(\\[\/' 
				+ type + '\\]))?');

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

								// Populate all the parameters.
								option.value = parted_att[1];
							}
						} );
					} );
				}

				// In case we are going to update a list populate content and 
				// disable the 'Number of Items?' option
				if (selected_arr[3] === '[/list]' 
					&& selected_arr[2] !== '') {

					body[1].disabled = true;
				}

				// Populate the content area but first check if there is 
				// text &/ text + shortcode content.
				if ( body[0].name === 'content' ) {

					var content_parts = $.parseHTML( selected_arr[2] )

					$.each( content_parts, function( i, content_part ) {			

						if ( content_part.nodeType === 3 ) {

							body[0].value +=  content_part.textContent;

						} else {

							body[0].value += decodeURIComponent(content_part.getAttribute('data-shortcode'));
						}
					});
				}

			} else {

				// Populate only the content are with of the selected text ?!?
				body[0].value = shortcode;
			}

			return body;
		};

		// Utility fnc that will skip all the empty shortcode attributes and reformat the keys spaces 
		// from '_' to '-'.
		this.getShortcodeAtts = function( obj ) {

			var atts = '';

			$.each( obj, function ( key, val ) {

				if ( 'shortcode' !== key // skip
					&& 'content' !== key // skip
					&& 'items' !== key // skip for [list][/list]
					&& ! key.startsWith( '_column' ) // skip for [layout][/layout]
					&& val !== undefined
					&& val !== null
					&& val !== '' ) {

					atts += key.replace( '_', '-' ) + '="' + val + '" ';
				}
			} );

			if ( atts ) {

				return ' ' + atts.trim();
			}

			return	atts;
		};

		// Utility fnc that will reset populated from the previous element 
		// attributes in editor modal windowManager.
		this.resetShortcodeAtts = function( obj ) {

			$.each( obj, function ( key, option ) {

				option.value = '';
			});

			return true;
		};

		// Utility fnc that will build list item(s) for our list shortcode; 
		// there are couple of different variations for lists.
		this.buildListItems = function( number, format, html = '' ) {
		
			if ( number == 0 ) {

				return '';
			}
			
			for ( var idx = 0; idx < number; idx++ ) {
		
				if (format === 'inline') {
		
					html += '[list-item format="list-inline-item" href="" xclass=""][/list-item]';
				}
				else if (format === 'group') {
		
					html += '[list-item format="list-group-item" href="" xclass=""][/list-item]';
				}
				else {
		
					html += '[list-item href="" xclass=""][/list-item]';
				}
			}
			
			return html;
		};

		// Check if shortcode is found in shortcodes array.
		// Used to extend WP core shorcode Edit button.
		this.inArray = function (value, array = shortcode_tags) {

	 		return array.indexOf(value) > -1;
		};
    };

	return Developry_BS4_Utils;

} )( jQuery, Developry );