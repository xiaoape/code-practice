String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '')
}
//或者 
function trim(string) {
    return string.replace(/^\s+|\s+$/g, '')
}