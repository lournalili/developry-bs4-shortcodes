<?php
/**
 	Plugin Name:  Develop(ry) Bootstrap 4 Shortcodes
	Plugin URL:   http://developry.com/developry-bootstrap-4-shortcodes
	Description:  A WordPress plugin with set of shortcodes for Bootstrap 4.
	Version:      1.0.0
	Author: 	  Krasen Slavov
	Author URI:   http://developry.com/author/krasen
	License:      GNU General Public License, version 2
	License URI:  https://www.gnu.org/licenses/gpl-2.0.html
	Text Domain:  developry-bs4-shortcodes
	GitHub Plugin URI: https://github.com/krasenslavov/developry-bs4-shortcodes
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


// See if WP have support for all shortcode functions we will need in our plugin.
if ( ! function_exists( 'shortcode_atts' ) 
	|| ! function_exists( 'add_shortcode') 
	|| ! function_exists( 'remove_shortcode')
	|| ! function_exists( 'do_shortcode') ) {
	exit;
}

// Initialize.
$devry = new Developry_BS4_Shortcodes;
$devry->init();

// Our main plugin class used to load the classes, functions and assets needed.
class Developry_BS4_Shortcodes {

	// Plugin root directory set by the constuctor.
	private $plugin_dir;

	// Admin classes to be loaded with our plugin in /admin.
	private $classes = array(
		'developry-bs4-admin'  => 'Developry_BS4_Admin',
		'developry-bs4-editor' => 'Developry_BS4_Editor',
	);

	// Files with shortcode functions in /shortcodes.
	private $components = array(
		'alert',
		'badge',
		'blockquote',
		'button',
		'image',
		'jumbotron',
		'list', // [list] [list-item]
		'typography', // [br] [link] [text]
		// 'gallery',
	);

	// All available shortcode keywords.
	private $shortcodes = array(
		'alert',
		'badge',
		'blockquote',
		'br',
		'button',
		'image',
		'jumbotron',
		'link',
		'list',
		'list-item',
		'text',
		// 'gallery',
	);

	// Contructor.
	public function __construct() {

		$this->plugin_dir = plugin_dir_path( __FILE__ );
	}

	// Load all admin classes and files with shortcode functions.
	public function init() {

		if ( $this->plugin_dir ) {

			foreach ( $this->classes as $class_filename => $class_name ) {

				if ( file_exists( $this->plugin_dir . '/admin/' . $class_filename . '.php' ) ) {

					require_once $this->plugin_dir . '/admin/' . $class_filename . '.php';

					// Initialize.
					$devry = new $class_name;
					$devry->init();
				}
			}
		}

		add_action(
			'plugins_loaded',
			array(
				$this,
				'shortcode_loader',
			)
		);
	}

	// Load all available & existing files with shortcode functions.
	public function shortcode_loader() {

		$this->shortcode_replace();

		foreach ($this->components as $component) {

			if ( $this->plugin_dir 
				&& file_exists( $this->plugin_dir . '/shortcodes/' . $component . '.php' ) ) {

				require_once  $this->plugin_dir . '/shortcodes/' . $component . '.php';
			}
		}
	}

	// Replace existing shortcodes that may conflict with our plugin.
	public function shortcode_replace() {

		foreach ($this->shortcodes as $shortcode) {

			if ( $this->shortcode_exists( $shortcode ) ) {

				// E.g. add 'gallery' to $shortcodes & $components then 
				// the WP default shortcode [gallery] will be removed 
				// and not processed on the front-end in WP_DEBUG mode
				// (Notice: do_shortcode_tag was called incorrectly.).
				// Then we need to add our own version of the shortcode 
				// under /shortcodes/gallery.php with function 
				// named developry_bs4_shortcode_gallery()
				remove_shortcode( $shortcode );

				add_shortcode( 
					$shortcode, 
					'developry_bs4_shortcode_' . str_replace( '-', '_', $shortcode ) 
				) ;

			} else {

				add_shortcode( 
					$shortcode, 
					'developry_bs4_shortcode_' . str_replace( '-', '_', $shortcode ) 
				);
			}
		}
	}

	// Check if existing & registered shortcode has the same shortcode keyword as ours.
	public function shortcode_exists( $shortcode ) {

		if ( ! $shortcode ) {

			return false;
		}

		if ( array_key_exists( $shortcode, $this->shortcodes ) ) {

			return true;
		}

		return false;
	}
}

// Helper functions used to convert our shortcodes from /shortcodes into HTML.
final class Developry_BS4_Helpers {

	// Set the attribute value(s); for numeric atts name can be boolean.
	//
	// [named]   >>> primary, alert-primary 	
	// [numeric] >>> 1/0, alert-dismissible fade show 
	//
	public static function set( $name, $val ) {

		if ( ! $name ) {
			return '';
		}

		return ' ' . $val;
	}

	// Check if an attribute value exists in multi array as a value.
	//
	// Array ( [color] => primary [0] => dismissible [xclass] => m-5 )
	//                                   ^^^^^^^^^^^
	public static function in_multiarr( $att, $atts ) {

		while ( current( $atts ) !== false ) {
	    
	        if ( current( $atts ) === $att ) {
	    
	            return true;
	    
	        } elseif ( is_array( current( $atts ) ) ) {
	    
	            if ( in_multiarr( $att, current( $atts ) ) ) {
	    
	                return true;
	            }
	        }
	        next( $atts );
	    } 
        return false;
	}

	// Convert a multi array into a string, used to build HTML tag attributes.
	//
	// Array ( [class] => alert alert-primary alert-dismissible fade show m-5 [role] => alert )
    // ...
    // class="alert alert-primary alert-dismissible fade show m-5" role="alert"
    //
	public static function implode_atts( $atts ) {

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
			    array_keys( $atts )
			) 
    	);
	}
}
