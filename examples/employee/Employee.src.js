// This file is a demo class that extends the Entity class.

import Nymph from "Nymph";
import Entity from "NymphEntity";

export default class Employee extends Entity {

  // === Static Properties ===

  static etype = "employee";
  // The name of the server class
  static class = "Employee";

  // === Constructor ===

  constructor(id) {
    super(id);
    this.addTag('employee');
    this.data.current = true;
    this.data.subordinates = [];
  }

  // === Static Methods ===

  static testStatic(value, ...args) {
    return Employee.serverCallStatic('testStatic', [value, ...args]);
  }

  static throwErrorStatic(...args) {
    return Employee.serverCallStatic('throwErrorStatic', args);
  }

  static inaccessibleMethod(...args) {
    return Employee.serverCallStatic('inaccessibleMethod', args);
  }

  // === Instance Methods ===

  throwError(...args) {
    return this.serverCall('throwError', args);
  }
}

Nymph.setEntityClass(Employee.class, Employee);
export {Employee};
