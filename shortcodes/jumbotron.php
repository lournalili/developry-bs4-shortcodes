<?php
/**
	[jumbotron bgcolor=primary textcolor=light fluid]
		[head size=1]...[/head]
		[text lead]...[/text]
		[button color=primary]...[/button]
	[/jumbotron]
*/

	add_shortcode( 
		'jumbotron', 
		'developry_bs4_jumbotron' 
	);

	function developry_bs4_jumbotron( $atts, $content = null ) {

		if ( empty($atts) )
			return '<div class="jumbotron">' . do_shortcode( $content ) . '</div>';

		global $color_scheme;

		$bgcolor   = isset( $atts['bgcolor'] ) ? $atts['bgcolor'] : 'light';
		$textcolor = isset( $atts['textcolor'] ) ? $atts['textcolor'] : 'primary';
		$fluid     = in_multiarray( 'fluid', $atts ) ? ' jumbotron-fluid' : '';

		if ( in_array( $bgcolor, $color_scheme ) )
			$bgcolor = ' bg-' . $bgcolor;

		if ( in_array( $textcolor, $color_scheme ) )
			$textcolor = ' text-' . $textcolor;

		$jumbotron = shortcode_atts( 
			array(
				'class' => 'jumbotron' . $fluid . $bgcolor . $textcolor
			), $atts
		);

		return '<div ' . implode_atts( $jumbotron ) . '>' . do_shortcode( $content ) . '</div>';
	}