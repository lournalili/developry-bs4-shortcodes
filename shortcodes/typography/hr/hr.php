<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Process the [hr /] shortcode.
//
// e.g. [hr xclass= /]
//
function developry_bs4_shortcode_hr( $atts, $content = null ) {
	
	// Have a default fallback code block without attributes.
	if ( empty( $atts ) ) {

		return '<hr />';
	}

	// Assign and format HTML attributes based on our shortcode.
	$atts['xclass'] = isset($atts['xclass']) 
		? Developry_BS4_Helpers::set('xclass', $atts['xclass']) 
		: '';

	// Add additional content based on numeric (boolean) type options.

	// Build tag attributes.
	$atts = shortcode_atts( 
		array(
			'class' => $atts['xclass'],
		), $atts
	);

	// Return and replace the shortcode with the following HTML code.
	return '<hr ' . Developry_BS4_Helpers::implode_atts( $atts ) . ' />';
}
