<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Process the [blockquote][/blockquote] shortcode.
//
// e.g. [blockquote bg= text= align= source= xclass=]content[/blockquote]
//
function developry_bs4_shortcode_blockquote( $atts, $content = null ) {
	
	// Have a default fallback code block without attributes.
	if ( empty( $atts ) ) {

		return '<blockquote class="blockquote"><q>' . do_shortcode( $content ) . '</q></blockquote>';
	}

	// Assign and format HTML attributes based on our shortcode.
	$atts['color'] = isset($atts['color']) 
		? Developry_BS4_Helpers::set('color', 'bg-' . $atts['color']) 
		: '';

	$atts['text'] = isset($atts['text']) 
		? Developry_BS4_Helpers::set('text', 'text-' . $atts['text']) 
		: '';

	$atts['align'] = isset($atts['align']) 
		? Developry_BS4_Helpers::set('align', 'text-' . $atts['align']) 
		: '';

	$atts['source'] = isset($atts['source']) 
		? Developry_BS4_Helpers::set('source', $atts['source']) 
		: '';

	$atts['xclass'] = isset($atts['xclass']) 
		? Developry_BS4_Helpers::set('xclass', $atts['xclass']) 
		: '';

	// Add additional content based on numeric (boolean) type options.
	if ( $atts['source'] )  {
		
		$content .= '<footer class="blockquote-footer text-right">' . $atts['source'] . '</footer>';
	}

	// Build tag attributes.
	$atts = shortcode_atts( 
		array(
			'class' => 'blockquote' . $atts['color'] . $atts['text'] . $atts['align'] . $atts['xclass'],
		), $atts
	);

	// Return and replace the shortcode with the following HTML code.
	return '<blockquote ' . Developry_BS4_Helpers::implode_atts( $atts ) . '>' . do_shortcode( $content ) . '</blockquote>';
}
