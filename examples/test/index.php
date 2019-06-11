<?php
$clientDir = file_exists('../../../client/package.json')
    ? '../../../client'
    : '../../node_modules/nymph-client';
$tilmeldClientDir = file_exists('../../../tilmeld-client/package.json')
    ? '../../../tilmeld-client'
    : '../../node_modules/tilmeld-client';
$queryEditorDir = file_exists('../../../query-editor/package.json')
    ? '../../../query-editor'
    : '../../node_modules/nymph-query-editor';

?><!DOCTYPE html>
<html>
<head>
  <title>Nymph JS Test</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

  <!-- Nymph Config -->
  <script type="text/javascript">
    NymphOptions = {
      restURL: '../rest.php'
    };
  </script>

  <!-- Nymph JS -->
  <script src="<?php echo $clientDir; ?>/dist/NymphClient.js"></script>
  <script src="<?php echo $tilmeldClientDir; ?>/dist/TilmeldClient.js"></script>

  <!-- Entity JS -->
  <script src="Employee.js"></script>

  <!-- Locutus strtotime (have to load it manually) -->
  <script type="text/javascript">
    if (typeof module !== "undefined") _module = module;
    module = {};
  </script>
  <script src="../../node_modules/locutus/php/datetime/strtotime.js"></script>
  <script type="text/javascript">
    strtotime = module.exports;
    delete module;
    if (typeof _module !== "undefined") module = _module;
  </script>
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css">
</head>
<body>
  <style>
    body {
      padding: 1em;
    }
    .w-auto {
      width: auto;
    }
    .nymph-query-editor {
      margin: 1em 0;
    }
  </style>
  <!-- <div class="nymph-query-editor">
    <h1>Query Editor</h1>
    <main></main>
  </div> -->
  <!-- App JS -->
  <!-- <script src="<?php echo $queryEditorDir; ?>/lib/umd/ValueEditor.js"></script> -->
  <!-- <script src="<?php echo $queryEditorDir; ?>/lib/umd/SelectorEditor.js"></script> -->
  <!-- <script src="<?php echo $queryEditorDir; ?>/lib/umd/QueryEditor.js"></script> -->
  <!-- <script type="text/javascript">
    ((global, QueryEditor, Employee) => {
      const app = new QueryEditor({
        target: document.querySelector('main'),
        data: {
          supportedClasses: [Employee],
          options: {},
          selectors: [],
          classCheckbox: 'mr-1',
          classInput: 'form-control form-control-sm d-inline w-auto',
          classSelect: 'form-control form-control-sm d-inline w-auto',
          classAddButton: 'btn btn-sm btn-primary mx-1',
          classRemoveButton: 'btn btn-sm btn-danger mx-1',
          classButton: 'btn btn-sm btn-secondary mx-1'
        }
      });
    })(this, QueryEditor.default, Employee.Employee);
  </script> -->

  <h1>Client Tests</h1>
  <script>
    $(() => {
      $("#go").click(() => {
        ((Nymph, Entity, Employee) => {
          function printResult(text) {
            $("#result").html(text);
          }
          function appendResult(text) {
            $("#result").append(text);
          }
          printResult('Running...');
          eval('(async function() { ' + $("#current-test").val() + ' })()');
        })(window['nymph-client'].Nymph, window['nymph-client'].Entity, Employee.Employee);
      });
      $("#tests pre").click(function() {
        $("#current-test").val($(this).text());
      });
      $("#tests h4").each(function() {
        var that = $(this), option = $("<option>"+$(this).text()+"</option>");
        $("#test-selector").append(option).change(function() {
          if ($(this).find("option:selected").is(option)) {
            that.next("pre").click();
          }
        });
      });
    });
  </script>
  <div style="width: 49%; float: left;">
    <textarea id="current-test" rows="20" style="width: 95%; font-family: monospace; border: 1px solid #000; padding: 10px;"></textarea>
    <br>Choose a snippet below and <button id="go" class="btn btn-sm btn-primary">Go</button>
  </div>
  <div style="width: 47%; height: 300px; float: left; overflow: auto; border: 1px solid #000;">
    <pre style="padding: 10px;" id="result">result here</pre>
  </div>
  <br style="clear: both;">
  <select id="test-selector">
    <option>-</option>
  </select>
  <hr />
  <div id="tests">
    <h4>Try to save Entity class directly</h4>
    <pre>
