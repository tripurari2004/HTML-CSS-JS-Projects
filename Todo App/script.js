document.addEventListener("DOMContentLoaded",()=>{
    let input = document.querySelector("#task")
    let btn = document.querySelector("#btn")
    let list = document.querySelector("#task-list")

    let tasks=JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => render(task));

    btn.addEventListener("click", function(){
        const value = input.value.trim()
        if (value === "") {
            return
        }

        const newTask = {
            id: Date.now(),
            text: value,
            completed: false,
        };

        tasks.push(newTask)
        saveTask();
        render(newTask)
        input.value=""
        console.log(tasks)
    })

    function render(task){
        const li = document.createElement('li')
        li.setAttribute("data-id", task.id)
        if (task.completed) li.classList.add('completed')
        li.innerHTML = `<span>${task.text}</span><button>Delete</button>`
        li.addEventListener('click', (event)=>{
            if (event.target.tagName == 'BUTTON') {
                return
            }
            else{
                task.completed = !task.completed
                li.classList.toggle("completed")
                saveTask()
            }
        })

        li.querySelector('button').addEventListener("click",(event)=>{
            event.stopPropagation()
            tasks = tasks.filter(t=>t.id !=task.id)
            li.remove()
            saveTask()
        })

        list.appendChild(li)
    }

    function saveTask(){
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
})