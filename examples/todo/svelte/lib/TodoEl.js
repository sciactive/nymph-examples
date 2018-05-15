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

	function createdDate(_ref) {
		var todo = _ref.todo;

		var date = new Date(todo.cdate * 1000);
		return date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
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

			this.get().todo.save().then(function (todo) {
				_this.set({ todo: todo });
			}, function (errObj) {
				alert('Error: ' + errObj.textStatus);
			});
		}
	};

	function add_css() {
		var style = createElement("style");
		style.id = 'svelte-1ges84c-style';
		style.textContent = "label.list-group-item.svelte-1ges84c{font-weight:normal;cursor:pointer}label.list-group-item.svelte-1ges84c>.todo-row.svelte-1ges84c{display:flex;justify-content:space-between}.todo-flex.svelte-1ges84c{display:flex}.todo-controls.svelte-1ges84c{flex-grow:1}.todo-input.svelte-1ges84c{display:inline;background-color:transparent;border:0;flex-grow:1}.todo-input.done-true.svelte-1ges84c{text-decoration:line-through;color:grey}.todo-date.svelte-1ges84c{margin-left:5px;flex-shrink:1}";
		appendNode(style, document.head);
	}

	function create_main_fragment(component, state) {
		var label,
		    span,
		    span_1,
		    text,
		    input,
		    input_updating = false,
		    input_class_value,
		    text_2,
		    span_2,
		    text_3,
		    label_class_value;

		var if_block = !state.archived && create_if_block(component, state);

		function input_input_handler() {
			var state = component.get();
			input_updating = true;
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
				addListener(input, "input", input_input_handler);
				addListener(input, "change", change_handler);
				setAttribute(input, "type", "text");
				input.className = input_class_value = "todo-input done-" + state.todo.data.done + " svelte-1ges84c";
				span_1.className = "todo-controls todo-flex svelte-1ges84c";
				span_2.className = "todo-date todo-flex svelte-1ges84c";
				span.className = "todo-row svelte-1ges84c";
				label.className = label_class_value = "list-group-item list-group-item-" + (state.todo.data.done ? 'success' : 'warning') + " svelte-1ges84c";
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
				if (!state.archived) {
					if (if_block) {
						if_block.p(changed, state);
					} else {
						if_block = create_if_block(component, state);
						if_block.c();
						if_block.m(span_1, text);
					}
				} else if (if_block) {
					if_block.u();
					if_block.d();
					if_block = null;
				}

				if (!input_updating) input.value = state.todo.data.name;
				if (changed.todo && input_class_value !== (input_class_value = "todo-input done-" + state.todo.data.done + " svelte-1ges84c")) {
					input.className = input_class_value;
				}

				if (changed.createdDate) {
					text_3.data = state.createdDate;
				}

				if (changed.todo && label_class_value !== (label_class_value = "list-group-item list-group-item-" + (state.todo.data.done ? 'success' : 'warning') + " svelte-1ges84c")) {
					label.className = label_class_value;
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

	// (4:6) {#if !archived}
	function create_if_block(component, state) {
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
				addListener(input, "change", input_change_handler);
				addListener(input, "change", change_handler);
				setAttribute(input, "type", "checkbox");
				setStyle(input, "margin-right", "5px");
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

		if (!document.getElementById("svelte-1ges84c-style")) add_css();

		this._fragment = create_main_fragment(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}
	}

	assign(TodoEl.prototype, {
		destroy: destroy,
		get: get,
		fire: fire,
		on: on,
		set: set,
		_set: _set,
		_mount: _mount,
		_unmount: _unmount,
		_differs: _differs
	});
	assign(TodoEl.prototype, methods);

	TodoEl.prototype._recompute = function _recompute(changed, state) {
		if (changed.todo) {
			if (this._differs(state.createdDate, state.createdDate = createdDate(state))) changed.createdDate = true;
		}
	};

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

	function setAttribute(node, attribute, value) {
		node.setAttribute(attribute, value);
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
		component._handlers = blankObject();
		component._bind = options._bind;

		component.options = options;
		component.root = options.root || component;
		component.store = component.root.store || options.store;
	}

	function assign(tar, src) {
		for (var k in src) {
			tar[k] = src[k];
		}return tar;
	}

	function destroy(detach) {
		this.destroy = noop;
		this.fire('destroy');
		this.set = noop;

		if (detach !== false) this._fragment.u();
		this._fragment.d();
		this._fragment = null;
		this._state = {};
	}

	function get() {
		return this._state;
	}

	function fire(eventName, data) {
		var handlers = eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) return;

		for (var i = 0; i < handlers.length; i += 1) {
			var handler = handlers[i];

			if (!handler.__calling) {
				handler.__calling = true;
				handler.call(this, data);
				handler.__calling = false;
			}
		}
	}

	function on(eventName, handler) {
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
		if (this.root._lock) return;
		this.root._lock = true;
		callAll(this.root._beforecreate);
		callAll(this.root._oncreate);
		callAll(this.root._aftercreate);
		this.root._lock = false;
	}

	function _set(newState) {
		var oldState = this._state,
		    changed = {},
		    dirty = false;

		for (var key in newState) {
			if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = assign(assign({}, oldState), newState);
		this._recompute(changed, this._state);
		if (this._bind) this._bind(changed, this._state);

		if (this._fragment) {
			this.fire("state", { changed: changed, current: this._state, previous: oldState });
			this._fragment.p(changed, this._state);
			this.fire("update", { changed: changed, current: this._state, previous: oldState });
		}
	}

	function _mount(target, anchor) {
		this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
	}

	function _unmount() {
		if (this._fragment) this._fragment.u();
	}

	function _differs(a, b) {
		return a != a ? b == b : a !== b || a && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' || typeof a === 'function';
	}

	function blankObject() {
		return Object.create(null);
	}

	function noop() {}

	function callAll(fns) {
		while (fns && fns.length) {
			fns.shift()();
		}
	}
	exports.default = TodoEl;
});
