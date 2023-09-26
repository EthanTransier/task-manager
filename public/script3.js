var session = sessionStorage.getItem('taskID')
console.log(session)

var currentPerson;

async function getTask(){
    const {data} = await axios.get('/api/people')
    console.log(data)

    for(let i = 0; i < data.data.length; i++) {
        if(data.data[i].id == session){
            currentPerson = data.data[i]
        }
    }

    document.getElementById('taskName').innerHTML = currentPerson.name;
}

getTask()

const input1 = document.getElementById('nameInput')
const input2 = document.getElementById('descInput')

async function editingTask(){
    fetch(`/api/people/${session}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({name: input1.value, check: currentPerson.check, desc: input2.value})
    })
}