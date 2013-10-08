/**
 * jQuery linked select plugin.
 *
 * This plugin reloads options in second select
 * when first select is changing. New options gettings via ajax.
 * The plugin was tested under jQuery 1.10.1
 *
 * @author An I. Grabenchuk
 * @version 1.1
 */
(function($){
    $.fn.linkedSelect = function(options){

        var settings = $.extend({
            'with'          : '',
            'path'          : '',
            'attr'          : 'id',
            'default'       : 0,
            'triggerOnInit' : true
        }, options);


        return this.each(function(){
            var $this = $(this);
            var selectTo = $("#" + settings.with);

            $this.change(function(){
                var selected = $(this).val();
                var postData = {};
                postData[settings.attr] = selected;

                $.ajax({
                    type: "POST",
                    url: settings.path,
                    dataType: "json",
                    data: {'id' : selected}
                }).done(function(newOptions){
                    selectTo.empty();

                    $.each(newOptions, function(key, value){
                        var opt = $("<option></option>").attr("value", key).text(value);

                        // set up selected option on select's first init
                        if(settings.triggerOnInit && key == settings.default){
                            opt.prop('selected', true);
                            settings.triggerOnInit = false;
                        }

                        selectTo.append(opt);
                    });
                }).fail(function(xhr, errText){
                        // IE8 and older has no methods 'dir' and 'error'
                        try{
                            console.dir(xhr);
                            console.error(errText);
                        }catch(exception){}
                });

            });

            // trigger action right before plugin initialize
            if(true == settings.triggerOnInit){
                $this.trigger('change');
            }

        });
    };
})(jQuery);
