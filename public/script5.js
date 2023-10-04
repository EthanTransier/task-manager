var session = sessionStorage.getItem('personID')
console.log(session)



var currentPerson;

async function getPerson(){
    const {data} = await axios.get('/api/people')
    console.log(data)

    for(let i = 0; i < data.length; i++) {
        if(data[i].id == session){
            currentPerson = data[i]
        }
    }
    console.log(currentPerson)
    document.getElementById('personName').innerHTML = currentPerson.name;
}



getPerson()

const input1 = document.getElementById('nameInput')
const input2 = document.getElementById('ageInput')

async function editingPerson(){
    console.log(input1.value)
    console.log(input2.value)
    fetch(`/api/people/${session}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({name: input1.value, age: input2.value})
    })
}