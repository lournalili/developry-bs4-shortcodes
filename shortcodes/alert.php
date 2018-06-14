<?php
/** 
	[alert bg-color= text-color= xclass= dismisable]...[/alert]
	[alert-link href= xclass=]...[/alert-link]
	[alert-heading xclass=]...[/alert-heading]
*/
	
	function developry_bs4_alert( $atts, $content = null ) {

		// have a default code block without attributes
		if ( empty($atts) ) 
			return '<div class="alert" role="alert">' . do_shortcode( $content ) . '</div>';

		global $color_scheme; // bootstrap color words

		$bg_color    = isset( $atts['bg-color'] ) 			 ? $atts['bg-color'] 			  : 'light';
		$text_color  = isset( $atts['text-color'] ) 		 ? $atts['text-color'] 			  : '';
		$xclass 	 = isset( $atts['xclass'] ) 			 ? ' ' . $atts['xclass'] 		  : '';
		$dismissable = in_multiarray( 'dismissable', $atts ) ? ' alert-dismissable fade show' : '';

		if ( in_array( $bg_color, $color_scheme ) )
			$bg_color = ' alert-' . $bg_color;

		if ( in_array( $text_color, $color_scheme ) )
			$text_color = ' text-' . $text_color;

		if ( $dismissable )
			$content = '<button color="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button>' . $content;

		$alert = shortcode_atts( 
			array(
				'class' => 'alert' . $bg_color . $text_color . $dismissable . $xclass,
				'role'  => 'alert'
			), $atts
		);

		return '<div ' . implode_atts( $alert ) . '>' . do_shortcode( $content ) . '</div>';
	}
	
	function developry_bs4_alert_link( $atts, $content = null ) {

		$href   = isset( $atts['href'] )   ? $atts['href']   : '#';
		$xclass = isset( $atts['xclass'] ) ? ' ' . $atts['xclass'] : '';

		$alert_link = shortcode_atts(
			array(
				'class' => 'alert-link' . $xclass,
				'href'  => $href
			), $atts
		);

		return '<a ' . implode_atts( $alert_link ) . '>' . do_shortcode( $content ) . ' </a>';
	}
	
	function developry_bs4_alert_heading( $atts, $content = null ) {

		$xclass = isset( $atts['xclass'] ) ? ' ' . $atts['xclass'] : '';

		$alert_link = shortcode_atts(
			array(
				'class' => 'alert-heading' . $xclass
			), $atts
		);

		// overwrite the heading size with xclass
		return '<h5 ' . implode_atts( $alert_link ) . '>' . do_shortcode( $content ) . ' </h5>';
	}
