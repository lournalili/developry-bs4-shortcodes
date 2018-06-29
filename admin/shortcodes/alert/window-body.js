/**
 * [shortcode attrs]...[/shortcode]
 * [alert color= dismissable= dismissable xclass=]content[/alert]
 */
var developry_bs4_shortcode_alert = [
	{ 
		label     : 'Content', 
		type      : 'textbox',  
		name      : 'content', 
		value     : '',
		multiline : true,
		rows      : 8,
	},
	{ 
		label : 'Alert color', 
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
		label : 'Is it dismissable?', 
		type  : 'listbox', 
		name  : 'dismissable', 
		values: 
		[
			{ 
				text  : 'no', 
				value : '' 
			},
			{ 
				text  : 'yes', 
				value : 'dismissable',
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
				text  : 'alert', 
				value : 'alert',
			},
		],
	},
];
