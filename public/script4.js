const result = document.querySelector(".result")

const fetchPeople = async() =>{
    try{
        const {data} = await axios.get('/api/people')
        const tasks = await axios.get('/api/tasks').then((res) => {return res.data})
        let options = [];
        for(let i = 0; i < tasks.length; i++){
                options.push(`<option value="${tasks[i].name}">${tasks[i].name}</option>`)
            }
            let personTask;
        const people = data.map((person)=>{
            console.log(person.tasks.length)
            if(person.tasks.length <= 1){
                personTask = 'None'
            }else{
                personTask = person.tasks
            }

            return `
            <section class="personResult" id='${person._id}'>
                <section class="allContainer">
                        <div class="divider">
                            <h3>${person.name}</h3>
                            <h5>Age: ${person.age}</h5>
                            <h5>Current Tasks: ${personTask}</h5>
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
                            <select id="unassign${person.id}">
                                ${options.join('')}
                            </select>   
                            <button class="btn" onclick="unassignTask('${person.id}')">Unassign Task</button>
                        </div>
                    </div>
                    <button class="btn deletebtn" onclick="deletePerson('${person._id}')">Remove Person</button>
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



async function assignTask(personID){
    console.log(personID)
    const select = document.getElementById(`assign${personID}`);
    console.log(select)
    fetch(`/api/people/${personID}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({currentTask: select.value})
    })
    fetchPeople();
}

async function unassignTask(personID){
    console.log(personID)
    const select = document.getElementById(`unassign${personID}`);
    console.log(select)
    fetch(`/api/people/unassign/${personID}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({currentTask: select.value})
    })
    fetchPeople();
}