var TodoApp = (function ( TodoEl ) { 'use strict';

TodoEl = ( TodoEl && TodoEl.__esModule ) ? TodoEl['default'] : TodoEl;

function recompute ( state, newState, oldState, isInitial ) {
	if ( isInitial || ( 'todos' in newState && differs( state.todos, oldState.todos ) ) ) {
		state.remaining = newState.remaining = template.computed.remaining( state.todos );
	}
}

var template = (function () {
  return {
    oncreate () {
      this.getTodos(this.get('uiShowArchived'));
    },

    data () {
      return {
        todos: [],
        uiSort: 'name',
        uiShowArchived: false,
        userCount: null,
        todoText: ''
      }
    },

    computed: {
      remaining: (todos) => {
        var count = 0;
        for (var i = 0; i < todos.length; i++) {
          count += todos[i].get('done') ? 0 : 1;
        }
        return count;
      }
    },

    methods: {
      getTodos (archived) {
        if (this.get('__subscription')) {
          this.get('__subscription').unsubscribe();
        }
        var subscription = Nymph.getEntities({"class": 'Todo'}, {"type": archived ? '&' : '!&', "tag": 'archived'}).subscribe((newTodos) => {
          this.set({uiShowArchived: archived});
          if (newTodos !== undefined) {
            var todos = this.get('todos');
            Nymph.updateArray(todos, newTodos);
            Nymph.sort(todos, this.get('uiSort'));
            this.set({todos: todos});
          }
        }, null, (count) => {
          this.set({userCount: count});
        });
        this.set({__subscription: subscription});
      },

      addTodo () {
        var todoText = this.get('todoText');
        if (todoText === undefined || todoText === '') {
          return;
        }
        var todo = new Todo();
        todo.set('name', todoText);
        todo.save().then(() => {
          this.set({todoText: ''});
        }, (errObj) => {
          alert("Error: "+errObj.textStatus);
        });
      },

      sortTodos () {
        this.set({todos: Nymph.sort(this.get('todos'), this.get('uiSort'))});
      },

      save (todo) {
        todo.save().then(null, (errObj) => {
          alert('Error: '+errObj.textStatus);
        });
      },

      archive () {
        var oldTodos = this.get('todos');
        for (var i = 0; i < oldTodos.length; i++) {
          var todo = oldTodos[i];
          if (todo.get('done')) {
            todo.archive().then((success) => {
              if (!success) {
                alert("Couldn't save changes to "+todo.get('name'));
              }
            }, (errObj) => {
              alert("Error: "+errObj.textStatus+"\nCouldn't archive "+todo.get('name'));
            });
          }
        }
      },

      deleteTodos () {
        Nymph.deleteEntities(this.get('todos'));
      }
    }
  };
}());

function add_css () {
	var style = createElement( 'style' );
	style.id = "svelte-2021015885-style";
	style.textContent = "\n  [svelte-2021015885].userCount, [svelte-2021015885] .userCount {\n    position: fixed;\n    right: 5px;\n    bottom: 5px;\n  }\n";
	appendNode( style, document.head );
}

function create_main_fragment ( state, component ) {
	var text_8_value;

	var div = createElement( 'div' );
	setAttribute( div, 'svelte-2021015885', '' );
	var div_1 = createElement( 'div' );
	appendNode( div_1, div );
	div_1.className = "row";
	var div_2 = createElement( 'div' );
	appendNode( div_2, div_1 );
	div_2.className = "col-sm-8";
	var div_3 = createElement( 'div' );
	appendNode( div_3, div_2 );
	div_3.className = "list-group";
	div_3.style.cssText = "clear: both;";
	var each_block_value = state.todos;

	var each_block_iterations = [];

	for ( var i = 0; i < each_block_value.length; i += 1 ) {
		each_block_iterations[i] = create_each_block( state, each_block_value, each_block_value[i], i, component );
		each_block_iterations[i].mount( div_3, null );
	}

	appendNode( createText( "\n    " ), div_1 );
	var div_4 = createElement( 'div' );
	appendNode( div_4, div_1 );
	div_4.className = "col-sm-4";
	div_4.style.cssText = "text-align: center; margin-bottom: 1em;";
	var small = createElement( 'small' );
	appendNode( small, div_4 );
	small.className = "alert alert-info";
	small.style.cssText = "display: block;";

	function get_block ( state ) {
		if ( state.uiShowArchived ) return create_if_block;
		return create_if_block_1;
	}

	var current_block = get_block( state );
	var if_block = current_block( state, component );

	if_block.mount( small, null );
	var text_1 = createText( "\n        " );
	appendNode( text_1, small );

	var if_block_2 = (state.todos.length > 0) && create_if_block_4( state, component );

	if ( if_block_2 ) if_block_2.mount( small, null );
	var text_2 = createText( "\n        " );
	appendNode( text_2, small );
	var br = createElement( 'br' );
	appendNode( br, small );
	appendNode( createText( "\n        " ), small );

	function get_block_1 ( state ) {
		if ( state.uiShowArchived ) return create_if_block_7;
		return create_if_block_8;
	}

	var current_block_1 = get_block_1( state );
	var if_block_4 = current_block_1( state, component );

	if_block_4.mount( small, null );
	appendNode( createText( "\n      " ), div_4 );

	var if_block_5 = (state.todos.length > 1) && create_if_block_9( state, component );

	if ( if_block_5 ) if_block_5.mount( div_4, null );
	appendNode( createText( "\n  " ), div );

	var if_block_6 = (!state.uiShowArchived) && create_if_block_10( state, component );

	if ( if_block_6 ) if_block_6.mount( div, null );
	var text_6 = createText( "\n  " );
	appendNode( text_6, div );
	var div_5 = createElement( 'div' );
	appendNode( div_5, div );
	div_5.className = "userCount label label-default";
	appendNode( createText( "Active Users: " ), div_5 );
	var text_8 = createText( text_8_value = state.userCount );
	appendNode( text_8, div_5 );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},

		update: function ( changed, state ) {
			var each_block_value = state.todos;

			if ( 'todos' in changed || 'uiShowArchived' in changed ) {
				for ( var i = 0; i < each_block_value.length; i += 1 ) {
					if ( each_block_iterations[i] ) {
						each_block_iterations[i].update( changed, state, each_block_value, each_block_value[i], i );
					} else {
						each_block_iterations[i] = create_each_block( state, each_block_value, each_block_value[i], i, component );
						each_block_iterations[i].mount( div_3, null );
					}
				}

				for ( ; i < each_block_iterations.length; i += 1 ) {
					each_block_iterations[i].unmount();
					each_block_iterations[i].destroy();
				}
				each_block_iterations.length = each_block_value.length;
			}

			if ( current_block === ( current_block = get_block( state ) ) && if_block ) {
				if_block.update( changed, state );
			} else {
				{
					if_block.unmount();
					if_block.destroy();
				}
				if_block = current_block( state, component );
				if_block.mount( small, text_1 );
			}

			if ( state.todos.length > 0 ) {
				if ( if_block_2 ) {
					if_block_2.update( changed, state );
				} else {
					if_block_2 = create_if_block_4( state, component );
					if_block_2.mount( small, text_2 );
				}
			} else if ( if_block_2 ) {
				if_block_2.unmount();
				if_block_2.destroy();
				if_block_2 = null;
			}

			if ( current_block_1 !== ( current_block_1 = get_block_1( state ) ) ) {
				{
					if_block_4.unmount();
					if_block_4.destroy();
				}
				if_block_4 = current_block_1( state, component );
				if_block_4.mount( small, null );
			}

			if ( state.todos.length > 1 ) {
				if ( if_block_5 ) {
					if_block_5.update( changed, state );
				} else {
					if_block_5 = create_if_block_9( state, component );
					if_block_5.mount( div_4, null );
				}
			} else if ( if_block_5 ) {
				if_block_5.unmount();
				if_block_5.destroy();
				if_block_5 = null;
			}

			if ( !state.uiShowArchived ) {
				if ( if_block_6 ) {
					if_block_6.update( changed, state );
				} else {
					if_block_6 = create_if_block_10( state, component );
					if_block_6.mount( div, text_6 );
				}
			} else if ( if_block_6 ) {
				if_block_6.unmount();
				if_block_6.destroy();
				if_block_6 = null;
			}

			if ( text_8_value !== ( text_8_value = state.userCount ) ) {
				text_8.data = text_8_value;
			}
		},

		unmount: function () {
			detachNode( div );

			for ( var i = 0; i < each_block_iterations.length; i += 1 ) {
				each_block_iterations[i].unmount();
			}

			if ( if_block_2 ) if_block_2.unmount();
			if ( if_block_5 ) if_block_5.unmount();
			if ( if_block_6 ) if_block_6.unmount();
		},

		destroy: function () {
			destroyEach( each_block_iterations, false, 0 );

			{
						if_block.unmount();
						if_block.destroy();
					}
			if ( if_block_2 ) if_block_2.destroy();
			{
						if_block_4.unmount();
						if_block_4.destroy();
					}
			if ( if_block_5 ) if_block_5.destroy();
			if ( if_block_6 ) if_block_6.destroy();
		}
	};
}

