import {createModel, init, Models, RematchDispatch, RematchRootState} from "@rematch/core";
import axios from "axios";
export const API = "http://localhost:8080/todos";

export interface Todo {
    id:    string,
    name:  string,
    owner: string,
}

export interface TodoState {
    todos: Todo[],
}

const todosModel = createModel<RootModel>()({
    state: {
        todos: []
    } as TodoState,
    reducers: {
        setTodos(state, payload: Todo[]) {
            return {
                ...state,
                todos: payload
            }
        },
    },
    effects: (dispatch) => ({
        async addTodo(payload: Todo, state) {
            const todos = await axios.post<Todo[]>(`${API}`, payload)
            dispatch.todos.setTodos(todos.data);
        },
        async updateTodo(payload: Todo, state) {
            const todos = await axios.put<Todo[]>(`${API}/${payload.id}`, payload)
            dispatch.todos.setTodos(todos.data);
        },
        async deleteTodo(payload: string, state) {
            const todos = await axios.delete(`${API}/${payload}`);
            dispatch.todos.setTodos(todos.data);
        },
        async fetchTodos() {
            const todos = await axios.get(`${API}`);
            dispatch.todos.setTodos(todos.data);
        }
    })
});

interface RootModel extends Models<RootModel> {
    todos: typeof todosModel;
}

const models: RootModel = {todos: todosModel};

export const store = init({
    models,
});

export type Store = typeof store;
export type RootDispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

