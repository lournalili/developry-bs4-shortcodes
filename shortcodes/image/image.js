/**
 * [shortcode /]
 * [image src= alt= fluid=fluid thumbnail=thumbnail rounded=rounded circle=circle xclass= /]
 */
var developry_bs4_shortcode_image = [
	{ 
		label : 'URL', 
		type  : 'textbox',  
		name  : 'src', 
		value : '', 
	},
	{ 
		label : 'Alt (alternative) text', 
		type  : 'textbox',  
		name  : 'alt', 
		value : '',
	},
	{ 
		label : 'Is it fluid?', 
		type  : 'listbox',
		name  : 'fluid', 
		values: 
		[
			{ 
				text  : 'no', 
				value : '', 
			},
			{ 
				text  : 'yes', 
				value : 'fluid',
			},
		],
	},
	{ 
		label : 'Is it a thumbnail?', 
		type  : 'listbox', 
		name  : 'thumbnail', 
		values: 
		[
			{ 
				text  : 'no', 
				value : '', 
			},
			{ 
				text  : 'yes', 
				value : 'thumbnail',
			},
		],
	},
	{ 
		label : 'Is it rounded?', 
		type  : 'listbox', 
		name  : 'img-rounded', 
		values: 
		[
			{ 
				text  : 'no', 
				value : '',
			},
			{ 
				text  : 'yes', 
				value : 'rounded',
			},
		],
	},
	{ 
		label : 'Is it a circle?', 
		type  : 'listbox', 
		name  : 'circle', 
		values: 
		[
			{ 
				text  : 'no', 
				value : '', 
			},
			{ 
				text  : 'yes', 
				value : 'circle',
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
				text  : 'image', 
				value : 'image' ,
			},
		],
	},
];
