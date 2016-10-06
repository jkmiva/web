"use strict";
function cs142MakeMultiFilter(originalArray) {
    var currentArray = originalArray;
    function arrayFilter(filter, callback) {
        if (typeof filter !== 'function' || filter === undefined) {
            return currentArray;
        }
        currentArray = currentArray.filter(filter);
        if (typeof callback === 'function' && callback !== undefined){
            callback.call(originalArray,currentArray);
        }
        return arrayFilter;
    }
    return arrayFilter;
}
