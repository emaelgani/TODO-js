import { Todo } from "../classes";

import {todoList} from "../index";

//Referencias en el html
const divTodoList = document.querySelector('.todo-list');

const txtInput = document.querySelector('.new-todo');

const bntBorrar = document.querySelector('.clear-completed');

const ulFiltros = document.querySelector('.filters');

const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id=${todo.id}>
    <div class="view">
        <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
        <label>${todo.tarea}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    </li> `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild); //No quiero agregar el div, quiero agregar el li que le sigue, el hijo

    return div.firstElementChild;

}




//Eventos

txtInput.addEventListener('keyup', (event) => {


    if (event.keyCode === 13 && txtInput.value.length > 0) {
        const todo = new Todo(txtInput.value);
        todoList.nuevoTodo(todo);
        crearTodoHtml(todo);
        txtInput.value = '';

        console.log(todoList);
    }

});

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = (event.target.localName);//a que elemento le dio click (input, label, button)
    const todoElemento = event.target.parentElement.parentElement; //el eleemento que le dio click
    const todoId = todoElemento.getAttribute('data-id'); //el id del elemento que le dio click

    if (nombreElemento.includes('input')) { //click en el check

        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed'); //agrega la clase completed al elemento 
    }
    
    else if (nombreElemento.includes('button')) { //click en el boton de eliminar
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);

    }
    
});


bntBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }


});


ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if(!filtro) {return};

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of divTodoList.children){
       
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }

    }

});