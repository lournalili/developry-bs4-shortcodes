<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Process the [br /] shortcode.
//
// e.g. [br xclass= /]
//
function developry_bs4_shortcode_br( $atts, $content = null ) {
	
	// Have a default fallback code block without attributes.
	if ( empty( $atts ) ) {

		return '<br />';
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
	return '<br ' . Developry_BS4_Helpers::implode_atts( $atts ) . ' />';
}
