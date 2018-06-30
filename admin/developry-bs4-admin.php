<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Developry_BS4_Admin {

	// Plugin root URL set by the constuctor.
	private $plugin_url;

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

		add_filter(
			'tiny_mce_before_init', 
			array(
				$this, 
				'customize_tinymce'
			), 
			1, 2
		);

		// Loading some custom styles to our editor as well as Bootstrap (if not found)
		add_editor_style($this->plugin_url . '/assets/css/developry-bs4-editor.css');
		add_editor_style('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/css/bootstrap.min.css');
	}


	// Cutomize TinyMCE options on WP before loading it.
	public function customize_tinymce( $tinymce, $editor ) {
		// Nothing changing yet.
		return $tinymce;
	}

	// Register our plugin into the TinyMCE and load all components body for editor.windowManager.
	public function register_tinymce_plugin( $plugins ) {

		// This is the main JS files that will handle TinyMCE customization.
		$plugins['developry_bs4_shortcode'] = $this->plugin_url . '/developry-bs4-admin.js';

		// Load certain plugins for TinyMCE Vizualize not avilable in WordPress distro
		// ( https://github.com/tinymce/tinymce-dist/tree/master/plugins )
		$plugins['contextmenu'] = $this->plugin_url . '/plugins/tinymce/contextmenu/plugin.js';

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

	// Add additional plugin custom CSS into the footer of the WP admin area.
	public function enqueue_admin_styles() {

		wp_enqueue_style(
			'developry-bs4-admin', 
			$this->plugin_url . '/assets/css/developry-bs4-admin.css', 
			null, 
			null, 
			'all' 
		);
	}

	// Add additional plugin custom JS into the footer of the WP admin area.
	public function enqueue_admin_scripts() {

		// wp_enqueue_script(
		// 	'developry-bs4-admin', 
		// 	$this->plugin_url . '/assets/js/script.js', 
		// 	array( 'jquery' ), 
		// 	null, 
		// 	true
		// );

		wp_enqueue_script(
			'requirejs', 
			$this->plugin_url . '/assets/js/require.js', 
			null, 
			null, 
			true
		);

		wp_enqueue_script(
			'class-developry-bs4-admin', 
			$this->plugin_url . '/classes/class-developry-bs4-admin.js', 
			array( 'jquery' ), 
			null, 
			true
		);

		wp_enqueue_script(
			'class-developry-bs4-shortcodes', 
			$this->plugin_url . '/classes/class-developry-bs4-shortcodes.js', 
			array( 'jquery' ), 
			null, 
			true
		);

		wp_enqueue_script(
			'class-developry-bs4-window', 
			$this->plugin_url . '/classes/class-developry-bs4-window.js', 
			array( 'jquery' ), 
			null, 
			true
		);

		wp_enqueue_script(
			'class-developry-bs4-utility', 
			$this->plugin_url . '/classes/class-developry-bs4-utility.js', 
			array( 'jquery' ), 
			null, 
			true
		);

		// Pass plugin URL base to Window class.
		wp_localize_script(
			'class-developry-bs4-window', 
			'Developry',
			array(
				'baseurl' =>  plugins_url('',  __FILE__ ),
			)
		);
	}
}
