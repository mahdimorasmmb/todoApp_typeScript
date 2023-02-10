import React from "react";
import Button from "../../components/Button";
import CheckBoxField from "../../components/CheckBoxField";

interface Props {
    todo:string
}

const TodoItem = ({todo}:Props) => {
  return (
    <div className="my-3 flex bg-WHITE py-3 px-4 ">
      <div className="flex mr-1 ">
        <CheckBoxField />
      </div>
      <div className="mr-auto  flex items-center">{todo}</div>
      <div>
        <Button>
          <i className="fa fa-pencil" />
        </Button>
      </div>
      <div>
        <Button>
          <i className="fa fa-trash" />
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
