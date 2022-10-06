import React, {useEffect } from 'react';
import {Button, Container, Grid, Typography} from "@mui/material";
import {TodosList} from "./Components/TodosList";
import {RootDispatch } from "./store";
import {useDispatch } from "react-redux";
import {TodoForm} from "./Components/TodoForm";

export type actions = "edit" | "delete" | "create" | "display";

function App() {
  const dispatch = useDispatch<RootDispatch>();
  const [action, setAction] = React.useState<actions>("display");
  const [selectedTodo, setSelectedTodo] = React.useState<string | undefined>(undefined);


  useEffect(() => {
     dispatch.todos.fetchTodos();
  }, []);

  const handleActions = (todo: {action: actions, id?: string}) => {
    switch (todo.action) {
      case "edit":
        setAction("edit");
        setSelectedTodo(todo.id);
        break;
      case "delete":
        setAction("delete");
        break;
      case "create":
        setAction("create");
        break;
      case "display":
          setSelectedTodo(undefined);
        setAction("display");
        break;
    }

  }

  return (
      <Container maxWidth="md">
          <Grid container spacing={2} justifyContent={"center"} >
              <Grid item xs={12} md={12}>
                  <Typography variant="h1" align={"center"}>Todos</Typography>
              </Grid>

                <Grid item xs={12} md={6}>
                    <TodosList action={handleActions}/>
                    {
                        action !== 'display' && <TodoForm action={handleActions} todoId={selectedTodo} actionType={action}/>
                    }
                </Grid>
              <Grid container item xs={12} justifyContent={"center"}>
                  <Button disabled={action !== 'display'} variant={"contained"} onClick={() => setAction('create')}>Add Todo</Button>
              </Grid>
          </Grid>
      </Container>
  );
}

export default App;
