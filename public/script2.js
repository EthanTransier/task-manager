const result = document.querySelector(".result")

const fetchTasks = async() =>{
    try{
        const {data} = await axios.get('/api/tasks')
        console.log(data)

        const tasks = data.map((task)=>{
            console.log('checking the task')
            if(task.check == true){
                console.log('test 1')
                return `
                <section class="taskResult greyedOut">
                    <section class="allContainer">
                            <div class="divider">
                                <h3 class="crossout">${task.name}</h3>
                                <h5 class="crossout">${task.description}</h5>
                            </div>
                            <div class="checkContainer">
                                <label for="check" class="checkLabel">Complete:</label>
                                <input type="checkbox" id="check${task.id}" name="check" onclick="check(${task.id})" checked>
                            </div>
                        </section>
                        <div class='buttonContainer'>
                            <button class="btn disabled" onclick="editTask('${task.name}','${task.id}') disabled">Edit</button>
                            <button class="btn disabled" onclick="deleteTask('${task.id}')">Delete</button>
                        </div>
                    </section>`
            }else{
                return `
                <section class="taskResult">
                    <section class="allContainer">
                            <div class="divider">
                                <h3>${task.name}</h3>
                                <h5>${task.description}</h5>
                            </div>
                            <div class="checkContainer">
                                <label for="check" class="checkLabel">Complete:</label>
                                <input type="checkbox" id="check${task.id}" name="check" onclick="check(${task.id})">
                            </div>
                        </section>
                        <div class='buttonContainer'>
                            <button class="btn"><a href="edit.html" onclick="editTask('${task.id}')">Edit</a></button>
                            <button class="btn" onclick="deleteTask('${task.id}')">Delete</button>
                        </div>
                    </section>`
            }
            
        })
        result.innerHTML = tasks.join("")
    }catch (error) {
        console.log(error)
    }
}
fetchTasks();

var foundName;

async function check(id){
    
    const currentCheck = document.getElementById(`check${id}`)
    const {data} = await axios.get('/api/tasks')

    for(let i = 0; i < data.length; i++) {
        if(id == data[i].id){
            foundName = data[i].name
            foundDesc = data[i].description
        }
    }
    console.log(currentCheck.checked)
    if(currentCheck.checked){
        fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({name: foundName, check: true, description: foundDesc})
        })
        fetchTasks()
        // const {data} = await axios.get('/api/tasks')
        
    }else {
        fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({name: foundName, check: false, description: foundDesc})
        })
        fetchTasks()
    }
}

var editMode = false;
var currentTaskID = '';

function editTask(taskID){
    sessionStorage.setItem('taskID', taskID)
}

function deleteTask(taskID){
    fetch(`/api/tasks/${taskID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        // body: JSON.stringify({name: name})
    })
    fetchTasks();
}

