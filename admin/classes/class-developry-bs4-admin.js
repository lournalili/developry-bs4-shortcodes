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
				editor_content = shortcodesToHTML( editor_content );
		
			tinymce.get('developry-shortcodes-preview-editor').setContent( editor_content, { format: 'html' } );

			$( '#developry-shortcodes-preview-editor' ).prev().toggle();
			$( '#wp-content-editor-tools .wp-editor-tabs, #wp-content-editor-container').toggle();
		};		

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

		// Shortcode to HTML & HTML to shortcode
		this.loadShortcodesVisualEditor = function( state, editor ) {

			if ( ! state.length || ! editor.initialized ) {
			
				return false;
			}

			var editor_content = editor.getContent( { format : 'html' } );

			if ( 'on' === state ) {

				editor.setContent( 
					shortcodesToHTML( editor_content ), 
					{ format: 'html' } 
				);

			} else {

				editor.setContent( 
					HTMLtoShortcodes( editor, editor_content ), 
					{ format: 'html' } 
				);
			}
		}

		// ### Private functions.

		// Convert all shortcodes to HTML blocks
		var shortcodesToHTML = function( editor_content ) {

			// Separate each line (<p></p>) into a shortcode block 
			// inluding the once that are html or text only.
			var pee_content_blocks  = '';
			var editor_content_pees = [];
			var html  			    = $.parseHTML( editor_content );

			$.each( html, function( i, html_pee_content ) {

				editor_content_pees[i] = html_pee_content.outerHTML;
			});

			// Go over all blocks and add a <div/> to distinct them.
			$.each( editor_content_pees, function( i, pee_content ) {

				// Go over each tag from our plugin and convert the shortcode 
				// into HTML (see /admin/class/class-developry-bs4-shortcodes.js).
				$.each( shortcode_tags, function( j, shortcode ) {

					pee_content = wp.shortcode.replace(shortcode, pee_content, getShortcodeHTML);
				});

				// 
				if ( $.parseHTML(pee_content)[0].dataset === undefined ) {

					pee_content_blocks += pee_content;

				} else {

					pee_content_blocks += '<div class="shortcode-block">' + pee_content + '</div>';
				}
			});

			// Return the new editor content with converted shortcodes into blocks. 
			return pee_content_blocks;
		}

		var getShortcodeHTML = function( shortcode ) {

			var shortcode_html = dev.shortcodes.load( shortcode );

			return shortcode_html;
		}

		// Convert all HTML blocks associated with shortcodes back to shortcodes.
		var HTMLtoShortcodes = function( editor, content ) {

			var html 	    = '';
			var blocks      = [];
			var rel_content = {};
			var parents     = [];
			var new_content = '';

			// Separate content by shortcode blocks.
			html = $.parseHTML( content );

			// Place each shortcode block into <div/> with nodes added into a array.
			$.each( html, function( i, block ) {

				var block_content = '';

				if ( block.className === 'shortcode-block' ) {

					// Get us the HTML between shortcode-block at [0].
					blocks[i] = $( '<div/>' ).html( block.innerHTML ).find( '*' );

				} else {

					blocks[i] = block.innerHTML;
				}
			});

			// Go over each shortcode block and put into an rel object to match the HTML to shortcode.
			rel_content = getRelationContent( blocks );
			
			// Lets start converting our HTML to shortcodes (first get all the parents).
			$.each( rel_content, function( i, rel ) {

				if ( rel[0].hasOwnProperty('shortcode') ) {

					parents[i] = this[0].shortcode;

				} else {

					parents[i] = this[0].html;
				}
			});

			// Build up the new editor content using the rel_content structure.
			new_content = getNewContent( parents, rel_content );

			return new_content;
		}
		
		// Get the relation between our content html/shortcodes/normal editor content.
		var getRelationContent = function( blocks ) {

			var counter     = 0;
			var shortcode_html = '';
			var shortcode_data = '';
			var rel_content = {};

			$.each( blocks, function( i, block ) {

				counter 	   = 0;
				rel_content[i] = {};

				if (typeof block === 'string') {

					rel_content[i][counter] = {};
					rel_content[i][counter].html = block;

					counter++;

				} else {

					$.each( block, function( j, shortcode ) {

						shortcode_html          = shortcode.outerHTML;
						shortcode_data      	= decodeURIComponent( shortcode.getAttribute( 'data-shortcode' ) );
						rel_content[i][counter] = {};

						if ( shortcode_data !== 'null' ) {

							rel_content[i][counter].html 	  = shortcode_html;
							rel_content[i][counter].shortcode = shortcode_data;

						} else {

							// In this case we have regular HTML tag/text from the editor.
							rel_content[i][counter].html = shortcode_html;
						}

						counter++;
					});
				}
			});

			return rel_content;
		}

		// Finally lets get our new/updated content and convert it back into HTML and shortcode tags.
		var getNewContent = function( parents, content ) {

			var new_content   = '';
			var parent_0      = [];

			$.each( parents, function( i, parent ) {

				parent_0 = this;				

				if ( parent_0 ) {

					$.each( content[i], function( j, block ) {

						if ('0' !== j && this.html !== undefined) {

							
							
							if ( this.shortcode !== undefined ) {

								parent_0 = parent_0.replace(this.html, this.shortcode);
								parent_0 = parent_0.replace(this.html, encodeURIComponent(this.shortcode));

							} else {

								parent_0 = parent_0.replace(this.html, this.html);
							}
						}
					});


					// Add the pee's we removed earlier.
					new_content += '<p>' + parent_0 + '</p>'
				}
			});

			return new_content;
		}
	};

	return Developry_BS4_Admin;

} )( jQuery, Developry );
