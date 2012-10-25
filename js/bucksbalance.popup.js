/*jslint browser: true */
/*global rdb: true, $: true, chrome: true */
(function () {
    "use strict";
    var data_div = $('#data'),
        creds_div = $('#credentials'),
        creds_form = creds_div.find('form');


    function balance_handler(data){
        if(data.success){
            data_div.show();
            creds_div.hide();
            data_div.html(data.balance);
        }
        else {
            if(data.login_required){
                data_div.hide();
                creds_div.removeClass('hidden');
            }
            else {
                data_div.html("Error fetching balance");
            }
        }
    }

    function form_submit_handler(ev){
        ev.preventDefault();

        var number = $('#card_number').val(),
            pin = $('#card_pin').val();

        chrome.extension.sendRequest({
            message: 'balance',
            creds: {
                number: number,
                pin: pin
            }
        }, balance_handler);
    }

    creds_form.bind('submit', form_submit_handler);

    chrome.extension.sendRequest({message: 'balance'}, balance_handler);
}());
