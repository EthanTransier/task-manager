var session = sessionStorage.getItem('taskID')
console.log(session)

var currentTask;

async function getTask(){
    const {data} = await axios.get('/api/tasks')
    console.log(data)

    for(let i = 0; i < data.length; i++) {
        if(data[i]._id == session){
            currentTask = data[i]
        }
    }

    document.getElementById('taskName').innerHTML = currentTask.name;
}

getTask()

const input1 = document.getElementById('nameInput')
const input2 = document.getElementById('descInput')

async function editingTask(){
    fetch(`/api/tasks/${session}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({name: input1.value, check: false, description: input2.value})
    })
}