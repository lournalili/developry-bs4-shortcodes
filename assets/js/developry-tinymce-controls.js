



jQuery(document).ready(function($) {

    tinymce.create('tinymce.plugins.developry_plugin', {

        init : function(editor, url) {
        
            editor.addCommand('developry_insert_shortcode', function() {

                editor.windowManager.open({
                    title : 'Develop(ry) Bootstrap 4 Shortcodes',
                    minWidth :  640,
                    body: [
                        {
                            type  : 'container',
                            label : '',
                            html  : 'e.g. [alert bg-color= text-color=]Hello, world![/alert]'
                        },
                        {
                            type : 'listbox', 
                            name : 'shortcode', 
                            label: 'Shortcode', 
                            values: [{
                                text: 'Alert', 
                                value: 'alert'
                            }]
                        },
                        {
                            type  : 'listbox', 
                            name  : 'bg_color', 
                            label : 'Background Color', 
                            values: [{
                                text  : 'primary', 
                                value : 'primary'
                            },
                            {
                                text: 'secondary', 
                                value: 'secondary'
                            }]
                        },
                        {
                            type: 'listbox', 
                            name: 'text_color', 
                            label: 'Text Color', 
                            values: [{
                                text: 'light', 
                                value: 'light'
                            },
                            {
                                text: 'dark', 
                                value: 'dark'
                            }]
                        },
                        {
                            type: 'listbox', 
                            name: 'dismissable', 
                            label: 'Is dismissable?', 
                            values: [{
                                text: 'no', 
                                value: ''
                            },
                            {
                                text: 'yes', 
                                value: 'dismissable'
                            }]
                        },
                        {
                            type: 'textbox', 
                            name: 'xclass', 
                            label: 'Additional Classes (separate by space)', 
                        },
                        {
                            type: 'textbox', 
                            name: 'content', 
                            label: 'Content'
                        }
                    ],
                    onsubmit: function(event) {

                        editor.insertContent('[' + event.data.shortcode + ' bg-color=' + event.data.bg_color + ' text-color=' + event.data.text_color + ' xclass=' + event.data.xclass + ' ' + event.data.dismissable + ']' + event.data.content +  '[/' + event.data.shortcode + ']');
                    }
                });
            });

            editor.addButton('developry_button', {
                title : 'Insert shortcode', 
                cmd   : 'developry_insert_shortcode', 
                image : url.replace('assets/js', '') + '/assets/img/developry-btn.png' 
            });
        },   
    });

    tinymce.PluginManager.add('developry_button', tinymce.plugins.developry_plugin);
});