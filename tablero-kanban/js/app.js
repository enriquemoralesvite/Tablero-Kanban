document.addEventListener('DOMContentLoaded', function(){
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const pendingList = document.getElementById('pendingList');
    let draggedTask = null;

    // Event listeners globales para el drag and drop
    document.querySelectorAll('.kanban__list').forEach(column => {
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('drop', handleDrop);
    });

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', function(event){
        if(event.key === 'Enter'){
            addTask();
        }
    });

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        if(draggedTask){
            this.appendChild(draggedTask);
            draggedTask.style.display = 'block';
            draggedTask = null;
        }
    }

    function handleDragStart(event){
        draggedTask = event.target;
        setTimeout(() => {
            draggedTask.style.display = 'none';
        }, 0);
    }
    
    function handleDragEnd(event){
        event.target.style.display = 'block';
    }

    function addTask(){
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const taskItem = document.createElement('div');
        taskItem.classList.add('kanban__task');
        taskItem.textContent = taskText;
        taskItem.setAttribute('draggable', 'true');
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('kanban__button', 'kanban__button--delete');
        deleteButton.textContent = 'X';

        deleteButton.addEventListener('click', () => taskItem.remove());
        
        taskItem.appendChild(deleteButton);
        taskItem.addEventListener('dragstart', handleDragStart);
        taskItem.addEventListener('dragend', handleDragEnd);
        
        pendingList.appendChild(taskItem);
        taskInput.value = '';
    }
});