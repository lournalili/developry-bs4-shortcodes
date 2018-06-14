<?php

	add_action(
		'init', 
		'developry_tinymce_init'
	);

	/**
	 * Add toolbar buttons and regsiter plugin scripts for TinyMCE editor
	 *
	 * @since 1.0.0
	 * @return bool
	 */
	function developry_tinymce_init( ) {

	      if ( !current_user_can( 'edit_posts' ) 
	      	&& !current_user_can( 'edit_pages' ) 
	      	&& get_user_option( 'rich_editing' ) == 'true' )
	           return;

	      add_filter( 'mce_external_plugins', 'developry_tinymce_register_plugin' ); 
	      add_filter( 'mce_buttons', 'developry_tinymce_add_buttons' );
	}

	/**
	 * Register the main plugin script (JS) that will control the buttons and commands for TinyMCE editor
	 *
	 * @since 1.0.0
	 * @return bool
	 */
	function developry_tinymce_register_plugin( $plugins ) {

	    $plugins['developry_bs4_shortcode_plugin'] = plugins_url( '/developry-bs4-tinymce-controls.js',  __FILE__ );

	    return $plugins;
	}

	/**
	 * Add buttons to TinyMCE editor toolbar to insert shortcodes  
	 *
	 * @since 1.0.0
	 * @return bool
	 */
	function developry_tinymce_add_buttons( $buttons ) {

	    $buttons[] = 'developry_element_button';
	    $buttons[] = 'developry_block_button';
	    
	    return $buttons;
	}
