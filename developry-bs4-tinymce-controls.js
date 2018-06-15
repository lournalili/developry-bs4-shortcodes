
'use strict';

jQuery( document ).ready( function( $ ) {

	'use strict';

	tinymce.create( 'tinymce.plugins.developry_plugin', {
		init : function( editor, url ) {
			// adding buttons and menus onto the TinyMCE toolbar
			// ELEMENTS
			editor.addButton( 'developry_element_button', {
				type  : 'menubutton',
				title : 'Insert element shortcode...', 
				image : url.replace( 'assets/js', '' ) + '/assets/img/developry-element-icon.png',
				menu  : [
					{ text : 'Alert', onclick : function( ) { editor.execCommand( 'alert' ) } }, 
					{ text : 'Badge', onclick : function( ) { editor.execCommand( 'badge' ) } }, 
					{ text : 'Blockquote', onclick : function( ) { editor.execCommand( 'blockquote' ) } }, 
					{ text : 'Button', onclick : function( ) { editor.execCommand( 'button' ) } }, 
					{ text : 'Image', onclick : function( ) { editor.execCommand( 'image' ) } }, 
					{ text : 'Jumbotron', onclick : function( ) { editor.execCommand( 'jumbotron' ) } }, 
					{ text : 'Table', onclick : function( ) { editor.execCommand( 'table' ) } }, 
					{ text : 'Link', onclick : function( ) { editor.execCommand( 'link' ) } }, 
					{ text : 'Text', onclick : function( ) { editor.execCommand( 'text' ) } }, 
					{ text : 'List', onclick : function( ) { editor.execCommand( 'list' ) } }
				]
			} );
			// adding exec commands attached to each plugin item from the toolbar 
			// ALERT
			editor.addCommand('alert', function( ) {
				editor.windowManager.open( {
					title    : 'Develop(ry) Shortcodes > Elements > Alert',
					minWidth :  640,
					body     : [
						{ label : '', type  : 'container', html  : 'Adding <b>[alert]...[/alert]</b> shortcode with parameters.' },
						{ label : 'Shortcode', type  : 'listbox', name  : 'shortcode', values: [ { text  : 'Alert', value : 'alert' } ] },
						{ label : 'Color', type  : 'listbox', name  : 'color', 
							values: [ 
								{ text  : 'none', value : '' },
								{ text  : 'primary', value : 'primary' },
								{ text  : 'secondary', value : 'secondary'}
							]
						},
						{ label : 'Is dismissable?', type  : 'listbox', name  : 'dismissable', 
							values: [
								{ text  : 'no', value : '' },
								{ text  : 'yes', value : 'dismissable'}
							]
						},
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : 'xclass', value : '' },
						{ label : 'Content', type  : 'textbox',  name  : 'content', value : '' }
					],
					onsubmit: function( event ) {
						editor.insertContent('[' + event.data.shortcode + ' ' + get_shortcode_atts( event.data ) + ' ]' + event.data.content +  '[/' + event.data.shortcode + ']');
					}
				} );
			} );
			// BADGE
			editor.addCommand('badge', function( ) {
				editor.windowManager.open( {
					title    : 'Develop(ry) Elements > Badge',
					minWidth :  640,
					body     : [
						{ label : '', type  : 'container', html  : 'Adding <b>[badge]...[/badge]</b> shortcode with parameters.' },
						{ label : 'Shortcode', type  : 'listbox', name  : 'shortcode', values: [ { text  : 'Badge', value : 'badge' } ] },
						{ label : 'Color', type  : 'listbox', name  : 'color', 
							values: [ 
								{ text  : 'none', value : '' },
								{ text  : 'primary', value : 'primary' },
								{ text  : 'secondary', value : 'secondary'}
							]
						},
						{ label : 'External or local link target', type  : 'textbox',  name  : 'href', value : '' },
						{ label : 'Is it a pill type?', type  : 'listbox', name  : 'pill', 
							values: [
								{ text  : 'no', value : '' },
								{ text  : 'yes', value : 'pill'}
							]
						},
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : 'xclass', value : '' },
						{ label : 'Content', type  : 'textbox',  name  : 'content', value : '' }
					],
					onsubmit: function( event ) {
						editor.insertContent('[' + event.data.shortcode + ' ' + get_shortcode_atts( event.data ) + ' ]' + event.data.content +  '[/' + event.data.shortcode + ']');
					}
				} );
			} );
			// BLOCKQUOTE
			editor.addCommand('blockquote', function( ) {
				editor.windowManager.open( {
					title    : 'Develop(ry) Elements > Blockquote',
					minWidth :  640,
					body     : [
						{ label : '', type  : 'container', html  : 'Adding <b>[blockquote]...[/blockquote]</b> shortcode with parameters.' },
						{ label : 'Shortcode', type  : 'listbox', name  : 'shortcode', values: [ { text  : 'Blockquote', value : 'blockquote' } ] },
						{ label : 'Background Color', type  : 'listbox', name  : 'bg-color', 
							values: [ 
								{ text  : 'none', value : '' },
								{ text  : 'primary', value : 'primary' },
								{ text  : 'secondary', value : 'secondary'}
							]
						},
						{ label : 'Text Color', type  : 'listbox', name  : 'text-color', 
							values: [ 
								{ text  : 'none', value : '' },
								{ text  : 'primary', value : 'primary' },
								{ text  : 'secondary', value : 'secondary'}
							]
						},
						{ label : 'Text Alignment', type  : 'listbox', name  : 'text-align', 
							values: [ 
								{ text  : 'none', value : '' },
								{ text  : 'left', value : 'left' },
								{ text  : 'right', value : 'right' },
								{ text  : 'center', value : 'center' }
							]
						},
						{ label : 'Source (accepts HTML tags)', type  : 'textbox',  name  : 'source', value : '' },
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : 'xclass', value : '' },
						{ label : 'Content', type  : 'textbox',  name  : 'content', value : '' }
					],
					onsubmit: function( event ) {
						editor.insertContent('[' + event.data.shortcode + ' ' + get_shortcode_atts( event.data ) + ' ]' + event.data.content +  '[/' + event.data.shortcode + ']');
					}
				} );
			} );
			// BUTTON
			editor.addCommand('button', function( ) {
				editor.windowManager.open( {
					title    : 'Develop(ry) Elements > Button',
					minWidth :  640,
					body     : [
						{ label : '', type  : 'container', html  : 'Adding <b>[button]...[/button]</b> shortcode with parameters.' },
						{ label : 'Shortcode', type  : 'listbox', name  : 'shortcode', values: [ { text  : 'Button', value : 'button' } ] },
						{ label : 'Color', type  : 'listbox', name  : 'color', 
							values: [ 
								{ text  : 'none', value : '' },
								{ text  : 'primary', value : 'primary' },
								{ text  : 'secondary', value : 'secondary'}
							]
						},
						{ label : 'Outline Border', type  : 'listbox', name  : 'outline', 
							values: [ 
								{ text  : 'none', value : '' },
								{ text  : 'primary', value : 'primary' },
								{ text  : 'secondary', value : 'secondary'}
							]
						},
						{ label : 'Size', type  : 'listbox', name  : 'size', 
							values: [ 
								{ text  : 'normal', value : '' },
								{ text  : 'smaller', value : 'sm' },
								{ text  : 'larger', value : 'lg'}
							]
						},
						{ label : 'Link', type  : 'textbox',  name  : 'href', value : '' },
						{ label : 'Is it active?', type  : 'listbox', name  : '', 
							values: [
								{ text  : 'no', value : '' },
								{ text  : 'yes', value : 'href'}
							]
						},
						{ label : 'Is it disabled?', type  : 'listbox', name  : 'disabled', 
							values: [
								{ text  : 'no', value : '' },
								{ text  : 'yes', value : 'disabled'}
							]
						},
						{ label : 'Is it 100% width?', type  : 'listbox', name  : 'block', 
							values: [
								{ text  : 'no', value : '' },
								{ text  : 'yes', value : 'block'}
							]
						},
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : 'xclass', value : '' },
						{ label : 'Content', type  : 'textbox',  name  : 'content', value : '' }
					],
					onsubmit: function( event ) {
						editor.insertContent('[' + event.data.shortcode + ' ' + get_shortcode_atts( event.data ) + ' ]' + event.data.content +  '[/' + event.data.shortcode + ']');
					}
				} );
			} );
			// IMAGE
			editor.addCommand('image', function( ) {
				editor.windowManager.open( {
					title    : 'Develop(ry) Elements > Image',
					minWidth :  640,
					body     : [
						{ label : '', type  : 'container', html  : 'Adding <b>[image /]</b> shortcode with parameters.' },
						{ label : 'Shortcode', type  : 'listbox', name  : 'shortcode', values: [ { text  : 'Image', value : 'image' } ] },
						{ label : 'URL', type  : 'textbox',  name  : 'src', value : '' },
						{ label : 'Alt (alternative) text', type  : 'textbox',  name  : 'alt', value : '' },
						{ label : 'Is the image fluid?', type  : 'listbox', name  : 'fluid', 
							values: [
								{ text  : 'no', value : '' },
								{ text  : 'yes', value : 'fluid'}
							]
						},
						{ label : 'Is the image thumbnail (adding border) ?', type  : 'listbox', name  : 'thumbnail', 
							values: [
								{ text  : 'no', value : '' },
								{ text  : 'yes', value : 'thumbnail'}
							]
						},
						{ label : 'Is the image rounded (adding round egdes border) ?', type  : 'listbox', name  : 'rounded', 
							values: [
								{ text  : 'no', value : '' },
								{ text  : 'yes', value : 'rounded'}
							]
						},
						{ label : 'Is the image circled (make square image circles and rectangular elipses) ?', type  : 'listbox', name  : 'circle', 
							values: [
								{ text  : 'no', value : '' },
								{ text  : 'yes', value : 'circle'}
							]
						},
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : 'xclass', value : '' },
					],
					onsubmit: function( event ) {
						editor.insertContent('[' + event.data.shortcode + ' ' + get_shortcode_atts( event.data ) + ' /]');
					}
				} );
			} );
			// JUMBOTRON
			editor.addCommand('jumbotron', function( ) {
				editor.windowManager.open( {
					title    : 'Develop(ry) Elements > Jumbotron',
					minWidth :  640,
					body     : [
						{ label : '', type  : 'container', html  : 'Adding <b>[jumbotron]...[/jumbotron]</b> shortcode with parameters.' },
						{ label : 'Shortcode', type  : 'listbox', name  : 'shortcode', values: [ { text  : 'Jumbotron', value : 'jumbotron' } ] },
						{ label : 'Background Color', type  : 'listbox', name  : 'bg-color', 
							values: [ 
								{ text  : 'none', value : '' },
								{ text  : 'primary', value : 'primary' },
								{ text  : 'secondary', value : 'secondary'}
							]
						},
						{ label : 'Text Color', type  : 'listbox', name  : 'text-color', 
							values: [ 
								{ text  : 'none', value : '' },
								{ text  : 'primary', value : 'primary' },
								{ text  : 'secondary', value : 'secondary'}
							]
						},
						{ label : 'Is it fluid (no padding) ?', type  : 'listbox', name  : 'fluid', 
							values: [
								{ text  : 'no', value : '' },
								{ text  : 'yes', value : 'fluid'}
							]
						},
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : 'xclass', value : '' },
						{ label : 'Content', type  : 'textbox',  name  : 'content', value : '' }
					],
					onsubmit: function( event ) {
						editor.insertContent('[' + event.data.shortcode + ' ' + get_shortcode_atts( event.data ) + ' ]' + event.data.content +  '[/' + event.data.shortcode + ']');
					}
				} );
			} );
			// TABLE
			editor.addCommand('table', function( ) {
				editor.windowManager.open( {
					title    : 'Develop(ry) Elements > Table',
					minWidth :  640,
					body     : [
						{ label : '', type  : 'container', html  : 'Adding <b>[table]...[/table]</b> shortcode with parameters.' },
						{ label : 'Shortcode', type  : 'listbox', name  : 'shortcode', values: [ { text  : 'Table', value : 'table' } ] },
						{ label : 'Table background color', type  : 'listbox', name  : 'color', 
							values: [ 
								{ text  : 'none', value : '' },
								{ text  : 'dark', value : 'dark' },
								{ text  : 'light', value : 'light'}
							]
						},
						{ label : 'Table cell padding and spacing', type  : 'listbox', name  : 'size', 
							values: [ 
								{ text  : 'normal', value : '' },
								{ text  : 'smaller', value : 'sm' }
							]
						},
						{ label : 'Is the table striped?', type  : 'listbox', name  : 'striped', 
							values: [
								{ text  : 'no', value : '' },
								{ text  : 'yes', value : 'striped'}
							]
						},
						{ label : 'Does the table have borderes?', type  : 'listbox', name  : 'bordered', 
							values: [
								{ text  : 'no', value : '' },
								{ text  : 'yes', value : 'bordered'}
							]
						},
						{ label : 'Does the table have hover effect?', type  : 'listbox', name  : 'hover', 
							values: [
								{ text  : 'no', value : '' },
								{ text  : 'yes', value : 'hover'}
							]
						},
						{ label : 'Is the table responsive?', type  : 'listbox', name  : 'responsive', 
							values: [
								{ text  : 'no', value : '' },
								{ text  : 'yes', value : 'responsive'}
							]
						},
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : 'xclass', value : '' },
					],
					onsubmit: function( event ) {
						editor.insertContent('[' + event.data.shortcode + ' ' + get_shortcode_atts( event.data ) + ' ][/' + event.data.shortcode + ']');
					}
				} );
			} );
			// LINK
			editor.addCommand('link', function( ) {
				editor.windowManager.open( {
					title    : 'Develop(ry) Elements > Link',
					minWidth :  640,
					body     : [
						{ label : '', type  : 'container', html  : 'Adding <b>[link]...[/link]</b> shortcode with parameters.' },
						{ label : 'Shortcode', type  : 'listbox', name  : 'shortcode', values: [ { text  : 'Link', value : 'link' } ] },
						{ label : 'Text color', type  : 'listbox', name  : 'text-color', 
							values: [ 
								{ text  : 'none', value : '' },
								{ text  : 'primary', value : 'primary' },
								{ text  : 'secondary', value : 'secondary'}
							]
						},
						{ label : 'External or local link target', type  : 'textbox',  name  : 'href', value : '#' },
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : 'xclass', value : '' },
						{ label : 'Content', type  : 'textbox',  name  : 'content', value : '' }
					],
					onsubmit: function( event ) {
						editor.insertContent('[' + event.data.shortcode + ' ' + get_shortcode_atts( event.data ) + ' ]' + event.data.content +  '[/' + event.data.shortcode + ']');
					}
				} );
			} );
			// TEXT
			editor.addCommand('text', function( ) {
				editor.windowManager.open( {
					title    : 'Develop(ry) Elements > Text',
					minWidth :  640,
					body     : [
						{ label : '', type  : 'container', html  : 'Adding <b>[text]...[/text]</b> shortcode with parameters.' },
						{ label : 'Shortcode', type  : 'listbox', name  : 'shortcode', values: [ { text  : 'Text', value : 'text' } ] },
						{ label : 'Background color', type  : 'listbox', name  : 'bg-color', 
							values: [ 
								{ text  : 'none', value : '' },
								{ text  : 'primary', value : 'primary' },
								{ text  : 'secondary', value : 'secondary'}
							]
						},
						{ label : 'Text color', type  : 'listbox', name  : 'text-color', 
							values: [ 
								{ text  : 'none', value : '' },
								{ text  : 'primary', value : 'primary' },
								{ text  : 'secondary', value : 'secondary'}
							]
						},
						{ label : 'Text size', type  : 'listbox', name  : 'size', 
							values: [ 
								{ text  : 'none', value : '' },
								{ text  : 'heading 1', value : 'h1' },
								{ text  : 'heading 2', value : 'h2'}
							]
						},
						{ label : 'Text display size (much larger text)', type  : 'listbox', name  : 'display', 
							values: [ 
								{ text  : 'none', value : '' },
								{ text  : 'display 1', value : 'display-1' },
								{ text  : 'display 2', value : 'display-2'}
							]
						},
						{ label : 'Text horizontal alignment', type  : 'listbox', name  : 'align', 
							values: [ 
								{ text  : 'none', value : '' },
								{ text  : 'left', value : 'left' },
								{ text  : 'right', value : 'right'},
								{ text  : 'center', value : 'center'}
							]
						},
						{ label : 'Is a lead text (little larger that normal text, perfect for first paragraphs) ?', type  : 'listbox', name  : 'lead', 
							values: [
								{ text  : 'no', value : '' },
								{ text  : 'yes', value : 'lead'}
							]
						},
						{ label : 'Is a heading (uses h[1-6] instead of p tag) ?', type  : 'listbox', name  : 'heading', 
							values: [
								{ text  : 'no', value : '' },
								{ text  : 'yes', value : 'heading'}
							]
						},
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : 'xclass', value : '' },
						{ label : 'Content', type  : 'textbox',  name  : 'content', value : '' }
					],
					onsubmit: function( event ) {
						editor.insertContent('[' + event.data.shortcode + ' ' + get_shortcode_atts( event.data ) + ' ]' + event.data.content +  '[/' + event.data.shortcode + ']');
					}
				} );
			} );
			// LIST
			editor.addCommand('list', function( ) {
				editor.windowManager.open( {
					title    : 'Develop(ry) Elements > List',
					minWidth :  640,
					body     : [
						{ label : '', type  : 'container', html  : 'Adding <b>[list][list-item]...[/list-item]...[/list]</b> shortcode with parameters.' },
						{ label : 'Shortcode', type  : 'listbox', name  : 'shortcode', values: [ { text  : 'List', value : 'list' } ] },
						{ label : 'List type', type  : 'listbox', name  : 'type', 
							values: [ 
								{ text  : 'none', value : '' },
								{ text  : 'ordered (1, 2, 3...)', value : 'ordered' },
								{ text  : 'unordered', value : 'unordered'}
							]
						},
						{ label : 'List formatting', type  : 'listbox', name  : 'format', 
							values: [ 
								{ text  : 'none', value : '' },
								{ text  : 'inlined', value : 'list-inline' },
								{ text  : 'unstyled', value : 'list-unstyled'},
								{ text  : 'grouped', value : 'list-group'}
							]
						},
						{ label : 'List text alignment', type  : 'listbox', name  : 'align', 
							values: [ 
								{ text  : 'none', value : '' },
								{ text  : 'left', value : 'left' },
								{ text  : 'right', value : 'right'},
								{ text  : 'center', value : 'center'}
							]
						},
						{ label : 'Is this list used as a nav?', type  : 'listbox', name  : 'nav', 
							values: [
								{ text  : 'no', value : '' },
								{ text  : 'yes', value : 'nav'}
							]
						},
						{ label : 'Is this list flushed?', type  : 'listbox', name  : 'flush', 
							values: [
								{ text  : 'no', value : '' },
								{ text  : 'yes', value : 'flush'}
							]
						},
						{ label : 'How many items are in the list?', type  : 'listbox', name  : 'items', 
							values: [
								{ text  : '0', value : '' },
								{ text  : '1', value : '1'},
								{ text  : '2', value : '2'},
								{ text  : '3', value : '3'},
								{ text  : '4', value : '4'},
								{ text  : '5', value : '5'},
								{ text  : '6', value : '6'},
								{ text  : '7', value : '7'},
								{ text  : '8', value : '8'},
								{ text  : '9', value : '9'},
								{ text  : '10', value : '10'},
							]
						},
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : 'xclass', value : '' },
					],
					onsubmit: function( event ) {

						editor.insertContent('[' + event.data.shortcode + ' ' + get_shortcode_atts( event.data ) + ' ]' + build_list_items(event.data.items, event.data.format) +  '[/' + event.data.shortcode + ']');
					}
				} );
			} );
			// BLOCKS
			editor.addButton('developry_block_button', {
				type  : 'menubutton',
				title : 'Insert block shortcode...', 
				image : url.replace( 'assets/js', '' ) + '/assets/img/developry-block-icon.png',
				menu  : [{ 
					text : 'Layout',
					menu : [
						{ text : 'One Column', onclick : function( ) { editor.execCommand( 'one_column' ) } },
						{ text : 'Two Columns', onclick : function( ) { editor.execCommand( 'two_columns' ) } },
						{ text : 'Three Columns', onclick : function( ) { editor.execCommand( 'three_columns' ) } }, 
						{ text : 'Four Columns', onclick : function( ) { editor.execCommand( 'four_columns' ) } }
					]
				}]
			} );
			// adding exec commands attached to each plugin item from the toolbar 
			// ONE COLUMN LAYOUT
			editor.addCommand('one_column', function( ) {
				editor.windowManager.open( {
					title    : 'Develop(ry) Shortcodes > Blocks > Layout > One Column',
					minWidth :  640,
					body     : [
						{ label : '', type  : 'container', html  : 'Adding <b>[one-colum][column]...[/column][/one-colum]</b> shortcode block with parameters.' },
						{ label : 'Shortcode', type  : 'listbox', name  : 'shortcode', values: [ { text  : 'One Column', value : 'one-column' } ] },
						{ label : 'What is the layout column vertical alignment?', type  : 'listbox', name  : 'valign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'top', value : 'start' },
								{ text  : 'middle', value : 'center'},
								{ text  : 'bottom', value : 'end' }
							]
						},
						{ label : 'What is the layout column horizontal alignment?', type  : 'listbox', name  : 'halign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'left', value : 'start' },
								{ text  : 'right', value : 'end'},
								{ text  : 'center', value : 'center' },
								{ text  : 'around', value : 'around' },
								{ text  : 'between', value : 'between' }
							]
						},
						{ label : 'Do you want to remove the gutters?', type  : 'listbox', name  : 'no-gutters', 
							values: [
								{ text  : 'no', value : '' },
								{ text  : 'yes', value : 'no-gutters'}
							]
						},
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : 'xclass', value : '' },
						// 1st
						{ label : '', type  : 'container', html  : '<b>BUILD YOUR LAYOUT 1ST COLUMN BELOW:</b>' },
						{ label : 'Column grid size', type  : 'listbox', name  : '_column_1_grid', 
							values: [ 
								{ text  : '100%', value : '12' },
								{ text  : '50%', value : '6' },
								{ text  : '33%', value : '4'},
								{ text  : '25%', value : '3'}
							]
						},
						{ label : 'What is the column horizontal position?', type  : 'listbox', name  : '_column_1_halign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'left', value : 'left' },
								{ text  : 'right', value : 'right'},
								{ text  : 'center', value : 'center' }
							]
						},
						{ label : 'What is the column vertical position?', type  : 'listbox', name  : '_column_1_valign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'top', value : 'start' },
								{ text  : 'middle', value : 'center'},
								{ text  : 'bottom', value : 'end' }
							]
						},
						{ label : 'Content', type  : 'textbox',  name  : 'content', value : '', multiline : true },
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : '_column_1_xclass', value : '' }
					],
					onsubmit: function( event ) {
						editor.insertContent('[' + event.data.shortcode + ' ' + get_shortcode_atts( event.data ) + ' ]' + build_column_content(event.data) +  '[/' + event.data.shortcode + ']');
					}
				} );
			} );
			// TWO COLUMN LAYOUT
			editor.addCommand('two_columns', function( ) {
				editor.windowManager.open( {
					title    : 'Develop(ry) Shortcodes > Blocks > Layout > Two Columns',
					minWidth :  640,
					body     : [
						{ label : '', type  : 'container', html  : 'Adding <b>[two-colums][column]...[/column][column]...[/column][/two-colum]</b> shortcode block with parameters.' },
						{ label : 'Shortcode', type  : 'listbox', name  : 'shortcode', values: [ { text  : 'Two Columns', value : 'two-columns' } ] },
						{ label : 'What is the layout column vertical alignment?', type  : 'listbox', name  : 'valign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'top', value : 'start' },
								{ text  : 'middle', value : 'center'},
								{ text  : 'bottom', value : 'end' }
							]
						},
						{ label : 'What is the layout column horizontal alignment?', type  : 'listbox', name  : 'halign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'left', value : 'start' },
								{ text  : 'right', value : 'end'},
								{ text  : 'center', value : 'center' },
								{ text  : 'around', value : 'around' },
								{ text  : 'between', value : 'between' }
							]
						},
						{ label : 'Do you want to remove the gutters?', type  : 'listbox', name  : 'no-gutters', 
							values: [
								{ text  : 'no', value : '' },
								{ text  : 'yes', value : 'no-gutters'}
							]
						},
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : 'xclass', value : '' },
						// 1st
						{ label : '', type  : 'container', html  : '<b>BUILD YOUR LAYOUT 1ST COLUMN BELOW:</b>' },
						{ label : 'Column grid size', type  : 'listbox', name  : '_column_1_grid', 
							values: [ 
								{ text  : '100%', value : '12' },
								{ text  : '50%', value : '6' },
								{ text  : '33%', value : '4'},
								{ text  : '25%', value : '3'}
							]
						},
						{ label : 'What is the column horizontal position?', type  : 'listbox', name  : '_column_1_halign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'left', value : 'left' },
								{ text  : 'right', value : 'right'},
								{ text  : 'center', value : 'center' }
							]
						},
						{ label : 'What is the column vertical position?', type  : 'listbox', name  : '_column_1_valign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'top', value : 'start' },
								{ text  : 'middle', value : 'center'},
								{ text  : 'bottom', value : 'end' }
							]
						},
						{ label : 'Content', type  : 'textbox',  name  : 'content', value : '', multiline : true },
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : '_column_1_xclass', value : '' },
						// 2nd
						{ label : '', type  : 'container', html  : '<b>BUILD YOUR LAYOUT 2ND COLUMN BELOW:</b>' },
						{ label : 'Column grid size', type  : 'listbox', name  : '_column_2_grid', 
							values: [ 
								{ text  : '100%', value : '12' },
								{ text  : '50%', value : '6' },
								{ text  : '33%', value : '4'},
								{ text  : '25%', value : '3'}
							]
						},
						{ label : 'What is the column horizontal position?', type  : 'listbox', name  : '_column_2_halign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'left', value : 'left' },
								{ text  : 'right', value : 'right'},
								{ text  : 'center', value : 'center' }
							]
						},
						{ label : 'What is the column vertical position?', type  : 'listbox', name  : '_column_2_valign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'top', value : 'start' },
								{ text  : 'middle', value : 'center'},
								{ text  : 'bottom', value : 'end' }
							]
						},
						{ label : 'Content', type  : 'textbox',  name  : 'content', value : '', multiline : true },
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : 'xclass', value : '' },
					],
					onsubmit: function( event ) {
						editor.insertContent('[' + event.data.shortcode + ' ' + get_shortcode_atts( event.data ) + ' ]' + build_column_content(event.data) +  '[/' + event.data.shortcode + ']');
					}
				} );
			} );
			// THREE COLUMN LAYOUT
			editor.addCommand('three_columns', function( ) {
				editor.windowManager.open( {
					title    : 'Develop(ry) Shortcodes > Blocks > Layout > Three Columns',
					minWidth :  640,
					body     : [
						{ label : '', type  : 'container', html  : 'Adding <b>[three-colums][column]...[/column][column]...[/column][column]...[/column][/three-colum]</b> shortcode block with parameters.' },
						{ label : 'Shortcode', type  : 'listbox', name  : 'shortcode', values: [ { text  : 'Three Columns', value : 'three-columns' } ] },
						{ label : 'What is the layout column vertical alignment?', type  : 'listbox', name  : 'valign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'top', value : 'start' },
								{ text  : 'middle', value : 'center'},
								{ text  : 'bottom', value : 'end' }
							]
						},
						{ label : 'What is the layout column horizontal alignment?', type  : 'listbox', name  : 'halign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'left', value : 'start' },
								{ text  : 'right', value : 'end'},
								{ text  : 'center', value : 'center' },
								{ text  : 'around', value : 'around' },
								{ text  : 'between', value : 'between' }
							]
						},
						{ label : 'Do you want to remove the gutters?', type  : 'listbox', name  : 'no-gutters', 
							values: [
								{ text  : 'no', value : '' },
								{ text  : 'yes', value : 'no-gutters'}
							]
						},
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : 'xclass', value : '' },
						// 1st
						{ label : '', type  : 'container', html  : '<b>BUILD YOUR LAYOUT 1ST COLUMN BELOW:</b>' },
						{ label : 'Column grid size', type  : 'listbox', name  : '_column_1_grid', 
							values: [ 
								{ text  : '100%', value : '12' },
								{ text  : '50%', value : '6' },
								{ text  : '33%', value : '4'},
								{ text  : '25%', value : '3'}
							]
						},
						{ label : 'What is the column horizontal position?', type  : 'listbox', name  : '_column_1_halign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'left', value : 'left' },
								{ text  : 'right', value : 'right'},
								{ text  : 'center', value : 'center' }
							]
						},
						{ label : 'What is the column vertical position?', type  : 'listbox', name  : '_column_1_valign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'top', value : 'start' },
								{ text  : 'middle', value : 'center'},
								{ text  : 'bottom', value : 'end' }
							]
						},
						{ label : 'Content', type  : 'textbox',  name  : 'content', value : '', multiline : true },
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : '_column_1_xclass', value : '' },
						// 2nd
						{ label : '', type  : 'container', html  : '<b>BUILD YOUR LAYOUT 2ND COLUMN BELOW:</b>' },
						{ label : 'Column grid size', type  : 'listbox', name  : '_column_2_grid', 
							values: [ 
								{ text  : '100%', value : '12' },
								{ text  : '50%', value : '6' },
								{ text  : '33%', value : '4'},
								{ text  : '25%', value : '3'}
							]
						},
						{ label : 'What is the column horizontal position?', type  : 'listbox', name  : '_column_2_halign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'left', value : 'left' },
								{ text  : 'right', value : 'right'},
								{ text  : 'center', value : 'center' }
							]
						},
						{ label : 'What is the column vertical position?', type  : 'listbox', name  : '_column_2_valign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'top', value : 'start' },
								{ text  : 'middle', value : 'center'},
								{ text  : 'bottom', value : 'end' }
							]
						},
						{ label : 'Content', type  : 'textbox',  name  : 'content', value : '', multiline : true },
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : '_column_2_xclass', value : '' },
						// 3rd
						{ label : '', type  : 'container', html  : '<b>BUILD YOUR LAYOUT 3rd COLUMN BELOW:</b>' },
						{ label : 'Column grid size', type  : 'listbox', name  : '_column_3_grid', 
							values: [ 
								{ text  : '100%', value : '12' },
								{ text  : '50%', value : '6' },
								{ text  : '33%', value : '4'},
								{ text  : '25%', value : '3'}
							]
						},
						{ label : 'What is the column horizontal position?', type  : 'listbox', name  : '_column_3_halign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'left', value : 'left' },
								{ text  : 'right', value : 'right'},
								{ text  : 'center', value : 'center' }
							]
						},
						{ label : 'What is the column vertical position?', type  : 'listbox', name  : '_column_3_valign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'top', value : 'start' },
								{ text  : 'middle', value : 'center'},
								{ text  : 'bottom', value : 'end' }
							]
						},
						{ label : 'Content', type  : 'textbox',  name  : 'content', value : '', multiline : true },
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : '_column_3_xclass', value : '' },
					],
					onsubmit: function( event ) {
						editor.insertContent('[' + event.data.shortcode + ' ' + get_shortcode_atts( event.data ) + ' ]' + build_column_content(event.data) +  '[/' + event.data.shortcode + ']');
					}
				} );
			} );
			// FOUR COLUMN LAYOUT	
			editor.addCommand('four_columns', function( ) {
				editor.windowManager.open( {
					title    : 'Develop(ry) Shortcodes > Blocks > Layout > Four Columns',
					minWidth: 640,
					body     : [
						{ label : '', type  : 'container', html  : 'Adding <b>[four-colums][column]...[/column][column]...[/column][column]...[/column][column]...[/column][/four-colum]</b> shortcode block with parameters.' },
						{ label : 'Shortcode', type  : 'listbox', name  : 'shortcode', values: [ { text  : 'Four Columns', value : 'four-columns' } ] },
						{ label : 'What is the layout column vertical alignment?', type  : 'listbox', name  : 'valign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'top', value : 'start' },
								{ text  : 'middle', value : 'center'},
								{ text  : 'bottom', value : 'end' }
							]
						},
						{ label : 'What is the layout column horizontal alignment?', type  : 'listbox', name  : 'halign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'left', value : 'start' },
								{ text  : 'right', value : 'end'},
								{ text  : 'center', value : 'center' },
								{ text  : 'around', value : 'around' },
								{ text  : 'between', value : 'between' }
							]
						},
						{ label : 'Do you want to remove the gutters?', type  : 'listbox', name  : 'no-gutters', 
							values: [
								{ text  : 'no', value : '' },
								{ text  : 'yes', value : 'no-gutters'}
							]
						},
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : 'xclass', value : '' },
						// 1st
						{ label : '', type  : 'container', html  : '<b>BUILD YOUR LAYOUT 1ST COLUMN BELOW:</b>' },
						{ label : 'Column grid size', type  : 'listbox', name  : '_column_1_grid', 
							values: [ 
								{ text  : '100%', value : '12' },
								{ text  : '50%', value : '6' },
								{ text  : '33%', value : '4'},
								{ text  : '25%', value : '3'}
							]
						},
						{ label : 'What is the column horizontal position?', type  : 'listbox', name  : '_column_1_halign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'left', value : 'left' },
								{ text  : 'right', value : 'right'},
								{ text  : 'center', value : 'center' }
							]
						},
						{ label : 'What is the column vertical position?', type  : 'listbox', name  : '_column_1_valign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'top', value : 'start' },
								{ text  : 'middle', value : 'center'},
								{ text  : 'bottom', value : 'end' }
							]
						},
						{ label : 'Content', type  : 'textbox',  name  : 'content', value : '', multiline : true },
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : '_column_1_xclass', value : '' },
						// 2nd
						{ label : '', type  : 'container', html  : '<b>BUILD YOUR LAYOUT 2ND COLUMN BELOW:</b>' },
						{ label : 'Column grid size', type  : 'listbox', name  : '_column_2_grid', 
							values: [ 
								{ text  : '100%', value : '12' },
								{ text  : '50%', value : '6' },
								{ text  : '33%', value : '4'},
								{ text  : '25%', value : '3'}
							]
						},
						{ label : 'What is the column horizontal position?', type  : 'listbox', name  : '_column_2_halign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'left', value : 'left' },
								{ text  : 'right', value : 'right'},
								{ text  : 'center', value : 'center' }
							]
						},
						{ label : 'What is the column vertical position?', type  : 'listbox', name  : '_column_2_valign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'top', value : 'start' },
								{ text  : 'middle', value : 'center'},
								{ text  : 'bottom', value : 'end' }
							]
						},
						{ label : 'Content', type  : 'textbox',  name  : 'content', value : '', multiline : true },
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : '_column_2_xclass', value : '' },
						// 3rd
						{ label : '', type  : 'container', html  : '<b>BUILD YOUR LAYOUT 3rd COLUMN BELOW:</b>' },
						{ label : 'Column grid size', type  : 'listbox', name  : '_column_3_grid', 
							values: [ 
								{ text  : '100%', value : '12' },
								{ text  : '50%', value : '6' },
								{ text  : '33%', value : '4'},
								{ text  : '25%', value : '3'}
							]
						},
						{ label : 'What is the column horizontal position?', type  : 'listbox', name  : '_column_3_halign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'left', value : 'left' },
								{ text  : 'right', value : 'right'},
								{ text  : 'center', value : 'center' }
							]
						},
						{ label : 'What is the column vertical position?', type  : 'listbox', name  : '_column_3_valign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'top', value : 'start' },
								{ text  : 'middle', value : 'center'},
								{ text  : 'bottom', value : 'end' }
							]
						},
						{ label : 'Content', type  : 'textbox',  name  : 'content', value : '', multiline : true },
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : '_column_3_xclass', value : '' },
						{ label : '', type  : 'container', html  : '<b>BUILD YOUR LAYOUT 4th COLUMN BELOW:</b>' },
						{ label : 'Column grid size', type  : 'listbox', name  : '_column_4_grid', 
							values: [ 
								{ text  : '100%', value : '12' },
								{ text  : '50%', value : '6' },
								{ text  : '33%', value : '4'},
								{ text  : '25%', value : '3'}
							]
						},
						{ label : 'What is the column horizontal position?', type  : 'listbox', name  : '_column_4_halign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'left', value : 'left' },
								{ text  : 'right', value : 'right'},
								{ text  : 'center', value : 'center' }
							]
						},
						{ label : 'What is the column vertical position?', type  : 'listbox', name  : '_column_4_valign', 
							values: [ 
								{ text  : 'unset', value : '' },
								{ text  : 'top', value : 'start' },
								{ text  : 'middle', value : 'center'},
								{ text  : 'bottom', value : 'end' }
							]
						},
						{ label : 'Content', type  : 'textbox',  name  : 'content', value : '', multiline : true },
						{ label : 'Additional classes (separate by space)', type  : 'textbox', name  : '_column_4_xclass', value : '' },
					],
					onsubmit: function( event ) {
						editor.insertContent('[' + event.data.shortcode + ' ' + get_shortcode_atts( event.data ) + ' ]' + build_column_content(event.data) +  '[/' + event.data.shortcode + ']');
					}
				} );
			} );		
		}
	} );

	// load our plugin into the TinyMCE plugin manager
	tinymce.PluginManager.add( 'developry_bs4_shortcode_plugin', tinymce.plugins.developry_plugin );

	/**
	 * Helper fnc used to build the colum shortcodes inside the 
	 * layout based on the options selected by the user
	 */
	function build_column_content( obj ) {
		var html  = '<br />',
			atts1 = '',
			atts2 = '',
			atts3 = '',
			atts4 = '';
		$.each( obj, function ( key, val ) {
			if ( key.startsWith( '_column' )
				&& val != undefined
					&& val != null
					&& val != '') {
				if ( key.startsWith( '_column_1_' ) ) {
					atts1 += key.replace( '_column_1_', '' ) + '="' + val + '" ';
				} else if ( key.startsWith( '_column_2_' ) ) {
					atts2 += key.replace( '_column_2_', '' ) + '="' + val + '" ';
				} else if ( key.startsWith('_column_3_' ) ) {
					atts3 += key.replace( '_column_3_', '' ) + '="' + val + '" ';
				} else if ( key.startsWith( '_column_4_' ) ) {
					atts4 += key.replace( '_column_4_', '' ) + '="' + val + '" ';
				}
			}
		} );
		html += atts1 ? '[column ' + atts1 + '][/column]<br />' : '';
		html += atts2 ? '[column ' + atts2 + '][/column]<br />' : '';
		html += atts3 ? '[column ' + atts3 + '][/column]<br />' : '';
		html += atts4 ? '[column ' + atts4 + '][/column]<br />' : '';
		return html;
	}

	/**
	 * Helper fnc used to build list_item(s) for our list shortcode; 
	 * there are couple of different variations for lists
	 */
	function build_list_items( number, format ) {
		if ( number == 0 )
			return '';
		var html = '<br />';
		for ( var i = 0; i < number; i++ ) {
			if (format == 'list-inline')
				html += '[list-item format="inline-item" href="" xclass=""][/list-item]<br />';
			else if (format == 'list-group')
				html += '[list-item format="group-item" href="" xclass=""][/list-item]<br />';
			else
				html += '[list-item href="" xclass=""][/list-item]<br />';
		}
		return html;
	}

	/** 
	 * Helper fnc that will skip all the empty shortcode attributes 
	 * and reformat the keys spaces from '_' to '-''
	 */
	function get_shortcode_atts( obj ) {
		var atts = '';
		$.each( obj, function ( key, val ) {
			if ( key != 'shortcode' && key != 'content' 
				&& !key.startsWith( '_column' ) 
				&& val != undefined
				&& val != null
				&& val != '' ) {
					atts += key.replace( '_', '-' ) + '="' + val + '" ';
				}
		} );
		return atts;
	}
} );