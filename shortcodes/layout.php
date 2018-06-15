<?php
/**
	layout => one-column, [two,three,four]-columns
	[layout width=equal,col,variable halign=left,right,center,around,between valign=top,middle,bottom no-gutters xclass=]
		[column grid=[1-12] halign=left,right,center valign=start,center,end xclass=]...[/column]
	[layout]
*/
	function developry_bs4_column( $atts, $content = null ) {

		// have a default code block without attributes
		if ( empty( $atts ) ) 
			return '<div class="col">' . do_shortcode( $content ) . '</div>';

		$grid   = isset( $atts['grid'] ) ? ' col-md-' . $atts['grid'] : 'col';
		$halign = isset( $atts['valign'] ) ? ' text-' . $atts['halign'] : '';
		$valign = isset( $atts['valign'] ) ? ' align-self-' . $atts['valign'] : '';
		$xclass = isset( $atts['xclass'] ) ? ' ' . $atts['xclass'] : '';

		$column = shortcode_atts( 
			array(
				'class' => 'col-12' . $grid . $halign . $valign . $xclass
			), $atts
		);

		return '<div ' . implode_atts( $column ) . '>' . do_shortcode( $content ) . '</div>';
	}

	function developry_bs4_layout( $atts, $content = null ) {

		// have a default code block without attributes
		if ( empty( $atts ) ) 
			return '<div class="container"><div class="row">' . do_shortcode( $content ) . '</div></div>';

		$halign = isset( $atts['valign'] ) ? ' justify-content-' . $atts['valign'] : '';
		$valign = isset( $atts['valign'] ) ? ' align-items-' . $atts['valign'] : '';
		$no_gutters = in_multiarray( 'no-gutters', $atts ) ? ' no-gutters' : '';
		$xclass = isset( $atts['xclass'] ) ? ' ' . $atts['xclass'] : '';

		$layout = shortcode_atts( 
			array(
				'class' => 'row' . $halign . $valign . $no_gutters . $xclass
			), $atts
		);

		return '<div class="container"><div ' . implode_atts( $layout ) . '>' . do_shortcode( $content ) . '</div></div>';
	}

	function developry_bs4_one_column( $atts, $content = null ) { return developry_bs4_layout( $atts, $content ); }
	function developry_bs4_two_columns( $atts, $content = null ) { return developry_bs4_layout( $atts, $content ); }
	function developry_bs4_three_columns( $atts, $content = null ) { return developry_bs4_layout( $atts, $content ); }
	function developry_bs4_four_columns( $atts, $content = null ) { return developry_bs4_layout( $atts, $content ); }
