<?php
$clientDir = file_exists('../../../client/package.json')
    ? '../../../client'
    : '../../node_modules/nymph-client';
$tilmeldDir = file_exists('../../../tilmeld-client/package.json')
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
    <script src="//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    <!-- Nymph Config -->
    <script type="text/javascript">
      (function(){
        var s = document.createElement("script"); s.setAttribute("src", "https://www.promisejs.org/polyfills/promise-5.0.0.min.js");
        (typeof Promise !== "undefined" && typeof Promise.all === "function") || document.getElementsByTagName('head')[0].appendChild(s);
      })();
      NymphOptions = {
        restURL: '../rest.php'
      };
    </script>

    <!-- Nymph JS -->
    <script src="<?php echo $clientDir; ?>/lib/Nymph.js"></script>
    <script src="<?php echo $clientDir; ?>/lib/Entity.js"></script>
    <script src="<?php echo $clientDir; ?>/lib/PubSub.js"></script>
    <script src="<?php echo $clientDir; ?>/lib/NymphClient.js"></script>

    <!-- Tilmeld JS -->
    <script src="<?php echo $tilmeldDir; ?>/lib/umd/Entities/User.js"></script>
    <script src="<?php echo $tilmeldDir; ?>/lib/umd/Entities/Group.js"></script>

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
    <!-- <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css"> -->
  </head>
  <body>
    <style>
      .w-auto {
        width: auto;
      }
    </style>
    <main></main>
    <!-- App JS -->
    <script src="<?php echo $queryEditorDir; ?>/lib/ValueEditor.js"></script>
    <script src="<?php echo $queryEditorDir; ?>/lib/SelectorEditor.js"></script>
    <script src="<?php echo $queryEditorDir; ?>/lib/QueryEditor.js"></script>
    <script type="text/javascript">
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
    </script>


    <script>
      $(function(){
        $("#go").click(function(){
          (function(Nymph, Entity, Employee){
            eval($("#current-test").val());
          })(NymphClient.Nymph, NymphClient.Entity, Employee.Employee);
        });
        $("#tests pre").click(function(){
          $("#current-test").val($(this).text());
        });
        $("#tests h4").each(function(){
          var that = $(this), option = $("<option>"+$(this).text()+"</option>");
          $("#test-selector").append(option).change(function(){
            if ($(this).find("option:selected").is(option))
              that.next("pre").click();
          });
        });
      });
    </script>
    <div style="width: 49%; float: left;">
      <textarea id="current-test" rows="20" style="width: 95%; font-family: monospace; border: 1px solid #000; padding: 10px;"></textarea>
      <br>Choose a snippet below and <button id="go">Go</button>
    </div>
    <div style="width: 47%; height: 300px; float: left; overflow: auto; border: 1px solid #000;">
      <div style="padding: 10px;" id="result">result here</div>
    </div>
    <br style="clear: both;">
    <select id="test-selector">
      <option>-</option>
    </select>
    <div id="tests">
      <h4>Try to save Entity class directly</h4>
      <pre>var entity = new Entity();
entity.set("something", "Anything");
entity.save().then(function(entity){
  $("#result").html("fail (Entity should not be usabe from the client.)");
}, function(errObj){
  $("#result").html("pass");
});</pre>
      <h4>Handle Forbidden Method</h4>
      <pre>Employee.inaccessibleMethod().then(function(data){
$("#result").html(data);
}, function(errObj){
$("#result").html(JSON.stringify(errObj));
});</pre>
      <h4>Handle Server Side Static Exception</h4>
      <pre>Employee.throwErrorStatic().then(function(data){
  $("#result").html(data);
}, function(errObj){
  $("#result").html(JSON.stringify(errObj));
});</pre>
      <h4>Handle Server Side Exception</h4>
      <pre>Nymph.getEntity({"class":"Employee"}, {"type":"&amp;","strict":["name","Jane Doe"]}).then(function(jane){
  jane.throwError().then(function(data){
    $("#result").html(data);
  }, function(errObj){
    $("#result").html(JSON.stringify(errObj));
  });
});</pre>
      <h4>Call a Server Side Static Method</h4>
      <pre>Employee.testStatic(5).then(function(data){
  $("#result").html(data);
}, function(errObj){
  $("#result").html(errObj.textStatus);
});</pre>
      <h4>Refresh an entity</h4>
      <pre>var promise1 = Nymph.getEntity({"class":"Employee"}, {"type":"&amp;","strict":["name","Jane Doe"]}),
    promise2 = Nymph.getEntity({"class":"Employee"}, {"type":"&amp;","strict":["name","Jane Doe"]});

