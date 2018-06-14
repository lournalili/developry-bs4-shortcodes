<?php
/**
	[table color=dark size=sm striped bordered hover responsive xclass=]...[/table]
*/
	function developry_bs4_table( $atts, $content = null ) {

		if ( empty( $atts ) ) 
			return '<table class="table">' . do_shortcode( $content ) . '</table>';

		global $color_scheme;

		$color 		= isset( $atts['color'] ) ? $atts['color'] : 'light';
		$size  		= isset( $atts['size'] ) ? ' table-' . $atts['size'] : '';
		$striped 	= in_multiarray( 'striped', $atts ) ? ' table-striped' : '';
		$bordered 	= in_multiarray( 'bordered', $atts ) ? ' table-bordered' : '';
		$hover 		= in_multiarray( 'hover', $atts ) ? ' table-hover' : '';
		$responsive = in_multiarray( 'responsive', $atts ) ? ' table-responsive' : '';
		$xclass     = isset( $atts['xclass'] ) ? ' ' . $atts['xclass'] : '';

		if ( in_array( $color, $color_scheme ) )
			$color = ' table-' . $color;

		$table = shortcode_atts( 
			array(
				'class' => 'table' . $color . $size . $striped . $bordered . $hover . $responsive
			), $atts
		);

		return '<table ' . implode_atts( $table ) . '>' . do_shortcode( $content ) . '</table>';
	}