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

class TodoMvc {
  constructor() {
    this.tasks = [];
    this.add = this.add.bind(this);
    this.complete = this.complete.bind(this);
    this.delete = this.delete.bind(this);
    this.addBtnFnc = this.addBtnFnc.bind(this);
    this.init();
  }
  add({ task = "" }) {
    let tsk = {
      id: genId(8),
      task,
      completed: false,
      deleted: false
    };
    this.tasks.push(tsk);
  }
  complete(id) {
    let newTasks = this.tasks.map(task =>
      task.id === id ? { ...task, completed: true } : task
    );
    this.updateTasks(newTasks);
  }
  delete(id) {
    let idx = this.tasks.findIndex(task => task.id === id);
    if (idx > -1) {
      this.tasks.splice(idx, 1);
    }
    this.updateTasks(this.tasks);
  }
  updateTasks(newTasks = []) {
    this.tasks = newTasks;
  }
  addBtnFnc() {
    let task = document.getElementById("input-text").value;
    this.add({ task });
    console.log(this.tasks);
  }
  init() {
    let componentWrap = document.createElement("div");
    componentWrap.className = "comp-wrapper";
    let inputWrap = document.createElement("div");
    inputWrap.className = "task-input-wrapper";
    let input = document.createElement("input");
    input.id = "input-text";
    inputWrap.appendChild(input);
    let addBtn = document.createElement("button");
    addBtn.innerText = "Add";
    addBtn.addEventListener("click", this.addBtnFnc);
    inputWrap.appendChild(addBtn);

    let taskWrapper = document.createElement("div");

    componentWrap.appendChild(inputWrap);
    componentWrap.appendChild(taskWrapper);
    document.getElementById("root").appendChild(componentWrap);
  }
}

new TodoMvc();
