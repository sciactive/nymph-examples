// This file is a demo class that extends the Entity class.
// Uses AMD or browser globals.
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as a module.
    define('NymphTodo', ['NymphEntity'], factory);
  } else {
    // Browser globals
    factory(Entity);
  }
}(function(Entity){
  Todo = function(id){
    this.constructor.call(this, id);
    this.data.done = false;
  };
  Todo.prototype = new Entity();

  var thisClass = {
    // === The Name of the Server Class ===
    class: 'Todo',

    // === Class Variables ===
    etype: "todo",

    // === Class Methods ===

    archive: function(){
      return this.serverCall('archive', arguments);
    }
  };
  for (var p in thisClass) {
    if (thisClass.hasOwnProperty(p)) {
      Todo.prototype[p] = thisClass[p];
    }
  }

  return Todo;
}));
