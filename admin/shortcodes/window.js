'use strict';

// Common JS file to build editorWindow(s) for our shortcodes,
// using require.js to load up.
function editorWindow( editor, shortcode_window_body, onSubmit, shortcode_tag, text ) { 	

	var shortcode_html = editor.selection.getContent( { 'format' : 'html' } );

	editor.windowManager.open({
		
		title    : 'Develop(ry) Shortcodes > Elements > ' + text,
		minWidth : 640,
		body 	 : Developry.utils.getShortcode( 
			shortcode_tag, 
			shortcode_html, 
			shortcode_window_body 
		),
		onsubmit : function( event ) {

			onSubmit( editor, event );
		},
		onclose : function( event ) {

			// TODO : When click on Cancel or X the editorWindow fires submit > close. 
			// Want to apply the following code only on close.
			// console.log(event);
			
			// Developry.admin.toggleCustomButtons( 'off', document.getElementsByClassName( 'button-primary' )[0] );
			// Developry.admin.highlightShortcodes( 'off', editor );
		},
	} );
}
