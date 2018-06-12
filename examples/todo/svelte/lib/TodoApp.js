(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', './TodoEl.html', 'nymph-client', 'Todo'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('./TodoEl.html'), require('nymph-client'), require('Todo'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.TodoEl, global.NymphClient, global.Todo);
		global.TodoApp = mod.exports;
	}
})(this, function (exports, _TodoEl, _nymphClient, _Todo) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _TodoEl2 = _interopRequireDefault(_TodoEl);

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

	function remaining(_ref) {
		var todos = _ref.todos;

		var count = 0;
		for (var i = 0; i < todos.length; i++) {
			count += todos[i].get().done ? 0 : 1;
		}
		return count;
	}

	function data() {
		return {
			_disconnected: false,
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

			var _get = this.get(),
			    _subscription = _get._subscription;

			if (_subscription) {
				_subscription.unsubscribe();
			}
			_subscription = _nymphClient.Nymph.getEntities({ "class": 'Todo' }, { "type": archived ? '&' : '!&', "tag": 'archived' }).subscribe(function (newTodos) {
				_this.set({ uiShowArchived: archived });
				if (newTodos !== undefined) {
					var _get2 = _this.get(),
					    todos = _get2.todos;

					_nymphClient.PubSub.updateArray(todos, newTodos);
					_nymphClient.Nymph.sort(todos, _this.get().uiSort);
					_this.set({ todos: todos });
				}
			}, null, function (count) {
				_this.set({ userCount: count });
			});
			this.set({ _subscription: _subscription });
		},
		addTodo: function addTodo() {
			var _this2 = this;

			var _get3 = this.get(),
			    todoText = _get3.todoText;

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
			this.set({ todos: _nymphClient.Nymph.sort(this.get().todos, this.get().uiSort) });
		},
		save: function save(todo) {
			todo.save().then(null, function (errObj) {
				alert('Error: ' + errObj.textStatus);
			});
		},
		archive: function archive() {
			var oldTodos = this.get().todos;

			var _loop = function _loop(i) {
				var todo = oldTodos[i];
				if (todo.get().done) {
					todo.archive().then(function (success) {
						if (!success) {
							alert("Couldn't save changes to " + todo.get().name);
						}
					}, function (errObj) {
						alert("Error: " + errObj.textStatus + "\nCouldn't archive " + todo.get().name);
					});
				}
			};

			for (var i = 0; i < oldTodos.length; i++) {
				_loop(i);
			}
		},
		deleteTodos: function deleteTodos() {
			_nymphClient.Nymph.deleteEntities(this.get().todos);
		}
	};

	function oncreate() {
		var _this3 = this;

		this.getTodos(this.get().uiShowArchived);

		_nymphClient.PubSub.on('disconnect', function () {
			_this3.set({ _disconnected: true });
		});

		_nymphClient.PubSub.on('connect', function () {
			if (_this3.get()._disconnected) {
				_this3.getTodos(_this3.get().uiShowArchived);

				var _get4 = _this3.get(),
				    todos = _get4.todos;

				todos.map(function (todo) {
					return todo.refresh().then(function () {
						return _this3.set({ todos: todos });
					});
				});
			}
			_this3.set({ _disconnected: false });
		});
	};

	function add_css() {
		var style = createElement("style");
		style.id = 'svelte-1ly6lyd-style';
		style.textContent = ".todo-form.svelte-1ly6lyd{display:flex}.todo-form.svelte-1ly6lyd .form-control.svelte-1ly6lyd{flex-grow:1;margin-right:5px}.user-count.svelte-1ly6lyd{position:fixed;right:5px;bottom:5px}";
		appendNode(style, document.head);
	}

	function create_main_fragment(component, state) {
		var div, text, div_1, div_2, div_3, text_1, text_4, div_4, small, text_5, text_6, br, text_7, text_9, text_12, text_13, div_5, text_14, text_15;

		var if_block = state._disconnected && create_if_block(component, state);

		var if_block_1 = !state.todos.length && create_if_block_1(component, state);

		var each_value = state.todos;

		var each_blocks = [];

		for (var i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block(component, assign(assign({}, state), {
				each_value: each_value,
				todo: each_value[i],
				todo_index: i
			}));
		}

		function select_block_type_1(state) {
			if (state.uiShowArchived) return create_if_block_2;
			return create_if_block_3;
		}

		var current_block_type = select_block_type_1(state);
		var if_block_2 = current_block_type(component, state);

		var if_block_3 = state.todos.length > 0 && create_if_block_6(component, state);

		function select_block_type_3(state) {
			if (state.uiShowArchived) return create_if_block_9;
			return create_if_block_10;
		}

		var current_block_type_1 = select_block_type_3(state);
		var if_block_4 = current_block_type_1(component, state);

		var if_block_5 = state.todos.length > 1 && create_if_block_11(component, state);

		var if_block_6 = !state.uiShowArchived && create_if_block_12(component, state);

		return {
			c: function create() {
				div = createElement("div");
				if (if_block) if_block.c();
				text = createText("\n  ");
				div_1 = createElement("div");
				div_2 = createElement("div");
				div_3 = createElement("div");
				if (if_block_1) if_block_1.c();
				text_1 = createText("\n        ");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				text_4 = createText("\n    ");
				div_4 = createElement("div");
				small = createElement("small");
				if_block_2.c();
				text_5 = createText("\n        ");
				if (if_block_3) if_block_3.c();
				text_6 = createText("\n        ");
				br = createElement("br");
				text_7 = createText("\n        ");
				if_block_4.c();
				text_9 = createText("\n      ");
				if (if_block_5) if_block_5.c();
				text_12 = createText("\n  ");
				if (if_block_6) if_block_6.c();
				text_13 = createText("\n  ");
				div_5 = createElement("div");
				text_14 = createText("Active Users: ");
				text_15 = createText(state.userCount);
				this.h();
			},

			h: function hydrate() {
				div_3.className = "list-group";
				setStyle(div_3, "clear", "both");
				div_2.className = "col-sm-8";
				small.className = "alert alert-info";
				setStyle(small, "display", "block");
				div_4.className = "col-sm-4";
				setStyle(div_4, "text-align", "center");
				setStyle(div_4, "margin-bottom", "1em");
				div_1.className = "row";
				div_5.className = "user-count label label-default svelte-1ly6lyd";
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				if (if_block) if_block.m(div, null);
				appendNode(text, div);
				appendNode(div_1, div);
				appendNode(div_2, div_1);
				appendNode(div_3, div_2);
				if (if_block_1) if_block_1.m(div_3, null);
				appendNode(text_1, div_3);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(div_3, null);
				}

				appendNode(text_4, div_1);
				appendNode(div_4, div_1);
				appendNode(small, div_4);
				if_block_2.m(small, null);
				appendNode(text_5, small);
				if (if_block_3) if_block_3.m(small, null);
				appendNode(text_6, small);
				appendNode(br, small);
				appendNode(text_7, small);
				if_block_4.m(small, null);
				appendNode(text_9, div_4);
				if (if_block_5) if_block_5.m(div_4, null);
				appendNode(text_12, div);
				if (if_block_6) if_block_6.m(div, null);
				appendNode(text_13, div);
				appendNode(div_5, div);
				appendNode(text_14, div_5);
				appendNode(text_15, div_5);
			},

			p: function update(changed, state) {
				if (state._disconnected) {
					if (!if_block) {
						if_block = create_if_block(component, state);
						if_block.c();
						if_block.m(div, text);
					}
				} else if (if_block) {
					if_block.u();
					if_block.d();
					if_block = null;
				}

				if (!state.todos.length) {
					if (!if_block_1) {
						if_block_1 = create_if_block_1(component, state);
						if_block_1.c();
						if_block_1.m(div_3, text_1);
					}
				} else if (if_block_1) {
					if_block_1.u();
					if_block_1.d();
					if_block_1 = null;
				}

				var each_value = state.todos;

				if (changed.todos || changed.uiShowArchived) {
					for (var i = 0; i < each_value.length; i += 1) {
						var each_context = assign(assign({}, state), {
							each_value: each_value,
							todo: each_value[i],
							todo_index: i
						});

						if (each_blocks[i]) {
							each_blocks[i].p(changed, each_context);
						} else {
							each_blocks[i] = create_each_block(component, each_context);
							each_blocks[i].c();
							each_blocks[i].m(div_3, null);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].u();
						each_blocks[i].d();
					}
					each_blocks.length = each_value.length;
				}

				if (current_block_type === (current_block_type = select_block_type_1(state)) && if_block_2) {
					if_block_2.p(changed, state);
				} else {
					if_block_2.u();
					if_block_2.d();
					if_block_2 = current_block_type(component, state);
					if_block_2.c();
					if_block_2.m(small, text_5);
				}

				if (state.todos.length > 0) {
					if (if_block_3) {
						if_block_3.p(changed, state);
					} else {
						if_block_3 = create_if_block_6(component, state);
						if_block_3.c();
						if_block_3.m(small, text_6);
					}
				} else if (if_block_3) {
					if_block_3.u();
					if_block_3.d();
					if_block_3 = null;
				}

				if (current_block_type_1 !== (current_block_type_1 = select_block_type_3(state))) {
					if_block_4.u();
					if_block_4.d();
					if_block_4 = current_block_type_1(component, state);
					if_block_4.c();
					if_block_4.m(small, null);
				}

				if (state.todos.length > 1) {
					if (if_block_5) {
						if_block_5.p(changed, state);
					} else {
						if_block_5 = create_if_block_11(component, state);
						if_block_5.c();
						if_block_5.m(div_4, null);
					}
				} else if (if_block_5) {
					if_block_5.u();
					if_block_5.d();
					if_block_5 = null;
				}

				if (!state.uiShowArchived) {
					if (if_block_6) {
						if_block_6.p(changed, state);
					} else {
						if_block_6 = create_if_block_12(component, state);
						if_block_6.c();
						if_block_6.m(div, text_13);
					}
				} else if (if_block_6) {
					if_block_6.u();
					if_block_6.d();
					if_block_6 = null;
				}

				if (changed.userCount) {
					text_15.data = state.userCount;
				}
			},

			u: function unmount() {
				detachNode(div);
				if (if_block) if_block.u();
				if (if_block_1) if_block_1.u();

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
				}

				if_block_2.u();
				if (if_block_3) if_block_3.u();
				if_block_4.u();
				if (if_block_5) if_block_5.u();
				if (if_block_6) if_block_6.u();
			},

			d: function destroy() {
				if (if_block) if_block.d();
				if (if_block_1) if_block_1.d();

				destroyEach(each_blocks);

				if_block_2.d();
				if (if_block_3) if_block_3.d();
				if_block_4.d();
				if (if_block_5) if_block_5.d();
				if (if_block_6) if_block_6.d();
			}
		};
	}

	// (2:2) {#if _disconnected}
	function create_if_block(component, state) {
		var div;

		return {
			c: function create() {
				div = createElement("div");
				div.textContent = "You are disconnected. Check to make sure you're online.";
				this.h();
			},

			h: function hydrate() {
				div.className = "alert alert-danger";
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

	// (10:8) {#if !todos.length}
	function create_if_block_1(component, state) {
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

	// (13:8) {#each todos as todo}
	function create_each_block(component, state) {
		var todo = state.todo,
		    each_value = state.each_value,
		    todo_index = state.todo_index;
		var todoel_updating = {};

		var todoel_initial_data = { archived: state.uiShowArchived };
		if (todo_index in state.each_value) {
			todoel_initial_data.todo = todo;
			todoel_updating.todo = true;
		}
		var todoel = new _TodoEl2.default({
			root: component.root,
			data: todoel_initial_data,
			_bind: function _bind(changed, childState) {
				var state = component.get(),
				    newState = {};
				if (!todoel_updating.todo && changed.todo) {
					each_value[todo_index] = childState.todo;

					newState.todos = state.todos;
				}
				component._set(newState);
				todoel_updating = {};
			}
		});

		component.root._beforecreate.push(function () {
			todoel._bind({ todo: 1 }, todoel.get());
		});

		return {
			c: function create() {
				todoel._fragment.c();
			},

			m: function mount(target, anchor) {
				todoel._mount(target, anchor);
			},

			p: function update(changed, state) {
				todo = state.todo;
				each_value = state.each_value;
				todo_index = state.todo_index;
				var todoel_changes = {};
				if (changed.uiShowArchived) todoel_changes.archived = state.uiShowArchived;
				if (!todoel_updating.todo && changed.todos) {
					todoel_changes.todo = todo;
					todoel_updating.todo = true;
				}
				todoel._set(todoel_changes);
				todoel_updating = {};
			},

			u: function unmount() {
				todoel._unmount();
			},

			d: function destroy() {
				todoel.destroy(false);
			}
		};
	}

	// (24:12) {#if todos.length == 0}
	function create_if_block_4(component, state) {
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

	// (26:12) {:else}
	function create_if_block_5(component, state) {
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

	// (20:8) {#if uiShowArchived}
	function create_if_block_2(component, state) {
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

	// (22:8) {:else}
	function create_if_block_3(component, state) {
		var span;

		function select_block_type(state) {
			if (state.todos.length == 0) return create_if_block_4;
			return create_if_block_5;
		}

		var current_block_type = select_block_type(state);
		var if_block = current_block_type(component, state);

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
					if_block = current_block_type(component, state);
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

	// (34:12) {#if uiShowArchived}
	function create_if_block_7(component, state) {
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
				addListener(a, "click", click_handler);
				a.href = "javascript:void(0)";
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

	// (36:12) {:else}
	function create_if_block_8(component, state) {
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
				addListener(a, "click", click_handler);
				a.href = "javascript:void(0)";
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

	// (31:8) {#if todos.length > 0}
	function create_if_block_6(component, state) {
		var span, text, text_1;

		function select_block_type_2(state) {
			if (state.uiShowArchived) return create_if_block_7;
			return create_if_block_8;
		}

		var current_block_type = select_block_type_2(state);
		var if_block = current_block_type(component, state);

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
					if_block = current_block_type(component, state);
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

	// (43:8) {#if uiShowArchived}
	function create_if_block_9(component, state) {
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
				addListener(a, "click", click_handler);
				a.href = "javascript:void(0)";
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

	// (45:8) {:else}
	function create_if_block_10(component, state) {
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
				addListener(a, "click", click_handler);
				a.href = "javascript:void(0)";
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

	// (49:6) {#if todos.length > 1}
	function create_if_block_11(component, state) {
		var div, text, br, text_1, label, input, text_2, text_3, label_1, input_1, text_4;

		function input_change_handler() {
			component.set({ uiSort: input.__value });
		}

		function change_handler(event) {
			component.sortTodos();
		}

		function input_1_change_handler() {
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
				component._bindingGroups[0].push(input);
				addListener(input, "change", input_change_handler);
				addListener(input, "change", change_handler);
				setAttribute(input, "type", "radio");
				input.name = "sort";
				input.__value = "name";
				input.value = input.__value;
				setStyle(label, "font-weight", "normal");
				component._bindingGroups[0].push(input_1);
				addListener(input_1, "change", input_1_change_handler);
				addListener(input_1, "change", change_handler_1);
				setAttribute(input_1, "type", "radio");
				input_1.name = "sort";
				input_1.__value = "cdate";
				input_1.value = input_1.__value;
				setStyle(label_1, "font-weight", "normal");
				setStyle(div, "text-align", "left");
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

	// (61:2) {#if !uiShowArchived}
	function create_if_block_12(component, state) {
		var form,
		    input,
		    input_updating = false,
		    text,
		    input_1,
		    input_1_value_value;

		function input_input_handler() {
			input_updating = true;
			component.set({ todoText: input.value });
			input_updating = false;
		}

		function submit_handler(event) {
			component.addTodo(event.preventDefault());
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
				addListener(input, "input", input_input_handler);
				input.className = "form-control svelte-1ly6lyd";
				setAttribute(input, "type", "text");
				input.placeholder = "add new todo here";
				input_1.className = "btn btn-default";
				setAttribute(input_1, "type", "submit");
				input_1.value = input_1_value_value = "add #" + (state.todos.length + 1);
				addListener(form, "submit", submit_handler);
				form.className = "todo-form svelte-1ly6lyd";
				setStyle(form, "margin-bottom", "20px");
			},

			m: function mount(target, anchor) {
				insertNode(form, target, anchor);
				appendNode(input, form);

				input.value = state.todoText;

				appendNode(text, form);
				appendNode(input_1, form);
			},

			p: function update(changed, state) {
				if (!input_updating) input.value = state.todoText;
				if (changed.todos && input_1_value_value !== (input_1_value_value = "add #" + (state.todos.length + 1))) {
					input_1.value = input_1_value_value;
				}
			},

			u: function unmount() {
				detachNode(form);
			},

			d: function destroy() {
				removeListener(input, "input", input_input_handler);
				removeListener(form, "submit", submit_handler);
			}
		};
	}

	function TodoApp(options) {
		var _this4 = this;

		init(this, options);
		this._state = assign(data(), options.data);
		this._recompute({ todos: 1 }, this._state);
		this._bindingGroups = [[]];

		if (!document.getElementById("svelte-1ly6lyd-style")) add_css();

		if (!options.root) {
			this._oncreate = [];
			this._beforecreate = [];
			this._aftercreate = [];
		}

		this._fragment = create_main_fragment(this, this._state);

		this.root._oncreate.push(function () {
			oncreate.call(_this4);
			_this4.fire("update", { changed: assignTrue({}, _this4._state), current: _this4._state });
		});

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);

			this._lock = true;
			callAll(this._beforecreate);
			callAll(this._oncreate);
			callAll(this._aftercreate);
			this._lock = false;
		}
	}

	assign(TodoApp.prototype, {
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
	assign(TodoApp.prototype, methods);

	TodoApp.prototype._recompute = function _recompute(changed, state) {
		if (changed.todos) {
			if (this._differs(state.remaining, state.remaining = remaining(state))) changed.remaining = true;
		}
	};

	function createElement(name) {
		return document.createElement(name);
	}

	function appendNode(node, target) {
		target.appendChild(node);
	}

	function assign(tar, src) {
		for (var k in src) {
			tar[k] = src[k];
		}return tar;
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

	function addListener(node, event, handler) {
		node.addEventListener(event, handler, false);
	}

	function removeListener(node, event, handler) {
		node.removeEventListener(event, handler, false);
	}

	function setAttribute(node, attribute, value) {
		node.setAttribute(attribute, value);
	}

	function init(component, options) {
		component._handlers = blankObject();
		component._bind = options._bind;

		component.options = options;
		component.root = options.root || component;
		component.store = component.root.store || options.store;
	}

	function assignTrue(tar, src) {
		for (var k in src) {
			tar[k] = 1;
		}return tar;
	}

	function callAll(fns) {
		while (fns && fns.length) {
			fns.shift()();
		}
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
	exports.default = TodoApp;
});
