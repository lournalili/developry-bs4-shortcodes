'use strict';

// Collections of functions that are used to manipulate and 
// customize the TinyMCE editor(s) behaivior.
var Developry_BS4_Admin = ( function( $, dev ) {

	// ### Private static variables.

	// Available shortcode tags.
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

    var Developry_BS4_Admin = function () {

    	// ### Private variables.

    	// ### Public function.

    	// Add plugin custom Toolbar buttons after 'Add Media'.
    	this.addCustomToolbar = function() {

    		var $custom_toolbar = $('<div/>').attr('id', 'developry-shortcodes-custom-toolbar');
				$custom_toolbar.html(
					'<button type="button" class="button button-developry-bs4-shortcodes button-preview-toggler"><span class="dashicons dashicons-desktop"></span><span class="button-text">Preview</span></button><button type="button" class="button button-developry-bs4-shortcodes button-visual-toggler"><span class="dashicons dashicons-share-alt"></span> <span class="button-text">Visualize</span></button><button type="button" class="button button-developry-bs4-shortcodes button-highlight-toggler"><span class="dashicons dashicons-visibility"></span> <span class="button-text">Highlight</span></button><span class="developry-bs4-shortcodes-hint"><em>Hint:</em> Turn on Highlight and double click on shortcode tag keyword to Edit.</span>'
				);

			$custom_toolbar.insertAfter('#insert-media-button');
    	};

    	// Create and add TinyMCE preview read-only editor.
    	this.addPreviewEditor = function( tinymce ) {

    		var $preview_editor = $('<div/>').attr('id', 'developry-shortcodes-preview-editor');
				$preview_editor.insertAfter('#wp-content-editor-container');
				$preview_editor.hide();

			tinymce.createEditor( 'developry_bs4_shortcode_preview', {});
			
			tinymce.EditorManager.init( {
				selector 	: '#developry-shortcodes-preview-editor',
				height		: 640,
				readonly 	: true,
				menubar		: false,
				plugins 	: 'fullscreen',
				toolbar1 	: 'fullscreen',
				theme		: 'modern',
				content_css : [ 
					'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/css/bootstrap.min.css',
					'http://localhost:8888/wordpress/wp-content/themes/developry-lite/assets/css/extend/admin.min.css'
				],
			} );
    	};

    	// Add toggle ON and active class the our custom preview buttons.
    	this.toggleCustomButtons = function( state, elem ) {

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
    	};

    	// Tooggle bettween the 3 different editor modes when custom buttons are clicked.
    	this.toggleEditors = function ( button, tinymce ) {

    		// Show a preview wp editor, read-only with all the content shortcodes converted.
    		if ( button.hasClass( 'button-preview-toggler' ) )  {

    			if ( button.find( '.button-text').hasClass('on') )  {
		
					this.toggleCustomButtons( 'off', button );
		
				} else {
				
					this.toggleCustomButtons( 'on', button );
				}

				this.loadPreviewEditor( tinymce.get('content') );

			// Convert all shortcode tags to HTML and then back to shortcodes
    		} else if ( button.hasClass( 'button-visual-toggler' ) ) {

    			if ( button.find( '.button-text').hasClass('on') )  {

					$( '#publish' ).attr( 'disabled', false );    				
		
					this.toggleCustomButtons( 'off', button );
					this.loadShortcodesVisualEditor( 'off', tinymce.get('content') );

				} else {

					// We don't want to be able to update in Visual mode while we have the extra HTML added.
    				$( '#publish' ).attr( 'disabled', true );
				
					this.toggleCustomButtons( 'on', button );
					this.loadShortcodesVisualEditor( 'on', tinymce.get('content') );
				}

			// Lets highlight all the shortcodes in our main content editor.
    		} else if ( button.hasClass( 'button-highlight-toggler' ) ) {
    			
    			if ( button.find( '.button-text').hasClass('on') )  {
		
					this.toggleCustomButtons( 'off', button );
					this.highlightShortcodes( 'off', tinymce.get('content') );

				} else {
				
					this.toggleCustomButtons( 'on', button );
					this.highlightShortcodes( 'on', tinymce.get('content') );

					// ONLY IF the Highlight is ON then you can edit/update shortcodes.
					dev.utils.editShortcode( tinymce.get( 'content' ) );
				}
    		}
    	};

    	// Switch between WP content and previewer windows.
    	this.loadPreviewEditor = function( editor ) {

    		var editor_content = editor.getContent( { 'format' : 'html' } );

			$.each( shortcode_tags, function( id, shortcode ) {

				editor_content = wp.shortcode.replace(shortcode, editor_content, convertShortcodeToHTML);
			});
	 	
	 		tinymce.get('developry-shortcodes-preview-editor').setContent( editor_content, { format: 'html' } );

			$( '#developry-shortcodes-preview-editor' ).prev().toggle();
			$( '#wp-content-editor-tools .wp-editor-tabs, #wp-content-editor-container').toggle();
    	};

    	// Shortcode to HTML & HTML to shortcode
		this.loadShortcodesVisualEditor = function( state, editor ) {

			if ( ! state.length || ! editor.initialized ) {
			
				return false;
			}

			var editor_content = editor.getContent( { format : 'html' } );

			if ( 'on' === state ) {

				$.each( shortcode_tags, function( id, shortcode ) {

					editor_content = wp.shortcode.replace(shortcode, editor_content, convertShortcodeToHTML);
				});

				editor.setContent( editor_content, { format: 'html' } );

			} else {

				//editor_content = updateNestedShortcodes( editor_content )
				editor_content = convertHTMLToShortcodes( editor, editor_content );

				editor.setContent( editor_content, { format: 'html' } );
			}
		}

    	// Highlight all shortcodes with <mark></mark> around them.
		this.highlightShortcodes = function ( state, editor ) {	

			if ( ! state.length || ! editor.initialized ) {

				return false;
			}
			
			var editor_content = editor.getContent( { format : 'html' } );

			if ( 'on' === state ) { 
			
				$.each( shortcode_tags, function( id, shortcode ) {
			
					var regexp = wp.shortcode.regexp( shortcode );
			
					editor_content = editor_content.replace(regexp, function( match ) {
			
						return '<mark>' + match + '</mark>';
					} );
				} );
			} else {
			
				editor_content = editor_content.replace( /<\/?mark[^>]*>/g, '' );
			}
			
			editor.setContent( editor_content, { format: 'html' } );
		};

    	// ### Private functions.

    	// Convert all shortcodes to HTML blocks
		var convertShortcodeToHTML = function( shortcode_obj ) {

			var shortcode_str  = wp.shortcode.string( shortcode_obj, tinymce.get( 'content' ) );

			var shortcode_html = dev.shortcodes.load( shortcode_obj );

			return shortcode_html;
		};
/* !REFERENCE	
var convertShortcodeToHTML = function( shortcode ) {
	var editor_content = '';
	if ( ! shortcode ) {
		return;
	}
	var shortcode_data = wp.shortcode.string( shortcode, tinymce.get( 'content' ) )
	editor_content += '<div class="wpview wpview-wrap" data-wpview-text="' 
		+ encodeURIComponent( shortcode_data )
		+ '" data-wpview-type="' + shortcode.tag.trim() + '" contenteditable="false">';
	// Initialize and load shortcode HTML.
	editor_content += dev.shortcodes.load( shortcode );
	editor_content += '<span class="wpview-end"></span></div>';
	return editor_content;
};
*/
		// Convert all HTML blocks associated with shortcodes back to shortcodes.
		var convertHTMLToShortcodes = function( editor, editor_content ) {

			var rel_content 	  = {};
			var shortcode_content = [];
			var shortcodes 		  = $( '<div/>' ).html( editor_content ).find( '*' );

			$.each( shortcodes, function( i, shortcode ) {

				var html            = shortcode.outerHTML;
				var shortcode_data  = decodeURIComponent( shortcode.getAttribute('data-shortcode') );

				rel_content[i] = {};
				rel_content[i].html = html;
				rel_content[i].shortcode = shortcode_data;

				shortcode_content.push(decodeURIComponent(shortcode_data));
			});

			var shortcode_parent = rel_content[0].shortcode;

			$.each(rel_content, function(i, elem) {

				if ('0' !== i) {
					
					shortcode_parent = shortcode_parent.replace(this.html, this.shortcode);
				}
			});

			return shortcode_parent;
		};
/* !REFERENCE
var convertHTMLToShortcodes = function( editor, editor_content ) {
	var dom  = editor.dom.getOuterHTML();
	var wrap = $( '<div/>' ).html( editor_content );
	for (var idx = 0; idx < wrap.find( '.wpview' ).length; idx++) {
		var shorcode_obj   = wrap.find( '.wpview' ).get(idx);
		var shortcode_text = decodeURIComponent( shorcode_obj.getAttribute( 'data-wpview-text' ) );
		editor_content +=  shortcode_text;
		if ( editor_content === '' ) {
			editor_content = '<p>' +  shortcode_text  + '</p>';
		} else {
			editor_content += editor_content.replace(shortcode_text, '<p>' +  shortcode_text  + '</p>');
		}
	}
	return editor_content.replace(/<p[^>]*>/g, '');
}
*/
		var updateNestedShortcodes = function( editor_content ) {

		};

/* !REFERENCE
var updateNestedShortcodes = function( visual_content, shortcode_content ) {
	if ( shortcode_content ) {
		// Update visual content.
		var selection_content_html = tinymce.get('content').selection.getNode().getAttribute('data-wpview-text');
		var selection_parent_content_html = tinymce.get('content').selection.getNode().outerHTML;
		// Remove the selected attribute.
		selection_parent_content_html = selection_parent_content_html.replace(' data-mce-selected="2"', ''); 
		// Replace the tail of our parent.
		selection_parent_content_html = selection_parent_content_html.replace('</div>', '<span class="wpview-end"></span></div>'); 
		// The shorcode tag keyword should be at match[1]
		var regexp = new RegExp('\\[([a-z-]+)(\\s[\\s\\S]*?)?\\]'
			+ '(?:((?!\\s*?(?:\\[([a-z-]+)[(.?)+]|\\[\\/(?!([a-z-]+))))[\\s\\S]*?)' 
			+ '(\\[\/([a-z-]+)\\]))?');
		var shortcode_tag 			  = shortcode_content.match(regexp);
		var shortcode_encoded_content = encodeURIComponent(shortcode_content);
		var shortcode_content_html = wp.shortcode.replace(shortcode_tag[1], shortcode_content, convertShortcodeToHTML);
		visual_content = visual_content.replace(selection_parent_content_html, shortcode_content_html);
		visual_content = visual_content.replace(selection_content_html, shortcode_encoded_content);
		// Update editor content.
	}
	return visual_content;
};
*/
    };

    return Developry_BS4_Admin;

} )( jQuery, Developry );
