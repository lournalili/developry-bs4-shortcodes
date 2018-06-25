// Available shortcode tags.
var shortcodes = [
	'alert',
	'badge',
	'blockquote',
	'br',
	'button',
	'image',
	'jumbotron',
	'link',
	'list',
	'list-item',
	'text',
];

// TinyMCE Window Manager functions for adding shortcodes.
var Developry_BS4_Window = {
	// ALERTS
	alert : function( editor ) { 	

		editor.windowManager.open({
			
			title    : 'Develop(ry) Shortcodes > Elements > Alert',
			minWidth : 640,
			body 	 : Developry_BS4_Helpers.get_shortcode( 
				'alert', 
				editor.selection.getContent( { 'format' : 'html' } ), 
				developry_bs4_shortcode_alert 
			),
			onsubmit : function( event ) {
				
				if ( $( '.button-developry-bs4-shortcodes.button-primary' ) ) {

					Developry_BS4_Editor.converter( 'on', tinymce );
				
				} else {

					editor.insertContent('[' + event.data.shortcode + ' ' 
						+ Developry_BS4_Helpers.get_shortcode_atts( event.data ) + ' ]' 
							+ event.data.content 
							+ '[/' + event.data.shortcode + ']'
					);
				}
			}
		} );
	},
	// BADGE
	badge : function( editor ) {

		editor.windowManager.open({			
		
			title    : 'Develop(ry) Shortcodes > Elements > Badge',
			minWidth : 640,
			body 	 : Developry_BS4_Helpers.get_shortcode( 
				'badge', editor.selection.getContent( { 'format' : 'html' } ), 
				developry_bs4_shortcode_badge 
			),
			onsubmit : function( event ) {
	
				editor.insertContent('[' + event.data.shortcode + ' ' 
					+ Developry_BS4_Helpers.get_shortcode_atts( event.data ) + ' ]' 
						+ event.data.content 
						+ '[/' + event.data.shortcode + ']'
				);
			}
		} );
	},
	// BLOCKQUOTE
	blockquote : function( editor ) {

		editor.windowManager.open({			
		
			title    : 'Develop(ry) Shortcodes > Elements > Blockquote',
			minWidth : 640,
			body 	 : Developry_BS4_Helpers.get_shortcode( 
				'blockquote', editor.selection.getContent( { 'format' : 'html' } ), 
				developry_bs4_shortcode_blockquote 
			),
			onsubmit : function( event ) {
	
				editor.insertContent('[' + event.data.shortcode + ' ' 
					+ Developry_BS4_Helpers.get_shortcode_atts( event.data ) + ' ]' 
						+ event.data.content 
						+ '[/' + event.data.shortcode + ']'
				);
			}
		} );
	},
	// BR
	br : function( editor ) {

		editor.windowManager.open({			
		
			title    : 'Develop(ry) Shortcodes > Elements > Break Line',
			minWidth : 640,
			body 	 : Developry_BS4_Helpers.get_shortcode( 
				'br', editor.selection.getContent( { 'format' : 'html' } ), 
				developry_bs4_shortcode_br 
			),
			onsubmit : function( event ) {
	
				editor.insertContent('[' + event.data.shortcode + ' ' 
					+ Developry_BS4_Helpers.get_shortcode_atts( event.data ) + ' /]' 
				);
			}
		} );
	},
	// BUTTON
	button : function( editor ) {

		editor.windowManager.open({			
		
			title    : 'Develop(ry) Shortcodes > Elements > Button',
			minWidth : 640,
			body 	 : Developry_BS4_Helpers.get_shortcode( 
				'button', editor.selection.getContent( { 'format' : 'html' } ), 
				developry_bs4_shortcode_button 
			),
			onsubmit : function( event ) {
	
				editor.insertContent('[' + event.data.shortcode + ' ' 
					+ Developry_BS4_Helpers.get_shortcode_atts( event.data ) + ' ]' 
						+ event.data.content 
						+ '[/' + event.data.shortcode + ']'
				);
			}
		} );
	},
	// IMAGE
	image : function( editor ) {

		editor.windowManager.open({			
		
			title    : 'Develop(ry) Shortcodes > Elements > Image',
			minWidth : 640,
			body 	 : Developry_BS4_Helpers.get_shortcode( 
				'image', editor.selection.getContent( { 'format' : 'html' } ), 
				developry_bs4_shortcode_image 
			),
			onsubmit : function( event ) {
	
				editor.insertContent('[' + event.data.shortcode + ' ' 
					+ Developry_BS4_Helpers.get_shortcode_atts( event.data ) + ' /]' 
				);
			}
		} );
	},
	// JUMBOTRON
	jumbotron : function( editor ) {

		editor.windowManager.open({			
		
			title    : 'Develop(ry) Shortcodes > Elements > Jumbotron',
			minWidth : 640,
			body 	 : Developry_BS4_Helpers.get_shortcode( 
				'jumbotron', editor.selection.getContent( { 'format' : 'html' } ), 
				developry_bs4_shortcode_jumbotron 
			),
			onsubmit : function( event ) {
	
				editor.insertContent('[' + event.data.shortcode + ' ' 
					+ Developry_BS4_Helpers.get_shortcode_atts( event.data ) + ' ]' 
						+ event.data.content 
						+ '[/' + event.data.shortcode + ']'
				);
			}
		} );
	},
	// LINK
	link : function( editor ) {

		editor.windowManager.open({			
		
			title    : 'Develop(ry) Shortcodes > Elements > Link',
			minWidth : 640,
			body 	 : Developry_BS4_Helpers.get_shortcode( 
				'link', editor.selection.getContent( { 'format' : 'html' } ), 
				developry_bs4_shortcode_link 
			),
			onsubmit : function( event ) {
	
				editor.insertContent('[' + event.data.shortcode + ' ' 
					+ Developry_BS4_Helpers.get_shortcode_atts( event.data ) + ' ]' 
						+ event.data.content 
						+ '[/' + event.data.shortcode + ']'
				);
			}
		} );
	},
	// LIST
	list : function( editor ) {


		editor.windowManager.open({			
		
			title    : 'Develop(ry) Shortcodes > Elements > List',
			minWidth : 640,
			body 	 : Developry_BS4_Helpers.get_shortcode( 
				'list', editor.selection.getContent( { 'format' : 'html' } ), 
				developry_bs4_shortcode_list 
			),
			onsubmit : function( event ) {

				var items_content = ''

				if ( !event.data.content ) {

					// On edit/update this is skipped since we already have some content!
					// Then the 'Number of Items?' field won't be active on update
					items_content = Developry_BS4_Helpers.build_list_items(event.data.items, event.data.format);

				} else {

					items_content = event.data.content;
				}

				editor.insertContent('[' + event.data.shortcode + ' ' 
					+ Developry_BS4_Helpers.get_shortcode_atts( event.data ) + ' ]'  
					+  items_content
					+  '[/' + event.data.shortcode + ']');
			}
		} );
	},
	// LIST ITEM
	'list-item' : function( editor ) {

		editor.windowManager.open({			
		
			title    : 'Develop(ry) Shortcodes > Elements > List Item',
			minWidth : 640,
			body 	 : Developry_BS4_Helpers.get_shortcode( 
				'list-item', editor.selection.getContent( { 'format' : 'html' } ), 
				developry_bs4_shortcode_list_item 
			),
			onsubmit : function( event ) {
	
				editor.insertContent('[' + event.data.shortcode + ' ' 
					+ Developry_BS4_Helpers.get_shortcode_atts( event.data ) + ' ]' 
						+ event.data.content 
						+ '[/' + event.data.shortcode + ']'
				);
			}
		} );
	},
	// TEXT
	text : function( editor ) {

		editor.windowManager.open({			
		
			title    : 'Develop(ry) Shortcodes > Elements > Text',
			minWidth : 640,
			body 	 : Developry_BS4_Helpers.get_shortcode( 
				'text', editor.selection.getContent( { 'format' : 'html' } ), 
				developry_bs4_shortcode_text 
			),
			onsubmit : function( event ) {

				if ( $( '.button-developry-bs4-shortcodes.button-primary' ) ) {

					var dom  = tinymce.get( 'content' ).dom;

					var shortcode_text = '[' + event.data.shortcode + ' ' 
						+ Developry_BS4_Helpers.get_shortcode_atts( event.data ) + ' ]' 
							+ event.data.content 
							+ '[/' + event.data.shortcode + ']';

					var shortcode_el = $( '<p/>' ).html( shortcode_text );
					var tinymce_el   = tinymce.get( 'content' ).selection.getNode()

					dom.replace(shortcode_el.get(0), tinymce_el);

					// Developry_BS4_Editor.converter( 'on', tinymce );
				
				} else {

					editor.insertContent('[' + event.data.shortcode + ' ' 
						+ Developry_BS4_Helpers.get_shortcode_atts( event.data ) + ' ]' 
							+ event.data.content 
							+ '[/' + event.data.shortcode + ']'
					);
				}
			}
		} );
	},
}