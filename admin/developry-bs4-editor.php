<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Developry_BS4_Editor {

	// Constructor.
	public function __construct() {

		$this->init();
	}

	// Customize editor and add toggle buttons.
	public function init() {

		add_action(
			'edit_form_after_editor', 
			array( 
				$this, 
				'editor' 
			) 
		);

		add_filter( 
			'teeny_mce_before_init', 
			array( 
				$this, 'do_readonly' 
			) 
		);

		add_filter( 
			'teeny_mce_buttons', 
			array( $this, 'remove_buttons' ) 
		);

		add_action( 
			'media_buttons', 
			array( 
				$this, 
				'add_buttons' 
			) 
		);
	}

	// Add preview buttons into the media buttons area.
	public function add_buttons() {


		print '<button type="button" class="button button-developry-bs4-shortcodes button-preview-toggle">
			<span class="dashicons dashicons-desktop"></span> 
			<span class="button-text">Preview</span>
		</button>';

		print '<button type="button" class="button button-developry-bs4-shortcodes button-convert-toggle">
			<span class="dashicons dashicons-share-alt"></span> 
			<span class="button-text">Shortcodes</span>
		</button>';

		print '<button type="button" class="button button-developry-bs4-shortcodes button-highlight-toggle">
			<span class="dashicons dashicons-visibility"></span> 
			<span class="button-text">Highlight</span>
		</button>';

		print '<span class="developry-bs4-shortcodes-hint">
			<em>Hint:</em> Turn on highlighter and double click on shortcode tag keyword to Edit.
		</span>';

	}

	// Create a custom WP editor for our preview area and populate with current post content.
	public function editor() {

		global $post;
		
		$preview_content = do_shortcode( $post->post_content );

		print '<div class="preview-editor-container" style="display: none;">';

		wp_editor( 
			$preview_content, 
			'developry-shortcodes-preview-editor', 
			array(
				'drag_drop_upload' => false,
				'media_buttons'    => false,
				'editor_height'    => 640,
				'teeny' 	       => true,
				'quicktags' 	   => false,
				'tinymce' 		   => true,
			) 
		);

		print '</div>';
	}

	// Make the custom WP editor window read-only.
	public function do_readonly( $args ) {

		$args['readonly'] = 1;

		 return $args;
	}

	// Remove all the buttons but the fullscreen (distract mode) from our preview editor window.
	public function remove_buttons( $buttons ) {

		$remove_buttons = array(
		 	'bold',
		 	'italic',
		 	'underline',
		 	'blockquote',
		 	'strikethrough',
		 	'bullist',
		 	'numlist',
		 	'alignleft',
		 	'alignright',
		 	'aligncenter',
		 	'undo',
		 	'redo',
		 	'link',
	    );

	    foreach ( $buttons as $button_key => $button_value ) {

	        if ( in_array( $button_value, $remove_buttons ) ) {
	        
	            unset( $buttons[ $button_key ] );
	        }
	    }

	    return $buttons;
	}
}
