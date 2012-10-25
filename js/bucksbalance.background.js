/*jslint browser: true */
/*global rdb: true, $: true, chrome: true, Keanu: true */
(function () {
    "use strict";


    function balance_handler(request, sender, sendResponse) {
        if(request.creds){
            localStorage.number = request.creds.number;
            localStorage.pin = request.creds.pin;
        }

        var number = localStorage.number,
            pin = localStorage.pin;

        if( !number || !pin ){
            return sendResponse({
                'success': false,
                'login_required': true
            });
        }

        $.post('https://www.starbucks.com/card/guestbalance/', {
            'Card.Number': number,
            'Card.Pin': pin
        }).success(function(data){
            var has_balance = data.indexOf('fetch_balance_value') > -1,
                balance, start;

            if(has_balance){
                start = data.indexOf('fetch_balance_value');
                balance = data.slice(
                    start + 21,
                    start + data.slice(start, start+100).indexOf('</span'));

                sendResponse({
                    'success': true,
                    'balance': balance
                });
            }
            else {
                sendResponse({
                    'success': false,
                    'error': true
                });
            }
            
        }).error(function(data){
            sendResponse({
                'success': false,
                'error': true
            });
        });
    }


    function request_handler(request, sender, sendResponse) {
        // Map messages to their appropriate handler
        var message_handlers = {
            'balance': balance_handler
        };

        message_handlers[request.message](request, sender, sendResponse);
    }

    chrome.extension.onRequest.addListener(request_handler);
}());
