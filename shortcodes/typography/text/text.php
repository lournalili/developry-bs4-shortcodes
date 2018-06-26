<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Process the [text][/text] shortcode.
//
// e.g. [text bg= text= align= size= display= lead=lead heading=heading xclass=]content[/text]
//
function developry_bs4_shortcode_text( $atts, $content = null ) {
	
	// Have a default fallback code block without attributes.
	if ( empty( $atts ) ) {

		return '<p>' . do_shortcode( $content ) . '</p>';
	}

	// Assign and format HTML attributes based on our shortcode.
	$atts['bg'] = isset($atts['bg']) 
		? Developry_BS4_Helpers::set('bg', 'bg-' . $atts['bg']) 
		: '';

	$atts['text'] = isset($atts['text']) 
		? Developry_BS4_Helpers::set('text', 'text-' . $atts['text']) 
		: '';

	$atts['align'] = isset($atts['align']) 
		? Developry_BS4_Helpers::set('align', 'text-' . $atts['align']) 
		: '';

	$atts['display'] = isset($atts['display']) 
		? Developry_BS4_Helpers::set('display', $atts['display']) 
		: '';

	$size = isset($atts['size']) 
		? Developry_BS4_Helpers::set('size', $atts['size']) 
		: '';

	$heading = isset($atts['heading']) 
		? Developry_BS4_Helpers::set('heading', $atts['heading']) 
		: '';

	$atts['lead'] = Developry_BS4_Helpers::set(
		Developry_BS4_Helpers::in_multiarr( 'lead', $atts ), 
		'lead'
	);

	$atts['xclass'] = isset($atts['xclass']) 
		? Developry_BS4_Helpers::set('xclass', $atts['xclass']) 
		: '';

	// Add additional content based on numeric (boolean) type options.

	// Build tag attributes.
	$atts = shortcode_atts( 
		array(
			'class' => $atts['bg'] . $atts['text'] . $atts['align'] . $atts['display'] . $atts['lead'] . $atts['xclass'],
		), $atts
	);	

	// Return and replace the shortcode with the following HTML code.
	if ( $heading && $size ) {

		return '<' . $size . ' ' . Developry_BS4_Helpers::implode_atts( $atts ) . '">' 
			. do_shortcode( $content ) . '</' . $size . '>';
	} else {
		
		// Otherwise add default size for heading h3.
		return '<h3 ' . Developry_BS4_Helpers::implode_atts( $atts ) . '">' . do_shortcode( $content ) . '</h3>';
	}

	return '<p ' . Developry_BS4_Helpers::implode_atts( $atts ) . '>' . do_shortcode( $content ) . '</p>';
}
