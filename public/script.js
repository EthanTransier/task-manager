const result = document.querySelector(".resultDropdown")
const taskResult = document.querySelector(".taskResult")

// result.addEventListener("change", updatedResult());

async function updatedResult() {
    if(result.value != 'default') {
        try{
            const selectedID = result.value;
            console.log(selectedID)
            const {data} = await axios.get('/api/people')
            console.log(data.data.length)
            for(let i = 0; i < data.data.length; i++) {
                if(data.data[i].id == selectedID) {
                    console.log('running')
                    if(data.data[i].check == false) {
                        taskResult.innerHTML = `
                        <section class="allContainer">
                            <div class="divider">
                                <h3>${data.data[i].name}</h3>
                                <h5>${data.data[i].description}</h5>
                            </div>
                            <div class="checkContainer">
                                <label for="check" class="checkLabel">Complete:</label>
                                <input type="checkbox" id="check" name="check" onclick="check(${data.data[i].id})">
                            </div>
                        </section>
                        <div class='buttonContainer'>
                            <button class="btn"><a href="edit.html" onclick="editTask('${data.data[i].id}')">Edit</a></button>
                            <button class="btn" onclick="deletePerson('${data.data[i].id}')">Delete</button>
                        </div>
                        `
                        taskResult.classList.remove('greyedOut')
                    }else {
                        console.log('checked')
                        taskResult.innerHTML = `
                        <section class="allContainer">
                            <div class="divider">
                                <h3 class="crossout">${data.data[i].name}</h3>
                                <h5 class="crossout">${data.data[i].description}</h5>
                            </div>
                            <div class="checkContainer">
                                <label for="check" class="checkLabel">Complete:</label>
                                <input type="checkbox" id="check" name="check" onclick="check(${data.data[i].id})" checked>
                            </div>
                        </section>
                        <div class='buttonContainer'>
                            <button class="btn disabled" disabled">Edit</button>
                            <button class="btn disabled" onclick="deletePerson('${data.data[i].id}')" disabled>Delete</button>
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
    const {data} = await axios.get('/api/people')

    for(let i = 0; i < data.data.length; i++) {
        if(id == data.data[i].id){
            foundName = data.data[i].name
        }
    }

    if(currentCheck.checked){
        fetch(`/api/people/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({name: foundName, check: true})
        })
        updatedResult()
        // const {data} = await axios.get('/api/people')
        
    }else {
        fetch(`/api/people/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({name: foundName, check: false})
        })
        updatedResult()
    }
    
}


const fetchPeople = async() =>{
    try{
        const {data} = await axios.get('/api/people')
        console.log(data)

        const people = data.data.map((person)=>{
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

btn.addEventListener("click", async (e)=>{
    e.preventDefault()
    const nameValue = input.value
    
    try {
        if(editMode == false) {
            const {data} = await axios.post("api/people", {name: nameValue})
            const h5 = document.createElement("h5");
            h5.textContent = data.person;
            result.appendChild(h5)
            fetchPeople();
        }else {
            const name = input.value;
            console.log(currentPersonID)
            fetch(`/api/people/${currentPersonID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({name: name})
            })
            fetchPeople();
            editMode = false;
        }
        
    } catch (error){
        console.log(error)
        // formAlert.textContent = error.response.data.msg
    }
    input.value = ""
})

var editMode = false;
var currentPersonID = '';

// function editPerson(personName, personID){
//     editMode = true;
//     input.value = personName;
//     currentPersonID = personID;
    
// }

function editTask(personID){
    sessionStorage.setItem('taskID', personID)
}

function deletePerson(personID){
    fetch(`/api/people/${personID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        // body: JSON.stringify({name: name})
    })
    fetchPeople();
    taskResult.innerHTML = ''
}

