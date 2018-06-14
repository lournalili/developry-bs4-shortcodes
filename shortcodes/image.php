<?php
/**
	[image src= alt= fluid thumbnail rounded circle xclass= /]
*/
	function developry_bs4_image( $atts, $content = null ) {

		// have a default code block without attributes
		if ( empty( $atts ) ) 
			return '<img src="http://via.placeholder.com/2000x1200" alt="Placeholder" class="img-fluid" />';

		global $color_scheme; // bootstrap color words

		$src       = isset( $atts['src'] ) ? $atts['src'] : 'http://via.placeholder.com/2000x1200';
		$fluid     = in_multiarray( 'fluid', $atts ) ? ' img-fluid' : '';
		$thumbnail = in_multiarray( 'thumbnail', $atts ) ? ' img-thumbnail' : '';
		$rounded   = in_multiarray( 'rounded', $atts ) ? ' rounded' : '';
		$circle    = in_multiarray( 'circle', $atts ) ? ' rounded-circle' : '';
		$xclass    = isset( $atts['xclass'] ) ? ' ' . $atts['xclass'] : '';

		$alert = shortcode_atts( 
			array(
				'class' => 'img' . $fluid . $thumbnail . $rounded . $circle . $xclass,
				'src'   => $src
			), $atts
		);

		return '<img ' . implode_atts( $alert ) . ' .>';
	}
