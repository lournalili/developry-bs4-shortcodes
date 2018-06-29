/**
 * [shortcode attrs]...[/shortcode]
 * [text bg= text= align= size= display= lead=lead heading=heading xclass=]content[/text]
 */
var developry_bs4_shortcode_text = [
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
		label : 'Text size', 
		type  : 'listbox', 
		name  : 'size', 
		values: 
		[ 
			{ 
				text  : 'unset', 
				value : '' 
			},
			{ 
				text  : 'heading 1', 
				value : 'h1' 
			},
			{ 
				text  : 'heading 2', 
				value : 'h2' 
			},
			{ 
				text  : 'heading 3', 
				value : 'h3' 
			},
			{ 
				text  : 'heading 4', 
				value : 'h4' 
			},
			{ 
				text  : 'heading 5', 
				value : 'h5' 
			},
			{ 
				text  : 'heading 6', 
				value : 'h6' 
			},
		],
	},
	{ 
		label : 'Text display size', 
		type  : 'listbox', 
		name  : 'display', 
		values: [ 
			{ 
				text  : 'unset', 
				value : '' 
			},
			{ 
				text  : 'display 1', 
				value : 'display-1' 
			},
			{ 
				text  : 'display 2', 
				value : 'display-2' 
			},
			{ 
				text  : 'display 3', 
				value : 'display-3' 
			},
			{ 
				text  : 'display 4', 
				value : 'display-4' 
			},
		],
	},
	{ 
		label : 'Is it lead?', 
		type  : 'listbox', 
		name  : 'lead', 
		values: 
		[
			{ 
				text  : 'no', 
				value : '' 
			},
			{ 
				text  : 'yes', 
				value : 'lead'
			},
		],
	},
	{ 
		label : 'Is it heading?', 
		type  : 'listbox', 
		name  : 'heading', 
		values: 
		[
			{ 
				text  : 'no', 
				value : '' 
			},
			{ 
				text  : 'yes', 
				value : 'heading'
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
				text  : 'text', 
				value : 'text', 
			}, 
		], 
	},
];
