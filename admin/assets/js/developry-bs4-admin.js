'use strict';

window.wp = window.wp || {};

( function ( $ ) {

	'use strict';

	// Show a preview wp editor, read-only with all the content shortcodes converted.
	$( '.button-preview-toggle' ).click( function( e ) {

		e.preventDefault();
		
		if ( $( '.button-text', this ).hasClass('on') )  {
		
			Developry_BS4_Editor.toggle( 'off', this );
		} else {
		
			Developry_BS4_Editor.toggle( 'on', this );
		}

		Developry_BS4_Editor.previewer( tinymce );
	} );

	// Convert all shortcode tags to HTML and then back to shortcodes
	$( '.button-convert-toggle' ).click( function( e ) {
		
		e.preventDefault();
		
		if ( $( '.button-text', this ).hasClass('on') )  {
		
			Developry_BS4_Editor.toggle( 'off', this );
			Developry_BS4_Editor.converter( 'off', tinymce );
		
		} else {
		
			Developry_BS4_Editor.toggle( 'on', this );
			Developry_BS4_Editor.converter( 'on', tinymce );
		}
	} );

	// Lets highlight all the shortcodes in our main content editor.
	$( '.button-highlight-toggle' ).click( function( e ) {

		e.preventDefault();
		
		if ( $( '.button-text', this ).hasClass('on') )  {
		
			Developry_BS4_Editor.toggle( 'off', this );
			Developry_BS4_Editor.highlighter( 'off', tinymce );
		
		} else {
		
			Developry_BS4_Editor.toggle( 'on', this );
			Developry_BS4_Editor.highlighter( 'on', tinymce );
		}
	} );
} )( jQuery );
