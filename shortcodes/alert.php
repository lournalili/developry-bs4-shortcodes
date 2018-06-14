<?php
/**
	[alert color=primary dismisable xclass=]...[/alert]
*/
	function developry_bs4_alert( $atts, $content = null ) {

		// have a default code block without attributes
		if ( empty( $atts ) ) 
			return '<div class="alert" role="alert">' . do_shortcode( $content ) . '</div>';

		global $color_scheme; // bootstrap color words

		$color       = isset( $atts['color'] ) ? $atts['color'] : 'primary';
		$dismissable = in_multiarray( 'dismissable', $atts ) ? ' alert-dismissable fade show' : '';
		$xclass      = isset( $atts['xclass'] ) ? ' ' . $atts['xclass'] : '';

		if ( in_array( $color, $color_scheme ) )
			$color = ' alert-' . $color;

		if ( $dismissable )
			$content = '<button color="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button>' . $content;

		$alert = shortcode_atts( 
			array(
				'class' => 'alert' . $color . $dismissable . $xclass,
				'role'  => 'alert'
			), $atts
		);

		return '<div ' . implode_atts( $alert ) . '>' . do_shortcode( $content ) . '</div>';
	}