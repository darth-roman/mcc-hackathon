// Selecting elements 
const addBtn = document.getElementById('submit-btn')


// Functions

// generate random ID for the task
const generateRandomID = () => {
    let randomID = ''
    const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charsLength = possibleChars.length

    let count = 0
    while (count < 10) {
        randomID += possibleChars.charAt(Math.floor(Math.random() * charsLength))
        count++
    }
    return randomID
}

// Fetching data from the form
const formData = () =>{
    return {
        id: generateRandomID(),
        task: document.getElementById('todo-field').value,
        stat: 'To Do'
    }
}


// save task to localStorage/JSON
const saveTaskToLocalStorage = (todo) => {
    if(!localStorage.getItem('tasks')) localStorage.setItem('tasks', JSON.stringify([]))
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    if (!tasks) localStorage.setItem('tasks', JSON.stringify([]))
    if (tasks) localStorage.setItem('tasks', JSON.stringify([...tasks, todo]))
}




// DOM manipulation
const addTaskToDOM = () => {
    const todoListContainer = document.getElementById('todo-list')
    const data = formData()

    console.log(data);

    todoListContainer.innerHTML += `
    <div class="todo" data-key="${data.id}" onclick="${() => deleteTodo(data.id)}">
        <div class="content">
            <p>${data.task}</p>
        </div>
        <div class="status">
            <small class="tag tag-success">${data.stat}</small>
            <button class="btn btn-red" onclick="${() => deleteTodo(data.id)}">Delete</button>
        </div>
    </div>
    `
    document.getElementById('todo-field').value = ''
    saveTaskToLocalStorage(data)
    location.reload()
}

// From localStorage to DOM
const integrateFetchedDataToDOM = () => {
    const todoListContainer = document.getElementById('todo-list')
    const tasks = Object.values(JSON.parse(localStorage.getItem('tasks')))
    if(tasks.length===0) todoListContainer.innerHTML = `<p>Nothing found</p>`
    else tasks.map(task => 
        todoListContainer.innerHTML += `
        <div class="todo" data-key="${task.id}">
            <div class="content">
                <p>${task.task}</p>
            </div>
            <div class="status">
                <small class="tag tag-success">${task.stat}</small>
                <button class="btn btn-red" onclick="${()=>deleteTodo(task.id)}">Delete</button>
            </div>
        </div>
        
        `    
    )
}


const laodingThePageEvents = () => {
    if(!localStorage.getItem('tasks')) localStorage.setItem('tasks', JSON.stringify([]))
    integrateFetchedDataToDOM()
}




// Events listners
addBtn.addEventListener('click', addTaskToDOM)
window.addEventListener('load', laodingThePageEvents)




const deleteTodo = (todoID) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'))

    const newTaskArray = tasks.filter(task => task.id != todoID)
    console.log(newTaskArray);

    localStorage.setItem('tasks', JSON.stringify(newTaskArray))
    location.reload()

}

document.addEventListener('click', (e)=>{
    const target = e.target
    if(target.tagName === 'DIV'){
        // console.log(target);
        target.classList.toggle('todo-disabled')
        target.children[1].children[0].textContent = 'Done/Doing'
    }
})

document.addEventListener('dblclick', (e)=>{
    const target = e.target
    if(target.classList.value === 'todo' || target.classList.value === 'todo todo-disabled') deleteTodo(target.dataset.key)
})