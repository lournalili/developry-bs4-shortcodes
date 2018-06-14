



jQuery(document).ready(function($) {

    tinymce.create('tinymce.plugins.developry_plugin', {

        init : function(editor, url) {

            editor.addButton('developry_block_button', {
                title : 'Add Block of Elements Shortcode', 
                cmd   : 'developry_add_shortcode_block', 
                image : url.replace('assets/js', '') + '/assets/img/developry-block-icon.png' 
            });

            editor.addCommand('developry_add_shortcode_block', function() {

                 editor.windowManager.open({
                    title : 'Develop(ry) Block Shortcodes',
                    minWidth :  640,
                    body: [],
                    onsubmit: function(event) {

                        editor.insertContent('[' + event.data.shortcode + ' bg-color=' + event.data.bg_color + ' text-color=' + event.data.text_color + ' xclass=' + event.data.xclass + ' ' + event.data.dismissable + ']' + event.data.content +  '[/' + event.data.shortcode + ']');
                    }
                });
            });
        },   
    });

    tinymce.PluginManager.add('developry_blocks', tinymce.plugins.developry_plugin);
});