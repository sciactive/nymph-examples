<label
  class="list-group-item list-group-item-{todo.done ? 'success' : 'warning'}"
>
  <span class="todo-row">
    <span class="todo-controls todo-flex">
      {#if !archived}
        <input
          type="checkbox"
          bind:checked={todo.done}
          on:change={save}
          style="margin-right: 5px;"
        />
      {/if}
      <input
        type="text"
        class="todo-input done-{todo.done}"
        bind:value={todo.name}
        on:change={save}
      />
    </span>
    <span class="todo-date todo-flex">{createdDate}</span>
  </span>
</label>

<script>
  import Todo from '../../Todo.src';

  export let todo = new Todo();
  export let archived = false;

  $: createdDate = (() => {
    const date = new Date(todo.cdate * 1000);
    return `${date.getFullYear()}-${
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1
    }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()} ${
      date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    }:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
  })();

  function save() {
    todo.$patch().then(
      todo => {
        todo = todo;
      },
      errObj => {
        alert('Error: ' + errObj.textStatus);
      },
    );
  }
</script>

<style>
  label.list-group-item {
    font-weight: normal;
    cursor: pointer;
  }
  label.list-group-item > .todo-row {
    display: flex;
    justify-content: space-between;
  }
  .todo-flex {
    display: flex;
  }
  .todo-controls {
    flex-grow: 1;
  }
  .todo-input {
    display: inline;
    background-color: transparent;
    border: 0;
    flex-grow: 1;
  }
  .todo-input.done-true {
    text-decoration: line-through;
    color: grey;
  }
  .todo-date {
    margin-left: 5px;
    flex-shrink: 1;
  }
</style>
