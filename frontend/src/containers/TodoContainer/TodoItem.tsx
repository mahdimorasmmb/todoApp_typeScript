import React from "react";
import Button from "../../components/Button";
import CheckBoxField from "../../components/CheckBoxField";
import type { TodoType } from "../../utils/trpc";

type Props  = TodoType & {onDeleteClicked: (id: string) => void}

// interface Props {
//   todo: TodoType;
//   onDeleteClicked: (id: string) => void;
// }

const TodoItem = ({ onDeleteClicked,id,task }: Props) => {
  return (
    <div className="my-3 flex bg-WHITE py-3 px-4 ">
      <div className="mr-1 flex ">
        <CheckBoxField />
      </div>
      <div className="mr-auto  flex items-center">{task}</div>
      <div>
        <Button>
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
