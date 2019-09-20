/*! --
// (c) Mario Dentone 2019
---------------------- */

(function() {
    window.VERSION = '1.3';

    window.onerror = function(message) {
        document.body.innerHTML +=
            '<pre>v' + VERSION + ' ' + message || ':( error!' + '</pre>';
    };

})();
