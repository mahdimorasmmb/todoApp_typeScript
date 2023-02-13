import { useAtom } from "jotai";
import { taskAtom } from "../../store/selectedTask";
import generateKey from "../../tools/generateKey";
import { trpc } from "../../utils/trpc";
import EditContainer from "../EditContainer";
import AddTodoItem from "./AddTodoItem";
import TodoItem from "./TodoItem";

const TodoContainer = () => {
  const [, setTaskId] = useAtom(taskAtom);
  const getTodos = trpc.todos.useQuery({});
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
    setTaskId(id);
  };

  return (
    <>
      <AddTodoItem onAddClicked={onAddClicked} />
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
