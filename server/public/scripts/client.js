$(document).ready(init);

function init() {
    console.log('Totes ready for things');
    $('.js-btn-submit-task').on('click', onSubmitTask);
    $('.js-task-list').on('click', '.js-btn-delete', onDeleteTask);
    $('.js-task-list').on('click', '.js-btn-complete', onCompleteTask);
    getTodos();
}

// EVENT HANDLERS

function onSubmitTask(event) {
    console.log('onSubmitTask')
    const newTaskObject = {
        text: $('.js-field-task').val(),
    };
    $('.js-field-task').val('');

    postTodo(newTaskObject);
}

function onDeleteTask(event) {
    const taskId = $(this).data('id');

    deleteTodo(taskId);
}

function onCompleteTask(event) {
    const taskId = event.target.dataset.id; 
    let newStatus = event.target.dataset.status;
    console.log('newStatus: ', newStatus)

    if (newStatus === 'true') {
        newStatus = false;
    } else {
        newStatus = true;
    }

    putTodoCompletion(taskId, newStatus);
}

// API CALLS

function getTodos() {
    $.ajax({
        method: 'GET',
        url: '/api/todo'
    })
        .then(function (response) {
            render(response);
        })
        .catch(function (err) {
            console.error(err);
            alert('Something went wrong with getting your todos.');
        })
}

function postTodo(newTask) {
    $.ajax({
        method: 'POST',
        url: '/api/todo',
        data: newTask,
    })
        .then(function (response) {
            getTodos();
        })
        .catch(function (err) {
            console.error(err);
            alert('Something went wrong with adding your todo.');
        });
}

function deleteTodo(id) {
    $.ajax({
        method: 'DELETE',
        url: `/api/todo/${id}`,
    })
        .then(function (response) {
            getTodos();
        })
        .catch(function (err) {
            console.error(err);
            alert('Something went wrong with deleting your todo.');
        });
}

function putTodoCompletion(id, isComplete) {
    console.log('putTodoCompletion - id, isComplete:', id, isComplete);
    $.ajax({
        method: 'PUT',
        url: `/api/todo/${id}`,
        data: {
            complete: isComplete
        }
    })
        .then(function (response) {
            getTodos();
        })
        .catch(function (err) {
            console.error(err);
            alert('Something went wrong with updating your todo.');
        });
}

// VIEW UPDATES

function render(todoList) {
    console.log(todoList);
    const $todoElement = $('.js-task-list');

    $todoElement.empty();
    for (let i = 0; i < todoList.length; i++) {
        const taskItem = todoList[i];
        let completeStatus = `complete`;
        let completeBtn = 'INCOMPLETE';

        if (!taskItem.complete) {
            completeStatus = 'NOT complete';
            completeBtn = 'COMPlETE'
        }

        $todoElement.append(`
            <li>
                ${taskItem.task}, ${completeStatus}
                <button class="js-btn-delete" data-id="${taskItem.id}">DELETE</button>
                <button class="js-btn-complete" data-id="${taskItem.id}" data-status="${taskItem.complete}">${completeBtn}</button>
            </li>
        `)
    }
}