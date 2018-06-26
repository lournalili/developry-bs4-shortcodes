<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Developry_BS4_Admin {

	// Plugin root URL set by the constuctor.
	private $plugin_url;

	// Files with shortcode modal editor.windowManger body in /admin/shortcodes.
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

	// Constructor.
	public function __construct() {

		$this->plugin_url = plugins_url( '', __FILE__ );

		$this->init();
	}

	// Load TinyMCE custom assets.
	public function init() {

		add_action(
			'init', 
			array(
				$this,
				'init_tinymce',
			)
		);
	}

	// Load all CSS & JS scripts that will help to customize the TinyMCE eidtor.
	public function init_tinymce() {

		if ( ! current_user_can( 'edit_posts' ) 
			&& ! current_user_can( 'edit_pages' ) 
			&& get_user_option( 'rich_editing' ) == 'true' ) {
			
			return;
		}

		add_action(
			'mce_external_plugins', 
			array(
				$this,
				'register_tinymce_plugin', 
			)
		); 

		add_action(
			'mce_buttons', 
			array(
				$this,
				'add_tinymce_buttons',
			)
		);

		add_action(
			'admin_enqueue_scripts',
			array(
				$this,
				'enqueue_admin_styles',
			)
		);

		add_action(
			'admin_enqueue_scripts',
			array(
				$this,
				'enqueue_admin_scripts',
			)
		);
	}

	// Register our plugin into the TinyMCE and load all components body for editor.windowManager.
	public function register_tinymce_plugin( $plugins ) {

		// Loading the class for TinyMCE editor [iframe window].
		$plugins['developry_bs4_shortcode_class'] = $this->plugin_url . '/assets/js/developry-bs4-loader.js';

		foreach ($this->components as $component) {

			$component_parts     = explode('/', $component);
			$component_filename  = end($component_parts);
			$component_url = str_replace('admin', '', $this->plugin_url);
		
			$plugins['developry_bs4_shortcode_' . $component] =  $component_url . '/shortcodes/' . $component . '/' . $component_filename . '.js';
		}

		// This is the main JS files that will handle TinyMCE customization.
		$plugins['developry_bs4_shortcode_init'] = $component_url . '/shortcodes/init.js';

	    return $plugins;
	}

	// Add plugin button into the TinyMCE toolbar.
	public function add_tinymce_buttons( $buttons ) {

		array_push(
			$buttons, 
			'developry_bs4_shortcode_element_button'
		);
	    
	    return $buttons;
	}

	// Add plugin custom CSS into the footer of the WP admin area.
	public function enqueue_admin_styles() {

		wp_enqueue_style(
			'developry-bs4-admin', 
			$this->plugin_url . '/assets/css/developry-bs4-admin.css', 
			null, 
			null, 
			'all' 
		);
	}

	// Add plugin custom JS into the footer of the WP admin area.
	public function enqueue_admin_scripts() {

		// Loading the class for the main window.
		wp_enqueue_script(
			'developry-bs4-init', 
			$this->plugin_url . '/assets/js/developry-bs4-loader.js', 
			array( 'jquery' ), 
			null, 
			true
		);

		wp_enqueue_script(
			'developry-bs4-admin', 
			$this->plugin_url . '/assets/js/developry-bs4-admin.js', 
			array( 'jquery' ), 
			null, 
			true
		);
	}
}
