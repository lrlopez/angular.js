'use strict';

/**
 * @ngdoc directive
 * @name ng.directive:ngUpdateModelOn
 * @restrict A
 *
 * @description
 * The `ngUpdateModelOn` directive changes default behavior of model updates. You can customize
 * which events will be bound to the `input` elements so that the model update will
 * only be triggered when they occur.
 *
 * This option will be applicable to those `input` elements that descend from the
 * element containing the directive. So, if you use `ngUpdateModelOn` on a `form`
 * element, the default behavior will be used on the `input` elements within.
 *
 * @element ANY
 * @scope
 * @param {string=} Allows specifying an event or a comma-delimited list of events
 *    that will trigger a model update. If it is not set, it defaults to any inmediate change. If
 *    the list contains "default", the original behavior is also kept.
 */

var SIMPLEOBJECT_TEST = /^\s*?\{(.*)\}\s*?$/;

var NgUpdateModelOnController = ['$attrs', '$scope',
    function UpdateModelOnController($attrs, $scope) {

  var attr = $attrs['ngUpdateModelOn'];
  var updateModelOnValue;
  var updateModelTimeoutValue;

  if (SIMPLEOBJECT_TEST.test(attr)) {
    updateModelTimeoutValue = $scope.$eval(attr);
    var keys = [];
    for(var k in updateModelTimeoutValue) {
      keys.push(k);
    }
    updateModelOnValue = keys.join(',');
  }
  else {
    updateModelOnValue = attr;
  }

  this.$getEventList = function() {
    return updateModelOnValue;
  }

  this.$getTimeout = function() {
    return updateModelTimeoutValue;
  }
}];

var ngUpdateModelOnDirective = [function() {
  return {
    restrict: 'A',
    controller: NgUpdateModelOnController
  }
}];


/**
 * @ngdoc directive
 * @name ng.directive:ngUpdateModelTimeout
 * @restrict A
 *
 * @description
 * The `ngUpdateModelTimeout` directive allows specifying a debounced timeout to model updates so they
 * are not triggerer instantly but after the timer has expired.
 *
 * @element ANY
 * @scope
 * @param {integer=} Time in milliseconds to wait since the last registered
   *    content change before triggering a model update.
 */
var NgUpdateModelTimeoutController = ['$attrs',
    function UpdateModelTimeoutController($attrs) {

  var updateModelDefaultTimeoutValue = $attrs['ngUpdateModelTimeout'];

  this.$getDefaultTimeout = function() {
    return updateModelDefaultTimeoutValue;
  }
}];

var ngUpdateModelTimeoutDirective = [function() {
  return {
    restrict: 'A',
    controller: NgUpdateModelTimeoutController
  }
}];