function create_each_block ( state, each_block_value, todo, todo_index, component ) {
	var todoel_updating = false;

	var todoel_initial_data = { archived: state.uiShowArchived };
	if ( todo_index in each_block_value ) todoel_initial_data.todo = todo;
	var todoel = new TodoEl({
		target: null,
		_root: component._root,
		data: todoel_initial_data
	});

	component._bindings.push( function () {
		if ( todoel._torndown ) return;
		todoel.observe( 'todo', function ( value ) {
			if ( todoel_updating ) return;
			todoel_updating = true;
			var list = this._context.each_block_value;
			var index = this._context.todo_index;
			list[index] = value;

			component._set({ todos: component.get( 'todos' ) });
			todoel_updating = false;
		}, { init: differs( todoel.get( 'todo' ), todo ) });
	});

	todoel._context = {
		each_block_value: each_block_value,
		todo_index: todo_index
	};

	return {
		mount: function ( target, anchor ) {
			todoel._fragment.mount( target, anchor );
		},

		update: function ( changed, state, each_block_value, todo, todo_index ) {
			if ( !todoel_updating && 'todos' in changed ) {
				todoel_updating = true;
				todoel._set({ todo: todo });
				todoel_updating = false;
			}

			todoel._context.each_block_value = each_block_value;
			todoel._context.todo_index = todo_index;

			var todoel_changes = {};

			if ( 'uiShowArchived' in changed ) todoel_changes.archived = state.uiShowArchived;

			if ( Object.keys( todoel_changes ).length ) todoel.set( todoel_changes );
		},

		unmount: function () {
			todoel._fragment.unmount();
		},

		destroy: function () {
			todoel.destroy( false );
		}
	};
}

