"using strict";
function Cs142TemplateProcessor(template) {
    this.template = template;
}

Cs142TemplateProcessor.prototype.fillIn = function(dictionary) { // reference to replace: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
    return this.template.replace(/{{([^{}]*)}}/g,
                                 function(match,p1) {
                                     if (dictionary[p1] === undefined) {
                                         return '';
                                     }
                                     return dictionary[p1];
                                 });
};
