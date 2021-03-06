<div>
  {#if disconnected}
    <div class="alert alert-danger">
      You are disconnected. Check to make sure you're online.
    </div>
  {/if}
  <div class="row">
    <div class="col-sm-8">
      <div class="list-group" style="clear: both;">
        {#if !todos.length}
          <div class="well">You have no todos yet.</div>
        {/if}
        {#each todos as todo}
          <TodoEl bind:todo archived={uiShowArchived} />
        {/each}
      </div>
    </div>
    <div class="col-sm-4" style="text-align: center; margin-bottom: 1em;">
      <small class="alert alert-info" style="display: block;">
        {#if uiShowArchived}
          <span>{todos.length} archived todos</span>
        {:else}
          <span>
            {#if todos.length == 0}
              <span>0 todos</span>
            {:else}
              <span>{remaining} of {todos.length} remaining</span>
            {/if}
          </span>
        {/if}
        {#if todos.length > 0}
          <span>
            [
            {#if uiShowArchived}
              <a href="javascript:void(0)" on:click={deleteTodos}>delete</a>
            {:else}
              <a href="javascript:void(0)" on:click={archive}>archive done</a>
            {/if}
            ]
          </span>
        {/if}
        <br />
        {#if uiShowArchived}
          <a href="javascript:void(0)" on:click={() => getTodos(false)}>
            show current
          </a>
        {:else}
          <a href="javascript:void(0)" on:click={() => getTodos(true)}>
            show archived
          </a>
        {/if}
      </small>
      {#if todos.length > 1}
        <div style="text-align: left;">
          Sort:
          <br />
          <label style="font-weight: normal;">
            <input
              type="radio"
              bind:group={uiSort}
              on:change={sortTodos}
              name="sort"
              value="name"
            />
            Alpha
          </label>
          {@html '&nbsp;'}
          <label style="font-weight: normal;">
            <input
              type="radio"
              bind:group={uiSort}
              on:change={sortTodos}
              name="sort"
              value="cdate"
            />
            Created
          </label>
        </div>
      {/if}
    </div>
  </div>
  {#if !uiShowArchived}
    <form
      class="todo-form"
      style="margin-bottom: 20px;"
      on:submit|preventDefault={addTodo}
    >
      <input
        class="form-control"
        type="text"
        bind:value={todoText}
        placeholder="add new todo here"
      />
      <input
        class="btn btn-default"
        type="submit"
        value="add #{todos.length + 1}"
      />
    </form>
  {/if}
  <div class="user-count label label-default">Active Users: {userCount}</div>
</div>

<script>
  import { onMount, onDestroy } from 'svelte';
  import TodoEl from './TodoEl';
  import { Nymph, PubSub } from 'nymph-client';
  import Todo from '../../Todo.src';

  let todos = [];
  let uiSort = 'name';
  let uiShowArchived = false;
  let userCount = null;
  let todoText = '';
  let disconnected = false;
  let subscription;

  $: remaining = todos.filter(todo => !todo.done).length;

  onMount(() => {
    getTodos(uiShowArchived);

    PubSub.on('connect', onPubSubConnect);
    PubSub.on('disconnect', onPubSubDisconnect);
  });

  onDestroy(() => {
    PubSub.off('connect', onPubSubConnect);
    PubSub.off('disconnect', onPubSubDisconnect);
  });

  function onPubSubConnect() {
    if (disconnected) {
      getTodos(uiShowArchived);
      todos.map(todo => todo.$refresh().then(() => (todos = todos)));
    }
    disconnected = false;
  }

  function onPubSubDisconnect() {
    disconnected = true;
  }

  function getTodos(archived) {
    if (subscription) {
      subscription.unsubscribe();
    }
    subscription = Nymph.getEntities(
      {
        class: 'Todo',
      },
      {
        type: archived ? '&' : '!&',
        tag: 'archived',
      },
    ).subscribe(
      newTodos => {
        uiShowArchived = archived;
        if (newTodos !== undefined) {
          PubSub.updateArray(todos, newTodos);
          Nymph.sort(todos, uiSort);
          todos = todos;
        }
      },
      null,
      count => {
        userCount = count;
      },
    );
  }

  function addTodo() {
    if (todoText === undefined || todoText === '') {
      return;
    }
    const todo = new Todo();
    todo.name = todoText;
    todo.$save().then(
      () => {
        todoText = '';
      },
      errObj => {
        alert('Error: ' + errObj.textStatus);
      },
    );
  }

  function sortTodos() {
    todos = Nymph.sort(todos, uiSort);
  }

  function save(todo) {
    todo.$save().then(null, errObj => {
      alert('Error: ' + errObj.textStatus);
    });
  }

  function archive() {
    const oldTodos = todos;
    for (let i = 0; i < oldTodos.length; i++) {
      const todo = oldTodos[i];
      if (todo.done) {
        todo.$archive().then(
          success => {
            if (!success) {
              alert("Couldn't save changes to " + todo.name);
            }
          },
          errObj => {
            alert(
              'Error: ' + errObj.textStatus + "\nCouldn't archive " + todo.name,
            );
          },
        );
      }
    }
  }

  function deleteTodos() {
    Nymph.deleteEntities(todos);
  }
</script>

<style>
  .todo-form {
    display: flex;
  }
  .todo-form .form-control {
    flex-grow: 1;
    margin-right: 5px;
  }
  .user-count {
    position: fixed;
    right: 5px;
    bottom: 5px;
  }
</style>
