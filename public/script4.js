const result = document.querySelector(".result")

const fetchPeople = async() =>{
    try{
        const {data} = await axios.get('/api/people')
        const tasks = await axios.get('/api/tasks').then((res) => {return res.data})
        let options = [];
        for(let i = 0; i < tasks.length; i++){
            options.push(`<option value="${tasks[i].name}">${tasks[i].name}</option>`)
        }
        const people = data.map((person)=>{
            return `
            <section class="personResult" id='${person.id}'>
                <section class="allContainer">
                        <div class="divider personDivider">
                            <h3 class="personName">${person.name}<button class="personEdit"><a href="editPeople.html" onclick="editPerson(${person.id})">Edit</a></button></h3>
                            <h5>Age: ${person.age}</h5>
                            <h5>Current Task: <span id="currentTask-${person.id}">${person.task}</span></h5>
                        </div>
                    </section>
                    <div class='buttonContainer'>
                        <div>
                            <select id="assign${person.id}">
                                ${options.join('')}
                            </select>   
                            <button class="btn" onclick="assignTask('${person.id}')">Assign Task</button>
                        </div>
                        <div>  
                            <button class="btn" onclick="unassignTask('${person.id}')">Unassign Task</button>
                        </div>
                    </div>
                    <button class="btn deletebtn" onclick="deletePerson('${person.id}')">Remove Person</button>
                </section>`
    })
        result.innerHTML = people.join("")
    }catch (error) {
        console.log(error)
    }
}
fetchPeople();

function deletePerson(personID){
    fetch(`/api/people/${personID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        // body: JSON.stringify({name: name})
    })
    fetchPeople();
}

var editMode = false;
var currentPersonID = '';

function editPerson(personID){
    sessionStorage.setItem('personID', personID)
}


async function assignTask(personID){
    const select = document.getElementById(`assign${personID}`);
    fetch(`/api/people/${personID}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({currentTask: select.value})
    })
    // fetchPeople();
    document.getElementById(`currentTask-${personID}`).innerHTML = select.value
}

async function unassignTask(personID){
    fetch(`/api/people/unassign/${personID}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
    })
    // fetchPeople();
    document.getElementById(`currentTask-${personID}`).innerHTML = "None"
}