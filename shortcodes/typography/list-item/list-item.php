<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Process the [list-item][/list-item] shortcode.
//
// e.g. [list-item bg= href= format= active=active xclass=]content[/list-item]
//
function developry_bs4_shortcode_list_item( $atts, $content = null ) {
	
	// Have a default fallback code block without attributes.
	if ( empty( $atts ) ) {

		return '<li>' . do_shortcode( $content ) . '</li>';
	}

	// Assign and format HTML attributes based on our shortcode.
	$atts['bg'] = isset( $atts['bg'] ) 
		? Developry_BS4_Helpers::set( 'bg', 'bg-' . $atts['color'] ) 
		: '';

	$atts['format'] = isset($atts['format']) 
		? Developry_BS4_Helpers::set('format', $atts['format']) 
		: '';

	$atts['active'] = Developry_BS4_Helpers::set(
		Developry_BS4_Helpers::in_multiarr( 'active', $atts ), 
		' active'
	);
	
	$atts['xclass'] = isset($atts['xclass']) 
		? Developry_BS4_Helpers::set('xclass', $atts['xclass']) 
		: '';

	$href = isset($atts['href']) 
		? Developry_BS4_Helpers::set('href', $atts['href']) 
		: '';

	$atts['list-group-item-action'] = ! empty( $atts['href'] ) ? ' list-group-item-action' : '';

	// Add additional content based on numeric (boolean) type options.

	// Build tag attributes.
	$atts = shortcode_atts( 
		array(
			'class' => $atts['bg'] . $atts['format'] . $atts['active'] . $atts['list-group-item-action'] . $atts['xclass'],
			'href'  => $href,
		), $atts
	);

	// Return and replace the shortcode with the following HTML code.
	if ( $href ) {

		return '<a ' . Developry_BS4_Helpers::implode_atts( $atts ) . '>' . do_shortcode( $content ) . '</a>';
	}

	return '<li ' . Developry_BS4_Helpers::implode_atts( $atts ) . '>' . do_shortcode( $content ) . '</li>';
}
