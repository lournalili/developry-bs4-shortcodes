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

// Display shortcodes as html for the preview window.
var Developry_BS4_Shortcodes = {

	// Initialize.
	init : function ( shortcode ) {

		var tag = shortcode.tag;

		// Call the exce function.
		return window['Developry_BS4_Shortcodes'][tag]( shortcode );
	},
	// Build the ALERT html from shortcode
	alert : function( shortcode, cls = '' ) {

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

		return '<div class="alert ' + cls + '">' + shortcode.content + '</div>';
	},
	// Build the BADGE html from shortcode
	badge : function( shortcode, cls = '' ) {

		$.each( shortcode.attrs.named, function( key, val) {

			if ( 'color' === key 
				|| 'pill' === key ) {

				cls += ' badge-' + val;
			
			} else {

				cls += ' ' + val;
			}
		});

		return '<span class="badge ' + cls + '" ' + onclick + '>' + shortcode.content + '</span>';
	},
	// Build the BLOCKQUOTE html from shortcode
	blockquote : function( shortcode, cls = '' ) {

		$.each( shortcode.attrs.named, function( key, val) {

			if ( 'bg' === key ) {

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

		return '<div class="blockquote ' + cls + '">' + shortcode.content + '</div>';	
	},
	// Build the BR html from shortcode
	br : function( shortcode, cls = '' ) {

		$.each( shortcode.attrs.named, function( key, val) {

			cls += ' ' + val;
		});

		return '<br class="' + cls + '" />';
	},
	// Build the BUTTON html from shortcode
	button : function( shortcode, cls = '' ) {

		$.each( shortcode.attrs.named, function( key, val) {

			if ( 'color' === key
				|| 'size' === key
				|| 'fluid' === key ) {

				cls += ' btn-' + val;

			} else if ( 'outline' === key ) {

				cls += ' btn-outline-' + val;

			} else if ( 'href' === key ) {

				var onclick = 'location.href=\'' + val + '\'';

			} else {

				cls += ' ' + val;
			}
		});

		return '<button class="btn ' + cls + '" ' + onclick + '>' + shortcode.content + '</button>';
	},
	hr : function( shortcode, cls = '' ) {

		$.each( shortcode.attrs.named, function( key, val) {

			cls += ' ' + val;
		});

		return '<hr class="' + cls + '" />';
	},
	// Build the IMAGE html from shortcode
	image : function( shortcode, cls = '', src = 'src="http://via.placeholder.com/2000x1200"', alt = 'alt="placeholder"' ) {

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

		return '<img ' + src + ' class="img ' + cls + '"' + alt + ' />';
	},
	// Build the JUMBOTRON html from shortcode
	jumbotron : function( shortcode, cls = '' ) {

		$.each( shortcode.attrs.named, function( key, val) {

			if ( 'bg' === key ) {

				cls += ' bg-' + val;

			} else if ( 'text' === key ) {

				cls += ' text-' + val;

			} else {

				cls += ' ' + val;
			}
		});

		return '<button class="jumbotron ' + cls + '">' + shortcode.content + '</button>';
	},
	// Build the LINK html from shortcode
	link : function( shortcode, cls = '', href = 'href="#"' ) {

		$.each( shortcode.attrs.named, function( key, val) {

			if ( 'text' === key ) {

				cls += ' text-' + val;

			} else if ( 'href' === key ) {

				href = ' href="' + val + '" ';

			} else {

				cls += ' ' + val;
			}
		});

		return '<a ' + href + ' class="' + cls + '">' + shortcode.content + '</a>';
	},
	// Build the LIST html from shortcode
	list : function( shortcode, cls = '', type = '', nav = '' ) {

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

			return '<nav class="' + cls + '">' + shortcode.content + '</nav>';
		}

		if ( type === 'ordered') {

			return '<ol class="' + cls + '">' + shortcode.content + '</ol>';
		}

		return '<ul class="' + cls + '">' + shortcode.content + '</ul>';
	},
	// Build the LIST ITEM(S) html from shortcode (need to be surrounded in ')
	'list-item' : function( shortcode, cls = '', href = '' ) {

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

			return '<a ' + href + ' class="list-group-item-action ' + cls + '">' + shortcode.content + '</a>';
		}

		return '<li class="' + cls + '">' + shortcode.content + '</li>';
	},
	// Build the TEXT html from shortcode
	text : function( shortcode, cls = '', heading = '', size = '' ) {

		$.each( shortcode.attrs.named, function( key, val) {

			if ( 'bg' === key ) {

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

			return '<' + size + ' class="' + cls + '">' + shortcode.content + '</' + size + '>';

		} else {

			return '<h3 class="' + cls + '">' + shortcode.content + '</h3>';
		}

		return '<p class="' + cls + '">' + shortcode.content + '</p>';
	},
}