(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', 'Todo'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('Todo'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.Todo);
		global.TodoEl = mod.exports;
	}
})(this, function (exports, _Todo) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Todo2 = _interopRequireDefault(_Todo);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	function createdDate(todo) {
		var date = new Date(todo.cdate * 1000);
		return date.getFullYear() + '-' + (date.getMonth + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
	}

	function data() {
		return {
			todo: new _Todo2.default(),
			archived: false
		};
	};

	var methods = {
		save: function save() {
			var _this = this;

			this.get('todo').save().then(function (todo) {
				_this.set({ todo: todo });
			}, function (errObj) {
				alert('Error: ' + errObj.textStatus);
			});
		}
	};

	function encapsulateStyles(node) {
		setAttribute(node, "svelte-2456255383", "");
	}

	function add_css() {
		var style = createElement("style");
		style.id = 'svelte-2456255383-style';
		style.textContent = "label[svelte-2456255383].list-group-item,[svelte-2456255383] label.list-group-item{font-weight:normal;cursor:pointer}label[svelte-2456255383].list-group-item > .todo-row,[svelte-2456255383] label.list-group-item > .todo-row{display:flex;justify-content:space-between}[svelte-2456255383].todo-flex,[svelte-2456255383] .todo-flex{display:flex}[svelte-2456255383].todo-controls,[svelte-2456255383] .todo-controls{flex-grow:1}[svelte-2456255383].todo-input,[svelte-2456255383] .todo-input{display:inline;background-color:transparent;border:0;flex-grow:1}[svelte-2456255383].todo-input.done-true,[svelte-2456255383] .todo-input.done-true{text-decoration:line-through;color:grey}[svelte-2456255383].todo-date,[svelte-2456255383] .todo-date{margin-left:5px;flex-shrink:1}";
		appendNode(style, document.head);
	}

	function create_main_fragment(state, component) {
		var label,
		    label_class_value,
		    span,
		    span_1,
		    text,
		    input,
		    input_class_value,
		    input_updating = false,
		    text_2,
		    span_2,
		    text_3;

		var if_block = !state.archived && create_if_block(state, component);

		function input_input_handler() {
			input_updating = true;
			var state = component.get();
			state.todo.data.name = input.value;
			component.set({ todo: state.todo });
			input_updating = false;
		}

		function change_handler(event) {
			component.save();
		}

		return {
			c: function create() {
				label = createElement("label");
				span = createElement("span");
				span_1 = createElement("span");
				if (if_block) if_block.c();
				text = createText("\n      ");
				input = createElement("input");
				text_2 = createText("\n    ");
				span_2 = createElement("span");
				text_3 = createText(state.createdDate);
				this.h();
			},

			h: function hydrate() {
				encapsulateStyles(label);
				label.className = label_class_value = "list-group-item list-group-item-" + (state.todo.data.done ? 'success' : 'warning');
				span.className = "todo-row";
				span_1.className = "todo-controls todo-flex";
				input.type = "text";
				input.className = input_class_value = "todo-input done-" + state.todo.data.done;
				addListener(input, "input", input_input_handler);
				addListener(input, "change", change_handler);
				span_2.className = "todo-date todo-flex";
			},

			m: function mount(target, anchor) {
				insertNode(label, target, anchor);
				appendNode(span, label);
				appendNode(span_1, span);
				if (if_block) if_block.m(span_1, null);
				appendNode(text, span_1);
				appendNode(input, span_1);

				input.value = state.todo.data.name;

				appendNode(text_2, span);
				appendNode(span_2, span);
				appendNode(text_3, span_2);
			},

			p: function update(changed, state) {
				if (changed.todo && label_class_value !== (label_class_value = "list-group-item list-group-item-" + (state.todo.data.done ? 'success' : 'warning'))) {
					label.className = label_class_value;
				}

				if (!state.archived) {
					if (if_block) {
						if_block.p(changed, state);
					} else {
						if_block = create_if_block(state, component);
						if_block.c();
						if_block.m(span_1, text);
					}
				} else if (if_block) {
					if_block.u();
					if_block.d();
					if_block = null;
				}

				if (changed.todo && input_class_value !== (input_class_value = "todo-input done-" + state.todo.data.done)) {
					input.className = input_class_value;
				}

				if (!input_updating) {
					input.value = state.todo.data.name;
				}

				if (changed.createdDate) {
					text_3.data = state.createdDate;
				}
			},

			u: function unmount() {
				detachNode(label);
				if (if_block) if_block.u();
			},

			d: function destroy() {
				if (if_block) if_block.d();
				removeListener(input, "input", input_input_handler);
				removeListener(input, "change", change_handler);
			}
		};
	}

	// (4:6) {{#if !archived}}
	function create_if_block(state, component) {
		var input;

		function input_change_handler() {
			var state = component.get();
			state.todo.data.done = input.checked;
			component.set({ todo: state.todo });
		}

		function change_handler(event) {
			component.save();
		}

		return {
			c: function create() {
				input = createElement("input");
				this.h();
			},

			h: function hydrate() {
				input.type = "checkbox";
				setStyle(input, "margin-right", "5px");
				addListener(input, "change", input_change_handler);
				addListener(input, "change", change_handler);
			},

			m: function mount(target, anchor) {
				insertNode(input, target, anchor);

				input.checked = state.todo.data.done;
			},

			p: function update(changed, state) {
				input.checked = state.todo.data.done;
			},

			u: function unmount() {
				detachNode(input);
			},

			d: function destroy() {
				removeListener(input, "change", input_change_handler);
				removeListener(input, "change", change_handler);
			}
		};
	}

	function TodoEl(options) {
		init(this, options);
		this._state = assign(data(), options.data);
		this._recompute({ todo: 1 }, this._state);

		if (!document.getElementById("svelte-2456255383-style")) add_css();

		this._fragment = create_main_fragment(this._state, this);

		if (options.target) {
			this._fragment.c();
			this._fragment.m(options.target, options.anchor || null);
		}
	}

	assign(TodoEl.prototype, methods, {
		destroy: destroy,
		get: get,
		fire: fire,
		observe: observe,
		on: on,
		set: set,
		teardown: destroy,
		_set: _set,
		_mount: _mount,
		_unmount: _unmount
	});

	TodoEl.prototype._recompute = function _recompute(changed, state) {
		if (changed.todo) {
			if (differs(state.createdDate, state.createdDate = createdDate(state.todo))) changed.createdDate = true;
		}
	};

	function setAttribute(node, attribute, value) {
		node.setAttribute(attribute, value);
	}

	function createElement(name) {
		return document.createElement(name);
	}

	function appendNode(node, target) {
		target.appendChild(node);
	}

	function createText(data) {
		return document.createTextNode(data);
	}

	function addListener(node, event, handler) {
		node.addEventListener(event, handler, false);
	}

	function insertNode(node, target, anchor) {
		target.insertBefore(node, anchor);
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function removeListener(node, event, handler) {
		node.removeEventListener(event, handler, false);
	}

	function setStyle(node, key, value) {
		node.style.setProperty(key, value);
	}

	function init(component, options) {
		component.options = options;

		component._observers = { pre: blankObject(), post: blankObject() };
		component._handlers = blankObject();
		component._root = options._root || component;
		component._bind = options._bind;
	}

	function assign(target) {
		var k,
		    source,
		    i = 1,
		    len = arguments.length;
		for (; i < len; i++) {
			source = arguments[i];
			for (k in source) {
				target[k] = source[k];
			}
		}

		return target;
	}

	function destroy(detach) {
		this.destroy = noop;
		this.fire('destroy');
		this.set = this.get = noop;

		if (detach !== false) this._fragment.u();
		this._fragment.d();
		this._fragment = this._state = null;
	}

	function get(key) {
		return key ? this._state[key] : this._state;
	}

	function fire(eventName, data) {
		var handlers = eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) return;

		for (var i = 0; i < handlers.length; i += 1) {
			handlers[i].call(this, data);
		}
	}

	function observe(key, callback, options) {
		var group = options && options.defer ? this._observers.post : this._observers.pre;

		(group[key] || (group[key] = [])).push(callback);

		if (!options || options.init !== false) {
			callback.__calling = true;
			callback.call(this, this._state[key]);
			callback.__calling = false;
		}

		return {
			cancel: function cancel() {
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
			cancel: function cancel() {
				var index = handlers.indexOf(handler);
				if (~index) handlers.splice(index, 1);
			}
		};
	}

	function set(newState) {
		this._set(assign({}, newState));
		if (this._root._lock) return;
		this._root._lock = true;
		callAll(this._root._beforecreate);
		callAll(this._root._oncreate);
		callAll(this._root._aftercreate);
		this._root._lock = false;
	}

	function _set(newState) {
		var oldState = this._state,
		    changed = {},
		    dirty = false;

		for (var key in newState) {
			if (differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = assign({}, oldState, newState);
		this._recompute(changed, this._state);
		if (this._bind) this._bind(changed, this._state);
		dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
		this._fragment.p(changed, this._state);
		dispatchObservers(this, this._observers.post, changed, this._state, oldState);
	}

	function _mount(target, anchor) {
		this._fragment.m(target, anchor);
	}

	function _unmount() {
		this._fragment.u();
	}

	function differs(a, b) {
		return a !== b || a && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' || typeof a === 'function';
	}

	function blankObject() {
		return Object.create(null);
	}

	function noop() {}

	function callAll(fns) {
		while (fns && fns.length) {
			fns.pop()();
		}
	}

	function dispatchObservers(component, group, changed, newState, oldState) {
		for (var key in group) {
			if (!changed[key]) continue;

			var newValue = newState[key];
			var oldValue = oldState[key];

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
	exports.default = TodoEl;
});
