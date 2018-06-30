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
		var shortcodesToHTML = function( editor_content ) {

			// Separate each line (<p></p>) into a shortcode block 
			// inluding the once that are html or text only.
			var pee_content_blocks  = '';
			var editor_content_pees = [];
			var html  			    = $.parseHTML( editor_content );

			$.each( html, function( i, html_pee_content ) {

				editor_content_pees[i] = html_pee_content.innerHTML;
			});

			// Go over all blocks and add a <div/> to distinct them.
			$.each( editor_content_pees, function( i, pee_content ) {

				pee_content_blocks += '<div class="shortcode-block">';

				// Go over each tag from our plugin and convert the shortcode 
				// into HTML (see /admin/class/class-developry-bs4-shortcodes.js).
				$.each( shortcode_tags, function( j, shortcode ) {

					pee_content = wp.shortcode.replace(shortcode, pee_content, getShortcodeHTML);
				});

				pee_content_blocks += pee_content + '</div>';
			});

			// Return the new editor content with converted shortcodes into blocks. 
			return pee_content_blocks;
		}

		var getShortcodeHTML = function( shortcode ) {

			var shortcode_html = dev.shortcodes.load( shortcode );

			return shortcode_html;
		}

		// Convert all HTML blocks associated with shortcodes back to shortcodes.
		var HTMLtoShortcodes = function( editor, editor_content ) {

			var counter     				= '';
			var html 	 					= '';
			var shortcode_data 				= '';
			var rel_content 				= {};
			var shortcode_content  		   	= [];
			var editor_content_blocks  		= [];
			var editor_content_blocks_arr 	= [];
			var editor_new_content 			= '';

			// Separate content by shortcode blocks. 
			var html = $.parseHTML( editor_content );

			$.each( html, function( i, html_block_content ) {

				editor_content_blocks[i] = html_block_content.innerHTML;
			});

			// Place each shortcode block into <div/> with nodes added into a array.
			$.each( editor_content_blocks, function( i, editor_content_block ) {

				var editor_content_html = $.parseHTML( editor_content_block );

				if (editor_content_html[0].nodeType === 3) {

					editor_content_blocks_arr[i] = editor_content_html[0].textContent;
				} else {

					editor_content_blocks_arr[i] = $( '<div/>' ).html( editor_content_block ).find( '*' );
				}
			});

			// Go over each shortcode block and put into an rel object to match the HTML to shortcode 
			$.each( editor_content_blocks_arr, function( i, shortcodes ) {

				counter 	   = 0;
				rel_content[i] = {};

				if (typeof shortcodes === 'string') {

					rel_content[i][counter] = {};
					rel_content[i][counter].html = shortcodes;

					counter++;

				} else {

					$.each( shortcodes, function( j, shortcode ) {

						html                	= shortcode.outerHTML;
						shortcode_data      	= decodeURIComponent( shortcode.getAttribute( 'data-shortcode' ) );
						rel_content[i][counter] = {};

						if ( shortcode_data !== 'null' ) {

							rel_content[i][counter].html 	  = html;
							rel_content[i][counter].shortcode = shortcode_data;

							shortcode_content.push( decodeURIComponent( shortcode_data ) );
							counter++;
						} 
					});
				}
			});

			// Lets start converting our HTML to shortcodes (first get all the parents)
			var shortcode_parents = [];
			var shortcode_parent_i = '';

			$.each( rel_content, function( i, shortcodes ) {

				if (rel_content[i][0].shortcode === undefined) {

					shortcode_parents[i] = rel_content[i][0].html;

				} else if ( ! jQuery.isEmptyObject(rel_content[i])  ) {

					shortcode_parents[i] = rel_content[i][0].shortcode;
				}
			});

			// Build up the new editor content using the rel_content structure
			$.each( shortcode_parents, function( i, shortcode_parent ) {

				shortcode_parent_i = this;

				if ( shortcode_parent_i ) {

					$.each( rel_content[i], function( j, elem ) {

						if ('0' !== j && this.html !== undefined) {

							shortcode_parent_i = shortcode_parent_i.replace(this.html, this.shortcode);
							shortcode_parent_i = shortcode_parent_i.replace(this.html, encodeURIComponent(this.shortcode));
						}
					});

					// Add the pee's we removed earlier.
					editor_new_content += '<p>' + shortcode_parent_i + '</p>'
				}
			});

			return editor_new_content;
		}


	};

	return Developry_BS4_Admin;

} )( jQuery, Developry );
