<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Process the [jumbotron][/jumbotron] shortcode.
//
// e.g. [jumbotron bg= text= fluid=fluid xclass]content[/jumbotron]
//
function developry_bs4_shortcode_jumbotron( $atts, $content = null ) {
	
	// Have a default fallback code block without attributes.
	if ( empty( $atts ) ) {

		return '<div class="jumbotron">' . do_shortcode( $content ) . '</div>';
	}

	// Assign and format HTML attributes based on our shortcode.
	$atts['bg'] = isset($atts['bg']) 
		? Developry_BS4_Helpers::set('bg', 'bg-' . $atts['bg']) 
		: '';

	$atts['text'] = isset($atts['text']) 
		? Developry_BS4_Helpers::set('text', 'text-' . $atts['text']) 
		: '';

	$attr['fluid'] = Developry_BS4_Helpers::set(
		Developry_BS4_Helpers::in_multiarr( 'fluid', $atts ), 
		'jumbotron-fluid'
	);

	$atts['xclass'] = isset($atts['xclass']) 
		? Developry_BS4_Helpers::set('xclass', $atts['xclass']) 
		: '';

	// Add additional content based on numeric (boolean) type options.

	// Build tag attributes.
	$atts = shortcode_atts( 
		array(
			'class' => 'jumbotron' . $atts['bg'] . $atts['text'] . $atts['fluid'] . $atts['xclass'],
		), $atts
	);

	// Return and replace the shortcode with the following HTML code.
	return '<div ' . Developry_BS4_Helpers::implode_atts( $atts ) . '>' . do_shortcode( $content ) . '</div>';
}
