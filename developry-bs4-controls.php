<?php

	add_action(
		'init', 
		'developry_shortcode_button_init'
	);

	function developry_shortcode_button_init( ) {

	      if ( !current_user_can( 'edit_posts' ) 
	      	&& !current_user_can( 'edit_pages' ) 
	      	&& get_user_option( 'rich_editing' ) == 'true' )
	           return;

	      add_filter( "mce_external_plugins", "developry_register_tinymce_plugin" ); 

	      add_filter( 'mce_buttons', 'developry_add_tinymce_button' );
	}


	function developry_register_tinymce_plugin( $plugins ) {

	    $plugins['developry_bs4_shortcode_plugin'] = plugins_url( '/developry-bs4-elements.js',  __FILE__ );

	    return $plugins;
	}

	function developry_add_tinymce_button( $buttons ) {

	    $buttons[] = "developry_element_button";
	    $buttons[] = "developry_block_button";
	    
	    return $buttons;
	}
