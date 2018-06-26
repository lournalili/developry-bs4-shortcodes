/**
 * [shortcode attrs]...[/shortcode]
 * [jumbotron bg= text= fluid=fluid xclass]content[/jumbotron]
 */
var developry_bs4_shortcode_jumbotron = [
	{ 
		label     : 'Content', 
		type      : 'textbox',  
		name      : 'content', 
		value     : '',
		multiline : true,
		rows      : 8,
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
		label : 'Is it fluid?', 
		type  : 'listbox', 
		name  : 'fluid', 
		values: 
		[
			{ 
				text  : 'no', 
				value : '' 
			},
			{ 
				text  : 'yes', 
				value : 'fluid',
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
				text  : 'jumbotron', 
				value : 'jumbotron' ,
			},
		],
	},
];
