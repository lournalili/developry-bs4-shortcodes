'use strict';

( function ( $ ) {
	'use strict';
	
	// Create and add empty plugins for every component.
	tinymce.create( 'tinymce.plugins.developry_bs4_shortcode_alert', {} );
	tinymce.PluginManager.add( 'developry_bs4_shortcode_alert', tinymce.plugins.developry_bs4_shortcode_alert );

	tinymce.create( 'tinymce.plugins.developry_bs4_shortcode_button', {} );
	tinymce.PluginManager.add( 'developry_bs4_shortcode_button', tinymce.plugins.developry_bs4_shortcode_button );

	// Initialize.
	tinymce.create( 'tinymce.plugins.developry_bs4_shortcode_init', { 

		init : function( editor, url ) {

			Developry_BS4_Shortcode_Helpers.edit_shortcode( editor );

			editor.addButton( 'developry_bs4_shortcode_element_button', {

				type  : 'menubutton',
				title : 'Insert element shortcode...', 
				icon  : 'dashicon dashicons-editor-code',
				menu  : [ 
					{ text : 'Alert', onclick : function() { Developry_BS4_Shortcode_Window.alert( editor ); }, },
					{ text : 'Button', onclick : function() { Developry_BS4_Shortcode_Window.button( editor ); }, },
				]
			} );

			// Overwrites the Edit button from /wp-includes/js/tinymce/wp-view/plugins.js [Line: 157]
			editor.addButton( 'wp_view_edit', {

				tooltip : 'Edit',
				icon    : 'dashicon dashicons-edit',
				onclick : function() {

					var wrap = $('<div/>').html( editor.selection.getNode().outerHTML ); 

					if ( wrap.find( '.wpview' ).length ) {

						var shortcode = wrap.find( '.wpview' ).attr( 'data-wpview-type' );

						// Call the exec function.
						window['Developry_BS4_Shortcode_Window'][shortcode]( editor, true );
					}
				}
			} );
		}
	} );

	tinymce.PluginManager.add( 'developry_bs4_shortcode_init', tinymce.plugins.developry_bs4_shortcode_init );

} )( jQuery );
