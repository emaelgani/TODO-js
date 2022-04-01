
import {Todo} from './todo.class';
export class TodoList {


    constructor() {
        this.cargarLocalStorage();
        //this.todos = [];
    }

    //Agrega un nuevo todo a la lista
    nuevoTodo(tarea) {
        this.todos.push(tarea);
        this.guardarLocalStorage();
    }

    //Elimina un todo de la lista
    eliminarTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id); //regresa un nuevo arreglo sin el id pasado
        this.guardarLocalStorage();
    }

    marcarCompletado(id) {
        for (const todo of this.todos) {

            if (todo.id == id) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }



    eliminarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado); //todos los no completados
        this.guardarLocalStorage();
    }


    guardarLocalStorage() {

        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage() {
        this.todos = (localStorage.getItem('todo')) 
                        ? JSON.parse(localStorage.getItem('todo')) 
                        : [];

        this.todos = this.todos.map(Todo.fromJson);               
    }



}