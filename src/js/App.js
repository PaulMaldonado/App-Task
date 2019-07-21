const formTask = document.getElementById('form-task');

formTask.addEventListener('submit', CreateTasks);

function CreateTasks(event) {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;

    if(name === '' || description === '' || date === '') {
        alert('Los campos no pueden estar en blanco. Intenta otra vez.');    

        return;
    }

    
    const tasks = {
        name: name,
        description: description,
        date: date
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

function EditTasks(name, description, date) {
    let task = JSON.parse(localStorage.getItem('task'));

    document.getElementById('name').value = name;
    document.getElementById('description').value = description;
    document.getElementById('date').value = date;

    let button = document.getElementById('button');

    button.innerHTML = 'Editar Tarea';
    
    button.onclick = function() {
        let name = document.getElementById('name').value;
        let description = getElementById('description').value;
        let date = document.getElementById('date').value;

    }


}


function ShowTasks() {
    let task = JSON.parse(localStorage.getItem('task'));
    const taskList = document.getElementById('task-list');

    taskList.innerHTML = '';

    task.forEach(element => {
        taskList.innerHTML += `
            <div class="card">
                <div class="card-header">
                    <h3>Tarea Agendada</h3>
                </div>

                <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">${element.description}</p>
                    <p class="card-text">${element.date}</p>

                    <button class="btn btn-danger" onclick="DeleteTasks('${element.name}')">Eliminar Tarea</button>
                    <button class="btn btn-info" onclick="EditTasks('${element.name}', '${element.description}', '${element.date}')">Editar Tarea</button>
                </div>
            </div>
        `;
    });

}


ShowTasks();
