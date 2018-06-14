<?php
/**
	[table color=dark,light size=sm striped bordered hover responsive]...[/table]
*/

	add_shortcode( 
		'table', 
		'developry_bs4_table' 
	);
	
	function developry_bs4_table( $atts, $content = null ) {

		if ( empty($atts) ) 
			return '<table class="table">' . do_shortcode( $content ) . '</table>';

		global $color_scheme;

		$color 		= isset( $atts['color'] ) ? $atts['color'] : 'light';
		$size  		= isset( $atts['size'] ) ? ' table-' . $atts['size'] : '';
		$striped 	= in_multiarray( 'striped', $atts ) ? ' table-striped' : '';
		$bordered 	= in_multiarray( 'bordered', $atts ) ? ' table-bordered' : '';
		$hover 		= in_multiarray( 'hover', $atts ) ? ' table-hover' : '';
		$responsive = in_multiarray( 'responsive', $atts ) ? ' table-responsive' : '';

		if ( in_array( $color, $color_scheme ) )
			$color = ' table-' . $color;

		$table = shortcode_atts( 
			array(
				'class' => 'table' . $color . $size . $striped . $bordered . $hover . $responsive
			), $atts
		);

		return '<table ' . implode_atts( $table ) . '>' . do_shortcode( $content ) . '</table>';
	}