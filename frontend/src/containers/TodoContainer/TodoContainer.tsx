import React, { ReactEventHandler, useState } from "react";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import generateKey from "../../tools/generateKey";
import { trpc } from "../../utils/trpc";
import AddTodoItem from "./AddTodoItem";
import TodoItem from "./TodoItem";

const TodoContainer = () => {
  const todos = trpc.todos.useQuery();
  const mutation = trpc.addTodo.useMutation();

  const onAddClicked = async (task: string) => {
    await mutation.mutate({ todo: task },{onSuccess:()=>{
      todos.refetch()
    }});


  };
  return (
    <>
      <AddTodoItem onAddClicked={onAddClicked} />
      {todos.data?.map((todo) => (
        <TodoItem key={generateKey(todo.id)} todo={todo.content} />
      ))}
    </>
  );
};

export default TodoContainer;
