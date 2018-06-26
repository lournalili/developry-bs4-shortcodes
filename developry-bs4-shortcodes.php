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

// Initialize.
new Developry_BS4_Shortcodes;

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
		'typography/br',
		'typography/hr',
		'typography/list',
		'typography/list-item',
		'typography/text',
		// 'gallery',
	);

	// All available shortcode keywords.
	private $shortcodes = array(
		'alert',
		'badge',
		'blockquote',
		'br',
		'hr',
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
	// Check if have the PHP 5.3, WordPress 4.7 version are supported.
	public function __construct() {

		$this->plugin_dir = plugin_dir_path( __FILE__ );

		if ( version_compare( PHP_VERSION, '5.3.0', '<' )
			&& version_compare( $GLOBALS['wp_version'], '4.7-alpha', '<' ) ) {

			add_action( 
				'admin_notices', 
				array( 
					$this, 
					'show_minimum_support_notice'
				) 
			);

		} else  {

			// Load up the whole plugin only for post, page, and widgets. 
			if ( in_array(
				basename( $_SERVER['PHP_SELF'] ), 
				array(
					'post.php', 
					'page.php', 
					'page-new.php', 
					'post-new.php', 
					'widgets.php', 
					'admin-ajax.php'))) {

				$this->init();
			} else {

				// Load up the shortcodes functions ONLY for front end.
				if ( ! is_admin() ) {

					$this->shortcode_loader();
				}
			}
		}
	}

	// Load all admin classes and files with shortcode functions.
	public function init() {

		if ( $this->plugin_dir ) {

			foreach ( $this->classes as $class_filename => $class_name ) {

				if ( file_exists( $this->plugin_dir . '/admin/' . $class_filename . '.php' ) ) {

					require_once $this->plugin_dir . '/admin/' . $class_filename . '.php';

					// Initialize.
					new $class_name;
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


		add_action(
			'content_save_pre',
			array(
				$this,
				'remove_shortcode_marks',
			), 10, 1
		);

/*
		add_filter(
			'the_editor_content', 
			array( 
				$this, 
				'fix_shortcodes' 
			) 
		);
*/
	}

	// Load all available & existing files with shortcode functions.
	public function shortcode_loader() {

		$this->shortcode_replace();

		foreach ($this->components as $component) {

			$component_parts     = explode('/', $component);
			$component_filename  = end($component_parts);

			if ( $this->plugin_dir 
				&& file_exists( $this->plugin_dir . 'shortcodes/' . $component . '/' . $component_filename . '.php' ) ) {

				require_once  $this->plugin_dir . 'shortcodes/' . $component . '/' . $component_filename . '.php';
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
/*
	// Highlight and adding <mark></mark> around shortcodes 
	// from our stack for easy editing and manipulation.
	// REMOVED : ADDED via JS (keep it just as a reference for now)
	public function fix_shortcodes( $content ) {

		foreach ($this->shortcodes as $shortcode) {

			$regexp = '/\[' 
				. $shortcode . '(\s[\s\S]*?)?\]'
				. '(?:((?!\s*?(?:\[' 
				. $shortcode . '[(.?)+]|\[\/(?!' 
				. $shortcode . ')))[\s\S]*?)' . '(\[\/' 
				. $shortcode . '\]))?/i';

			$content = preg_replace($regexp, '<mark>$0</mark>', $content);
		}

		return $content;
	}
*/

	// In case post is update with Highlight ON remove all <mark> tags
	public function remove_shortcode_marks( $content ) {

		$content = preg_replace('/<mark[^>]*>/i', '',$content);
		$content = preg_replace('/<\/mark>/i', '', $content);

		return $content;
	}

	// Add PHP version notice if below 5.3
	public function show_minimum_support_notice() {

		 $class = 'notice notice-error';

		 $message = '<strong>Developry Bootstrap 4 Shortcodes</strong> requires PHP version 5.3 and WordPress 4.7 or above. You are running PHP ' . PHP_VERSION . ' and WordPress ' . $GLOBALS['wp_version'] . '. Please upgrade to the minimum supported versions for the plugin to be loaded.';

		return '<div class="' . $class . '">' . $message . '</div>';
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
