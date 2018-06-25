-------------------------------------------------------------------------------
    ADDING NEW SHORTCODE
-------------------------------------------------------------------------------

+ 1. developry-bs4-shortcodes.php
	add {shortcode_file_name} to (array) $components 
	add {shortcode_tag_name} to (array) $shortcodes 
! 2. /shortcodes
	create {shortcode_file_name}.php with function developry_bs4_shortcode_{shortcode_tag_name}(){...}
+ 3. /admin/developry-bs4-admin.php
	add {shortcode_tag_name} to (array) $components 
! 4. /admin/shortcodes
	create {shortcode_tag_name}.js with array/object body developry_bs4_shortcode_alert = [{}] with params 
+ 5. /admin/shortcodes/init.js 
	add plugin hook
	...
	tinymce.create( 'tinymce.plugins.developry_bs4_shortcode_{shortcode_tag_name}', {} );
	tinymce.PluginManager.add( 'developry_bs4_shortcode_{shortcode_tag_name}', tinymce.plugins.developry_bs4_shortcode_{shortcode_tag_name} );
+ 6. /admin/shortcodes/init.js
	add shortcode windowManage modal window
	...
	{shortcode_tag_name} : function( ed ) {

		ed.windowManager.open({			
		
			title    : 'Develop(ry) Shortcodes > Elements > {shortcode_tag_name}',
			minWidth : 640,
			body 	 : Developry_BS4_Helpers.get_shortcode( 
				'{shortcode_tag_name}', ed.selection.getContent( { 'format' : 'html' } ), 
				developry_bs4_shortcode_button 
			),
			onsubmit : function( event ) {

				ed.insertContent('[' + event.data.shortcode + ' ' 
					+ Developry_BS4_Helpers.get_shortcode_atts( event.data ) + ' ]' 
						+ event.data.content 
						+ '[/' + event.data.shortcode + ']'
				);
			}
		} );
	},
+ 7. /admin/assets/js/developry-bs4-admin.js
	add {shortcode_tag_name} to (array) $shortcodes 
	add {shortcode_tag_name} : function() {}, to Developry_BS_Shortcodes = {}

-------------------------------------------------------------------------------
	SHORTCODES WITH ATTRIBUTES
-------------------------------------------------------------------------------

 * [alert color= dismissable= dismissable xclass=]content[/alert]
 * [badge color= href= pill=pill xclass=]content[/badge]
 * [blockquote bg= text= align= srouce= xclass=]content[/blockquote]
 * [br xclass= /]
 * [button color= outline= size= active=active disabled=disabled fluid= xclass=]content[/button]
 * [image src= alt= fluid=fluid thumbnail=thumbnail rounded=rounded circle=circle xclass= /]
 * [jumbotron bg= text= fluid=fluid xclass]content[/jumbotron]
 * [link text= href= xclass=]content[/link]
 * [list items= type= format= align= nav=nav flush=flush xclass]content[/list]
 * [[list-item bg= href= format= active=active xclass=]content[/list-item]
 * [text bg= text= align= size= display= lead=lead heading=heading xclass=]content[/text]

-------------------------------------------------------------------------------
	CONVERT THE ABOVE CODE INTO THE FOLLOWING EXAMPLE USING A CLASS
-------------------------------------------------------------------------------
	var MyClass = (function(){

	    var static_var; //static private var

	    var MyClass = function () {

	        var privateVar; //private
	        var privateFn = function(){}; //private 

	        this.someProperty = 5;  //public
	        this.anotherProperty = false;  //public
	        this.someFunction = function () {  //public
	            //do something
	        };
	    };

	    return MyClass;

	})();

	MyNamespace.MyClass = new MyClass();
