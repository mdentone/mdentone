/*! --
// (c) Mario Dentone 2019
---------------------- */

(function() {

    window.onerror = function(message) {
        document.body.innerHTML += '<pre>' + message || ':( error!' + '</pre>';
    };

})();
