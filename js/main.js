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

    todoListContainer.innerHTML += `
    <div class="todo">
        <div class="content">
            <p>${data.task}</p>
        </div>
        <div class="status">
            <small class="tag tag-success">${data.stat}</small>
            <button class="btn btn-red">Delete</button>
        </div>
    </div>
    `
    document.getElementById('todo-field').value = ''
    saveTaskToLocalStorage(data)
}

// From localStorage to DOM
const integrateFetchedDataToDOM = () => {
    const todoListContainer = document.getElementById('todo-list')
    const tasks = Object.values(JSON.parse(localStorage.getItem('tasks')))
    if(tasks.length===0) todoListContainer.innerHTML = `<p>Nothing found</p>`
    else tasks.map(task => 
        todoListContainer.innerHTML += `
        <div class="todo">
            <div class="content">
                <p>${task.task}</p>
            </div>
            <div class="status">
                <small class="tag tag-success">${task.stat}</small>
                <button class="btn btn-red">Delete</button>
            </div>
        </div>
        
        `    
    )
}


const laodingThePageEvents = () => {
    if(!localStorage.getItem('tasks')) localStorage.setItem('tasks', JSON.stringify([]))
    integrateFetchedDataToDOM()
}

//integratFetchedDataToDOM()
// Events listners
addBtn.addEventListener('click', addTaskToDOM)
window.addEventListener('load', laodingThePageEvents)