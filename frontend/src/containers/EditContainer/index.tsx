import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import CheckBoxField from "../../components/CheckBoxField";
import ConvasField from "../../components/ConvasField";
import TextAreaField from "../../components/TextAreaField";
import TextField from "../../components/TextField";
import { taskAtom } from "../../store/selectedTask";
import { trpc, TodoType } from "../../utils/trpc";

interface Props {
  taskId: string;
}

const EditContainer = ({ taskId }: Props) => {
  const [, setTaskeId] = useAtom(taskAtom);
  const { data, isLoading, isSuccess, remove } = trpc.todo.useQuery({
    id: taskId,
  });
  const [formData, setFormData] = useState({
    description: data?.description,
    task: data?.task,
    isDone: data?.isDone,
    handNotes: data?.handNotes,
  });

  const updateTodo = trpc.updateTodo.useMutation();
  const todos = trpc.useContext();

  const closeDrawer = () => {
    setTaskeId("");
  };

  const handleUpdate = async () => {
    if (data) {
      updateTodo.mutate(
        {
          description: formData.description,
          id: data?.id,
          isDone: formData.isDone,
          handNotes: formData.handNotes,
          task: formData.task,
        },
        {
          onSuccess: async () => {
            await todos.todos.refetch();
            remove();
            setTaskeId("");
          },
        }
      );
    }
  };

  useEffect(() => {
    setFormData({
      description: data?.description === null ? "" : data?.description,
      task: data?.task === null ? "" : data?.task,
      isDone: data?.isDone,
      handNotes: data?.handNotes === null ? "" : data?.handNotes,
    });
  }, [data]);

  if (data && isSuccess) {
    return (
      <div className="absolute top-0 right-0 bottom-0 w-[400px] bg-white py-3 px-4 shadow-[0_0_5px_rgb(78,78,78)] overflow-auto">
        <h2 className="text-2xl font-bold">Edit Todo</h2>
        <div>
          <TextField
            name="Task"
            label="Taske"
            defaultValue={data.task === null ? "" : data.task}
            onChange={(e) => {
              setFormData({ ...formData, task: e.target.value });
            }}
          />
          <CheckBoxField
            defaultValue={data.isDone}
            // value={formData.isDone}
            name="isDone"
            label="is Done?"
            onChange={(e) => {
              setFormData({ ...formData, isDone: e.target.checked });
            }}
          />
          <TextAreaField
            defaultValue={data.description === null ? "" : data.description}
            name="description"
            label="Description"
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}
          />
          <ConvasField
          label="Hand Notes"
            value={formData.handNotes}
            onInput={(value) => setFormData({ ...formData, handNotes: value })}
          />
        </div>
        <div className="flex mt-3">
          <Button className="flex-grow mr-3" onClick={handleUpdate} variant="primary">
            Save
          </Button>
          <Button  className="flex-grow " onClick={closeDrawer} variant="secondary">
            Cansel
          </Button>
        </div>
      </div>
    );
  }
  return null;
};

export default EditContainer;
