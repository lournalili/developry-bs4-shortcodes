/**
 * [shortcode attrs]...[/shortcode]
 * [button color= outline= size= active=active disabled=disabled fluid= xclass=]content[/button]
 */
var developry_bs4_shortcode_button = [
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
		label : 'Button color', 
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
				text  : 'warning', 
				value : 'warning',
			},
			{ 
				text  : 'success', 
				value : 'success',
			},
		],
	},
	{ 
		label : 'Button outline border color', 
		type  : 'listbox', 
		name  : 'outline', 
		values: [ 
			{ 
				text  : 'unset', 
				value : '', 
			},
			{ 
				text  : 'primary', 
				value : 'primary', 
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
				text  : 'warning', 
				value : 'warning',
			},
			{ 
				text  : 'success', 
				value : 'success',
			},
		],
	},
	{ 
		label : 'Button size', 
		type  : 'listbox', 
		name  : 'size', 
		values: [ 
			{ 
				text  : 'normal', 
				value : '', 
			},
			{ 
				text  : 'smaller', 
				value : 'sm',
			},
			{ 
				text  : 'larger', 
				value : 'lg',
			},
		],
	},
	{ 
		label : 'Is it active?', 
		type  : 'listbox', 
		name  : 'active', 
		values: [
			{ 
				text  : 'no', 
				value : '', 
			},
			{ 
				text  : 'yes', 
				value : 'active',
			},
		],
	},
	{ 
		label : 'Is it disabled?', 
		type  : 'listbox', 
		name  : 'disabled', 
		values: [
			{ 
				text  : 'no', 
				value : '', 
			},
			{ 
				text  : 'yes', 
				value : 'disabled',
			},
		]
	},
	{ 
		label : 'Is it fluid?', 
		type  : 'listbox', 
		name  : 'fluid', 
		values: [
			{ 
				text  : 'no', 
				value : '', 
			},
			{ 
				text  : 'yes', 
				value : 'block',
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
				text  : 'button', 
				value : 'button', 
			}, 
		], 
	},
];