Promise.all([promise1, promise2]).then(function(entities){
  entities[0].data.name = "Janet Doe";
  entities[0].save().then(function(){
    if (entities[1].data.name == "Janet Doe") {
      $("#result").html("fail - refreshed without asking");
      return;
    }
    entities[1].refresh().then(function(entity){
      if (entity.data.name == "Janet Doe")
        $("#result").html("pass");
      else
        $("#result").html("fail");
    }, function(errObj){
      $("#result").html(errObj.textStatus);
    });
  }, function(errObj){
    $("#result").html(errObj.textStatus);
  });
}, function(errObj){
  $("#result").html(errObj.textStatus);
});</pre>
      <h4>Check two entities are equal</h4>
      <pre>Nymph.getEntity({"class":"Employee"}, {"type":"&amp;","strict":["name","Jane Doe"]}).then(function(first){
  Nymph.getEntity({"class":"Employee"}, {"type":"&amp;","guid":first.guid}).then(function(second){
    first.data.thing = 'this';
    first.data.other = 'this';
    second.data.other = 'this';
    second.data.thing = 'this';
    $("#result").html(JSON.stringify(first.equals(second)));
  }, function(errObj){
    $("#result").html(errObj.textStatus);
  });
}, function(errObj){
  $("#result").html(errObj.textStatus);
});</pre>
      <h4>Check two objects are the same entity</h4>
      <pre>Nymph.getEntity({"class":"Employee"}, {"type":"&amp;","strict":["name","Jane Doe"]}).then(function(first){
  Nymph.getEntity({"class":"Employee"}, {"type":"&amp;","guid":first.guid}).then(function(second){
    $("#result").html(JSON.stringify(first.is(second)));
  }, function(errObj){
    $("#result").html(errObj.textStatus);
  });
}, function(errObj){
  $("#result").html(errObj.textStatus);
});</pre>
      <h4>Get a new UID</h4>
      <pre>Nymph.newUID('employee').then(function(uidValue){
  $("#result").html(uidValue);
}, function(errObj){
  $("#result").html(errObj.textStatus);
});</pre>
    <h4>Get UID value</h4>
    <pre>Nymph.getUID('employee').then(function(uidValue){
  $("#result").html(uidValue);
}, function(errObj){
  $("#result").html(errObj.textStatus);
});</pre>
      <h4>Set UID value</h4>
      <pre>Nymph.getUID('employee').then(function(uidValue){
  if (confirm("Decrement UID employee to "+(uidValue-1))) {
    Nymph.setUID('employee', uidValue-1).then(function(success){
      $("#result").html(success);
    }, function(errObj){
      $("#result").html(errObj.textStatus);
    });
  }
}, function(errObj){
  $("#result").html(errObj.textStatus);
});</pre>
      <h4>Delete UID</h4>
      <pre>Nymph.deleteUID('employee').then(function(data){
  $("#result").html(data);
}, function(errObj){
  $("#result").html(errObj.textStatus);
});</pre>
      <h4>Create an entity</h4>
      <pre>var entity = new Employee();
entity.set("name", "Jane Doe");
entity.set({
  "current": true,
  "salary": 8000000,
  "start_date": (new Date().getTime()) / 1000,
  "subordinates": [],
  "title": "Seniorer Person"
});
console.log(entity.get("name"));
console.log(entity.get(["name", "current", "salary", "start_date", "subordinates", "title"]));
entity.save().then(function(jane){
  $("#result").html(JSON.stringify(jane));
}, function(errObj){
  $("#result").html(errObj.textStatus);
});</pre>
      <h4>Create two unrelated entities</h4>
      <pre>var entity = new Employee();
entity.set({
  "name": "Jane Doe",
  "current": true,
  "salary": 8000000,
  "start_date": (new Date().getTime()) / 1000,
  "subordinates": [],
  "title": "Seniorer Person"
});
var entity2 = new Employee();
entity2.set({
  "name": "John Doe",
  "current": true,
  "salary": 8000000,
  "start_date": (new Date().getTime()) / 1000,
  "subordinates": [],
  "title": "Seniorer Person"
});
Nymph.saveEntities([entity, entity2]).then(function(entities){
  entities[0].data.building = "J2";
  entities[1].data.building = "B4";
  Nymph.saveEntities(entities).then(function(entities){
    $("#result").html(JSON.stringify(entities));
  }, function(errObj){
    $("#result").html(errObj.textStatus);
  });
}, function(errObj){
  $("#result").html(errObj.textStatus);
});</pre>
      <h4>Create two related entities</h4>
      <pre>var entity = new Employee();
