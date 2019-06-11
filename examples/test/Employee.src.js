// This file is a demo class that extends the Entity class.

import { Nymph, Entity } from "nymph-client";

export class Employee extends Entity {
  constructor(id) {
    super(id);
    this.$addTag("employee");
    this.current = true;
    this.subordinates = [];
  }

  $throwError(...args) {
    return this.$serverCall("throwError", args);
  }

  static testStatic(value, ...args) {
    return Employee.serverCallStatic("testStatic", [value, ...args]);
  }

  static throwErrorStatic(...args) {
    return Employee.serverCallStatic("throwErrorStatic", args);
  }

  static inaccessibleMethod(...args) {
    return Employee.serverCallStatic("inaccessibleMethod", args);
  }
}

// The name of the server class
Employee.class = "Employee";

Nymph.setEntityClass(Employee.class, Employee);
export default Employee;
