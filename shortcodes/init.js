'use strict';

( function ( $ ) {
	'use strict';
	
	// Create and add empty plugins for every component.
	tinymce.create( 'tinymce.plugins.developry_bs4_shortcode_alert', {} );
	tinymce.PluginManager.add( 'developry_bs4_shortcode_alert', tinymce.plugins.developry_bs4_shortcode_alert );

	tinymce.create( 'tinymce.plugins.developry_bs4_shortcode_badge', {} );
	tinymce.PluginManager.add( 'developry_bs4_shortcode_badge', tinymce.plugins.developry_bs4_shortcode_badge );

	tinymce.create( 'tinymce.plugins.developry_bs4_shortcode_blockquote', {} );
	tinymce.PluginManager.add( 'developry_bs4_shortcode_blockquote', tinymce.plugins.developry_bs4_shortcode_blockquote );

	tinymce.create( 'tinymce.plugins.developry_bs4_shortcode_button', {} );
	tinymce.PluginManager.add( 'developry_bs4_shortcode_button', tinymce.plugins.developry_bs4_shortcode_button );

	tinymce.create( 'tinymce.plugins.developry_bs4_shortcode_image', {} );
	tinymce.PluginManager.add( 'developry_bs4_shortcode_image', tinymce.plugins.developry_bs4_shortcode_image );

	tinymce.create( 'tinymce.plugins.developry_bs4_shortcode_jumbotron', {} );
	tinymce.PluginManager.add( 'developry_bs4_shortcode_jumbotron', tinymce.plugins.developry_bs4_shortcode_jumbotron );

	tinymce.create( 'tinymce.plugins.developry_bs4_shortcode_br', {} );
	tinymce.PluginManager.add( 'developry_bs4_shortcode_br', tinymce.plugins.developry_bs4_shortcode_br );

	tinymce.create( 'tinymce.plugins.developry_bs4_shortcode_hr', {} );
	tinymce.PluginManager.add( 'developry_bs4_shortcode_hr', tinymce.plugins.developry_bs4_shortcode_hr );

	tinymce.create( 'tinymce.plugins.developry_bs4_shortcode_link', {} );
	tinymce.PluginManager.add( 'developry_bs4_shortcode_link', tinymce.plugins.developry_bs4_shortcode_link );

	tinymce.create( 'tinymce.plugins.developry_bs4_shortcode_list', {} );
	tinymce.PluginManager.add( 'developry_bs4_shortcode_list', tinymce.plugins.developry_bs4_shortcode_list );

	tinymce.create( 'tinymce.plugins.developry_bs4_shortcode_list_item', {} );
	tinymce.PluginManager.add( 'developry_bs4_shortcode_list_item', tinymce.plugins.developry_bs4_shortcode_list_item );

	tinymce.create( 'tinymce.plugins.developry_bs4_shortcode_text', {} );
	tinymce.PluginManager.add( 'developry_bs4_shortcode_text', tinymce.plugins.developry_bs4_shortcode_text );

	// Initialize.
	tinymce.create( 'tinymce.plugins.developry_bs4_shortcode_init', { 

		init : function( editor, url ) {

			// Add TinyMCE buttons for all the shortcodes.
			editor.addButton( 'developry_bs4_shortcode_element_button', {

				type  : 'menubutton',
				title : 'Insert element shortcode...', 
				icon  : 'dashicon dashicons-nametag',
				menu  : [ 
					{ text : 'Alert', icon : 'dashicon dashicons-megaphone', onclick : function() { 
						Developry_BS4_Window.alert( editor ); 
					}, },
					{ text : 'Button', icon : 'dashicon dashicons-id', onclick : function() { 
						Developry_BS4_Window.button( editor ); 
					}, },
					{ text : 'Badge', icon : 'dashicon dashicons-shield-alt', onclick : function() { 
						Developry_BS4_Window.badge( editor ); 
					}, },
					{ text : 'Blockquote', icon : 'dashicon dashicons-editor-quote', onclick : function() { 
						Developry_BS4_Window.blockquote( editor ); 
					}, },
					{ text : 'Break Line', icon : 'dashicon dashicons-editor-break', onclick : function() { 
						Developry_BS4_Window.br( editor ); 
					}, },
					{ text : 'Horizontal Line', icon : 'dashicon dashicons-minus', onclick : function() { 
						Developry_BS4_Window.hr( editor ); 
					}, },
					{ text : 'Image', icon : 'dashicon dashicons-format-image', onclick : function() { 
						Developry_BS4_Window.image( editor ); 
					}, },
					{ text : 'Jumbotron', icon : 'dashicon dashicons-id-alt', onclick : function() { 
						Developry_BS4_Window.jumbotron( editor ); 
					}, },
					{ text : 'Link', icon : 'dashicon dashicons-admin-links', onclick : function() { 
						Developry_BS4_Window.link( editor ); 
					}, },
					{ text : 'List', icon : 'dashicon dashicons-editor-ul', onclick : function() { 
						Developry_BS4_Window.list( editor ); 
					}, },
					{ text : 'Text', icon : 'dashicon dashicons-editor-textcolor', onclick : function() { 
						Developry_BS4_Window.text( editor ); 
					}, },
				]
			} );

			// Extends the Edit button from /wp-includes/js/tinymce/wp-view/plugins.js [Line: 157]
			editor.addButton( 'wp_view_edit', {

				tooltip : 'Edit',
				icon    : 'dashicon dashicons-edit',
				onclick : function() {

					var node = editor.selection.getNode();

			        if ( editor.dom.hasClass( node, 'wpview' ) ) {

			        	var wrap      = $('<div/>').html( editor.selection.getNode().outerHTML ); 
			        	var shortcode = wrap.find( '.wpview' ).attr( 'data-wpview-type' );

			        	if ( Developry_BS4_Helpers.in_array( shortcode ) ) {

							if ( wrap.find( '.wpview' ).length ) {

								var shortcode = wrap.find( '.wpview' ).attr( 'data-wpview-type' );

								// Call the exec function.
								window['Developry_BS4_Window'][shortcode]( editor, true );
							}

			        	} else {

			            	wp.mce.views.edit( editor, node );
			            }
			        
			        }
				}
			} );
		}
	} );

	// Add & execute our plugin to the plugin manager.
	tinymce.PluginManager.add( 'developry_bs4_shortcode_init', tinymce.plugins.developry_bs4_shortcode_init );

} )( jQuery );
