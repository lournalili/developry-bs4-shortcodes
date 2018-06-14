<?php
/**
	[button color=primary outline=primary size=lg,sm href= block active disabled xclass=]...[/button]
*/
	function developry_bs4_button( $atts, $content = null ) {

		if ( empty( $atts ) ) 
			return '<button type="button" class="btn btn-primary" >' . do_shortcode( $content ) . '</button>';

		global $color_scheme;

		$color    = isset( $atts['color'] ) ? $atts['color'] : '';
		$outline  = isset( $atts['outline'] ) ? $atts['outline'] : '';
		$size     = isset( $atts['size'] ) ? ' btn-' . $atts['size'] : '';
		$href     = isset( $atts['href'] ) ? $atts['href'] : '';
		$block    = in_multiarray( 'block', $atts ) ? ' btn-block' : '';
		$active   = in_multiarray( 'active', $atts ) ? ' active' : '';
		$disabled = in_multiarray( 'disabled', $atts ) ? ' disabled' : '';
		$xclass   = isset( $atts['xclass'] ) ? ' ' . $atts['xclass'] : '';

		if ( in_array( $color, $color_scheme ) )
			$color = ' btn-' . $color;

		if ( in_array( $outline, $color_scheme ) )
			$outline = ' btn-outline-' . $outline;

		if ( $href )
			$onclick = 'location.href=\'' . $href . '\'';
		else
			$onclick = '#';

		$button = shortcode_atts( 
			array(
				'class' 	   => 'btn' . $color . $outline . $size . $block . $active . $disabled . $xclass,
				'onclick'      => $onclick
			), $atts
		);

		return '<button type="button" ' . implode_atts( $button ) . '>' . do_shortcode( $content ) . '</button>';
	}