function createCardElementFrom(task) {
  let dueTo = new Date(task.dueTo).toLocaleDateString('pt-BR')
  let html = `
    <div class="card horizontal">
      <div class="card-stacked">
        <div class="card-content">
          <p>${task.title} <span class="new badge" data-badge-caption="">${dueTo}</span> <div class="chip">${task.project}</div></p>
          
        </div>
        <div class="card-action">
          <a href="#"><i class="fa-solid fa-pen-to-square"></i></a>
          <a href="#"><i class="fa-solid fa-trash-can"></i></a>
        </div>
      </div>
    </div>
    `
  let newDiv = document.createElement('div')
  newDiv.innerHTML = html
  return newDiv
}

function getTasks() {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:5001/api/tasks')
      .then((response) => response.json())
      .then((tasks) => {
        resolve(tasks)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function saveTask(task) {
  fetch(`http://localhost:5001/api/tasks`, {
    method: 'POST',
    body: JSON.stringify({
      title: task.title,
      project: task.project,
      dueTo: new Date(task.dueTo).toISOString(),
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
    .then((res) => res.json())
    .then((newTask) => {
      console.log('DONE', newTask)
      window.location.href = '/tasksList.html'
    })
    .catch((error) => {
      console.log('Erro adicionando task:', error)
    })
}
