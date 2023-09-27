const result = document.querySelector(".result")

const fetchPeople = async() =>{
    try{
        const {data} = await axios.get('/api/people')
        console.log(data)

        const people = data.data.map((person)=>{
            console.log('checking the person')
            if(person.check == true){
                console.log('test 1')
                return `
                <section class="taskResult greyedOut">
                    <section class="allContainer">
                            <div class="divider">
                                <h3 class="crossout">${person.name}</h3>
                                <h5 class="crossout">${person.description}</h5>
                            </div>
                            <div class="checkContainer">
                                <label for="check" class="checkLabel">Complete:</label>
                                <input type="checkbox" id="check${person.id}" name="check" onclick="check(${person.id})" checked>
                            </div>
                        </section>
                        <div class='buttonContainer'>
                            <button class="btn disabled" onclick="editPerson('${person.name}','${person.id}') disabled">Edit</button>
                            <button class="btn disabled" onclick="deletePerson('${person.id}')">Delete</button>
                        </div>
                    </section>`
            }else{
                return `
                <section class="taskResult">
                    <section class="allContainer">
                            <div class="divider">
                                <h3>${person.name}</h3>
                                <h5>${person.description}</h5>
                            </div>
                            <div class="checkContainer">
                                <label for="check" class="checkLabel">Complete:</label>
                                <input type="checkbox" id="check${person.id}" name="check" onclick="check(${person.id})">
                            </div>
                        </section>
                        <div class='buttonContainer'>
                            <button class="btn"><a href="edit.html" onclick="editTask('${person.id}')">Edit</a></button>
                            <button class="btn" onclick="deletePerson('${person.id}')">Delete</button>
                        </div>
                    </section>`
            }
            
        })
        result.innerHTML = people.join("")
    }catch (error) {
        formAlert.textContent = error.response.data.msg
    }
}
fetchPeople();


// HTML Submit Form
// const btn = document.querySelector(".submit-btn")
// const input = document.querySelector(".form-input")
// const formAlert = document.querySelector(".form-alert")

// btn.addEventListener("click", async (e)=>{
//     e.preventDefault()
//     const nameValue = input.value
    
//     try {
//         if(editMode == false) {
//             const {data} = await axios.post("api/people", {name: nameValue})
//             const h5 = document.createElement("h5");
//             h5.textContent = data.person;
//             result.appendChild(h5)
//             fetchPeople();
//         }else {
//             const name = input.value
//             fetch(`/api/people/${currentPersonID}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json'},
//                 body: JSON.stringify({name: name})
//             })
//             fetchPeople();
//             editMode = false;
//         }
        
//     } catch (error){
//         console.log(error)
//         // formAlert.textContent = error.response.data.msg
//     }
//     input.value = ""
// })

var foundName;

async function check(id){
    
    const currentCheck = document.getElementById(`check${id}`)
    const {data} = await axios.get('/api/people')

    for(let i = 0; i < data.data.length; i++) {
        if(id == data.data[i].id){
            foundName = data.data[i].name
            foundDesc = data.data[i].description
        }
    }
    console.log(currentCheck.checked)
    if(currentCheck.checked){
        fetch(`/api/people/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({name: foundName, check: true, description: foundDesc})
        })
        fetchPeople()
        // const {data} = await axios.get('/api/people')
        
    }else {
        fetch(`/api/people/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({name: foundName, check: false, description: foundDesc})
        })
        fetchPeople()
    }
}

var editMode = false;
var currentPersonID = '';

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
}

