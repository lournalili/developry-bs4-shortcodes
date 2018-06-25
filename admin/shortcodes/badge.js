/**
 *
 * [shortcode attrs]...[/shortcode]
 * [badge color= href= pill=pill xclass=]content[/badge]
 */
var developry_bs4_shortcode_badge = [
	{ 
		label     : 'Content', 
		type      : 'textbox',  
		name      : 'content', 
		value     : '',
		multiline : true,
		rows      : 8,
	},
	{ 
		label : 'Local or external link URL', 
		type  : 'textbox',  
		name  : 'href', 
		value : '', 
	},
	{ 
		label : 'Badge color', 
		type  : 'listbox', 
		name  : 'color', 
		values: [ 
			{ 
				text  : 'unset', 
				value : '',
			},
			{ 
				text  : 'primary', 
				value : 'primary' ,
			},
			{ 
				text  : 'secondary', 
				value : 'secondary',
			},
			{ 
				text  : 'dark', 
				value : 'dark',
			},
			{ 
				text  : 'light', 
				value : 'light',
			},
			{ 
				text  : 'danger', 
				value : 'danger',
			},
			{ 
				text  : 'info', 
				value : 'info',
			},
			{ 
				text  : 'success', 
				value : 'success',
			},
			{ 
				text  : 'warning', 
				value : 'warning',
			},
		],
	},
	{ 
		label : 'Is it a pill?', 
		type  : 'listbox', 
		name  : 'pill', 
		values: [
			{ 
				text  : 'no', 
				value : '', 
			},
			{ 
				text  : 'yes', 
				value : 'pill',
			},
		],
	},
	{ 
		label : 'Additional classes (separated by space)', 
		type  : 'textbox', 
		name  : 'xclass', 
		value : '', 
	},
	{ 
		label : 'Shortcode', 
		type  : 'listbox', 
		name  : 'shortcode', 
		values: [ 
			{ 
				text  : 'badge', 
				value : 'badge',
			}, 
		],
	},
];
