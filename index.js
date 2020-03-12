const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const CH_LEN = 62;
const genId = length => {
  let result = [];
  for (let i = 0; i < length; i++) {
    result.push(CHARS.charAt(Math.floor(Math.random() * CH_LEN)));
  }
  return result.join``;
};
class Model {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  }
  bindListChange(cb) {
    this.onListChange = cb;
  }
  _update(tasks) {
    this.onListChange(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  add({ task }) {
    const todo = {
      id: genId(8),
      task,
      completed: false,
      deleted: false
    };
    this.tasks.push(todo);
    this._update(this.tasks);
  }
  completed({ id }) {
    let idx = this.tasks.findIndex(task => task.id === id);
    this.tasks[idx] = { ...this.tasks[idx], completed: true };
    this._update(this.tasks);
  }
  delete({ id }) {
    let idx = this.tasks.findIndex(task => task.id === id);
    if (idx > -1) {
      this.tasks.splice(idx, 1);
    }
    this._update(this.tasks);
  }
}
class View {
  constructor() {
    this.comp = this.getElement("#root");
    this.comp.classList.add("comp-wrapper");
    this.title = this.createElement("h3", "title-text");
    this.title.innerText = "Reminders";
    this.form = this.createElement("form", "task-input-wrapper");
    this.input = this.createElement("input");
    this.input.type = "text";
    this.input.name = "todo";
    this.formBtn = this.createElement("button");
    this.formBtn.innerText = "Add";
    this.formBtn.type = "submit";
    this.form.append(this.input, this.formBtn);
    this.listWrapper = this.createElement("div", "task-list-wrapper");
    this.list = this.createElement("ul", "task-list");
    this.listWrapper.append(this.list);
    this.main = this.createElement("div", "main-card");
    this.main.append(this.title, this.form, this.listWrapper);
    this.comp.append(this.main);
  }
  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }
  getElement(selector) {
    return document.querySelector(selector);
  }
  displayList(tasks = []) {
    while (this.list.firstChild) {
      this.list.removeChild(this.list.firstChild);
    }
    tasks.forEach(task => {
      const li = this.createElement("li", "task-item");
      li.id = task.id;
      const text = this.createElement("span", "task-item-text");
      text.innerText = task.task;
      const actions = this.createElement("span", "task-item-actions");
      actions.innerText = "Completed";
      li.append(text, actions);
      this.list.appendChild(li);
    });
  }
  bindAddTodo(handler) {
    this.form.addEventListener("submit", e => {
      e.preventDefault();
      if (this.input.value !== "") {
        handler({ task: this.input.value });
        this.input.value = "";
      }
    });
  }
}

class TodoMvc {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindListChange(this.onListChange);
    this.view.bindAddTodo(this.handleAdd);

    this.onListChange(this.model.tasks);
  }
  onListChange = tasks => {
    this.view.displayList(tasks);
  };
  handleAdd = task => {
    this.model.add(task);
  };
}

new TodoMvc(new Model(), new View());
