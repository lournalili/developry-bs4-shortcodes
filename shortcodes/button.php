<?php
/** 
	[button 
		color=primary 
		outline=primary 
		size=lg,sm 
		type=link 
		url='/' 
		dismiss=modal 
		toggle=modal,collapse 
		target=#example 
		dropdown-toggle
		block 
		active 
		disabled]...[/button]
 */
 	add_shortcode(
 		'button',
 		'developry_bs4_button'
 	);

 	function developry_bs4_button( $atts, $content = null ) {

 		if ( empty($atts) ) 
			return '<button type="button" class="btn" >' . $content . '</button>';

		global $color_scheme;

		$color    = isset( $atts['color'] ) ? $atts['color'] : '';
		$outline  = isset( $atts['outline'] ) ? $atts['outline'] : '';
		$size     = isset( $atts['size'] ) ? ' btn-' . $atts['size'] : '';
		$type     = isset( $atts['type'] ) ? $atts['type'] : '';
		$dismiss  = isset( $atts['dismiss'] ) ? $atts['dismiss'] : '';
		$toggle   = isset( $atts['toggle'] ) ? $atts['toggle'] : '';
		$target   = isset( $atts['target'] ) ? $atts['target'] : '';
		$dropdown_toggle = in_multiarray( 'dropdown-toggle', $atts ) ? ' dropdown-toggle' : '';
		$block    = in_multiarray( 'block', $atts ) ? ' btn-block' : '';
		$active   = in_multiarray( 'active', $atts ) ? ' active' : '';
		$disabled = in_multiarray( 'disabled', $atts ) ? ' disabled' : '';

		if ( in_array( $color, $color_scheme ) )
			$color = ' btn-' . $color;

		if ( in_array( $outline, $color_scheme ) )
			$outline = ' btn-outline-' . $outline;

		if ( isset( $atts['url'] ) ) {
			if ( $type == 'link' ) {
				$onclick = '';
				$href    = $atts['url'];
			}
			else {
				$href    = '';
				$onclick = 'location.href=\'' . $atts['url'] . '\'';
			}
		} else {
			$href = $onclick = '#';
		}

		$button = shortcode_atts( 
			array(
				'class' 	   => 'btn' . $color . $outline . $size . $dropdown_toggle . $block . $active . $disabled,
				'href' 		   => $href,
				'onclick'      => $onclick,
				'data-dismiss' => $dismiss,
				'data-toggle'  => $toggle,
				'data-target'  => $target
			), $atts
		);

		if ( $type == 'link' ) 
			return '<a ' . implode_atts( $button ) . '>' . $content . '</a>';

		return '<button type="button" ' . implode_atts( $button ) . '>' . $content . '</button>';
 	}
