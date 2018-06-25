/**
 * [shortcode attrs]...[/shortcode]
 * [blockquote bg= text= align= source= xclass=]content[/blockquote]
 */
var developry_bs4_shortcode_blockquote = [
{ 
		label     : 'Content', 
		type      : 'textbox',  
		name      : 'content', 
		value     : '',
		multiline : true,
		rows      : 8,
	},
	{ 
		label : 'What is the source?', 
		type  : 'textbox',  
		name  : 'source', 
		value : '', 
	},
	{ 
		label : 'Background color', 
		type  : 'listbox', 
		name  : 'bg', 
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
		label : 'Text color', 
		type  : 'listbox', 
		name  : 'text', 
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
		label : 'Text alignment', 
		type  : 'listbox', 
		name  : 'align', 
		values: [ 
			{ 
				text  : 'unset', 
				value : '', 
			},
			{ 
				text  : 'left', 
				value : 'left', 
			},
			{ 
				text  : 'right', 
				value : 'right', 
			},
			{ 
				text  : 'center', 
				value : 'center', 
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
				text  : 'blockquote', 
				value : 'blockquote', 
			}, 
		], 
	},
];
