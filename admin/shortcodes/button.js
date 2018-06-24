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
		label : 'Color', 
		type  : 'listbox', 
		name  : 'color', 
		values: [ 
			{ 
				text  : 'none', 
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
		label : 'Button Outline Border', 
		type  : 'listbox', 
		name  : 'outline', 
		values: [ 
			{ 
				text  : 'none', 
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
		label : 'Size', 
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
		label : 'Is it full width?', 
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