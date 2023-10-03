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
            console.log(person._id)
            

            return `
            <section class="personResult" id='${person._id}'>
                <section class="allContainer">
                        <div class="divider">
                            <h3>${person.name}</h3>
                            <h5>Age: ${person.age}</h5>
                            <h5>Current Tasks: ${person.tasks}</h5>
                        </div>
                    </section>
                    <div class='buttonContainer'>
                        <div>
                            <select id="select${person.id}">
                                ${options.join('')}
                            </select>   
                            <button class="btn" onclick="assignTask('${person.id}')">Assign Task</button>
                        </div>
                        <button class="btn" onclick="deletePerson('${person._id}')">Delete</button>
                    </div>
                </section>`
    })
        result.innerHTML = people.join("")
    }catch (error) {
        console.log(error)
    }
}
fetchPeople();

var foundName;

async function check(currentID){
    
    const currentCheck = document.getElementById(`check${currentID}`)
    const {data} = await axios.get('/api/people')

    for(let i = 0; i < data.length; i++) {
        if(currentID == data[i]._id){
            foundName = data[i].name
            foundDesc = data[i].description
        }
    }
    // console.log(currentCheck.checked)
    console.log(currentID)

    if(currentCheck.checked){
        fetch(`/api/people/${currentID}`, {
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
            <button class="btn disabled" onclick="assignTask('${currentID}','${currentID}') disabled">Assign Tasks</button>
            <button class="btn disabled" onclick="deletePerson('${currentID}')">Delete</button>
        </div>`
        document.getElementById(currentID).classList.add('greyedOut')
        
    }else {
        fetch(`/api/people/${currentID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({name: foundName, check: false, description: foundDesc})
        })
        // fetchPeople()
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
            <button class="btn"><a href="edit.html" onclick="editPerson('${currentID}')">Edit</a></button>
            <button class="btn" onclick="deletePerson('${currentID}')">Delete</button>
        </div>`
        document.getElementById(currentID).classList.remove('greyedOut')
    }
}

var editMode = false;
var currentPersonID = '';



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
    const select = document.getElementById(`select${personID}`);
    console.log(select)
    fetch(`/api/people/${personID}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: select.value
    })
    fetchPeople();
}