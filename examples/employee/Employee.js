// This file is a demo class that extends the Entity class.
// Uses AMD or browser globals.
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as a module.
    define('NymphEmployee', ['NymphEntity'], factory);
  } else {
    // Browser globals
    factory(Entity);
  }
}(function(Entity){
  Employee = function(id){
    this.constructor.call(this, id);
    this.addTag('employee');
    this.data.current = true;
    this.data.subordinates = [];
  };
  Employee.prototype = new Entity();

  var thisClass = {
    // === The Name of the Server Class ===
    class: 'Employee',

    // === Class Variables ===
    etype: "employee",

    // === Class Methods ===

    throwError: function(){
      return this.serverCall('throwError', arguments);
    }
  };
  for (var p in thisClass) {
    if (thisClass.hasOwnProperty(p)) {
      Employee.prototype[p] = thisClass[p];
    }
  }
  Employee.testStatic = function(value){
    return this.prototype.serverCallStatic('testStatic', arguments);
  };
  Employee.throwErrorStatic = function(){
    return this.prototype.serverCallStatic('throwErrorStatic', arguments);
  };
  Employee.inaccessibleMethod = function(){
    return this.prototype.serverCallStatic('inaccessibleMethod', arguments);
  };

  return Employee;
}));