entity.set({
  "name": "Jane Doe",
  "current": true,
  "salary": 8000000,
  "start_date": (new Date().getTime()) / 1000,
  "subordinates": [],
  "title": "Seniorer Person"
});
entity.save().then(function(jane){
  var entity = new Employee();
  entity.addTag("boss","bigcheese");
  entity.set({
    "name": "Steve Guy",
    "current": true,
    "salary": 8000000,
    "start_date": (new Date().getTime()) / 1000,
    "subordinates": [jane],
    "title": "Executive Person"
  });
  entity.save().then(function(steve){
    $("#result").html(JSON.stringify(steve));
  }, function(errObj){
    $("#result").html(errObj.textStatus);
  });
}, function(errObj){
  $("#result").html(errObj.textStatus);
});</pre>
      <h4>Add, check, and remove tags</h4>
      <pre>$("#result").html("");
var entity = new Entity;
entity.addTag('test');
console.log(entity.tags);
if (entity.hasTag('test')) {
  $("#result").append("pass&lt;br&gt;");
} else {
  $("#result").append("fail&lt;br&gt;");
}
entity.addTag('test', 'test2');
console.log(entity.tags);
if (entity.hasTag('test', 'test2')) {
  $("#result").append("pass&lt;br&gt;");
} else {
  $("#result").append("fail&lt;br&gt;");
}
entity.addTag(['test', 'test3', 'test4', 'test5', 'test6']);
console.log(entity.tags);
if (entity.hasTag(['test', 'test3', 'test4', 'test5', 'test6'])) {
  $("#result").append("pass&lt;br&gt;");
} else {
  $("#result").append("fail&lt;br&gt;");
}
entity.removeTag('test2');
console.log(entity.tags);
if (!entity.hasTag('test2')) {
  $("#result").append("pass&lt;br&gt;");
} else {
  $("#result").append("fail&lt;br&gt;");
}
entity.removeTag('test3', 'test4');
console.log(entity.tags);
if (!entity.hasTag('test3', 'test4')) {
  $("#result").append("pass&lt;br&gt;");
} else {
  $("#result").append("fail&lt;br&gt;");
}
entity.removeTag(['test5', 'test6']);
console.log(entity.tags);
if (!entity.hasTag(['test5', 'test6'])) {
  $("#result").append("pass&lt;br&gt;");
} else {
  $("#result").append("fail&lt;br&gt;");
}
if (!(entity.tags&lt;["test"]||entity.tags&gt;["test"])) {
  $("#result").append("pass&lt;br&gt;");
} else {
  $("#result").append("fail&lt;br&gt;");
}
</pre>
      <h4>Wake a sleeping reference</h4>
      <pre>Nymph.getEntity({"class":"Employee"}, {"type":"&amp;","strict":["name","Jane Doe"]}).then(function(jane){
  var entity = new Employee();
  entity.referenceSleep(['nymph_entity_reference', jane.guid, 'Employee']);
  entity.ready(function(entity){
    $("#result").html(JSON.stringify(entity));
  }, function(errObj){
    $("#result").html(errObj.textStatus);
  });
}, function(errObj){
  $("#result").html(errObj.textStatus);
});</pre>
    <h4>Change an entity</h4>
    <pre>Nymph.getEntity({"class":"Employee"}, {"type":"&amp;","strict":["current",true]}).then(function(employee){
  $("#result").html(JSON.stringify(employee)+'&lt;br&gt;&lt;br&gt;');
  delete employee.data.salary;
  employee.set("current", false);
  employee.set("end_date", (new Date().getTime()) / 1000);
  employee.save().then(function(employee){
    $("#result").append(JSON.stringify(employee));
  }, function(errObj){
    $("#result").append(errObj.textStatus);
  });
}, function(errObj){
  $("#result").html(errObj.textStatus);
});</pre>
      <h4>Get an entity</h4>
      <pre>Nymph.getEntity({"class":"Employee"}, {"type":"&amp;","strict":["name","Jane Doe"]}).then(function(jane){
  $("#result").html(JSON.stringify(jane));
}, function(errObj){
  $("#result").html(errObj.textStatus);
});</pre>
      <h4>Get entities</h4>
      <pre>Nymph.getEntities({"class":"Employee","limit":4},{"type":"&amp;","tag":["employee"]}).then(function(entities){
  $("#result").html(JSON.stringify(entities));
}, function(errObj){
  $("#result").html(errObj.textStatus);
});</pre>
      <h4>Use deep selector 1</h4>
      <pre>Nymph.getEntities({"class":"Employee","limit":4},{"type":"&amp;","tag":["employee"],"1":{"type":"|","like":["name","%Jane%"]}}).then(function(entities){
  $("#result").html(JSON.stringify(entities));
}, function(errObj){
  $("#result").html(errObj.textStatus);
});</pre>
      <h4>Use deep selector 2</h4>
      <pre>Nymph.getEntities({"class":"Employee","limit":4},["&amp;",{"tag":["employee"]},{"type":"|","like":["name","%Jane%"]}]).then(function(entities){
  $("#result").html(JSON.stringify(entities));
}, function(errObj){
  $("#result").html(errObj.textStatus);
});</pre>
      <h4>Use deep selector 3</h4>
      <pre>Nymph.getEntities({"class":"Employee","limit":4},["&amp;",{"tag":["employee"]},["|",{"like":["name","%Jane%"]}]]).then(function(entities){
  $("#result").html(JSON.stringify(entities));
}, function(errObj){
  $("#result").html(errObj.textStatus);
});</pre>
      <h4>Use really deep selector</h4>
      <pre>Nymph.getEntities({"class":"Employee","limit":4},{"type":"&amp;","tag":["employee"],"1":{"type":"|","1":{"type":"&amp;","like":["name","%Jane%"]}}}).then(function(entities){
  $("#result").html(JSON.stringify(entities));
}, function(errObj){
  $("#result").html(errObj.textStatus);
});</pre>
      <h4>Delete an entity</h4>
      <pre>Nymph.getEntity({"class":"Employee"}, {"type":"&amp;","strict":["name","Jane Doe"]}).then(function(jane){
  $("#result").html(JSON.stringify(jane)+'&lt;br&gt;&lt;br&gt;');
  jane.delete().then(function(deleted){
    $("#result").append(JSON.stringify(deleted));
  }, function(errObj){
    $("#result").html(errObj.textStatus);
  });
}, function(errObj){
  $("#result").html(errObj.textStatus);
});</pre>
      <h4>Delete entities</h4>
      <pre>Nymph.getEntities({"class":"Employee","limit":2},{"type":"&amp;","strict":["name","Jane Doe"]}).then(function(janes){
  $("#result").html(JSON.stringify(janes)+'&lt;br&gt;&lt;br&gt;');
  Nymph.deleteEntities(janes).then(function(deleted){
    $("#result").append(JSON.stringify(deleted));
  }, function(errObj){
    $("#result").html(errObj.textStatus);
  });
}, function(errObj){
  $("#result").html(errObj.textStatus);
});</pre>
      <h4>Hierarchical Sort</h4>
      <pre>var array = [], promises = [], promises2 = [], promises3 = [];
