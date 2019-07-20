const formTask = document.getElementById('form-task');

formTask.addEventListener('submit', CreateTasks);

function CreateTasks(event) {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const container = document.querySelector('.container');

    if(name === '' || description === '' || date === '') {
        alert('Los campos no pueden estar en blanco. Intenta otra vez.');    

        return;
    }

    
    const tasks = {
        name: name,
        description: description,
        date: date,
        status: false
    }

    if(localStorage.getItem('task') === null) {
        let task = [];
        task.push(tasks);
        localStorage.setItem('task', JSON.stringify(task));
    } else {
        let task = JSON.parse(localStorage.getItem('task'));
        task.push(tasks);
        localStorage.setItem('task', JSON.stringify(task));
    }

    formTask.reset();
    event.preventDefault();

    ShowTasks();
}

function DeleteTasks(name) {
    let task = JSON.parse(localStorage.getItem('task'));

    for(let i = 0; i < task.length; i++) {
        if(task[i].name === name) {
            task.splice(i, 1);

            alert('Seguro que decea eliminar la tarea?');
        }
    }

    localStorage.setItem('task', JSON.stringify(task));
    ShowTasks();
}


function ShowTasks() {
    let task = JSON.parse(localStorage.getItem('task'));
    const taskList = document.getElementById('task-list');

    taskList.innerHTML = '';

    task.forEach(element => {
        taskList.innerHTML += `
            <div class="card">
                <div class="card-header">
                    <h3>Producto</h3>
                </div>

                <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">${element.description}</p>
                    <p class="card-text">${element.date}</p>

                    <button class="btn btn-danger" onclick="DeleteTasks('${element.name}')">Eliminar Tarea</button>
                </div>
            </div>
        `;
    });
}


ShowTasks();