function create_if_block_2 ( state, component ) {
	var span = createElement( 'span' );
	appendNode( createText( "0 todos" ), span );

	return {
		mount: function ( target, anchor ) {
			insertNode( span, target, anchor );
		},

		update: noop,

		unmount: function () {
			detachNode( span );
		},

		destroy: noop
	};
}

function create_if_block_3 ( state, component ) {
	var text_value, text_2_value;

	var span = createElement( 'span' );
	var text = createText( text_value = state.remaining );
	appendNode( text, span );
	appendNode( createText( " of " ), span );
	var text_2 = createText( text_2_value = state.todos.length );
	appendNode( text_2, span );
	appendNode( createText( " remaining" ), span );

	return {
		mount: function ( target, anchor ) {
			insertNode( span, target, anchor );
		},

		update: function ( changed, state ) {
			if ( text_value !== ( text_value = state.remaining ) ) {
				text.data = text_value;
			}

			if ( text_2_value !== ( text_2_value = state.todos.length ) ) {
				text_2.data = text_2_value;
			}
		},

		unmount: function () {
			detachNode( span );
		},

		destroy: noop
	};
}

function create_if_block ( state, component ) {
	var text_value;

	var span = createElement( 'span' );
	var text = createText( text_value = state.todos.length );
	appendNode( text, span );
	appendNode( createText( " archived todos" ), span );

	return {
		mount: function ( target, anchor ) {
			insertNode( span, target, anchor );
		},

		update: function ( changed, state ) {
			if ( text_value !== ( text_value = state.todos.length ) ) {
				text.data = text_value;
			}
		},

		unmount: function () {
			detachNode( span );
		},

		destroy: noop
	};
}

