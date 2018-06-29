'use strict';

// Common JS file that handles the action when the editorWindow 
// is submitted and shortcodes are added into the main views.
// Using require.js
function editorWindowSubmit( editor,event ) {

	// Format self-closing shortcode tags content differently. 
	if ( event.data.shortcode === 'image'
		|| event.data.shortcode === 'br'
		|| event.data.shortcode === 'hr' ) {

		var shortcode_content = '[' + event.data.shortcode.trim() 
		+ Developry.utils.getShortcodeAtts( event.data ) + ' /]';

	} else {

		var shortcode_content = '[' + event.data.shortcode.trim() 
			+ Developry.utils.getShortcodeAtts( event.data ) + ']' 
				+ event.data.content.trim() 
				+ '[/' + event.data.shortcode.trim() + ']';
	}

	// Lets get editor content and selection (if any).
	var editor_content    = editor.getContent( { format: 'html' } );
	var editor_selection  = editor.selection.getContent( { format: 'html' } );
	var editor_selection_data_shortcode = editor.selection.getNode().getAttribute( 'data-shortcode' );

	// Get shortcode text-only (if additional <p/> are added)
	editor_selection = editor_selection.replace(/\<(?!\/?(p)[ >])[^>]*\>/ig, '');

	// Edit/Update editor content shortcode.
	if ( editor_selection ) {

		// Replace parents (they should be encoded into data-shortcode attr)
		editor_content = editor_content.replace(editor_selection_data_shortcode, encodeURIComponent(shortcode_content));
		editor_content = editor_content.replace(editor_selection, shortcode_content);
		
		editor.setContent( editor_content, { format: 'html' } );

		if ( editor_content ) {

			// If Hihlighter is on Turn it OFF and remove <mark>'s.
			if ( document.getElementsByClassName( 'button-highlight-toggler button-primary' ).length ) {

				Developry.admin.toggleCustomButtons( 
					'off', 
					document.getElementsByClassName( 'button-highlight-toggler' )[0] 
				);
			    
			    Developry.admin.highlightShortcodes( 'off', editor );

			} else {

				// Show our updated content into Shortcodes coverter area.	
				if ( ! document.getElementsByClassName( 'button-visual-toggler button-primary' ).length ) {
			
					Developry.admin.toggleCustomButtons( 
						'on', 
						document.getElementsByClassName( 'button-visual-toggler' )[0] 
					);
				}
				
				Developry.admin.loadShortcodesVisualEditor( 'on', editor );
			}
		}
	} else {

		// Add New shortcode into the editor content.
		editor_content = shortcode_content;
		editor.insertContent( editor_content, { format: 'html' } );
	}
}