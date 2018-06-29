'use strict';

// Common JS file to build editorWindow(s) for our shortcodes,
// using require.js to load up.
function editorWindow( editor, body, onSubmit, type, text ) { 	

	editor.windowManager.open({
		
		title    : 'Develop(ry) Shortcodes > Elements > ' + text,
		minWidth : 640,
		body 	 : Developry.utils.getShortcode( 
			type, 
			editor.selection.getContent( { 'format' : 'html' } ), 
			body 
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