function create_if_block_1 ( state, component ) {
	var span = createElement( 'span' );

	function get_block ( state ) {
		if ( state.todos.length == 0 ) return create_if_block_2;
		return create_if_block_3;
	}

	var current_block = get_block( state );
	var if_block_1 = current_block( state, component );

	if_block_1.mount( span, null );

	return {
		mount: function ( target, anchor ) {
			insertNode( span, target, anchor );
		},

		update: function ( changed, state ) {
			if ( current_block === ( current_block = get_block( state ) ) && if_block_1 ) {
				if_block_1.update( changed, state );
			} else {
				{
					if_block_1.unmount();
					if_block_1.destroy();
				}
				if_block_1 = current_block( state, component );
				if_block_1.mount( span, null );
			}
		},

		unmount: function () {
			detachNode( span );
		},

		destroy: function () {
			{
						if_block_1.unmount();
						if_block_1.destroy();
					}
		}
	};
}

function create_if_block_5 ( state, component ) {
	var a = createElement( 'a' );
	a.href = "javascript:void(0)";

	function click_handler ( event ) {
		component.deleteTodos();
	}

	addListener( a, 'click', click_handler );
	appendNode( createText( "delete" ), a );

	return {
		mount: function ( target, anchor ) {
			insertNode( a, target, anchor );
		},

		unmount: function () {
			detachNode( a );
		},

		destroy: function () {
			removeListener( a, 'click', click_handler );
		}
	};
}

function create_if_block_6 ( state, component ) {
	var a = createElement( 'a' );
	a.href = "javascript:void(0)";

	function click_handler ( event ) {
		component.archive();
	}

	addListener( a, 'click', click_handler );
	appendNode( createText( "archive done" ), a );

	return {
		mount: function ( target, anchor ) {
			insertNode( a, target, anchor );
		},

		unmount: function () {
			detachNode( a );
		},

		destroy: function () {
			removeListener( a, 'click', click_handler );
		}
	};
}

function create_if_block_4 ( state, component ) {
	var span = createElement( 'span' );
	appendNode( createText( "[\n            " ), span );

	function get_block ( state ) {
		if ( state.uiShowArchived ) return create_if_block_5;
		return create_if_block_6;
	}

	var current_block = get_block( state );
	var if_block_3 = current_block( state, component );

	if_block_3.mount( span, null );
	var text_1 = createText( "\n            ]" );
	appendNode( text_1, span );

	return {
		mount: function ( target, anchor ) {
			insertNode( span, target, anchor );
		},

		update: function ( changed, state ) {
			if ( current_block !== ( current_block = get_block( state ) ) ) {
				{
					if_block_3.unmount();
					if_block_3.destroy();
				}
				if_block_3 = current_block( state, component );
				if_block_3.mount( span, text_1 );
			}
		},

		unmount: function () {
			detachNode( span );
		},

		destroy: function () {
			{
						if_block_3.unmount();
						if_block_3.destroy();
					}
		}
	};
}

function create_if_block_7 ( state, component ) {
	var a = createElement( 'a' );
	a.href = "javascript:void(0)";

	function click_handler ( event ) {
		component.getTodos(false);
	}

	addListener( a, 'click', click_handler );
	appendNode( createText( "show current" ), a );

	return {
		mount: function ( target, anchor ) {
			insertNode( a, target, anchor );
		},

		unmount: function () {
			detachNode( a );
		},

		destroy: function () {
			removeListener( a, 'click', click_handler );
		}
	};
}

