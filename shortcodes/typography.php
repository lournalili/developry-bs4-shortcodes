<?php
/**
	[list type=ordered,unordered format=inline,unstyled,group align=left,right,center nav xclass=]
		[list-item format=inline-item,group-item href= xclass=]...[/list-item]
	[/list]
*/
	function developry_bs4_list( $atts, $content = null ) {

	}	

	function developry_bs4_list_item( $atts, $content = null ) {

	}
/**
	[link text-color=primary href= xclass=]...[/link]
*/
	function developry_bs4_link( $atts, $content = null ) {

		// have a default code block without attributes
		if ( empty( $atts ) ) 
			return '<p>' . do_shortcode( $content ) . '</p>';

		global $color_scheme; // bootstrap color words

		$text_color = isset( $atts['text-color'] ) ? $atts['text-color'] : '';
		$href       = isset( $atts['href'] ) ?  $atts['href'] : '#';
		$xclass     = isset( $atts['xclass'] ) ? ' ' . $atts['xclass'] : '';

		if ( in_array( $text_color, $color_scheme ) )
			$text_color = ' text-' . $text_color;

		$link = shortcode_atts( 
			array(
				'class' =>  $text_color . $xclass,
				'href'  => $href
			), $atts
		);

		return '<a ' . implode_atts( $link ) . '">' . do_shortcode( $content ) . '</a>';
	}
/**
	[text bg-color=primary text-color=light size=[1-6] display=[1-4] align=left,right,center lead heading xclass=]...[/text]
*/
	function developry_bs4_text( $atts, $content = null ) {

		// have a default code block without attributes
		if ( empty( $atts ) ) 
			return '<p>' . do_shortcode( $content ) . '</p>';

		global $color_scheme; // bootstrap color words

		$bg_color   = isset( $atts['bg-color'] ) ? $atts['bg-color'] : '';
		$text_color = isset( $atts['text-color'] ) ? $atts['text-color'] : '';
		$text_align = isset( $atts['text-align'] ) ? $atts['text-align'] : '';
		$size       = isset( $atts['size'] ) ?  $atts['size'] : '';
		$display    = isset( $atts['display'] ) ? ' display' . $atts['display'] : '';
		$lead       = in_multiarray( 'lead', $atts ) ? ' lead' : '';
		$heading    = in_multiarray( 'heading', $atts ) ? true : '';
		$xclass     = isset( $atts['xclass'] ) ? ' ' . $atts['xclass'] : '';

		if ( in_array( $bg_color, $color_scheme ) )
			$bg_color = ' bg-' . $bg_color;

		if ( in_array( $text_color, $color_scheme ) )
			$text_color = ' text-' . $text_color;

 		$text = shortcode_atts( 
			array(
				'class' =>  $bg_color . $text_color . $text_align . ' ' . $size . $display . $lead . $xclass
			), $atts
		);

 		if ( $heading && $size ) // want a heading and size h[1-6] is specified
 			return '<' . $size . ' ' . implode_atts( $text ) . '">' . do_shortcode( $content ) . '</' . $size . '>';
 		else // otherwise add default size for heading h3
 			return '<h3 ' . implode_atts( $text ) . '">' . do_shortcode( $content ) . '</h3>';

		return '<p ' . implode_atts( $text ) . '">' . do_shortcode( $content ) . '</p>';
	}

