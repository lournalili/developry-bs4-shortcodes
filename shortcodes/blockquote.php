<?php 
/** 
	[blockquote bg-color= text-color= text-align= source= xclass=]...[/blockquote]
*/
 	add_shortcode(
 		'blockquote',
 		'developry_bs4_blockquote'
 	);
 
 	function developry_bs4_blockquote( $atts, $content = null ) {

 		if ( empty($atts) ) 
			return '<blockquote class="blockquote"><q>' . do_shortcode( $content ) . '</q></blockquote>';

		global $color_scheme;

		$bg_color   = isset( $atts['bg-color'] )   ? $atts['bg-color']     : '';
		$text_color = isset( $atts['text-color'] ) ? $atts['text-color']   : '';
		$text_align = isset( $atts['text-align'] ) ? $atts['text-align']   : '';
		$source     = isset( $atts['source'] ) 	   ? $atts['source'] 	   : '';
		$xclass     = isset( $atts['xclass'] ) 	   ? ' ' . $atts['xclass'] : '';

		if ( in_array( $bg_color, $color_scheme ) )
			$bg_color = ' bg-' . $bg_color;

		if ( in_array( $text_color, $color_scheme ) )
			$text_color = ' text-' . $text_color;

		if ( $text_align )
			$text_align = ' text-' . $text_align;

		if ( $source ) 
			$content .= '<footer class="blockquote-footer text-right">' . $source . '</footer>';

		$blockquote = shortcode_atts( 
			array(
				'class' => 'blockquote' . $bg_color . $text_color . $text_align . $xclass
			), $atts
		);

		return '<blockquote ' . implode_atts( $blockquote ) . '>' . do_shortcode( $content ) . '</blockquote>';
 	}
