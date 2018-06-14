<?php
/**
	Plugin Name: Develop(ry) Bootstrap 4 Shortcodes
	Plugin URL: http://developry.com/developry-bootstrap4-shortcodes
	Description: A set of Bootstrap 4 shortcodes to speed up the page building process for Develop(ry) themes. The plugin is free and can be incorporated for other themes as well.
	Version: 1.0.0
	Author: Krasen Slavov
	Author URI: http://developry.com/author/krasen
	Text Domain: developry-bs4-shortcodes
*/

	/** Lets check if have all shortcode functions built-in
	 */
	if ( !function_exists( 'shortcode_atts' ) 
		|| !function_exists( 'add_shortcode') 
		|| !function_exists( 'remove_shortcode') )
		return;

	if ( is_dir( plugin_dir_path( __FILE__ ) )
		&&  file_exists( plugin_dir_path( __FILE__ ) . 'developry-bs4-controls.php' ) )
		require_once plugin_dir_path( __FILE__ ) . 'developry-bs4-controls.php';

	/** A map of our shortcodes.
	 */
	$developry_shortcodes_tags = array(
		'alert',
		'alert-heading',
		'alert-link',
		'badge',
		'blockquote',
		'button',
		'display',
		'jumbotron',
		'heading',
		'table',
		'text'
	);

	/** Bootstrap color scheme words
	 */
	$color_scheme = array(
		'primary', 
		'secondary', 
		'success',
		'danger', 
		'warning', 
		'info', 
		'dark', 
		'light',
		'link'
	);

	/**
	 * Develop(ry) Bootstrap 4 Shortcodes Init
	 *
	 * @since 1.0.0
	 * @return bool
	 */
	add_action(
		'plugins_loaded',
		'developry_bs4_shortcodes'
	);

	function developry_bs4_shortcodes() {

		developry_bs4_shortcode_replace();

		require_once plugin_dir_path( __FILE__ ) . 'shortcodes/alert.php';
		require_once plugin_dir_path( __FILE__ ) . 'shortcodes/badge.php';
		require_once plugin_dir_path( __FILE__ ) . 'shortcodes/blockquote.php';
		require_once plugin_dir_path( __FILE__ ) . 'shortcodes/button.php';
		require_once plugin_dir_path( __FILE__ ) . 'shortcodes/table.php';
		require_once plugin_dir_path( __FILE__ ) . 'shortcodes/typography.php';
	}

	/**
	 * Check if a shortcode is already registered
	 *
	 * @since 1.0.0
	 * @param $shortcode string The shortcode slug to test
	 * @return bool
	 */
	function developry_bs4_shortcode_exists( $shortcode = false ) {

		global $shortcode_tags;

		if ( !$shortcode )
			return false;

		if ( array_key_exists( $shortcode, $shortcode_tags ) )
			return true;

		return false;
	}

	/**
	 * Check if a shortcodes is already registered (by another theme or plugin) and replace it
	 *
	 * @since 1.0.0
	 * @return void
	 */
	function developry_bs4_shortcode_replace() {

		global $developry_shortcodes_tags;

		foreach ($developry_shortcodes_tags as $shortcode) {

			if ( developry_bs4_shortcode_exists( $shortcode ) ) {

				remove_shortcode( $shortcode );
				add_shortcode( $shortcode, 'developry_bs4_' . str_replace( '-', '_', $shortcode ) ) ;

			} else {

				add_shortcode( $shortcode, 'developry_bs4_' . str_replace( '-', '_', $shortcode ) );
			}
		}
	}

	/**
	 * Add shortcode filter which will help to remove the extra <p> and <br /> after our tags
	 *
	 * @since 1.0.0
	 * @param $content string The intial content from the editor with <p> and <br /> tags
	 * @return $content string Get the content string and remove the extra <p> and <br /> tags    
	 */
	add_filter(
		'the_content', 
		'developry_bs4_shortcode_content_filter'
	);

	function developry_bs4_shortcode_content_filter( $content ) {

		global $developry_shortcodes_tags;

	    $block = join( '|', $developry_shortcodes_tags );

	    $content = preg_replace( "/(<p>)?\[($block)(\s[^\]]+)?\](<\/p>|<br \/>)?/", "[$2$3]", $content );
	    $content = preg_replace( "/(<p>)?\[\/($block)](<\/p>|<br \/>)?/","[/$2]", $content );

		return $content;
	}

	/**
	 * Helper function which is used to check if a value exists in multidimentional array; same as in_array() but for multi arr
	 *
	 * @since 1.0.0
	 * @param $elem string A value to check  
	 * @param $array array Multidimentional array
	 * @return bool   
	 */
	function in_multiarray( $elem, $array ) {

        while ( current( $array ) !== false ) {
	    
	        if ( current( $array ) == $elem ) {
	    
	            return true;
	    
	        } elseif ( is_array( current( $array ) ) ) {
	    
	            if ( in_multiarray( $elem, current( $array ) ) ) {
	    
	                return true;
	            }
	        }
	        next( $array );
	    } 
        return false;
    }

    /**
     * Helper function which will map and merge 'shortcode_atts' data into a string; skips empty fields 
     *
     * @since 1.0.0
     * @param $atts array An array returned from shortcode_atts
     * @return $atts string Return the applicatable values in format [class="one two" data-target="val"]
     */
    function implode_atts( $atts ) {

    	return implode( ' ', 
    		array_map(
			    function ( $val, $key ) {
			
			        if ( is_array( $val ) ) {
			
			        	if ( $val )
			            	return $key . '[]=' . implode( '&', $key . '[]=', esc_attr( $val ) );
			
			        } else {
			
			        	if ( $val )
			            	return $key . '="' . esc_attr( $val ) . '" ';
			        }
			    }, 
			    $atts, 
			    array_keys($atts)
			) 
    	);
    }