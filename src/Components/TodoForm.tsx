import {Button, Grid, TextField, Typography} from "@mui/material";
import {actions }  from "../App";
import {RootDispatch, RootState, Todo} from "../store";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {v4 as uuid} from 'uuid';

interface TodoProps {
    action: (todo: {action: actions, id?: string}) => void;
    todoId?: string;
    actionType?: actions;
}

export const TodoForm: React.FC<TodoProps> = ({action, todoId, actionType}) => {
    const dispatch = useDispatch<RootDispatch>();
    const state = useSelector((state: RootState) => state);
    const [todo, setTodo] = useState<Todo | undefined>(undefined);

    useEffect(() => {
        if (todoId) {
            state.todos?.todos.find((todo) => todo.id === todoId) && setTodo(state.todos?.todos.find((todo) => todo.id === todoId));
        }
        else {
            setTodo({
                name: "", owner: "",
                id: uuid()
            })
        }
    }, [todoId]);

    const handleTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setTodo({
            ...todo,
            [e.target.id]: e.target.value
        })
    }

    return (
        <Grid container spacing={2}>
        <Grid item xs={12} >
            <Typography variant="h4" align={"center"}>{actionType === 'edit' ? 'Edit': 'Create'} Todo</Typography>
        </Grid>
            <Grid item xs={12}>
                <TextField id="name" label="Todo Name" fullWidth value={todo?.name} onChange={handleTodo} />
            </Grid>
            <Grid item xs={12}>
                <TextField id="owner" label="Owner" fullWidth  value={todo?.owner} onChange={handleTodo}/>
            </Grid>

            <Grid container item xs={12} justifyContent={"flex-end"} spacing={2}>
                <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        if (actionType === 'edit') {
                            todo && dispatch.todos.updateTodo(todo);
                        }
                        if (actionType === 'create') {
                            todo && dispatch.todos.addTodo(todo);
                        }
                        action({action: 'display'})
                    }}>
                    Save
                </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            action({action: 'display'})
                        }}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}