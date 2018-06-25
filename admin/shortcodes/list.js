/**
 * [shortcode attrs]...[/shortcode]
 * [list items= type= format= align= nav=nav flush=flush xclass]content[/list]
 */
var developry_bs4_shortcode_list = [
	{ 
		label     : 'Content', 
		type      : 'textbox',  
		name      : 'content', 
		value     : '',
		multiline : true,
		rows      : 8,
	},
	{ 
		label : 'Number of items?', 
		type  : 'listbox', 
		name  : 'items',
		values: [
			{ 
				text  : '1', 
				value : '1',
			},
			{ 
				text  : '2', 
				value : '2',
			},
			{ 
				text  : '3', 
				value : '3',
			},
			{ 
				text  : '4', 
				value : '4',
			},
			{ 
				text  : '5', 
				value : '5',
			},
			{ 
				text  : '6', 
				value : '6',
			},
			{ 
				text  : '7', 
				value : '7',
			},
			{ 
				text  : '8', 
				value : '8',
			},
			{ 
				text  : '9', 
				value : '9',
			},
			{ 
				text  : '10',
				value : '10',
			},
		]
	},
	{ 
		label : 'List type', 
		type  : 'listbox', 
		name  : 'type', 
		values: [ 
			{ 
				text  : 'unset', 
				value : '',
			},
			{ 
				text  : 'ordered (1, 2, 3...)', 
				value : 'ordered', 
			},
			{ 
				text : 'unordered', 
				value : 'unordered',
			},
		],
	},
	{ 
		label : 'List format', 
		type  : 'listbox', 
		name  : 'format', 
		values: [ 
			{ 
				text  : 'unset', 
				value : '',
			},
			{ 
				text  : 'inlined', 
				value : 'inline', 
			},
			{ 
				text  : 'unstyled', 
				value : 'unstyled',
			},
			{ 
				text  : 'grouped', 
				value : 'group',
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
				value : '' ,
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
		label : 'Is it a nav?', 
		type  : 'listbox', 
		name  : 'nav', 
		values: [
			{ 
				text  : 'no', 
				value : '', 
			},
			{ 
				text  : 'yes', 
				value : 'nav',
			},
		],
	},
	{ 
		label : 'Is it flushed?', 
		type  : 'listbox', 
		name  : 'flush', 
		values: [
			{ 
				text  : 'no', 
				value : '', 
			},
			{ 
				text  : 'yes', 
				value : 'flush',
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
				text  : 'list', 
				value : 'list', 
			}, 
		], 
	},
];
