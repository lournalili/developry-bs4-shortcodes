<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Process the [alert][/alert] shortcode.
//
// e.g. [alert color= dismissable= dismissable xclass=]content[/alert]
//
function developry_bs4_shortcode_alert( $atts, $content = null ) {

	// Have a default fallback code block without attributes.
	if ( empty( $atts ) ) {

		return '<div class="alert" role="alert">' . do_shortcode( $content ) . '</div>';
	}

	// Assign and format HTML attributes based on our shortcode.
	$atts['color'] = isset($atts['color']) 
		? Developry_BS4_Helpers::set('color', 'alert-' . $atts['color']) 
		: '';
	
	$atts['dismissable'] = Developry_BS4_Helpers::set(
		Developry_BS4_Helpers::in_multiarr( 'dismissable', $atts ), 
		'alert-dismissable fade show'
	);
	
	$atts['xclass'] = isset($atts['xclass']) 
		? Developry_BS4_Helpers::set('xclass', $atts['xclass']) 
		: '';

	// Add additional content based on numeric (boolean) type options.  
	if ( $atts['dismissable'] ) {
		
		$content = '<button color="button" class="close" data-dismiss="alert" aria-label="close">
			<span aria-hidden="true">&times;</span></button>' . $content;
	}

	// Build tag attributes.
	$atts = shortcode_atts( 
		array(
			'class' => 'alert' . $atts['color'] . $atts['dismissable'] . $atts['xclass'],
			'role'  => 'alert'
		), $atts
	);

	// Return and replace the shortcode with the following HTML code.
	return '<div ' . Developry_BS4_Helpers::implode_atts( $atts ) . '>' . do_shortcode( $content ) . '</div>';
}