function create_if_block_8 ( state, component ) {
	var a = createElement( 'a' );
	a.href = "javascript:void(0)";

	function click_handler ( event ) {
		component.getTodos(true);
	}

	addListener( a, 'click', click_handler );
	appendNode( createText( "show archived" ), a );

	return {
		mount: function ( target, anchor ) {
			insertNode( a, target, anchor );
		},

		unmount: function () {
			detachNode( a );
		},

		destroy: function () {
			removeListener( a, 'click', click_handler );
		}
	};
}

function create_if_block_9 ( state, component ) {
	var input_updating = false, input_1_updating = false;

	var div = createElement( 'div' );
	div.style.cssText = "text-align: left;";
	appendNode( createText( "Sort: " ), div );
	var br = createElement( 'br' );
	appendNode( br, div );
	appendNode( createText( "\n          " ), div );
	var label = createElement( 'label' );
	appendNode( label, div );
	label.style.cssText = "font-weight: normal;";
	var input = createElement( 'input' );
	appendNode( input, label );
	input.type = "radio";
	input.name = "sort";
	input.__value = "name";
	input.value = input.__value;
	component._bindingGroups[0].push( input );

	function input_change_handler () {
		input_updating = true;
		if ( !input.checked ) return;
		component._set({ uiSort: input.__value });
		input_updating = false;
	}

	addListener( input, 'change', input_change_handler );

	function change_handler ( event ) {
		component.sortTodos();
	}

	addListener( input, 'change', change_handler );

	input.checked = input.__value === state.uiSort;

	appendNode( createText( " Alpha" ), label );
	appendNode( createText( "\n             \n          " ), div );
	var label_1 = createElement( 'label' );
	appendNode( label_1, div );
	label_1.style.cssText = "font-weight: normal;";
	var input_1 = createElement( 'input' );
	appendNode( input_1, label_1 );
	input_1.type = "radio";
	input_1.name = "sort";
	input_1.__value = "cdate";
	input_1.value = input_1.__value;
	component._bindingGroups[0].push( input_1 );

	function input_1_change_handler () {
		input_1_updating = true;
		if ( !input_1.checked ) return;
		component._set({ uiSort: input_1.__value });
		input_1_updating = false;
	}

	addListener( input_1, 'change', input_1_change_handler );

	function change_handler_1 ( event ) {
		component.sortTodos();
	}

	addListener( input_1, 'change', change_handler_1 );

	input_1.checked = input_1.__value === state.uiSort;

	appendNode( createText( " Created" ), label_1 );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},

		update: function ( changed, state ) {
			if ( !input_updating ) {
				input.checked = input.__value === state.uiSort;
			}

			if ( !input_1_updating ) {
				input_1.checked = input_1.__value === state.uiSort;
			}
		},

		unmount: function () {
			detachNode( div );
		},

		destroy: function () {
			component._bindingGroups[0].splice( component._bindingGroups[0].indexOf( input ), 1 );

			removeListener( input, 'change', input_change_handler );
			removeListener( input, 'change', change_handler );

			component._bindingGroups[0].splice( component._bindingGroups[0].indexOf( input_1 ), 1 );

			removeListener( input_1, 'change', input_1_change_handler );
			removeListener( input_1, 'change', change_handler_1 );
		}
	};
}

