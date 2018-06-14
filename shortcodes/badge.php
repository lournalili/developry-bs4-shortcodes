<?php
/**
	[badge color=primary href= pill xclass=]...[/badge]
*/
	function developry_bs4_badge( $atts, $content = null ) {

		// have a default code block without attributes
		if ( empty( $atts ) ) 
			return '<span class="badge">' . do_shortcode( $content ) . '</span>';

		global $color_scheme; // bootstrap color words

		$color  = isset( $atts['color'] ) ? $atts['color'] : 'primary';
		$href   = isset( $atts['href'] ) ? $atts['href'] : '';
		$pill   = in_multiarray( 'pill', $atts ) ? ' badge-pill' : '';
		$xclass = isset( $atts['xclass'] ) ? ' ' . $atts['xclass'] : '';

		if ( in_array( $color, $color_scheme ) )
			$color = ' badge-' . $atts['color'];

		$badge = shortcode_atts( 
			array(
				'class' => 'badge' . $color . $pill . $xclass
			), $atts
		);

		if ( $href )
			return '<a href="' . $href . '" ' . implode_atts( $badge ) . '>' . do_shortcode( $content ) . '</a>';

		return '<span ' . implode_atts( $badge ) . '>' . do_shortcode( $content ) . '</span>';
	}
	