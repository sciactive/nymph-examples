(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', './TodoEl.html', 'Nymph', 'Todo'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('./TodoEl.html'), require('Nymph'), require('Todo'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.TodoEl, global.Nymph, global.Todo);
		global.TodoApp = mod.exports;
	}
})(this, function (exports, _TodoEl, _Nymph, _Todo) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _TodoEl2 = _interopRequireDefault(_TodoEl);

	var _Nymph2 = _interopRequireDefault(_Nymph);

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

	function remaining(todos) {
		var count = 0;
		for (var i = 0; i < todos.length; i++) {
			count += todos[i].get('done') ? 0 : 1;
		}
		return count;
	}

	function data() {
		return {
			todos: [],
			uiSort: 'name',
			uiShowArchived: false,
			userCount: null,
			todoText: ''
		};
	};

	var methods = {
		getTodos: function getTodos(archived) {
			var _this = this;

			if (this.get('__subscription')) {
				this.get('__subscription').unsubscribe();
			}
			var subscription = _Nymph2.default.getEntities({ "class": 'Todo' }, { "type": archived ? '&' : '!&', "tag": 'archived' }).subscribe(function (newTodos) {
				_this.set({ uiShowArchived: archived });
				if (newTodos !== undefined) {
					var todos = _this.get('todos');
					_Nymph2.default.updateArray(todos, newTodos);
					_Nymph2.default.sort(todos, _this.get('uiSort'));
					_this.set({ todos: todos });
				}
			}, null, function (count) {
				_this.set({ userCount: count });
			});
			this.set({ __subscription: subscription });
		},
		addTodo: function addTodo() {
			var _this2 = this;

			var todoText = this.get('todoText');
			if (todoText === undefined || todoText === '') {
				return;
			}
			var todo = new _Todo2.default();
			todo.set('name', todoText);
			todo.save().then(function () {
				_this2.set({ todoText: '' });
			}, function (errObj) {
				alert("Error: " + errObj.textStatus);
			});
		},
		sortTodos: function sortTodos() {
			this.set({ todos: _Nymph2.default.sort(this.get('todos'), this.get('uiSort')) });
		},
		save: function save(todo) {
			todo.save().then(null, function (errObj) {
				alert('Error: ' + errObj.textStatus);
			});
		},
		archive: function archive() {
			var oldTodos = this.get('todos');
			for (var i = 0; i < oldTodos.length; i++) {
				var todo = oldTodos[i];
				if (todo.get('done')) {
					todo.archive().then(function (success) {
						if (!success) {
							alert("Couldn't save changes to " + todo.get('name'));
						}
					}, function (errObj) {
						alert("Error: " + errObj.textStatus + "\nCouldn't archive " + todo.get('name'));
					});
				}
			}
		},
		deleteTodos: function deleteTodos() {
			_Nymph2.default.deleteEntities(this.get('todos'));
		}
	};

	function oncreate() {
		this.getTodos(this.get('uiShowArchived'));
	};

	function encapsulateStyles(node) {
		setAttribute(node, "svelte-568332582", "");
	}

	function add_css() {
		var style = createElement("style");
		style.id = 'svelte-568332582-style';
		style.textContent = "[svelte-568332582].todo-form,[svelte-568332582] .todo-form{display:flex}[svelte-568332582].todo-form .form-control,[svelte-568332582] .todo-form .form-control{flex-grow:1;margin-right:5px}[svelte-568332582].user-count,[svelte-568332582] .user-count{position:fixed;right:5px;bottom:5px}";
		appendNode(style, document.head);
	}

	function create_main_fragment(state, component) {
		var div, div_1, div_2, div_3, text, text_3, div_4, small, text_4, text_5, br, text_6, text_8, text_11, text_12, div_5, text_13, text_14;

		var if_block = !state.todos.length && create_if_block(state, component);

		var todos = state.todos;

		var each_blocks = [];

		for (var i = 0; i < todos.length; i += 1) {
			each_blocks[i] = create_each_block(state, todos, todos[i], i, component);
		}

		var current_block_type = select_block_type_1(state);
		var if_block_1 = current_block_type(state, component);

		var if_block_2 = state.todos.length > 0 && create_if_block_5(state, component);

		var current_block_type_1 = select_block_type_3(state);
		var if_block_3 = current_block_type_1(state, component);

		var if_block_4 = state.todos.length > 1 && create_if_block_10(state, component);

		var if_block_5 = !state.uiShowArchived && create_if_block_11(state, component);

		return {
			c: function create() {
				div = createElement("div");
				div_1 = createElement("div");
				div_2 = createElement("div");
				div_3 = createElement("div");
				if (if_block) if_block.c();
				text = createText("\n        ");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				text_3 = createText("\n    ");
				div_4 = createElement("div");
				small = createElement("small");
				if_block_1.c();
				text_4 = createText("\n        ");
				if (if_block_2) if_block_2.c();
				text_5 = createText("\n        ");
				br = createElement("br");
				text_6 = createText("\n        ");
				if_block_3.c();
				text_8 = createText("\n      ");
				if (if_block_4) if_block_4.c();
				text_11 = createText("\n  ");
				if (if_block_5) if_block_5.c();
				text_12 = createText("\n  ");
				div_5 = createElement("div");
				text_13 = createText("Active Users: ");
				text_14 = createText(state.userCount);
				this.h();
			},

			h: function hydrate() {
				encapsulateStyles(div);
				div_1.className = "row";
				div_2.className = "col-sm-8";
				div_3.className = "list-group";
				setStyle(div_3, "clear", "both");
				div_4.className = "col-sm-4";
				setStyle(div_4, "text-align", "center");
				setStyle(div_4, "margin-bottom", "1em");
				small.className = "alert alert-info";
				setStyle(small, "display", "block");
				div_5.className = "user-count label label-default";
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				appendNode(div_1, div);
				appendNode(div_2, div_1);
				appendNode(div_3, div_2);
				if (if_block) if_block.m(div_3, null);
				appendNode(text, div_3);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(div_3, null);
				}

				appendNode(text_3, div_1);
				appendNode(div_4, div_1);
				appendNode(small, div_4);
				if_block_1.m(small, null);
				appendNode(text_4, small);
				if (if_block_2) if_block_2.m(small, null);
				appendNode(text_5, small);
				appendNode(br, small);
				appendNode(text_6, small);
				if_block_3.m(small, null);
				appendNode(text_8, div_4);
				if (if_block_4) if_block_4.m(div_4, null);
				appendNode(text_11, div);
				if (if_block_5) if_block_5.m(div, null);
				appendNode(text_12, div);
				appendNode(div_5, div);
				appendNode(text_13, div_5);
				appendNode(text_14, div_5);
			},

			p: function update(changed, state) {
				if (!state.todos.length) {
					if (!if_block) {
						if_block = create_if_block(state, component);
						if_block.c();
						if_block.m(div_3, text);
					}
				} else if (if_block) {
					if_block.u();
					if_block.d();
					if_block = null;
				}

				var todos = state.todos;

				if (changed.todos || changed.uiShowArchived) {
					for (var i = 0; i < todos.length; i += 1) {
						if (each_blocks[i]) {
							each_blocks[i].p(changed, state, todos, todos[i], i);
						} else {
							each_blocks[i] = create_each_block(state, todos, todos[i], i, component);
							each_blocks[i].c();
							each_blocks[i].m(div_3, null);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].u();
						each_blocks[i].d();
					}
					each_blocks.length = todos.length;
				}

				if (current_block_type === (current_block_type = select_block_type_1(state)) && if_block_1) {
					if_block_1.p(changed, state);
				} else {
					if_block_1.u();
					if_block_1.d();
					if_block_1 = current_block_type(state, component);
					if_block_1.c();
					if_block_1.m(small, text_4);
				}

				if (state.todos.length > 0) {
					if (if_block_2) {
						if_block_2.p(changed, state);
					} else {
						if_block_2 = create_if_block_5(state, component);
						if_block_2.c();
						if_block_2.m(small, text_5);
					}
				} else if (if_block_2) {
					if_block_2.u();
					if_block_2.d();
					if_block_2 = null;
				}

				if (current_block_type_1 !== (current_block_type_1 = select_block_type_3(state))) {
					if_block_3.u();
					if_block_3.d();
					if_block_3 = current_block_type_1(state, component);
					if_block_3.c();
					if_block_3.m(small, null);
				}

				if (state.todos.length > 1) {
					if (if_block_4) {
						if_block_4.p(changed, state);
					} else {
						if_block_4 = create_if_block_10(state, component);
						if_block_4.c();
						if_block_4.m(div_4, null);
					}
				} else if (if_block_4) {
					if_block_4.u();
					if_block_4.d();
					if_block_4 = null;
				}

				if (!state.uiShowArchived) {
					if (if_block_5) {
						if_block_5.p(changed, state);
					} else {
						if_block_5 = create_if_block_11(state, component);
						if_block_5.c();
						if_block_5.m(div, text_12);
					}
				} else if (if_block_5) {
					if_block_5.u();
					if_block_5.d();
					if_block_5 = null;
				}

				if (changed.userCount) {
					text_14.data = state.userCount;
				}
			},

			u: function unmount() {
				detachNode(div);
				if (if_block) if_block.u();

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
				}

				if_block_1.u();
				if (if_block_2) if_block_2.u();
				if_block_3.u();
				if (if_block_4) if_block_4.u();
				if (if_block_5) if_block_5.u();
			},

			d: function destroy() {
				if (if_block) if_block.d();

				destroyEach(each_blocks);

				if_block_1.d();
				if (if_block_2) if_block_2.d();
				if_block_3.d();
				if (if_block_4) if_block_4.d();
				if (if_block_5) if_block_5.d();
			}
		};
	}

	// (5:8) {{#if !todos.length}}
	function create_if_block(state, component) {
		var div;

		return {
			c: function create() {
				div = createElement("div");
				div.textContent = "You have no todos yet.";
				this.h();
			},

			h: function hydrate() {
				div.className = "well";
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
			},

			u: function unmount() {
				detachNode(div);
			},

			d: noop
		};
	}

	// (8:8) {{#each todos as todo}}
	function create_each_block(state, todos, todo, todo_index, component) {
		var todoel_updating = {};

		var todoel_initial_data = { archived: state.uiShowArchived };
		if (todo_index in todos) {
			todoel_initial_data.todo = todo;
			todoel_updating.todo = true;
		}
		var todoel = new _TodoEl2.default({
			_root: component._root,
			data: todoel_initial_data,
			_bind: function _bind(changed, childState) {
				var state = component.get(),
				    newState = {};
				if (!todoel_updating.todo && changed.todo) {
					var list = todoel_context.todos;
					var index = todoel_context.todo_index;
					list[index] = childState.todo;

					newState.todos = state.todos;
				}
				todoel_updating = assign({}, changed);
				component._set(newState);
				todoel_updating = {};
			}
		});

		component._root._beforecreate.push(function () {
			var state = component.get(),
			    childState = todoel.get(),
			    newState = {};
			if (!childState) return;
			if (!todoel_updating.todo) {
				var list = todoel_context.todos;
				var index = todoel_context.todo_index;
				list[index] = childState.todo;

				newState.todos = state.todos;
			}
			todoel_updating = { todo: true };
			component._set(newState);
			todoel_updating = {};
		});

		var todoel_context = {
			todos: todos,
			todo_index: todo_index
		};

		return {
			c: function create() {
				todoel._fragment.c();
			},

			m: function mount(target, anchor) {
				todoel._mount(target, anchor);
			},

			p: function update(changed, state, todos, todo, todo_index) {
				var todoel_changes = {};
				if (changed.uiShowArchived) todoel_changes.archived = state.uiShowArchived;
				if (!todoel_updating.todo && changed.todos) {
					todoel_changes.todo = todo;
					todoel_updating.todo = true;
				}
				todoel._set(todoel_changes);
				todoel_updating = {};

				todoel_context.todos = todos;
				todoel_context.todo_index = todo_index;
			},

			u: function unmount() {
				todoel._unmount();
			},

			d: function destroy() {
				todoel.destroy(false);
			}
		};
	}

	// (19:12) {{#if todos.length == 0}}
	function create_if_block_3(state, component) {
		var span;

		return {
			c: function create() {
				span = createElement("span");
				span.textContent = "0 todos";
			},

			m: function mount(target, anchor) {
				insertNode(span, target, anchor);
			},

			p: noop,

			u: function unmount() {
				detachNode(span);
			},

			d: noop
		};
	}

	// (21:12) {{else}}
	function create_if_block_4(state, component) {
		var span,
		    text,
		    text_1,
		    text_2_value = state.todos.length,
		    text_2,
		    text_3;

		return {
			c: function create() {
				span = createElement("span");
				text = createText(state.remaining);
				text_1 = createText(" of ");
				text_2 = createText(text_2_value);
				text_3 = createText(" remaining");
			},

			m: function mount(target, anchor) {
				insertNode(span, target, anchor);
				appendNode(text, span);
				appendNode(text_1, span);
				appendNode(text_2, span);
				appendNode(text_3, span);
			},

			p: function update(changed, state) {
				if (changed.remaining) {
					text.data = state.remaining;
				}

				if (changed.todos && text_2_value !== (text_2_value = state.todos.length)) {
					text_2.data = text_2_value;
				}
			},

			u: function unmount() {
				detachNode(span);
			},

			d: noop
		};
	}

	// (15:8) {{#if uiShowArchived}}
	function create_if_block_1(state, component) {
		var span,
		    text_value = state.todos.length,
		    text,
		    text_1;

		return {
			c: function create() {
				span = createElement("span");
				text = createText(text_value);
				text_1 = createText(" archived todos");
			},

			m: function mount(target, anchor) {
				insertNode(span, target, anchor);
				appendNode(text, span);
				appendNode(text_1, span);
			},

			p: function update(changed, state) {
				if (changed.todos && text_value !== (text_value = state.todos.length)) {
					text.data = text_value;
				}
			},

			u: function unmount() {
				detachNode(span);
			},

			d: noop
		};
	}

	// (17:8) {{else}}
	function create_if_block_2(state, component) {
		var span;

		var current_block_type = select_block_type(state);
		var if_block = current_block_type(state, component);

		return {
			c: function create() {
				span = createElement("span");
				if_block.c();
			},

			m: function mount(target, anchor) {
				insertNode(span, target, anchor);
				if_block.m(span, null);
			},

			p: function update(changed, state) {
				if (current_block_type === (current_block_type = select_block_type(state)) && if_block) {
					if_block.p(changed, state);
				} else {
					if_block.u();
					if_block.d();
					if_block = current_block_type(state, component);
					if_block.c();
					if_block.m(span, null);
				}
			},

			u: function unmount() {
				detachNode(span);
				if_block.u();
			},

			d: function destroy() {
				if_block.d();
			}
		};
	}

	// (29:12) {{#if uiShowArchived}}
	function create_if_block_6(state, component) {
		var a;

		function click_handler(event) {
			component.deleteTodos();
		}

		return {
			c: function create() {
				a = createElement("a");
				a.textContent = "delete";
				this.h();
			},

			h: function hydrate() {
				a.href = "javascript:void(0)";
				addListener(a, "click", click_handler);
			},

			m: function mount(target, anchor) {
				insertNode(a, target, anchor);
			},

			u: function unmount() {
				detachNode(a);
			},

			d: function destroy() {
				removeListener(a, "click", click_handler);
			}
		};
	}

	// (31:12) {{else}}
	function create_if_block_7(state, component) {
		var a;

		function click_handler(event) {
			component.archive();
		}

		return {
			c: function create() {
				a = createElement("a");
				a.textContent = "archive done";
				this.h();
			},

			h: function hydrate() {
				a.href = "javascript:void(0)";
				addListener(a, "click", click_handler);
			},

			m: function mount(target, anchor) {
				insertNode(a, target, anchor);
			},

			u: function unmount() {
				detachNode(a);
			},

			d: function destroy() {
				removeListener(a, "click", click_handler);
			}
		};
	}

	// (26:8) {{#if todos.length > 0}}
	function create_if_block_5(state, component) {
		var span, text, text_1;

		var current_block_type = select_block_type_2(state);
		var if_block = current_block_type(state, component);

		return {
			c: function create() {
				span = createElement("span");
				text = createText("[\n            ");
				if_block.c();
				text_1 = createText("\n            ]");
			},

			m: function mount(target, anchor) {
				insertNode(span, target, anchor);
				appendNode(text, span);
				if_block.m(span, null);
				appendNode(text_1, span);
			},

			p: function update(changed, state) {
				if (current_block_type !== (current_block_type = select_block_type_2(state))) {
					if_block.u();
					if_block.d();
					if_block = current_block_type(state, component);
					if_block.c();
					if_block.m(span, text_1);
				}
			},

			u: function unmount() {
				detachNode(span);
				if_block.u();
			},

			d: function destroy() {
				if_block.d();
			}
		};
	}

	// (38:8) {{#if uiShowArchived}}
	function create_if_block_8(state, component) {
		var a;

		function click_handler(event) {
			component.getTodos(false);
		}

		return {
			c: function create() {
				a = createElement("a");
				a.textContent = "show current";
				this.h();
			},

			h: function hydrate() {
				a.href = "javascript:void(0)";
				addListener(a, "click", click_handler);
			},

			m: function mount(target, anchor) {
				insertNode(a, target, anchor);
			},

			u: function unmount() {
				detachNode(a);
			},

			d: function destroy() {
				removeListener(a, "click", click_handler);
			}
		};
	}

	// (40:8) {{else}}
	function create_if_block_9(state, component) {
		var a;

		function click_handler(event) {
			component.getTodos(true);
		}

		return {
			c: function create() {
				a = createElement("a");
				a.textContent = "show archived";
				this.h();
			},

			h: function hydrate() {
				a.href = "javascript:void(0)";
				addListener(a, "click", click_handler);
			},

			m: function mount(target, anchor) {
				insertNode(a, target, anchor);
			},

			u: function unmount() {
				detachNode(a);
			},

			d: function destroy() {
				removeListener(a, "click", click_handler);
			}
		};
	}

	// (44:6) {{#if todos.length > 1}}
	function create_if_block_10(state, component) {
		var div, text, br, text_1, label, input, text_2, text_3, label_1, input_1, text_4;

		function input_change_handler() {
			if (!input.checked) return;
			component.set({ uiSort: input.__value });
		}

		function change_handler(event) {
			component.sortTodos();
		}

		function input_1_change_handler() {
			if (!input_1.checked) return;
			component.set({ uiSort: input_1.__value });
		}

		function change_handler_1(event) {
			component.sortTodos();
		}

		return {
			c: function create() {
				div = createElement("div");
				text = createText("Sort: ");
				br = createElement("br");
				text_1 = createText("\n          ");
				label = createElement("label");
				input = createElement("input");
				text_2 = createText(" Alpha");
				text_3 = createText("\n             \n          ");
				label_1 = createElement("label");
				input_1 = createElement("input");
				text_4 = createText(" Created");
				this.h();
			},

			h: function hydrate() {
				setStyle(div, "text-align", "left");
				setStyle(label, "font-weight", "normal");
				input.type = "radio";
				input.name = "sort";
				input.__value = "name";
				input.value = input.__value;
				component._bindingGroups[0].push(input);
				addListener(input, "change", input_change_handler);
				addListener(input, "change", change_handler);
				setStyle(label_1, "font-weight", "normal");
				input_1.type = "radio";
				input_1.name = "sort";
				input_1.__value = "cdate";
				input_1.value = input_1.__value;
				component._bindingGroups[0].push(input_1);
				addListener(input_1, "change", input_1_change_handler);
				addListener(input_1, "change", change_handler_1);
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				appendNode(text, div);
				appendNode(br, div);
				appendNode(text_1, div);
				appendNode(label, div);
				appendNode(input, label);

				input.checked = input.__value === state.uiSort;

				appendNode(text_2, label);
				appendNode(text_3, div);
				appendNode(label_1, div);
				appendNode(input_1, label_1);

				input_1.checked = input_1.__value === state.uiSort;

				appendNode(text_4, label_1);
			},

			p: function update(changed, state) {
				input.checked = input.__value === state.uiSort;

				input_1.checked = input_1.__value === state.uiSort;
			},

			u: function unmount() {
				detachNode(div);
			},

			d: function destroy() {
				component._bindingGroups[0].splice(component._bindingGroups[0].indexOf(input), 1);

				removeListener(input, "change", input_change_handler);
				removeListener(input, "change", change_handler);

				component._bindingGroups[0].splice(component._bindingGroups[0].indexOf(input_1), 1);

				removeListener(input_1, "change", input_1_change_handler);
				removeListener(input_1, "change", change_handler_1);
			}
		};
	}

	// (56:2) {{#if !uiShowArchived}}
	function create_if_block_11(state, component) {
		var form,
		    input,
		    input_updating = false,
		    text,
		    input_1,
		    input_1_value_value;

		function submit_handler(event) {
			component.addTodo(event.preventDefault());
		}

		function input_input_handler() {
			input_updating = true;
			component.set({ todoText: input.value });
			input_updating = false;
		}

		return {
			c: function create() {
				form = createElement("form");
				input = createElement("input");
				text = createText("\n      ");
				input_1 = createElement("input");
				this.h();
			},

			h: function hydrate() {
				form.className = "todo-form";
				setStyle(form, "margin-bottom", "20px");
				addListener(form, "submit", submit_handler);
				input.className = "form-control";
				input.type = "text";
				input.placeholder = "add new todo here";
				addListener(input, "input", input_input_handler);
				input_1.className = "btn btn-default";
				input_1.type = "submit";
				input_1.value = input_1_value_value = "add #" + (state.todos.length + 1);
			},

			m: function mount(target, anchor) {
				insertNode(form, target, anchor);
				appendNode(input, form);

				input.value = state.todoText;

				appendNode(text, form);
				appendNode(input_1, form);
			},

			p: function update(changed, state) {
				if (!input_updating) {
					input.value = state.todoText;
				}

				if (changed.todos && input_1_value_value !== (input_1_value_value = "add #" + (state.todos.length + 1))) {
					input_1.value = input_1_value_value;
				}
			},

			u: function unmount() {
				detachNode(form);
			},

			d: function destroy() {
				removeListener(form, "submit", submit_handler);
				removeListener(input, "input", input_input_handler);
			}
		};
	}

	function select_block_type(state) {
		if (state.todos.length == 0) return create_if_block_3;
		return create_if_block_4;
	}

	function select_block_type_1(state) {
		if (state.uiShowArchived) return create_if_block_1;
		return create_if_block_2;
	}

	function select_block_type_2(state) {
		if (state.uiShowArchived) return create_if_block_6;
		return create_if_block_7;
	}

	function select_block_type_3(state) {
		if (state.uiShowArchived) return create_if_block_8;
		return create_if_block_9;
	}

	function TodoApp(options) {
		init(this, options);
		this._state = assign(data(), options.data);
		this._recompute({ todos: 1 }, this._state);
		this._bindingGroups = [[]];

		if (!document.getElementById("svelte-568332582-style")) add_css();

		var _oncreate = oncreate.bind(this);

		if (!options._root) {
			this._oncreate = [_oncreate];
			this._beforecreate = [];
			this._aftercreate = [];
		} else {
			this._root._oncreate.push(_oncreate);
		}

		this._fragment = create_main_fragment(this._state, this);

		if (options.target) {
			this._fragment.c();
			this._fragment.m(options.target, options.anchor || null);

			this._lock = true;
			callAll(this._beforecreate);
			callAll(this._oncreate);
			callAll(this._aftercreate);
			this._lock = false;
		}
	}

	assign(TodoApp.prototype, methods, {
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

	TodoApp.prototype._recompute = function _recompute(changed, state) {
		if (changed.todos) {
			if (differs(state.remaining, state.remaining = remaining(state.todos))) changed.remaining = true;
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

	function setStyle(node, key, value) {
		node.style.setProperty(key, value);
	}

	function insertNode(node, target, anchor) {
		target.insertBefore(node, anchor);
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function destroyEach(iterations) {
		for (var i = 0; i < iterations.length; i += 1) {
			if (iterations[i]) iterations[i].d();
		}
	}

	function noop() {}

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

	function addListener(node, event, handler) {
		node.addEventListener(event, handler, false);
	}

	function removeListener(node, event, handler) {
		node.removeEventListener(event, handler, false);
	}

	function init(component, options) {
		component.options = options;

		component._observers = { pre: blankObject(), post: blankObject() };
		component._handlers = blankObject();
		component._root = options._root || component;
		component._bind = options._bind;
	}

	function callAll(fns) {
		while (fns && fns.length) {
			fns.pop()();
		}
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
	exports.default = TodoApp;
});
