import React from "react";
import Button from "../../components/Button";
import CheckBoxField from "../../components/CheckBoxField";
import { TodoType, trpc } from "../../utils/trpc";

type Props = TodoType & {
  onDeleteClicked: (id: string) => void;
  onEditClicked: (id: string) => void;
  refetch: () => void;
  // handleTaskDone:(e:React.ChangeEvent<HTMLInputElement>,id:string) => void
};

const TodoItem = ({
  onDeleteClicked,
  onEditClicked,
  id,
  task,
  isDone,
  refetch,
  ...otherProps
}: Props) => {
  const updateTodo = trpc.updateTodo.useMutation();

  const handleTaskDone = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    updateTodo.mutate(
      { id, task, isDone: e.target.checked, ...otherProps },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };
  return (
    <div className="my-3 flex bg-WHITE py-3 px-4 ">
      <div className="mr-1 flex ">
        <CheckBoxField
          defaultValue={isDone}
          onChange={(e) => handleTaskDone(e, id)}
        />
      </div>
      <div className={`mr-auto  flex items-center ${isDone && "line-through"}`}>
        {task}
      </div>
      <div>
        <Button onClick={() => onEditClicked(id)}>
          <i className="fa fa-pencil" />
        </Button>
      </div>
      <div>
        <Button onClick={() => onDeleteClicked(id)}>
          <i className="fa fa-trash" />
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
