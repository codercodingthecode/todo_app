import {Button,  List, ListItem,  ListItemText } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootDispatch, RootState} from "../store";
import {actions} from "../App";

interface TodosListProps {
    action: (todo: {action: actions,  id?: string}) => void;
}

export const TodosList: React.FC<TodosListProps> = ({action}) => {
    const state = useSelector((state: RootState) => state.todos);
    const dispatch = useDispatch<RootDispatch>();
    return (
        <List>
            {state.todos.map((todo) => (
                <ListItem key={todo.id}>
                    <ListItemText primary={todo.name} secondary={todo.owner}/>
                    <Button variant="contained" color="primary" sx={{marginRight: 2}}
                        onClick={() => action({action: 'edit', id: todo.id})}
                    >Edit</Button>
                    <Button variant="contained" color="error" onClick={() => {
                        dispatch.todos.deleteTodo(todo.id);
                    }} >Delete</Button>
                </ListItem>
            ))}
        </List>
    )
}