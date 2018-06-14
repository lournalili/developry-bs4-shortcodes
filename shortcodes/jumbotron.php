<?php
/**
	[jumbotron bg-color=primary text-color=light fluid xclass=]...[/jumbotron]
*/
	function developry_bs4_jumbotron( $atts, $content = null ) {

		// have a default code block without attributes
		if ( empty( $atts ) )
			return '<div class="jumbotron">' . do_shortcode( $content ) . '</div>';

		global $color_scheme; // bootstrap color words

		$bg_color   = isset( $atts['bg-color'] ) ? $atts['bg-color'] : '';
		$text_color = isset( $atts['text-color'] ) ? $atts['text-color'] : '';
		$fluid      = in_multiarray( 'fluid', $atts ) ? ' jumbotron-fluid' : '';
		$xclass   = isset( $atts['xclass'] ) ? ' ' . $atts['xclass'] : '';

		if ( in_array( $bg_color, $color_scheme ) )
			$bg_color = ' bg-' . $bg_color;

		if ( in_array( $text_color, $color_scheme ) )
			$text_color = ' text-' . $text_color;

		$jumbotron = shortcode_atts( 
			array(
				'class' => 'jumbotron' . $fluid . $bg_color . $text_color . $xclass
			), $atts
		);

		return '<div ' . implode_atts( $jumbotron ) . '>' . do_shortcode( $content ) . '</div>';
	}
