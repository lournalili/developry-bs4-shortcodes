<?php
/**	
	[badge color= href= xclass= link pill]...[/badge]
*/

	add_shortcode( 
		'badge', 
		'developry_bs4_bdage' 
	);

	function developry_bs4_bdage( $atts, $content = null ) {

		// have a default code block without attributes
		if ( empty( $atts ) ) 
			return '<span class="badge">' . do_shortcode( $content ) . '</span>';

		global $color_scheme; // bootstrap color words

		$color  = isset( $atts['color'] ) 		 ? $atts['color'] 		 : 'primary';
		$href   = isset( $atts['href'] )  		 ? $atts['href']  		 : '#';
		$xclass = isset( $atts['xclass'] ) 		 ? ' ' . $atts['xclass'] : '';
		$link   = in_multiarray( 'link', $atts ) ? true 			 	 : '';
		$pill   = in_multiarray( 'pill', $atts ) ? ' badge-pill'  		 : '';

		if ( in_array( $color, $color_scheme ) )
			$color = ' badge-' . $atts['color'];

		$badge = shortcode_atts( 
			array(
				'class' => 'badge' . $color . $pill . $xclass
			), $atts
		);

		if ( $link )
			return '<a href="' . $href . '" ' . implode_atts( $badge ) . '>' . do_shortcode( $content ) . '</a>';

		return '<span ' . implode_atts( $badge ) . '>' . do_shortcode( $content ) . '</span>';
	}
	