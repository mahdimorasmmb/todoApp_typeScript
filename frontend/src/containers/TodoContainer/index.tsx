import { useAtom } from "jotai";
import { useState } from "react";
import ButtonSelect from "../../components/ButtonSelect";
import {  useAppState } from "../../store";
import generateKey from "../../tools/generateKey";
import { trpc } from "../../utils/trpc";
import EditContainer from "../EditContainer";
import AddTodoItem from "./AddTodoItem";
import TodoItem from "./TodoItem";

const TodoContainer = () => {
  const [todoStateFilter, setTodoStateFilter] = useState("all");
  const {open}  = useAppState()
  const getTodos = trpc.todos.useQuery({ isDone: todoStateFilter });
  const addTodo = trpc.addTodo.useMutation();
  const deletedTodo = trpc.deleteTodo.useMutation();

  const onAddClicked = (task: string) => {
    addTodo.mutate(
      { task },
      {
        onSuccess: () => {
          getTodos.refetch();
        },
      }
    );
  };

  const onDeleteClicked = (id: string) => {
    deletedTodo.mutate(
      { id },
      {
        onSuccess: () => {
          getTodos.refetch();
        },
      }
    );
  };

  const onEditClicked = (id: string) => {
    open(id)
  };

  const onSelectOption = (value: string) => {
    setTodoStateFilter(value);
    getTodos.refetch();
  };

  const buttonSelectOption = [
    { label: "All", value: "all" },
    { label: "Done", value: "true" },
    { label: "Not Done", value: "false" },
  ];

  return (
    <>
      <AddTodoItem onAddClicked={onAddClicked} />
      <div className="mt-4">
        <ButtonSelect
          onInput={onSelectOption}
          value={todoStateFilter}
          options={buttonSelectOption}
        />
      </div>
      {getTodos.data?.map((todo) => (
        <TodoItem
          refetch={getTodos.refetch}
          onEditClicked={onEditClicked}
          key={generateKey(todo.id)}
          {...todo}
          onDeleteClicked={onDeleteClicked}
        />
      ))}
    </>
  );
};

export default TodoContainer;
