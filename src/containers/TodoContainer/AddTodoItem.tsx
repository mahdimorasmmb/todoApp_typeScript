import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import useAutoFocus from "../../hooks/useAutoFocus";

interface Props {
  onAddClicked: (task: string) => void;
}

const AddTodoItem = ({ onAddClicked }: Props) => {
  const inputFieldRef = useAutoFocus();

  const [task, setTask] = useState("");

  const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddClicked(task);
    setTask("");
  };

  return (
    <form onSubmit={handleSumbit}>
      <div className="flex">
        <div className="mr-[10px] flex-grow">
          <TextField
            ref={inputFieldRef}
            value={task}
            onChange={(event) => setTask(event.target.value)}
          />
        </div>
        <div>
          <Button type="submit" variant="primary">
            add
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddTodoItem;
