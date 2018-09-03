
// Copyright (c) MDE. All rights reserved.

"use strict";

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

(function(x) {
    x.versions = ['m.JS/v1.0 :'];
    x.versions.all = function() { return x.versions.join('\n'); };

    x.versions[0] += ' m.core/1';

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    x.noop = function() { };
    x.stop = function() { return false; };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var t0 = +new Date();

    x.dt = function() { return x.tc() - t0; };
    x.tc = function() { return +new Date(); };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    if (!('console' in window)) {
        window.console = {
            log: x.noop,
            assert: x.noop,
            trace: x.noop,
            debug: x.noop,
            info: x.noop,
            warn: x.noop,
            error: x.noop
        };
    }

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    x.E = {
        ARG         : 'invalid argument',
        BROWSER     : 'no browser support',
        CLASSCTOR   : 'class constructor expected',
        FUNCTION    : 'function expected',
        INSTANCEOF  : 'instance of a class expected',
        SINGLEINST  : 'only one instance is allowed'
    };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    x.isDefined = function(o) {
        return typeof o !== 'undefined';
    };

    x.isFunction = function(o) {
        return typeof o === 'function';
    };

    x.isNumber = function(o) {
        return typeof o === 'number';
    };

    x.isString = function(o) {
        return typeof o === 'string' || o instanceof String;
    };

    x.isCollection = function(o) {
        // detect Array and array-like objects (as Arguments):
        return o instanceof Array || o && !x.isWindow(o) 
            && !x.isString(o) && x.isNumber(o.length);
    };

    x.isWindow = function(o) {
        // old browsers' window has no Window constructor:
        return window.Window && o instanceof Window 
            || o && x.isFunction(o.Object);
    };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var acc = 0; // anonymous class counter

    x.createClass = function(ns, name, ctor, designer) {
        ns = ns || window;
        name = name || '<Anonymous_' + ++acc + '>';

        function ClassCtor() {
            if (!(this instanceof ClassCtor)) {
                return new ClassCtor();
            }
            x.isFunction(ctor) && ctor.apply(this, arguments);
        }

        ns[name] = ClassCtor;
        var proto = ClassCtor.prototype;

        proto.className = name;
        proto.toString = function() { return '[object ' + name + ']'; };

        x.isFunction(designer) && designer(proto);

        return ClassCtor;
    };

    x.extendClass = function(BaseClassCtor, ns, name, ctor, designer) {
        if (!x.isFunction(BaseClassCtor)) throw new Error(x.E.CLASSCTOR);

        ns = ns || window;
        name = name || 'Anonymous_' + ++acc;

        function ClassCtor() {
            if (!(this instanceof ClassCtor)) {
                return new ClassCtor();
            }
            BaseClassCtor.apply(this, arguments);
            x.isFunction(ctor) && ctor.apply(this, arguments);
        }

        ClassCtor.prototype = Object.create
            ? Object.create(BaseClassCtor.prototype)
            : new BaseClassCtor();
        ns[name] = ClassCtor.prototype.constructor = ClassCtor;

        var base  = BaseClassCtor.prototype;
        var proto = ClassCtor.prototype;

        proto.className = name;
        proto.toString = function() { return '[object ' + name + ']'; };

        x.isFunction(designer) && designer(proto, base);

        return ClassCtor;
    };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    x.event = function() {
        return new Delegate();
    };

    x.property = function(initValue, onchange, onchanged) {
        var holder = null; // backing store works by closure
        if (x.isDefined(initValue)) holder = initValue;
        
        return function property(value) {
            if (x.isDefined(value) && holder !== value &&
               (!x.isFunction(onchange) || onchange(value) !== false)) {

                holder = value;
                if (x.isFunction(onchange)) onchanged(value);
            }
            return holder;
        };
    };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    x.createClass(x, 'Delegate', function ctor() {

        this._fList = [];

    }, function designer(proto) {

        proto.add = function(f) {
            if (!x.isFunction(f)) throw new Error(x.E.FUNCTION);
            this._fList.push(f);
        };

        proto.call = function(args) {
            var len = this._fList.length;
            while (len--) {
                this._fList[len].apply(this, arguments);
            }
        };

        proto.length = function() { return this._fList.length; };

        proto.remove = function(f) {
            if (!x.isFunction(f)) throw new Error(x.E.FUNCTION);
            var len = this._fList.length;
            while (len--) {
                if (this._fList[len] === f) {
                    this._fList.splice(len, 1);
                }
            }
        };

    });

})(x);
