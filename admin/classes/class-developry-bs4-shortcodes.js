'use strict';

// Convert shortcodes into HTML code used mainly for the preview 
// & visualize shortcodes views.
var Developry_BS4_Shortcodes = ( function( $, dev ) {

    var Developry_BS4_Shortcodes = function () {

    	// ### Public function.

    	// Return HTML version for each shortcode by keyword tag.
    	this.load = function( shortcode ) {

			var tag            = shortcode.tag;
			var shortcode_data = encodeURIComponent( wp.shortcode.string( shortcode, tinymce.get( 'content' ) ) );

			// Call the exce function.
			return buildShortcodes[tag]( shortcode, shortcode_data );
		};

		// ### Private functions.
		
		// Need to be inside an object becuase we call the name as string.
		var buildShortcodes = {

			// Generate ALERT HTML from [alert][/alert] shortcode
			alert : function( shortcode, shortcode_data, cls = '' ) {

				$.each( shortcode.attrs.named, function( key, val) {

					if ( 'color' === key ) {

						cls += ' alert-' + val;

					} else if ( 'dismissable' === key ) {

						cls 			 += ' alert-dismissable fade show';
						shortcode.content = '<button color="button" class="close" data-dismiss="alert" aria-label="close">'
							+ '<span aria-hidden="true">&times;</span></button>' + shortcode.content; 
					}
					else {

						cls += ' ' + val;
					}
				});

				return '<div class="alert ' + cls.trim() + '" contenteditable="false" data-shortcode-tag="' + shortcode.tag + '" data-shortcode="' + shortcode_data + '">' + shortcode.content.trim() + '</div>';
			},

			// Generate BADGE HTML from [badge][/badge] shortcode
			badge : function( shortcode, shortcode_data, cls = '' ) {

				$.each( shortcode.attrs.named, function( key, val) {

					if ( 'color' === key 
						|| 'pill' === key ) {

						cls += ' badge-' + val;
					
					} else {

						cls += ' ' + val;
					}
				});

				return '<span class="badge ' + cls.trim() + '" ' + onclick + ' contenteditable="false" data-shortcode-tag="' + shortcode.tag + '" data-shortcode="' + shortcode_data + '">' + shortcode.content.trim() + '</span>';
			},

			// Generate BLOCKQUOTE HTML from [blockquote][/blockquote] shortcode
			blockquote : function( shortcode, shortcode_data, cls = '' ) {

				$.each( shortcode.attrs.named, function( key, val) {

					if ( 'color' === key ) {

						cls += ' bg-' + val;

					} else if ( 'text' === key
						|| 'align' === key ) {

						cls += ' text-' + val;
						
					} else if ( 'source' === key ) {

						shortcode.content += '<footer class="blockquote-footer text-right">' + val + '</footer>';
					} else {

						cls += ' ' + val;
					}
				});

				return '<div class="blockquote ' + cls.trim() + '" contenteditable="false" data-shortcode-tag="' + shortcode.tag + '" data-shortcode="' + shortcode_data + '">' + shortcode.content.trim() + '</div>';	
			},

			// Generate BR HTML from [br /] shortcode
			br : function( shortcode, shortcode_data, cls = '' ) {

				$.each( shortcode.attrs.named, function( key, val) {

					cls += ' ' + val;
				});

				return '<br class="' + cls.trim() + '">';
			},
			
			// Generate BUTTON HTML from [button][/button] shortcode
			button : function( shortcode, shortcode_data, cls = '', onclick = '' ) {

				$.each( shortcode.attrs.named, function( key, val) {

					if ( 'color' === key
						|| 'size' === key
						|| 'fluid' === key ) {

						cls += ' btn-' + val;

					} else if ( 'outline' === key ) {

						cls += ' btn-outline-' + val;

					} else if ( 'href' === key ) {

						var onclick = 'location.href=\'' + val + '\' ';

					} else {

						cls += ' ' + val;
					}
				});

				return '<button class="btn ' + cls.trim() + '" ' + onclick + 'contenteditable="false" data-shortcode-tag="' + shortcode.tag + '" data-shortcode="' + shortcode_data + '">' + shortcode.content.trim() + '</button>';
			},

			// Generate HR HTML from [hr /] shortcode
			hr : function( shortcode, shortcode_data, cls = '' ) {

				$.each( shortcode.attrs.named, function( key, val) {

					cls += ' ' + val;
				});

				return '<hr class="' + cls.trim() + '" contenteditable="false" data-shortcode-tag="' + shortcode.tag + '" data-shortcode="' + shortcode_data + '">';
			},
			
			// Generate IMAGE HTML from [image /] shortcode
			image : function( shortcode, shortcode_data, cls = '', src = 'src="http://via.placeholder.com/2000x1200"', alt = 'alt="placeholder"' ) {

				$.each( shortcode.attrs.named, function( key, val) {

					if ( 'fluid' === key
						|| 'thubmnail' === key ) {

						cls += ' img-' + val;

					} else if ( 'circle' === key ) {

						cls += ' rounded-' + val;

					} else if ( 'src' === key ) {

						src = 'src="' + val + '" ';

					} else if ( 'alt' === key ) {

						alt = 'alt="' + val + '" ';

					} else {

						cls += ' ' + val;
					}
				});

				return '<img ' + src + ' class="img ' + cls.trim() + '"' + alt + ' contenteditable="false" data-shortcode-tag="' + shortcode.tag + '" data-shortcode="' + shortcode_data + '">';
			},
			
			// Generate JUMBOTRON HTML from [jumbotron][/jumbotron] shortcode
			jumbotron : function( shortcode, shortcode_data, cls = '' ) {

				$.each( shortcode.attrs.named, function( key, val) {

					if ( 'color' === key ) {

						cls += ' bg-' + val;

					} else if ( 'text' === key ) {

						cls += ' text-' + val;

					} else if ( 'fluid' === key ) {

						cls += ' jumbotron-' + val;

					} else {

						cls += ' ' + val;
					}
				});

				return '<div class="jumbotron ' + cls.trim() + '" contenteditable="false" data-shortcode-tag="' + shortcode.tag + '" data-shortcode="' + shortcode_data + '">' + shortcode.content.trim() + '</div>';
			},
			
			// Generate LINK HTML from [link][/link] shortcode
			link : function( shortcode, shortcode_data, cls = '', href = 'href="#"' ) {

				$.each( shortcode.attrs.named, function( key, val) {

					if ( 'text' === key ) {

						cls += ' text-' + val;

					} else if ( 'href' === key ) {

						href = ' href="' + val + '" ';

					} else {

						cls += ' ' + val;
					}
				});

				return '<a ' + href + ' class="' + cls.trim() + '" contenteditable="false" data-shortcode-tag="' + shortcode.tag + '" data-shortcode="' + shortcode_data + '">' + shortcode.content.trim() + '</a>';
			},
			
			// Generate LIST HTML from [list][/list] shortcode
			list : function( shortcode, shortcode_data, cls = '', type = '', nav = '' ) {

				$.each( shortcode.attrs.named, function( key, val) {

					if ( 'align' === key ) {

						cls += ' text-' + val;

					} else if ( 'format' === key ) {

						cls += ' list-' + val;

					} else if ( 'flush' === key ) {

						cls += ' list-group-' + val;

					} else if ( 'type' === key ) {

						type = val;

					} else if ( 'nav' === key ) {

						nav = val;

					} else {

						cls += ' ' + val;
					}
				});

				if ( nav ) {

					return '<nav class="' + cls.trim() + '" contenteditable="false" data-shortcode-tag="' + shortcode.tag + '" data-shortcode="' + shortcode_data + '">' + shortcode.content.trim() + '</nav>';
				}

				if ( type === 'ordered') {

					return '<ol class="' + cls.trim() + '" contenteditable="false" data-shortcode-tag="' + shortcode.tag + '" data-shortcode="' + shortcode_data + '">' + shortcode.content.trim() + '</ol>';
				}

				return '<ul class="' + cls.trim() + '" contenteditable="false" data-shortcode-tag="' + shortcode.tag + '" data-shortcode="' + shortcode_data + '">' + shortcode.content.trim() + '</ul>';
			},

			// Generate LIST ITEM(S) HTML from [list-item][/list-item] shortcode (need to be surrounded in ')
			'list-item' : function( shortcode, shortcode_data, cls = '', href = '' ) {

				$.each( shortcode.attrs.named, function( key, val) {

					if ( 'bg' === key ) {

						cls += ' bg-' + val;

					} else if ( 'format' === key ) {

						cls += ' list-' + val;

					} else if ( val !== '' && 'href' === key  ) {

						href = 'href="' + val + '"';

					} else {

						cls += ' ' + val;
					}
				});

				if ( href ) {

					return '<a ' + href + ' class="list-group-item-action ' + cls.trim() + '" contenteditable="false" data-shortcode-tag="' + shortcode.tag + '" data-shortcode="' + shortcode_data + '">' + shortcode.content.trim() + '</a>';
				}

				return '<li class="' + cls.trim() + '" contenteditable="false" data-shortcode-tag="' + shortcode.tag + '" data-shortcode="' + shortcode_data + '">' + shortcode.content.trim() + '</li>';
			},
			// Generate TEXT HTML from [text][/text] shortcode
			text : function( shortcode, shortcode_data, cls = '', heading = '', size = '' ) {

				$.each( shortcode.attrs.named, function( key, val) {

					if ( 'color' === key ) {

						cls += ' bg-' + val;

					} else if ( 'text' === key 
						|| 'align' === key ) {

						cls += ' text-' + val;

					} else if ( 'heading' === key ) {

						heading = val;

				    }  else if ( 'size' === key ) {

						size = val;

				    } else {

						cls += ' ' + val;
					}
				});

				if ( heading && size ) {

					return '<' + size + ' class="' + cls.trim() + '" contenteditable="false" data-shortcode-tag="' + shortcode.tag + '" data-shortcode="' + shortcode_data + '">' + shortcode.content.trim() + '</' + size + '>';

				} else if ( heading ) {

					return '<h3 class="' + cls.trim() + '" contenteditable="false" data-shortcode-tag="' + shortcode.tag + '" data-shortcode="' + shortcode_data + '">' + shortcode.content.trim() + '</h3>';
				}

				return '<p class="' + cls.trim() + '" contenteditable="false" data-shortcode-tag="' + shortcode.tag + '" data-shortcode="' + shortcode_data + '">' + shortcode.content.trim() + '</p>';
			},
		};
    };

    return Developry_BS4_Shortcodes;

} )( jQuery, Developry );
