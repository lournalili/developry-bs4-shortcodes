<?php
 /** 
 	[text color=primary lead]...[/text]
 */
 	add_shortcode(
 		'text',
 		'developry_bs4_text'
 	);

 	function developry_bs4_text( $atts, $content = null ) {

 		if ( empty($atts) ) 
			return '<p>' . do_shortcode( $content ) . '</p>';

		global $color_scheme;

		$color = isset( $atts['color'] ) ? $atts['color'] : '';
		$lead  = in_multiarray( 'lead', $atts ) ? ' lead' : '';

		if ( in_array( $color, $color_scheme ) )
			$color = ' text-' . $color;

 		$text = shortcode_atts( 
			array(
				'class' =>  $color . $lead
			), $atts
		);

		return '<p class="' . esc_attr( $text['class'] ) . '">' . do_shortcode( $content ) . '</p>';
	}

/**
	[head color=primary size=[1-4]]...[/head]
*/
	add_shortcode(
		'heading',
		'developry_bs4_heading'
	);

	function developry_bs4_heading( $atts, $content = null ) {

		if ( empty($atts) ) 
			return '<p>' . $content . '</p>';

		global $color_scheme;

		$color = isset( $atts['color'] ) ? $atts['color'] : '';
		$size  = isset( $atts['size'] ) ? $atts['size'] : 0;

		if ( $size > 0 && $size < 5 )
			$size = ' display-' . $size;

		if ( in_array( $color, $color_scheme ) )
			$color = ' text-' . $color;

		$head = shortcode_atts( 
			array(
				'class' =>  $color . $size
			), $atts
		);

		if  ( !$size )
			return '<h1 class="' . esc_attr( $head['class'] ) . '">' . do_shortcode( $content ) . '</h1>';

		return '<h' . esc_attr( $atts['size'] ) . ' class="' . esc_attr( $head['class'] ) . '">' . do_shortcode( $content ) . '</h' . esc_attr( $atts['size'] ) . '>';
	}