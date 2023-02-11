import generateKey from "../../tools/generateKey";
import { trpc } from "../../utils/trpc";
import AddTodoItem from "./AddTodoItem";
import TodoItem from "./TodoItem";

const TodoContainer = () => {
  const getTodos = trpc.todos.useQuery({});
  const addTodo = trpc.addTodo.useMutation();
  const deletedTodo = trpc.deleteTodo.useMutation()

  const onAddClicked = async (task: string) => {
    await addTodo.mutate(
      { task },
      {
        onSuccess: () => {
          getTodos.refetch();
        },
      }
    );
  };

  const onDeleteClicked = (id:string) =>{
    deletedTodo.mutate({id},{onSuccess:() =>{
      getTodos.refetch();
    }})
  } 
  return (
    <>
      <AddTodoItem onAddClicked={onAddClicked} />
      {getTodos.data?.map((todo) => (
        <TodoItem key={generateKey(todo.id)}{...todo} onDeleteClicked={onDeleteClicked} />
      ))}
    </>
  );
};

export default TodoContainer;
