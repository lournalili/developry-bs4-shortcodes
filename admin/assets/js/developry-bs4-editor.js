// Available shortcode tags.
var shortcodes = [
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
	shortcode2html : function( shortcode, html = '' ) {

		if ( ! shortcode ) {
    	
    		return;
  		}

  		html += '<div class="wpview wpview-wrap" data-wpview-text="' 
			+ encodeURIComponent( wp.shortcode.string( shortcode, tinymce ) )
			+ '" data-wpview-type="' + shortcode.tag + '" contenteditable="false">';

		html += Developry_BS4_Shortcodes.init( shortcode );

  		html += '<span class="wpview-end"></span></div>'

  		return html;
  	},
  	// Convert all HTML blocks associated with shortcodes back to shortcodes.
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
