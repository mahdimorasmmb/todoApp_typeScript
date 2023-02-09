import React, { ReactEventHandler, useState } from "react";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import generateKey from "../../tools/generateKey";
import AddTodoItem from "./AddTodoItem";
import TodoItem from "./TodoItem";

const TodoContainer = () => {
  const [todos, setTodos] = useState([
    "todo1 ",
    "progrsaming",
    "create eng",
    "lern english",
  ]);

  const onAddClicked = (task: string) => {
    setTodos([...todos, task]);
  };
  return (
    <>
      <AddTodoItem onAddClicked={onAddClicked} />
      {todos.map((todo) => (
        <TodoItem key={generateKey(todo)} todo={todo} />
      ))}
    </>
  );
};

export default TodoContainer;
