<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Process the [image /] shortcode.
//
// e.g. [image src= alt= fluid=fluid thumbnail=thumbnail rounded=rounded circle=circle xclass= /]
//
function developry_bs4_shortcode_image( $atts, $content = null ) {
	
	// Have a default fallback code block without attributes.
	if ( empty( $atts ) ) {

		return '<img src="http://via.placeholder.com/2000x1200" alt="placeholder" class="img-fluid" />';
	}

	// Assign and format HTML attributes based on our shortcode.
	$atts['src'] = isset($atts['src']) 
		? Developry_BS4_Helpers::set('src', $atts['src']) 
		: '';

	$atts['fluid'] = Developry_BS4_Helpers::set(
		Developry_BS4_Helpers::in_multiarr( 'fluid', $atts ), 
		'img-fluid'
	);

	$atts['thumbnail'] = Developry_BS4_Helpers::set(
		Developry_BS4_Helpers::in_multiarr( 'thumbnail', $atts ), 
		'img-thumbnail'
	);

	$atts['rounded'] = Developry_BS4_Helpers::set(
		Developry_BS4_Helpers::in_multiarr( 'rounded', $atts ), 
		'rounded'
	);

	$atts['circle'] = Developry_BS4_Helpers::set(
		Developry_BS4_Helpers::in_multiarr( 'circle', $atts ), 
		'rounded-circle'
	);

	$atts['xclass'] = isset($atts['xclass']) 
		? Developry_BS4_Helpers::set('xclass', $atts['xclass']) 
		: '';

	// Add additional content based on numeric (boolean) type options.

	// Build tag attributes.
	$atts = shortcode_atts( 
		array(
			'class' => 'img' . $atts['fluid'] . $atts['thumbnail'] . $atts['rounded'] . $atts['circl'] . $atts['xclass'],
			'src'   => $atts['src'],
		), $atts
	);

	// Return and replace the shortcode with the following HTML code.
	return '<img ' . Developry_BS4_Helpers::implode_atts( $atts ) . ' />';
}