const entity = new Entity();
entity.something = 'Anything';
try {
  await entity.$save();
  printResult('fail (Entity should not be usable from the client!)');
} catch (errObj) {
  printResult(
    'pass:\n' +
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Handle Forbidden Method</h4>
    <pre>
try {
  const data = await Employee.inaccessibleMethod();
  printResult(data);
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Handle Server Side Static Exception</h4>
    <pre>
try {
  const data = await Employee.throwErrorStatic();
  printResult(data);
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Handle Server Side Exception</h4>
    <pre>
try {
  const jane = await Nymph.getEntity({
    class: Employee.class
  }, {
    type: '&amp;',
    strict: ['name', 'Jane Doe']
  });
  const data = await jane.$throwError();
  printResult(data);
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Call a Server Side Static Method</h4>
    <pre>
try {
  const data = await Employee.testStatic(5);
  printResult(data);
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Refresh an entity</h4>
    <pre>
try {
  const [jane1, jane2] = await Promise.all([
    Nymph.getEntity({
      class: Employee.class
    }, {
      type: '&amp;',
      strict: ['name', 'Jane Doe']
    }),
    Nymph.getEntity({
      class: Employee.class
    }, {
      type: '&amp;',
      strict: ['name', 'Jane Doe']
    })
  ]);
  jane1.name = 'Janet Doe';
  await jane1.$save();

  if (jane2.name == 'Janet Doe') {
    printResult('fail - refreshed without asking');
    return;
  }

  await jane2.$refresh();
  printResult(jane2.name == 'Janet Doe' ? 'pass' : 'fail');
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Check two entities are equal</h4>
    <pre>
try {
  const first = await Nymph.getEntity({
    class: Employee.class
  }, {
    type: '&amp;',
    strict: ['name', 'Jane Doe']
  });
  const second = await Nymph.getEntity({
    class: Employee.class
  }, {
    type: '&amp;',
    guid: first.guid
  });
  first.thing = 'this';
  first.other = 'this';
  second.other = 'this';
  second.thing = 'this';
  printResult(JSON.stringify(first.$equals(second)));
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Check two objects are the same entity</h4>
    <pre>
try {
  const first = await Nymph.getEntity({
    class: Employee.class
  }, {
    type: '&amp;',
    strict: ['name', 'Jane Doe']
  });
  const second = await Nymph.getEntity({
    class: Employee.class
  }, {
    type: '&amp;',
    guid: first.guid
  });

  printResult(JSON.stringify(first.$is(second)));
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Get a new UID</h4>
    <pre>
try {
  const uidValue = await Nymph.newUID('employee');
  printResult('New value: '+uidValue);
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
  <h4>Get UID value</h4>
  <pre>
try {
  const uidValue = await Nymph.getUID('employee');
  printResult('Get value: '+uidValue);
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Set UID value</h4>
    <pre>
try {
  const uidValue = await Nymph.getUID('employee');
  if (confirm('Decrement UID employee to '+(uidValue-1))) {
    const success = await Nymph.setUID('employee', uidValue-1);
    printResult('Success: '+success);
  }
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Delete UID</h4>
    <pre>
try {
  await Nymph.deleteUID('employee');
  printResult('success');
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Create an entity</h4>
    <pre>
try {
  const jane = new Employee();
  jane.name = 'Jane Doe';
  jane.current = true;
  jane.salary = 8000000;
  jane.start_date = (new Date().getTime()) / 1000;
  jane.subordinates = [];
  jane.title = 'Seniorer Person';
  console.log(jane);
  await jane.$save();
  printResult(JSON.stringify(jane, null, 2));
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Create two unrelated entities</h4>
    <pre>
try {
  const entity = new Employee();
  entity.name = 'Jane Doe';
  entity.current = true;
  entity.salary = 8000000;
  entity.start_date = (new Date().getTime()) / 1000;
  entity.subordinates = [];
  entity.title = 'Seniorer Person';
  const entity2 = new Employee();
  entity2.name = 'John Doe';
  entity2.current = true;
  entity2.salary = 8000000;
  entity2.start_date = (new Date().getTime()) / 1000;
  entity2.subordinates = [];
  entity2.title = 'Seniorer Person';
  const entities = [entity, entity2];
  await Nymph.saveEntities(entities);
  entity.building = 'J2';
  entity2.building = 'B4';
  await Nymph.saveEntities(entities);
  printResult(JSON.stringify(entities, null, 2));
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Create two related entities</h4>
    <pre>
try {
  const jane = new Employee();
  jane.name = 'Jane Doe';
  jane.current = true;
  jane.salary = 8000000;
  jane.start_date = (new Date().getTime()) / 1000;
  jane.subordinates = [];
  jane.title = 'Seniorer Person';
  await jane.$save();

  const steve = new Employee();
  steve.$addTag('boss', 'bigcheese');
  steve.name = 'Steve Guy';
  steve.current = true;
  steve.salary = 8000000;
  steve.start_date = (new Date().getTime()) / 1000;
  steve.subordinates = [jane];
  steve.title = 'Executive Person';
  await steve.$save();

  printResult(JSON.stringify([steve, jane], null, 2));
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Add, check, and remove tags</h4>
    <pre>
printResult('');
var entity = new Entity();
entity.$addTag('test');
console.log(entity.tags);
if (entity.$hasTag('test')) {
  appendResult('pass\n');
} else {
  appendResult('fail\n');
}
entity.$addTag('test', 'test2');
console.log(entity.tags);
if (entity.$hasTag('test', 'test2')) {
  appendResult('pass\n');
} else {
  appendResult('fail\n');
}
entity.$addTag(['test', 'test3', 'test4', 'test5', 'test6']);
console.log(entity.tags);
if (entity.$hasTag(['test', 'test3', 'test4', 'test5', 'test6'])) {
  appendResult('pass\n');
} else {
  appendResult('fail\n');
}
entity.$removeTag('test2');
console.log(entity.tags);
if (!entity.$hasTag('test2')) {
  appendResult('pass\n');
} else {
  appendResult('fail\n');
}
entity.$removeTag('test3', 'test4');
console.log(entity.tags);
if (!entity.$hasTag('test3', 'test4')) {
  appendResult('pass\n');
} else {
  appendResult('fail\n');
}
entity.$removeTag(['test5', 'test6']);
console.log(entity.tags);
if (!entity.$hasTag(['test5', 'test6'])) {
  appendResult('pass\n');
} else {
  appendResult('fail\n');
}
if (!(entity.tags&lt;['test'] || entity.tags&gt;['test'])) {
  appendResult('pass\n');
} else {
  appendResult('fail\n');
}
    </pre>
    <h4>Wake a sleeping reference</h4>
    <pre>
try {
  const jane = await Nymph.getEntity({
    class: Employee.class
  }, {
    type: '&amp;',
    strict: ['name', 'Jane Doe']
  });
  const entity = new Employee();
  entity.$referenceSleep(['nymph_entity_reference', jane.guid, 'Employee']);
  await entity.$ready();
  printResult(JSON.stringify(entity, null, 2));
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
  <h4>Change an entity</h4>
  <pre>
try {
  const employee = await Nymph.getEntity({
    class: Employee.class
  }, {
    type: '&amp;',
    strict: ['current', true]
  });
  printResult(JSON.stringify(employee, null, 2)+'\n\n');
  delete employee.salary;
  employee.current = false;
  employee.end_date = (new Date().getTime()) / 1000;
  await employee.$save();
  appendResult(JSON.stringify(employee, null, 2));
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Patch an entity</h4>
    <pre>
try {
  const employee = await Nymph.getEntity({
    class: Employee.class
  }, {
    type: '&amp;',
    strict: ['current', true]
  });
  printResult(JSON.stringify(employee, null, 2)+'\n\n');
  delete employee.salary;
  employee.current = false;
  employee.end_date = (new Date().getTime()) / 1000;
  await employee.$patch();
  appendResult(JSON.stringify(employee, null, 2));
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Get an entity</h4>
    <pre>
try {
  const jane = await Nymph.getEntity({
    class: Employee.class
  }, {
    type: '&amp;',
    strict: ['name', 'Jane Doe']
  });
  printResult(JSON.stringify(jane, null, 2));
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Get entities</h4>
    <pre>
try {
  const entities = await Nymph.getEntities({
    class: Employee.class,
    limit: 4
  }, {
    type: '&amp;',
    tag: ['employee']
  });
  printResult(JSON.stringify(entities, null, 2));
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Get entity GUIDs</h4>
    <pre>
try {
  const entities = await Nymph.getEntities({
    class: Employee.class,
    return: 'guid'
  }, {
    type: '&amp;',
    tag: ['employee']
  });
  printResult(JSON.stringify(entities, null, 2));
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Use deep selector 1</h4>
    <pre>
try {
  const entities = await Nymph.getEntities({
    class: Employee.class,
    limit: 4
  }, {
    type: '&amp;',
    tag: ['employee'],
    1: {
      type: '|',
      like: ['name', '%Jane%']
    }
  });
  printResult(JSON.stringify(entities, null, 2));
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Use deep selector 2</h4>
    <pre>
try {
  const entities = await Nymph.getEntities({
    class: Employee.class,
    limit: 4
  }, [
    '&amp;',
    {
      tag: ['employee']
    },
    {
      type: '|',
      like: ['name', '%Jane%']
    }
  ]);
  printResult(JSON.stringify(entities, null, 2));
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Use deep selector 3</h4>
    <pre>
try {
  const entities = await Nymph.getEntities({
    class: Employee.class,
    limit: 4
  }, [
    '&amp;',
    {
      tag: ['employee']
    },
    [
      '|',
      {
        like: ['name', '%Jane%']
      }
    ]
  ]);
  printResult(JSON.stringify(entities, null, 2));
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Use really deep selector</h4>
    <pre>
try {
  const entities = await Nymph.getEntities({
    class: Employee.class,
    limit: 4
  }, {
    type: '&amp;',
    tag: ['employee'],
    1: {
      type: '|',
      1: {
        type: '&amp;',
        like: ['name', '%Jane%']
      }
    }
  });
  printResult(JSON.stringify(entities, null, 2));
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Delete an entity</h4>
    <pre>
try {
  const jane = await Nymph.getEntity({
    class: Employee.class
  }, {
    type: '&amp;',
    strict: ['name', 'Jane Doe']
  });
  printResult(JSON.stringify(jane, null, 2)+'\n\n');
  const deleted = await jane.$delete();
  appendResult(JSON.stringify(deleted));
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Delete entities</h4>
    <pre>
try {
  const janes = await Nymph.getEntities({
    class: Employee.class,
    limit: 2
  }, {
    type: '&amp;',
    strict: ['name', 'Jane Doe']
  });
  printResult(JSON.stringify(janes, null, 2)+'\n\n');
  const deleted = await Nymph.deleteEntities(janes);
  appendResult(JSON.stringify(deleted));
} catch (errObj) {
  printResult(
    errObj.name + ': ' + errObj.message + '\n\n' +
      JSON.stringify(errObj, null, 2)
  );
}
    </pre>
    <h4>Hierarchical Sort</h4>
    <pre>
// Prepare an array of hierarchical entities.
const array = [];
for (let i = 0; i < 10; i++) {
  const emp = new Employee();
  emp.name = 'Jane Doe';
  emp.current = true;
  emp.salary = 8000000;
  emp.start_date = (new Date().getTime()) / 1000;
  emp.manager = null;
  emp.title = 'Seniorer Person';
  array.push(emp);
}

array[0].name += ' 0';
array[4].name += ' 0';
array[7].name += ' 0';
await Promise.all([
  array[0].$save(),
  array[4].$save(),
  array[7].$save()
]);

array[1].name += ' 1';
array[1].manager = array[0];
array[5].name += ' 1';
array[5].manager = array[4];
array[8].name += ' 1';
array[8].manager = array[7];
await Promise.all([
  array[1].$save(),
  array[5].$save(),
  array[8].$save()
]);

array[2].name += ' 2';
array[2].manager = array[1];
array[3].name += ' 2';
array[3].manager = array[1];
array[6].name += ' 2';
array[6].manager = array[5];
array[9].name += ' 2';
array[9].manager = array[8];
await Promise.all([
  array[2].$save(),
  array[3].$save(),
  array[6].$save(),
  array[9].$save()
]);

// Shuffle the array.
array.sort(() => .5 - Math.random());

// Ready all the entities with their data.
await Promise.all(array.map(entity => entity.$readyAll(1)));

// Print the entities' current order.
printResult('');
appendResult('Before:\n');
let dashes;
for (var i = 0; i < array.length; i++) {
  dashes = [];
  var parent = array[i].manager;
  while (parent) {
    dashes.push('-&amp;nbsp;');
    if (parent.$data) {
      parent = parent.manager;
    } else {
      parent = false;
    }
  }
  appendResult(i+': '+dashes.join('')+array[i].name+'\n');
}
appendResult('\n\n');

// Order the entities hierarchically.
Nymph.hsort(array, 'name', 'manager');

// Print the entities' order again.
appendResult('After:\n');
for (var i = 0; i < array.length; i++) {
  dashes = [];
  var parent = array[i].manager;
  while (parent) {
    dashes.push('-&amp;nbsp;');
    if (parent.manager) {
      parent = parent.manager;
    } else {
      parent = false;
    }
  }
  appendResult(i+': '+dashes.join('')+array[i].name+'\n');
}
    </pre>
  </div>
</body>
</html>
