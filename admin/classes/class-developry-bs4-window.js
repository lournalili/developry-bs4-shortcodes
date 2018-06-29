'use strict';

// Open modal window with options for each shortcode tag 
// when the user clicks a button. Using require.js and two 
// common files are window-submit.js and window.js all JS 
// files are under /admin/assets/shortcodes
var Developry_BS4_Window = ( function( $, dev ) {

    var Developry_BS4_Window = function () {

        // ### Public function.

        // Open ALERT editorWindow with options to add/edit [alert][/alert] shortcode
    	this.alert = function( editor, event ) {

    		require(
    			[
    				'window', 
    				'alert/window-body', 
    				'window-submit',
    			], 
    			function() {
    			
    				editorWindow( editor, developry_bs4_shortcode_alert, editorWindowSubmit, 'alert', 'Alert' );
    			}
    		);
    	};
        
        // Open BADGE editorWindow with options to add/edit [alert][/alert] shortcode
        this.badge = function( editor, event ) {

            require(
                [
                    'window', 
                    'badge/window-body', 
                    'window-submit',
                ], 
                function() {
                
                    editorWindow( editor, developry_bs4_shortcode_badge, editorWindowSubmit, 'badge', 'Badge' );
                }
            );
        };
        
        // Open BLOCKQUOTE editorWindow with options to add/edit [blockquote][/blockquote] shortcode
        this.blockquote = function( editor, event ) {

            require(
                [
                    'window', 
                    'blockquote/window-body', 
                    'window-submit',
                ], 
                function() {
                
                    editorWindow( editor, developry_bs4_shortcode_blockquote, editorWindowSubmit, 'blockquote', 'Blockquote' );
                }
            );
        };
        
        // Open BR editorWindow with options to add/edit [br /] shortcode
        this.br = function( editor, event ) {

            require(
                [
                    'window', 
                    'typography/br/window-body', 
                    'window-submit',
                ], 
                function() {
                
                    editorWindow( editor, developry_bs4_shortcode_br, editorWindowSubmit, 'br', 'Break Line' );
                }
            );
        };
        
        // Open HR editorWindow with options to add/edit [hr /] shortcode
        this.hr = function( editor, event ) {

            require(
                [
                    'window', 
                    'typography/hr/window-body', 
                    'window-submit',
                ], 
                function() {
                
                    editorWindow( editor, developry_bs4_shortcode_hr, editorWindowSubmit, 'hr', 'Horizontal Line' );
                }
            );
        };
        
        // Open BUTTON editorWindow with options to add/edit [button][/button] shortcode
        this.button = function( editor, event ) {

            require(
                [
                    'window', 
                    'button/window-body', 
                    'window-submit',
                ], 
                function() {
                
                    editorWindow( editor, developry_bs4_shortcode_button, editorWindowSubmit, 'button', 'Button' );
                }
            );
        };
        
        // Open IMAGE editorWindow with options to add/edit [image /] shortcode
        this.image = function( editor, event ) {

            require(
                [
                    'window', 
                    'image/window-body', 
                    'window-submit',
                ], 
                function() {
                
                    editorWindow( editor, developry_bs4_shortcode_image, editorWindowSubmit, 'image', 'Image' );
                }
            );
        };
        
        // Open JUMBOTRON editorWindow with options to add/edit [jumbotron][/jumbotron] shortcode
        this.jumbotron = function( editor, event ) {

            require(
                [
                    'window', 
                    'jumbotron/window-body', 
                    'window-submit',
                ], 
                function() {
                
                    editorWindow( editor, developry_bs4_shortcode_jumbotron, editorWindowSubmit, 'jumbotron', 'Jumbotron' );
                }
            );
        };
        
        // Open LINK editorWindow with options to add/edit [link][/link] shortcode
        this.link = function( editor, event ) {

            require(
                [
                    'window', 
                    'typography/link/window-body', 
                    'window-submit',
                ], 
                function() {
                
                    editorWindow( editor, developry_bs4_shortcode_link, editorWindowSubmit, 'link', 'Link' );
                }
            );
        };
        
        // Open LIST editorWindow with options to add/edit [list][/list] shortcode
        this.list = function( editor, event ) {

            require(
                [
                    'window', 
                    'typography/list/window-body', 
                    'window-submit',
                ], 
                function() {
                
                    editorWindow( editor, developry_bs4_shortcode_list, editorWindowSubmit, 'list', 'List' );
                }
            );
        };
        
        // Open LIST-ITEM editorWindow with options to add/edit [list-item][/list-item] shortcode
        this.listItem = function( editor, event ) {

            require(
                [
                    'window', 
                    'typography/list-item/window-body', 
                    'window-submit',
                ], 
                function() {
                
                    editorWindow( editor, developry_bs4_shortcode_text, editorWindowSubmit, 'listitem', 'List Item' );
                }
            );
        };

        // Open TEXT editorWindow with options to add/edit [text][/text] shortcode
        this.text = function( editor, event ) {

            require(
                [
                    'window', 
                    'typography/text/window-body', 
                    'window-submit',
                ], 
                function() {
                
                    editorWindow( editor, developry_bs4_shortcode_text, editorWindowSubmit, 'text', 'Text' );
                }
            );
        };
    };

    return Developry_BS4_Window;

} )( jQuery, Developry );
