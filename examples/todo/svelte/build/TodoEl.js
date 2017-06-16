var TodoEl = (function () { 'use strict';

function recompute ( state, newState, oldState, isInitial ) {
	if ( isInitial || ( 'todo' in newState && differs( state.todo, oldState.todo ) ) ) {
		state.createdDate = newState.createdDate = template.computed.createdDate( state.todo );
	}
}

var template = (function () {
  return {
    data () {
      return {
        todo: new Todo(),
        archived: false
      }
    },

    computed: {
      createdDate: (todo) => {
        var date = new Date(todo.cdate * 1000);
        return date.toISOString().replace(/T/, ' ').replace(/:[^:]*$/, '');
      }
    },

    methods: {
      save () {
        this.get('todo').save().then((todo) => {
          this.set({todo: todo});
        }, (errObj) => {
          alert('Error: '+errObj.textStatus);
        });
      }
    }
  };
}());

function add_css () {
	var style = createElement( 'style' );
	style.id = "svelte-1380714226-style";
	style.textContent = "\n  label[svelte-1380714226].list-group-item, [svelte-1380714226] label.list-group-item {\n    font-weight: normal;\n    cursor: pointer;\n  }\n  label[svelte-1380714226].list-group-item > .row, [svelte-1380714226] label.list-group-item > .row {\n    display: block;\n  }\n  [svelte-1380714226].todo-input, [svelte-1380714226] .todo-input {\n    display: inline;\n    background-color: transparent;\n    border: 0;\n    width: 90%;\n  }\n  [svelte-1380714226].todo-input.done-true, [svelte-1380714226] .todo-input.done-true {\n    text-decoration: line-through;\n    color: grey;\n  }\n  [svelte-1380714226].date-col, [svelte-1380714226] .date-col {\n    text-align: right;\n  }\n";
	appendNode( style, document.head );
}

function create_main_fragment ( state, component ) {
	var label_class_value, input_class_value, input_updating = false, text_2_value;

	var label = createElement( 'label' );
	setAttribute( label, 'svelte-1380714226', '' );
	label.className = label_class_value = "list-group-item list-group-item-" + ( state.todo.data.done ? 'success' : 'warning' );
	var span = createElement( 'span' );
	appendNode( span, label );
	span.className = "row";
	var span_1 = createElement( 'span' );
	appendNode( span_1, span );
	span_1.className = "col-sm-9";

	var if_block = (!state.archived) && create_if_block( state, component );

	if ( if_block ) if_block.mount( span_1, null );
	var text = createText( "\n      " );
	appendNode( text, span_1 );
	var input = createElement( 'input' );
	appendNode( input, span_1 );
	input.type = "text";
	input.className = input_class_value = "todo-input done-" + ( state.todo.data.done );

	function input_input_handler () {
		input_updating = true;
		var state = component.get();
		state.todo.data.name = input.value;
		component._set({ todo: state.todo });
		input_updating = false;
	}

	addListener( input, 'input', input_input_handler );

	function change_handler ( event ) {
		component.save();
	}

	addListener( input, 'change', change_handler );

	input.value = state.todo.data.name;

	appendNode( createText( "\n    " ), span );
	var span_2 = createElement( 'span' );
	appendNode( span_2, span );
	span_2.className = "date-col col-sm-3";
	var text_2 = createText( text_2_value = state.createdDate );
	appendNode( text_2, span_2 );

	return {
		mount: function ( target, anchor ) {
			insertNode( label, target, anchor );
		},

		update: function ( changed, state ) {
			if ( label_class_value !== ( label_class_value = "list-group-item list-group-item-" + ( state.todo.data.done ? 'success' : 'warning' ) ) ) {
				label.className = label_class_value;
			}

			if ( !state.archived ) {
				if ( if_block ) {
					if_block.update( changed, state );
				} else {
					if_block = create_if_block( state, component );
					if_block.mount( span_1, text );
				}
			} else if ( if_block ) {
				if_block.unmount();
				if_block.destroy();
				if_block = null;
			}

			if ( input_class_value !== ( input_class_value = "todo-input done-" + ( state.todo.data.done ) ) ) {
				input.className = input_class_value;
			}

			if ( !input_updating ) {
				input.value = state.todo.data.name;
			}

			if ( text_2_value !== ( text_2_value = state.createdDate ) ) {
				text_2.data = text_2_value;
			}
		},

		unmount: function () {
			detachNode( label );
			if ( if_block ) if_block.unmount();
		},

		destroy: function () {
			if ( if_block ) if_block.destroy();
			removeListener( input, 'input', input_input_handler );
			removeListener( input, 'change', change_handler );
		}
	};
}

function create_if_block ( state, component ) {
	var input_updating = false;

	var input = createElement( 'input' );
	input.type = "checkbox";

	function input_change_handler () {
		input_updating = true;
		var state = component.get();
		state.todo.data.done = input.checked;
		component._set({ todo: state.todo });
		input_updating = false;
	}

	addListener( input, 'change', input_change_handler );

	function change_handler ( event ) {
		component.save();
	}

	addListener( input, 'change', change_handler );

	input.checked = state.todo.data.done;

	return {
		mount: function ( target, anchor ) {
			insertNode( input, target, anchor );
		},

		update: function ( changed, state ) {
			if ( !input_updating ) {
				input.checked = state.todo.data.done;
			}
		},

		unmount: function () {
			detachNode( input );
		},

		destroy: function () {
			removeListener( input, 'change', input_change_handler );
			removeListener( input, 'change', change_handler );
		}
	};
}

function TodoEl ( options ) {
	options = options || {};
	this._state = assign( template.data(), options.data );
	recompute( this._state, this._state, {}, true );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root || this;
	this._yield = options._yield;

	this._torndown = false;
	if ( !document.getElementById( "svelte-1380714226-style" ) ) add_css();

	this._fragment = create_main_fragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
}

assign( TodoEl.prototype, template.methods, {
 	get: get,
 	fire: fire,
 	observe: observe,
 	on: on,
 	set: set,
 	_flush: _flush
 });

TodoEl.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = assign( {}, oldState, newState );
	recompute( this._state, newState, oldState, false )
	dispatchObservers( this, this._observers.pre, newState, oldState );
	this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

TodoEl.prototype.teardown = TodoEl.prototype.destroy = function destroy ( detach ) {
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

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function createText(data) {
	return document.createTextNode(data);
}

function differs(a, b) {
	return a !== b || ((a && typeof a === 'object') || typeof a === 'function');
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

return TodoEl;

}());