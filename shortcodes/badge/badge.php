<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Process the [badge][/badge] shortcode.
//
// e.g. [badge color= href= pill=pill xclass=]content[/badge]
//
function developry_bs4_shortcode_badge( $atts, $content = null ) {

	// Have a default fallback code block without attributes.
	if ( empty( $atts ) ) {

		return '<span class="badge">' . do_shortcode( $content ) . '</span>';
	}

	// Assign and format HTML attributes based on our shortcode.
	$atts['color'] = isset($atts['color']) 
		? Developry_BS4_Helpers::set('color', 'badge-' . $atts['color']) 
		: '';

	$atts['href'] = isset( $atts['href'] ) 
		? Developry_BS4_Helpers::set( 'href', $atts['href'] ) 
		: '';

	$atts['pill'] = Developry_BS4_Helpers::set(
		Developry_BS4_Helpers::in_multiarr( 'pill', $atts ), 
		'badge-pill'
	);

	$atts['xclass'] = isset($atts['xclass']) 
		? Developry_BS4_Helpers::set('xclass', $atts['xclass']) 
		: '';

	// Add additional content based on numeric (boolean) type options.
	if ( $atts['href'] ) {

		$atts['onclick'] = 'location.href=\'' . $atts['href'] . '\'';
	}
	else {

		$atts['onclick'] = '#';
	}

	// Build tag attributes.
	$atts = shortcode_atts( 
		array(
			'class'   => 'badge' . $atts['color'] . $atts['pill'] . $atts['xclass'],
			'onclick' => $atts['onclick'] // would it work like this or do I need <a>?!?
		), $atts
	);

	// Return and replace the shortcode with the following HTML code.
	return '<span ' . Developry_BS4_Helpers::implode_atts( $atts ) . '>' . do_shortcode( $content ) . '</span>';
}
