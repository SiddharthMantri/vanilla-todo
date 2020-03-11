function genId(length) {
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}
class Model {
  constructor() {
    this.tasks = [];
  }
  add({ task }) {
    const todo = {
      id: genId(8),
      task,
      completed: false,
      deleted: false
    };
    return [...this.tasks, todo];
  }
  completed({ id }) {
    let idx = this.tasks.findIndex(task => task.id === id);
    this.tasks[idx] = { ...this.tasks[idx], completed: true };
    return [...this.tasks];
  }
  delete({ id }) {
    let idx = this.tasks.findIndex(task => task.id === id);
    if (idx > -1) {
      this.tasks.splice(idx, 1);
    }
    return [...this.tasks];
  }
}
class View {
  constructor() {
    this.comp = this.getElement("#root");
    this.wrapper = this.createElement("div", "task-input-wrapper");
    this.input = this.createElement("input");
    this.input.type = "text";
    this.input.name = "todo";
    this.formBtn = this.createElement("button");
    this.formBtn.innerText = "Add Task";
    this.wrapper.append(this.input, this.formBtn);
    this.list = this.createElement("ul", "todo-list");

    this.comp.append(this.wrapper, this.list);
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
      this.list.removeChild(this.todoList.firstChild);
      tasks.forEach(task => {
        const li = this.createElement("li", "task-item");
        li.id = task.id;
        const text = this.createElement("span");
        text.innerText = task.task;
        li.appendChild(text);
        this.list.appendChild(li);
      });
    }
  }
}

class TodoMvc {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
}

const App = new TodoMvc(new Model(), new View());
