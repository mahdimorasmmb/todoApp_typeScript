import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import useAutoFocus from "../../hooks/useAutoFocus";

interface Props {
  onAddClicked: (task: string) => void;
}

const AddTodoItem = ({ onAddClicked }: Props) => {
  const inputFieldRef = useAutoFocus();

  const [formData, setFormData] = useState({
    task: "",
  });

  const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddClicked(formData.task);
    setFormData((prev) => ({...prev, task: "" }));
  };

  const onFormChange = useCallback((value: {}) => {
    setFormData((prev) => ({ ...prev, ...value }));
  }, []);

  return (
    <form  onSubmit={handleSumbit}>
      <div className="flex">
        <div className="mr-[10px] flex-grow">
          <TextField
            name="task"
            ref={inputFieldRef}
            value={formData.task}
            onInput={onFormChange}
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