function create_if_block_10 ( state, component ) {
	var input_updating = false, input_1_value_value;

	var form = createElement( 'form' );
	form.style.cssText = "margin-bottom: 20px;";

	function submit_handler ( event ) {
		component.addTodo(event.preventDefault());
	}

	addListener( form, 'submit', submit_handler );
	var div = createElement( 'div' );
	appendNode( div, form );
	div.className = "row";
	var div_1 = createElement( 'div' );
	appendNode( div_1, div );
	div_1.className = "col-xs-10";
	var input = createElement( 'input' );
	appendNode( input, div_1 );
	input.className = "form-control";
	input.type = "text";
	input.placeholder = "add new todo here";

	function input_input_handler () {
		input_updating = true;
		component._set({ todoText: input.value });
		input_updating = false;
	}

	addListener( input, 'input', input_input_handler );

	input.value = state.todoText;

	appendNode( createText( "\n        " ), div );
	var div_2 = createElement( 'div' );
	appendNode( div_2, div );
	div_2.className = "col-xs-2";
	div_2.style.cssText = "text-align: right;";
	var input_1 = createElement( 'input' );
	appendNode( input_1, div_2 );
	input_1.className = "btn btn-default";
	input_1.type = "submit";
	input_1.value = input_1_value_value = "add #" + ( state.todos.length + 1 );

	return {
		mount: function ( target, anchor ) {
			insertNode( form, target, anchor );
		},

		update: function ( changed, state ) {
			if ( !input_updating ) {
				input.value = state.todoText;
			}

			if ( input_1_value_value !== ( input_1_value_value = "add #" + ( state.todos.length + 1 ) ) ) {
				input_1.value = input_1_value_value;
			}
		},

		unmount: function () {
			detachNode( form );
		},

		destroy: function () {
			removeListener( form, 'submit', submit_handler );
			removeListener( input, 'input', input_input_handler );
		}
	};
}

function TodoApp ( options ) {
	options = options || {};
	this._state = assign( template.data(), options.data );
	recompute( this._state, this._state, {}, true );
	this._bindingGroups = [ [] ];

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root || this;
	this._yield = options._yield;

	this._torndown = false;
	if ( !document.getElementById( "svelte-2021015885-style" ) ) add_css();
	this._renderHooks = [];
	this._bindings = [];

	this._fragment = create_main_fragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
	while ( this._bindings.length ) this._bindings.pop()();
	this._flush();

	if ( options._root ) {
		options._root._renderHooks.push( template.oncreate.bind( this ) );
	} else {
		template.oncreate.call( this );
	}
}

assign( TodoApp.prototype, template.methods, {
 	get: get,
 	fire: fire,
 	observe: observe,
 	on: on,
 	set: set,
 	_flush: _flush
 });

TodoApp.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = assign( {}, oldState, newState );
	recompute( this._state, newState, oldState, false )
	dispatchObservers( this, this._observers.pre, newState, oldState );
	this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
	while ( this._bindings.length ) this._bindings.pop()();
	this._flush();
};

TodoApp.prototype.teardown = TodoApp.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	if ( detach !== false ) this._fragment.unmount();
	this._fragment.destroy();
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

function createElement(name) {
	return document.createElement(name);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function appendNode(node, target) {
	target.appendChild(node);
}

function destroyEach(iterations, detach, start) {
	for (var i = start; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].destroy(detach);
	}
}

function differs(a, b) {
	return a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

function createText(data) {
	return document.createTextNode(data);
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function assign(target) {
	var k,
		source,
		i = 1,
		len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) target[k] = source[k];
	}

	return target;
}

function dispatchObservers(component, group, newState, oldState) {
	for (var key in group) {
		if (!(key in newState)) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		if (differs(newValue, oldValue)) {
			var callbacks = group[key];
			if (!callbacks) continue;

			for (var i = 0; i < callbacks.length; i += 1) {
				var callback = callbacks[i];
				if (callback.__calling) continue;

				callback.__calling = true;
				callback.call(component, newValue, oldValue);
				callback.__calling = false;
			}
		}
	}
}

function noop() {}

function get(key) {
	return key ? this._state[key] : this._state;
}

function fire(eventName, data) {
	var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function observe(key, callback, options) {
	var group = options && options.defer
		? this._observers.post
		: this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	this._root._flush();
}

function _flush() {
	if (!this._renderHooks) return;

	while (this._renderHooks.length) {
		this._renderHooks.pop()();
	}
}

return TodoApp;

}(TodoEl));