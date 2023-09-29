const result = document.querySelector(".resultDropdown")
const taskResult = document.querySelector(".taskResult")

// result.addEventListener("change", updatedResult());

async function updatedResult() {
    if(result.value != 'default') {
        try{
            const selectedID = result.value;
            // console.log(selectedID)
            const {data} = await axios.get('/api/tasks')
            // console.log(data.data.length)
            for(let i = 0; i < data.length; i++) {
                if(data[i].id == selectedID) {
                    // console.log('running')
                    if(data[i].check == false) {
                        // console.log(data.data[i].description)
                        taskResult.innerHTML = `
                        <section class="allContainer">
                            <div class="divider">
                                <h3>${data[i].name}</h3>
                                <h5>${data[i].description}</h5>
                            </div>
                            <div class="checkContainer">
                                <label for="check" class="checkLabel">Complete:</label>
                                <input type="checkbox" id="check" name="check" onclick="check(${data[i].id})">
                            </div>
                        </section>
                        <div class='buttonContainer'>
                            <button class="btn"><a href="edit.html" onclick="editTask('${data[i].id}')">Edit</a></button>
                            <button class="btn" onclick="deleteTask('${data[i].id}')">Delete</button>
                        </div>
                        `
                        taskResult.classList.remove('greyedOut')
                    }else {
                        // console.log(data.data[i].description)
                        taskResult.innerHTML = `
                        <section class="allContainer">
                            <div class="divider">
                                <h3 class="crossout">${data[i].name}</h3>
                                <h5 class="crossout">${data[i].description}</h5>
                            </div>
                            <div class="checkContainer">
                                <label for="check" class="checkLabel">Complete:</label>
                                <input type="checkbox" id="check" name="check" onclick="check(${data[i].id})" checked>
                            </div>
                        </section>
                        <div class='buttonContainer'>
                            <button class="btn disabled" disabled">Edit</button>
                            <button class="btn disabled" onclick="deleteTask('${data[i].id}')" disabled>Delete</button>
                        </div>
                        `
                        taskResult.classList.add('greyedOut')
                    }
                    
                }
            }
        
        }catch (error) {
            // formAlert.textContent = error.response.data.msg
            console.log(error)
        }
        
        
    }
}

var foundName;

async function check(id){
    const currentCheck = document.getElementById(`check`)
    const {data} = await axios.get('/api/tasks')
    console.log(data)

    for(let i = 0; i < data.length; i++) {
        if(id == data[i].id){
            foundName = data[i].name
            foundDesc = data[i].description
        }
    }
    console.log(foundDesc)
    if(currentCheck.checked){
        fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({name: foundName, check: true, description: foundDesc})
        })
        updatedResult()
        
    }else if(!currentCheck.checked){
        fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({name: foundName, check: false, description: foundDesc})
        })
        updatedResult()
    }
    
}


const fetchTasks = async() =>{
    try{
        const {data} = await axios.get('/api/tasks')

        const tasks = data.map((task)=>{
            return `<option value='${task.id}'>${task.name}</option>`
        })
        result.innerHTML = `<option value='default'>Select</option>${tasks.join("")}`
    }catch (error) {
        formAlert.textContent = error.response.data.msg
    }
}
fetchTasks();


// HTML Submit Form
const btn = document.querySelector(".submit-btn")
const input = document.querySelector(".form-input")
const formAlert = document.querySelector(".form-alert")

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
    taskResult.innerHTML = ''
}

