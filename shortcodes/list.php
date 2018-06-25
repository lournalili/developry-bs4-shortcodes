<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Process the [list][/list] shortcode.
//
// e.g. [list items= type= format= align= nav=nav flush=flush xclass]content[/list]
//
function developry_bs4_shortcode_list( $atts, $content = null ) {
	
	// Have a default fallback code block without attributes.
	if ( empty( $atts ) ) {

		return '<ul>' . do_shortcode( $content ) . '</ul>';
	}

	// Assign and format HTML attributes based on our shortcode.
	$atts['items'] = isset($atts['items']) 
		? Developry_BS4_Helpers::set('items', $atts['items']) 
		: 1;

	$atts['type'] = isset($atts['type']) 
		? Developry_BS4_Helpers::set('type', $atts['type']) 
		: '';

	$atts['format'] = isset($atts['format']) 
		? Developry_BS4_Helpers::set('format', ' list-' . $atts['format']) 
		: '';

	$atts['align'] = isset($atts['align']) 
		? Developry_BS4_Helpers::set('align', ' text-' . $atts['align']) 
		: '';
	
	$atts['flush'] = Developry_BS4_Helpers::set(
		Developry_BS4_Helpers::in_multiarr( 'flush', $atts ), 
		'list-group-flush'
	);

	$nav = Developry_BS4_Helpers::set(
		Developry_BS4_Helpers::in_multiarr( 'nav', $atts ), 
		true
	);
	
	$atts['xclass'] = isset($atts['xclass']) 
		? Developry_BS4_Helpers::set('xclass', $atts['xclass']) 
		: '';

	// Add additional content based on numeric (boolean) type options.

	// Build tag attributes.
	$atts = shortcode_atts( 
		array(
			'class' =>  $atts['format'] . $atts['flush'] .  $atts['align'] . $atts['xclass'],
		), $atts
	);

	// Return and replace the shortcode with the following HTML code.
	if ( $nav ) {

		return '<nav ' . Developry_BS4_Helpers::implode_atts( $atts ) . '>' . do_shortcode( $content ) . '</nav>';
	}

	if ( isset( $atts['type'] ) && $atts['type'] === 'ordered' ) {
		
		return '<ol ' . Developry_BS4_Helpers::implode_atts( $atts ) . '>' . do_shortcode( $content ) . '</ol>';
	}

	return '<ul ' . Developry_BS4_Helpers::implode_atts( $atts ) . '>' . do_shortcode( $content ) . '</ul>';
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
