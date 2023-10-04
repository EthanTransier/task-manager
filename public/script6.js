const result = document.querySelector(".resultDropdown")
const personResult = document.getElementById("personResult")

// result.addEventListener("change", updatedResult());

async function updatedResult() {
    if(result.value != 'default') {
        try{
            const selectedID = result.value;
            // console.log(selectedID)
            const {data} = await axios.get('/api/people')

            const tasks = await axios.get('/api/tasks').then((res) => {return res.data})
            let options = [];
            for(let i = 0; i < tasks.length; i++){
                options.push(`<option value="${tasks[i].name}">${tasks[i].name}</option>`)
            }
            // console.log(data.data.length)
            for(let i = 0; i < data.length; i++) {
                if(data[i].id == selectedID) {
                    // console.log('running')
                        // console.log(data.data[i].description)
                        personResult.innerHTML = `
                            <section class="allContainer">
                                <div class="divider personDivider">
                                    <h3 class="personName">${data[i].name}<button class="personEdit"><a href="editPeople.html" onclick="editPerson(${data[i].id})">Edit</a></button></h3>
                                    <h5>Age: ${data[i].age}</h5>
                                    <h5>Current Task: ${data[i].task}</h5>
                                </div>
                            </section>
                                <div class='buttonContainer'>
                                    <div>
                                        <select id="assign${data[i].id}">
                                            ${options.join('')}
                                        </select>   
                                        <button class="btn" onclick="assignTask('${data[i].id}')">Assign Task</button>
                                    </div>
                                    <div>
                                        <select id="unassign${data[i].id}">
                                            ${options.join('')}
                                        </select>   
                                        <button class="btn" onclick="unassignTask('${data[i].id}')">Unassign Task</button>
                                    </div>
                                </div>
                            <button class="btn deletebtn" onclick="deletePerson('${data[i].id}')">Remove Person</button>
                        `
                }
            }
        
        }catch (error) {
            // formAlert.textContent = error.response.data.msg
            console.log(error)
        }
        
        
    }
}

var foundName;

const fetchPeople = async() =>{
    try{
        const {data} = await axios.get('/api/people')

        const people = data.map((person)=>{
            return `<option value='${person.id}'>${person.name}</option>`
        })
        result.innerHTML = `<option value='default'>Select</option>${people.join("")}`
    }catch (error) {
        formAlert.textContent = error.response.data.msg
    }
}
fetchPeople();


// HTML Submit Form
const btn = document.querySelector(".submit-btn")
const input = document.querySelector(".form-input")
const formAlert = document.querySelector(".form-alert")

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

var editMode = false;
var currentPersonID = '';

function editPerson(personID){
    sessionStorage.setItem('personID', personID)
}
