function Utils(){}
Utils.validate = function(obj)
{
    return (typeof obj == 'undefined'|| obj == null)? false : true ;
};
function Constants(){}
Constants.URL = "http://imagestore3.herokuapp.com";

var PopUp = (function () {
    "use strict";

    var elem,
        hideHandler,
        that = {};

    that.init = function (options) {
        elem = $(options.selector);
    };

    that.show = function (text) {
        console.log(text);
        clearTimeout(hideHandler);
        elem.find("span").html(text);
        elem.delay(200).fadeIn().delay(3000).fadeOut();
    };
    return that;
}());