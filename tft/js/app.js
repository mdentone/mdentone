/*! --
// (c) Mario Dentone 2019
---------------------- */

(function() {
    window.VERSION = '1.2.2';

    window.onerror = function(message) {
        document.body.innerHTML +=
            '<pre>v' + VERSION + ' ' + message || ':( error!' + '</pre>';
    };

})();
