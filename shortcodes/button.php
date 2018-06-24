<?php

// Process the [button][/button] shortcode.
//
// e.g. [button color= outline= href= size= active=active disabled=disabled block=block xclass=]...[/alert]
//
function developry_bs4_shortcode_button( $atts, $content = null ) {

	// Have a default fallback code block without attributes.
	if ( empty( $atts ) ) {

		return '<button type="button" class="btn btn-primary" >' . do_shortcode( $content ) . '</button>';
	}

	// Assign and format HTML attributes based on our shortcode.
	$atts['color'] = isset( $atts['color'] ) 
		? Developry_BS4_Helpers::set( 'color', 'btn-' . $atts['color'] ) 
		: '';

	$atts['outline'] = isset( $atts['outline'] ) 
		? Developry_BS4_Helpers::set( 'outline', 'btn-outline-' . $atts['outline'] ) 
		: '';

	$atts['size'] = isset( $atts['size'] ) 
		? Developry_BS4_Helpers::set( 'size', 'btn-' . $atts['outline'] ) 
		: '';

	$atts['href'] = isset( $atts['href'] ) 
		? Developry_BS4_Helpers::set( 'href', $atts['href'] ) 
		: '';

	$atts['fluid'] = isset( $atts['fluid'] ) 
		? Developry_BS4_Helpers::set( 'fluid', 'btn-' . $atts['fluid'] ) 
		: '';

	$atts['active'] = Developry_BS4_Helpers::set(
		Developry_BS4_Helpers::in_multiarr( 'active', $atts ), 
		'active'
	);

	$atts['disabled'] = Developry_BS4_Helpers::set(
		Developry_BS4_Helpers::in_multiarr( 'disabled', $atts ), 
		'disabled'
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
			'class' => 'btn' . $atts['color'] . $atts['outline'] . $atts['size'] . $atts['fluid'] 
				. $atts['active'] . $atts['disabled'] . $atts['xclass'],
			'onclick' => $atts['onclick']
		), $atts
	);

	// Return and replace the shortcode with the following HTML code.
	return '<button type="button" ' . Developry_BS4_Helpers::implode_atts( $atts ) . '>' . do_shortcode( $content ) . '</button>';
}
