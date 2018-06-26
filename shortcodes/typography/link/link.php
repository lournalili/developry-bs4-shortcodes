<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Process the [link][/link] shortcode.
//
// e.g. [link text= href= xclass=]content[/link]
//
function developry_bs4_shortcode_link( $atts, $content = null ) {
	
	// Have a default fallback code block without attributes.
	if ( empty( $atts ) ) {

		return '<a href="#">' . do_shortcode( $content ) . '</a>';
	}

	// Assign and format HTML attributes based on our shortcode.
	$atts['text'] = isset($atts['text']) 
		? Developry_BS4_Helpers::set('text', 'text-' . $atts['text']) 
		: '';

	$atts['href'] = isset($atts['href']) 
		? Developry_BS4_Helpers::set('href', $atts['href']) 
		: '#';

	$atts['xclass'] = isset($atts['xclass']) 
		? Developry_BS4_Helpers::set('xclass', $atts['xclass']) 
		: '';

	// Add additional content based on numeric (boolean) type options.

	// Build tag attributes.
	$atts = shortcode_atts( 
		array(
			'class' => $atts['text'] . $atts['xclass'],
			'href'  => $atts['href'],
		), $atts
	);

	// Return and replace the shortcode with the following HTML code.
	return '<a ' . Developry_BS4_Helpers::implode_atts( $atts ) . '>' . do_shortcode( $content ) . '</a>';
}