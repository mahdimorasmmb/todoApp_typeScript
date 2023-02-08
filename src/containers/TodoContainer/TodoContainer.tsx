import React from "react";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import generateKey from "../../tools/generateKey";
import TodoItem from "./TodoItem";

const TodoContainer = () => {
  const todos = ["todo1 ", "progrsaming", "create eng", "lern english"];
  return (
    <>
      <form>
        <div className="flex">
          <div className="flex-grow mr-[10px]">
            <TextField />
          </div>
          <div>
            <Button type="primary">add</Button>
          </div>
        </div>
      </form>
      {todos.map((todo) => (
        <TodoItem key={generateKey(todo)} todo={todo} />
      ))}
    </>
  );
};

export default TodoContainer;