for (var i = 0; i < 10; i++) {
  var emp = new Employee();
  emp.set({
    "name": "Jane Doe",
    "current": true,
    "salary": 8000000,
    "start_date": (new Date().getTime()) / 1000,
    "manager": null,
    "title": "Seniorer Person"
  });
  array.push(emp);
}
array[0].data.name += " 0";
promises.push(array[0].save().then(function(){
  array[1].data.name += " 1";
  array[1].data.manager = array[0];
  promises2.push(array[1].save().then(function(){
    array[2].data.name += " 2";
    array[2].data.manager = array[1];
    promises3.push(array[2].save());
    array[3].data.name += " 2";
    array[3].data.manager = array[1];
    promises3.push(array[3].save());
  }));
}));
array[4].data.name += " 0";
promises.push(array[4].save().then(function(){
  array[5].data.name += " 1";
  array[5].data.manager = array[4];
  promises2.push(array[5].save().then(function(){
    array[6].data.name += " 2";
    array[6].data.manager = array[5];
    promises3.push(array[6].save());
  }));
}));
array[7].data.name += " 0";
promises.push(array[7].save().then(function(){
  array[8].data.name += " 1";
  array[8].data.manager = array[7];
  promises2.push(array[8].save().then(function(){
    array[9].data.name += " 2";
    array[9].data.manager = array[8];
    promises3.push(array[9].save());
  }));
}));

Promise.all(promises).then(function(){
  Promise.all(promises2).then(function(){
    Promise.all(promises3).then(function(){
      array.sort(function() {
        return .5 - Math.random();
      });
      var promises4 = [];
      for (var i in array) {
        promises4.push(array[i].readyAll());
      }
      Promise.all(promises4).then(function(){
        $("#result").empty();
        var dashes;
        for (var i in array) {
          dashes = [];
          var parent = array[i].data.manager;
          while (parent) {
            dashes.push("-&amp;nbsp;");
            if (parent.data)
              parent = parent.data.manager;
            else
              parent = false;
          }
          $("#result").append(i+": "+dashes.join("")+array[i].data.name+"&lt;br&gt;");
        }
        $("#result").append("&lt;br&gt;&lt;br&gt;");
        array = Nymph.hsort(array, "name", "manager");
        for (var i in array) {
          dashes = [];
          var parent = array[i].data.manager;
          while (parent) {
            dashes.push("-&amp;nbsp;");
            if (parent.data.manager)
              parent = parent.data.manager;
            else
              parent = false;
          }
          $("#result").append(i+": "+dashes.join("")+array[i].data.name+"&lt;br&gt;");
        }
      });
    });
  });
});</pre>
    </div>
  </body>
</html>
