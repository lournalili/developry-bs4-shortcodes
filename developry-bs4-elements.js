



jQuery(document).ready(function($) {

    tinymce.create('tinymce.plugins.developry_plugin', {

        init : function(editor, url) {
        
            editor.addButton('developry_element_button', {
                type  : 'menubutton',
                title : 'Insert single element...', 
                image : url.replace('assets/js', '') + '/assets/img/developry-element-icon.png',
                menu  : [
                    {
                        text    : 'Alert',
                        onclick : function() {
                            editor.execCommand('developry_add_alert_shortcode');
                        }
                    },
                    {
                        text : 'Alert Heading',
                        onclick : function() {
                            editor.execCommand('developry_add_alert_heading_shortcode');
                        }
                    },
                    {
                        text : 'Alert Link',
                        onclick : function() {
                            editor.execCommand('developry_add_alert_link_shortcode');
                        }
                    }
                ]
            });

            editor.addCommand('developry_add_alert_shortcode', function() {

                editor.windowManager.open({

                    title    : 'Develop(ry) Elements > Alert',
                    minWidth :  640,
                    body     : [
                        {
                            type  : 'container',
                            label : '',
                            html  : ''
                        },
                        {
                            label : 'Shortcode', 
                            type  : 'listbox', 
                            name  : 'shortcode', 
                            values: [{
                                text  : 'Alert', 
                                value : 'alert'
                            }]
                        },
                        {
                            label : 'Background Color',                                 
                            type  : 'listbox', 
                            name  : 'bg_color', 
                            values: [{
                                text  : 'none', 
                                value : ''
                            },
                            {
                                text  : 'primary', 
                                value : 'primary'
                            },
                            {
                                text  : 'secondary', 
                                value : 'secondary'
                            }]
                        },
                        {
                            label  : 'Text Color',
                            type   : 'listbox', 
                            name   : 'text_color', 
                            values : [{
                                text  : 'inherit', 
                                value : ''
                            },
                            {
                                text  : 'light', 
                                value : 'light'
                            },
                            {
                                text  : 'dark', 
                                value : 'dark'
                            }]
                        },
                        {
                            label : 'Is dismissable?', 
                            type  : 'listbox', 
                            name  : 'dismissable', 
                            values: [{
                                text  : 'no', 
                                value : ''
                            },
                            {
                                text  : 'yes', 
                                value : 'dismissable'
                            }]
                        },
                        {
                            label : 'Additional Classes (separate by space)', 
                            type  : 'textbox', 
                            name  : 'xclass', 
                            value : ''
                        },
                        {
                            label : 'Content',
                            type  : 'textbox', 
                            name  : 'content',
                            value : '' 
                        }
                    ],
                    onsubmit: function(event) {

                        editor.insertContent('[' + event.data.shortcode + ' bg-color=' + event.data.bg_color + ' text-color=' + event.data.text_color + ' xclass=' + event.data.xclass + ' ' + event.data.dismissable + ']' + event.data.content +  '[/' + event.data.shortcode + ']');
                    }
                });
            });

            editor.addCommand('developry_add_alert_heading_shortcode', function() {

                editor.windowManager.open({

                    title    : 'Develop(ry) Elements > Alert > Heading',
                    minWidth :  640,
                    body     : [
                        {
                            label : '',
                            type  : 'container',
                            html  : 'Hint: This need to be placed between [alert]...[/alert] shortcode.'
                        },
                        {
                            label : 'Shortcode', 
                            type  : 'listbox', 
                            name  : 'shortcode', 
                            values: [{
                                text  : 'Alert Heading', 
                                value : 'alert-heading'
                            }]
                        },
                        {
                            label : 'Content',
                            type  : 'textbox', 
                            name  : 'content'
                        }
                    ],
                    onsubmit: function(event) {

                        editor.insertContent('[' + event.data.shortcode + ' xclass=' + event.data.xclass + ']' + event.data.content +  '[/' + event.data.shortcode + ']');
                    }
                });
            });

            editor.addCommand('developry_add_alert_link_shortcode', function() {

                editor.windowManager.open({

                    title    : 'Develop(ry) Elements > Alert > Link',
                    minWidth :  640,
                    body     : [
                        {
                            label : '',
                            type  : 'container',
                            html  : 'Hint: This need to be placed between [alert]...[/alert] shortcode.'
                        },
                        {
                            label : 'Shortcode', 
                            type  : 'listbox', 
                            name  : 'shortcode', 
                            values: [{
                                text  : 'Alert Link', 
                                value : 'alert-link'
                            }]
                        },
                        {
                            label : 'URL',
                            type  : 'textbox', 
                            name  : 'href',
                            value : ''
                        },
                        {
                            label : 'Content',
                            type  : 'textbox', 
                            name  : 'content', 
                            value : ''
                        }
                    ],
                    onsubmit: function(event) {

                        editor.insertContent('[' + event.data.shortcode + ' xclass=' + event.data.xclass + ' href="' + event.data.href + '"]' + event.data.content +  '[/' + event.data.shortcode + ']');
                    }
                });
            });

            // editor.addButton('developry_block_button', {
            //     title : 'Insert block of elements...', 
            //     cmd   : 'developry_add_block_shortcode', 
            //     image : url.replace('assets/js', '') + '/assets/img/developry-block-icon.png' 
            // });

            // editor.addCommand('developry_add_block_shortcode', function() {

            //     editor.windowManager.open({

            //         title    : 'Develop(ry) Blocks',
            //         minWidth :  640,
            //         body     : [],
            //         onsubmit : function(event) {

            //             editor.insertContent('[' + event.data.shortcode + ' bg-color=' + event.data.bg_color + ' text-color=' + event.data.text_color + ' xclass=' + event.data.xclass + ' ' + event.data.dismissable + ']' + event.data.content +  '[/' + event.data.shortcode + ']');
            //         }
            //     });
            // });
        },   
    });

    tinymce.PluginManager.add('developry_bs4_shortcode_plugin', tinymce.plugins.developry_plugin);
});