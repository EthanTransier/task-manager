const result = document.querySelector(".result")

const fetchTasks = async() =>{
    try{
        const {data} = await axios.get('/api/tasks')
        // console.log(data)

        const tasks = data.map((task)=>{
            console.log(task.id)
            if(task.check == true){
                // console.log('test 1')
                return `
                <section class="taskResult greyedOut" id='${task.id}'>
                    <section class="allContainer">
                            <div class="divider">
                                <h3 class="crossout">${task.name}</h3>
                                <h5 class="crossout">${task.description}</h5>
                            </div>
                            <div class="checkContainer">
                                <label for="check" class="checkLabel">Complete:</label>
                                <input type="checkbox" id="check${task.id}" name="check" onclick="check('${task.id}')" checked>
                            </div>
                        </section>
                        <div class='buttonContainer'>
                            <button class="btn disabled" onclick="editTask('${task.name}','${task.id}') disabled">Edit</button>
                            <button class="btn disabled" onclick="deleteTask('${task.id}')">Delete</button>
                        </div>
                    </section>`
            }else{
                return `
                <section class="taskResult" id='${task.id}'>
                    <section class="allContainer">
                            <div class="divider">
                                <h3>${task.name}</h3>
                                <h5>${task.description}</h5>
                            </div>
                            <div class="checkContainer">
                                <label for="check" class="checkLabel">Complete:</label>
                                <input type="checkbox" id="check${task.id}" name="check" onclick="check('${task.id}')">
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

async function check(currentID){
    
    const currentCheck = document.getElementById(`check${currentID}`)
    const {data} = await axios.get('/api/tasks')

    for(let i = 0; i < data.length; i++) {
        if(currentID == data[i].id){
            foundName = data[i].name
            foundDesc = data[i].description
        }
    }
    // console.log(currentCheck.checked)
    console.log(currentID)

    if(currentCheck.checked){
        fetch(`/api/tasks/${currentID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({name: foundName, check: true, description: foundDesc})
        })
        document.getElementById(currentID).innerHTML = `<section class="allContainer">
            <div class="divider">
                <h3 class="crossout">${foundName}</h3>
                <h5 class="crossout">${foundDesc}</h5>
            </div>
            <div class="checkContainer">
                <label for="check" class="checkLabel">Complete:</label>
                <input type="checkbox" id="check${currentID}" name="check" onclick="check('${currentID}')" checked>
            </div>
        </section>
        <div class='buttonContainer'>
            <button class="btn disabled" onclick="editTask('${currentID}','${currentID}') disabled">Edit</button>
            <button class="btn disabled" onclick="deleteTask('${currentID}')">Delete</button>
        </div>`
        document.getElementById(currentID).classList.add('greyedOut')
        
    }else {
        fetch(`/api/tasks/${currentID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({name: foundName, check: false, description: foundDesc})
        })
        // fetchTasks()
        document.getElementById(currentID).innerHTML = `<section class="allContainer">
            <div class="divider">
                <h3>${foundName}</h3>
                <h5>${foundDesc}</h5>
            </div>
            <div class="checkContainer">
                <label for="check" class="checkLabel">Complete:</label>
                <input type="checkbox" id="check${currentID}" name="check" onclick="check('${currentID}')">
            </div>
        </section>
        <div class='buttonContainer'>
            <button class="btn"><a href="edit.html" onclick="editTask('${currentID}')">Edit</a></button>
            <button class="btn" onclick="deleteTask('${currentID}')">Delete</button>
        </div>`
        document.getElementById(currentID).classList.remove('greyedOut')
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

// function deleteAll(){
//     fetch(`/api/tasks/deletemany/`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json'},
//     })
// }
