var session = sessionStorage.getItem('taskID')
// console.log(session)



var currentTask;

async function getTask(){
    const {data} = await axios.get('/api/tasks')
    console.log(data.length)
    // console.log(session)
    for(let i = 0; i < data.length; i++) {
        // console.log(data[i].id)
        if(data[i].id == session){
            console.log('found')
            currentTask = data[i]
        }
    }
    // console.log(currentTask)
    document.getElementById('taskName').innerHTML = currentTask.name;
}

getTask()

const input1 = document.getElementById('nameInput')
const input2 = document.getElementById('descInput')
// console.log(session)
async function editingTask(){
    fetch(`/api/tasks/${session}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({name: input1.value, description: input2.value})
    })
}