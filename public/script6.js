const result = document.querySelector(".resultDropdown")
const personResult = document.querySelector(".personResult")

// result.addEventListener("change", updatedResult());

async function updatedResult() {
    if(result.value != 'default') {
        try{
            const selectedID = result.value;
            // console.log(selectedID)
            const {data} = await axios.get('/api/people')
            // console.log(data.data.length)
            for(let i = 0; i < data.length; i++) {
                if(data[i].id == selectedID) {
                    // console.log('running')
                    
                        // console.log(data.data[i].description)
                        personResult.innerHTML = `
                        <section class="allContainer">
                            <div class="divider">
                                <h3>${data[i].name}</h3>
                                <h5>${data[i].description}</h5>
                            </div>
                            <div class="checkContainer">
                                <label for="check" class="checkLabel">Complete:</label>
                                <input type="checkbox" id="check" name="check" onclick="check('${data[i].id}')">
                            </div>
                        </section>
                        <div class='buttonContainer'>
                            <button class="btn"><a href="edit.html" onclick="editPerson('${data[i].id}')">Edit</a></button>
                            <button class="btn" onclick="deletePerson('${data[i].id}')">Delete</button>
                        </div>
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

async function check(id){
    const currentCheck = document.getElementById(`check`)
    const {data} = await axios.get('/api/people')
    console.log(data)

    for(let i = 0; i < data.length; i++) {
        if(id == data[i].id){
            foundName = data[i].name
            foundDesc = data[i].description
        }
    }
    console.log(foundDesc)
    
    fetch(`/api/people/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({name: foundName, check: true, description: foundDesc})
    })
    // updatedResult()
    personResult.innerHTML = `
        <section class="allContainer">
            <div class="divider">
                <h3 class="crossout">${foundName}</h3>
                <h5 class="crossout">${foundDesc}</h5>
            </div>
            <div class="checkContainer">
                <label for="check" class="checkLabel">Complete:</label>
                <input type="checkbox" id="check" name="check" onclick="check('${id}')" checked>
            </div>
        </section>
        <div class='buttonContainer'>
            <button class="btn disabled" disabled">Edit</button>
            <button class="btn disabled" onclick="deletePerson('${id}')" disabled>Delete</button>
        </div>
        `
}


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

function editPerson(personID){
    sessionStorage.setItem('personID', personID)
}

function deletePerson(personID){
    fetch(`/api/people/${personID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        // body: JSON.stringify({name: name})
    })
    fetchPeople();
    personResult.innerHTML = ''
}

