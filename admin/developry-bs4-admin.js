'use strict';

var Developry = Developry || {};

// This passed from plugins_url('', __FILE__).
var url = window.Developry.baseurl || false;

// Set the base URL for our shortcode modules.
if ( url ) {
	requirejs.config( {
		baseUrl: url + '/shortcodes'
	} );
}

// Initialize all the classes loaded with wp_enqueue_script()
Developry.shortcodes = new Developry_BS4_Shortcodes;
Developry.admin      = new Developry_BS4_Admin;
Developry.utils      = new Developry_BS4_Utils;
Developry.window     = new Developry_BS4_Window;

( function ( $, dev ) {

	'use strict';

	// Bind listener to the custom toolbar buttons.
	$( document ).on( 'click', '.button-developry-bs4-shortcodes', function( e ) {

		e.preventDefault();
		dev.admin.toggleEditors( $(this), tinymce );
	} ); 

	// Create and append the custom toolbar buttons after Add Media button.
	dev.admin.addCustomToolbar();

	// Create and append the preview TinyMCE editor and main content editor.
	dev.admin.addPreviewEditor( tinymce );				

	// Initialize.
	tinymce.create( 'tinymce.plugins.developry_bs4_shortcode', { 

		init : function( editor, url ) {

			// Adding custom context menu links to handle our Visualize editor Edit and Delete.
	      	editor.addMenuItem( 'developry_bs4_shortcodes_edit', {
	         	text    : 'Edit',
	         	icon    : 'dashicon dashicons-edit',
	         	context : 'tools',
	         	onclick : function( event ) {
	            	
	            	var node = editor.selection.getNode();
	         	
	            	if ( editor.dom.getAttrib( node, 'data-shortcode-tag' )
	            		&& editor.dom.getAttrib( node, 'data-shortcode' ) ) {

	            		var shortcode_tag  = editor.dom.getAttrib( node, 'data-shortcode-tag' );
	            		var shortcode_data = decodeURIComponent( editor.dom.getAttrib( node, 'data-shortcode' ) );

	            		dev.window[shortcode_tag]( editor, true );
	            	}
	         	}
	      	});

	      	editor.addMenuItem( 'developry_bs4_shortcodes_delete', {
	         	text    : 'Delete',
	         	icon    : 'dashicon dashicons-trash',
	         	context : 'tools',
	         	onclick : function( event ) {

	            	var node 							= editor.selection.getNode();
	            	var editor_content 					= tinymce.get('content').getContent( { format : 'html' } );
	            	var editor_selection_data_shortcode = node.getAttribute( 'data-shortcode' );

	            	editor_content = editor_content.replace(editor.selection.getContent( { format : 'html' } ), '');
	            	editor_content = editor_content.replace(editor_selection_data_shortcode, '');

					editor.setContent( editor_content, { format: 'html' } );
	            	
	            	// NOTE: Another way to remove the deleted item from the DOM.
	            	// editor.selection.select( node );
	            	// editor.dom.remove( node );
	         	}
	      	});
			
			// Add TinyMCE buttons for all the shortcodes.
			editor.addButton( 'developry_bs4_shortcode_element_button', {

				type  : 'menubutton',
				title : 'Add new shortcode', 
				icon  : 'dashicon dashicons-nametag',
				menu  : [ 
					{ 
						text : 'Alert', 
						icon : 'dashicon dashicons-megaphone', 
						onclick : function( event ) { 
							dev.window.alert( editor, event ); 
						}, 
					},
					{ 
						text : 'Button', 
						icon : 'dashicon dashicons-id', 
						onclick : function() { 
							dev.window.button( editor, event );  
						}, 
					},
					{ 
						text : 'Badge', 
						icon : 'dashicon dashicons-shield-alt', 
						onclick : function() { 
							dev.window.badge( editor, event );  
						}, 
					},
					{ 
						text : 'Blockquote', 
						icon : 'dashicon dashicons-editor-quote', 
						onclick : function() { 
							dev.window.blockquote( editor, event );  
						}, 
					},
					{ 
						text : 'Break Line', 
						icon : 'dashicon dashicons-editor-break', 
						onclick : function() { 
							dev.window.br( editor, event );  
						}, 
					},
					{ 
						text : 'Horizontal Line', 
						icon : 'dashicon dashicons-minus', 
						onclick : function() { 
							dev.window.hr( editor, event );
						}, 
					},
					{ 
						text : 'Image', 
						icon : 'dashicon dashicons-format-image', 
						onclick : function() { 
							dev.window.image( editor, event ); 
						}, 
					},
					{ 
						text : 'Jumbotron', 
						icon : 'dashicon dashicons-id-alt', 
						onclick : function() { 
							dev.window.jumbotron( editor, event );  
						}, 
					},
					{ 
						text : 'Link', 
						icon : 'dashicon dashicons-admin-links', 
						onclick : function() { 
							dev.window.link( editor, event );  
						}, 
					},
					{ 
						text : 'List', 
						icon : 'dashicon dashicons-editor-ul', 
						onclick : function() { 
							dev.window.list( editor, event ); 
						}, 
					},
					{ 
						text : 'Text', 
						icon : 'dashicon dashicons-editor-textcolor', 
						onclick : function() { 
							dev.window.text( editor, event ); 
						}, 
					},
				],
			} );
		},
	} );

	// Add & execute our plugin to the plugin manager.
	tinymce.PluginManager.add( 'developry_bs4_shortcode', tinymce.plugins.developry_bs4_shortcode );	

} )( jQuery, Developry );
