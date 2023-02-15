import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import Button from "../../components/Button";
import CheckBoxField from "../../components/CheckBoxField";
import ConvasField from "../../components/ConvasField";
import TextAreaField from "../../components/TextAreaField";
import TextField from "../../components/TextField";
import { withSideDrawer } from "../../hoc/withSideDrawer";
import { taskAtom, useAppState } from "../../store";
import { trpc, TodoType } from "../../utils/trpc";

interface Props {
  id: string;
}

const EditContainer = ({ id }: Props) => {
  const { appState, close } = useAppState();
  const { data, isLoading, isSuccess, remove } = trpc.todo.useQuery(
    {
      id: appState.editTodoId,
    },
    {
      enabled: !!appState.editTodoId,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: Infinity,
    }
  );
  const [formData, setFormData] = useState({
    description: data?.description,
    task: data?.task,
    isDone: data?.isDone,
    handNotes: data?.handNotes,
  });

  const updateTodo = trpc.updateTodo.useMutation();
  const todos = trpc.useContext();

  const closeDrawer = () => {
    close();
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
            closeDrawer();
          },
        }
      );
    }
  };

  const onFormChange = useCallback((value: {}) => {
    setFormData((prev) => ({ ...prev, ...value }));
  }, []);

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
      <>
        <h2 className="text-2xl font-bold">Edit Todo</h2>
        <div>
          <TextField
            name="task"
            label="Taske"
            defaultValue={data.task === null ? "" : data.task}
            onInput={onFormChange}
          />
          <CheckBoxField
            defaultValue={data.isDone}
            // value={formData.isDone}
            name="isDone"
            label="is Done?"
            onInput={onFormChange}
          />
          <TextAreaField
            defaultValue={data.description === null ? "" : data.description}
            name="description"
            label="Description"
            onInput={onFormChange}
          />
          <ConvasField
            name="handNotes"
            label="Hand Notes"
            value={formData.handNotes}
            onInput={onFormChange}
          />
        </div>
        <div className="mt-3 flex">
          <Button
            className="mr-3 flex-grow"
            onClick={handleUpdate}
            variant="primary"
          >
            Save
          </Button>
          <Button
            className="flex-grow "
            onClick={closeDrawer}
            variant="secondary"
          >
            Cansel
          </Button>
        </div>
      </>
    );
  }
  return null;
};

export default withSideDrawer(EditContainer);
