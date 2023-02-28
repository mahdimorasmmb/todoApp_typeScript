import React from "react";
import { trpc } from "../../utils/trpc";





const StatsContainer = () => {
//   const { data } = trpc.todos.useQuery({});
 const {data} =  trpc.todos.useQuery({})
  const todoDone = data?.filter(({ isDone }) => isDone);
  const todoNotDone = data?.filter(({ isDone }) => !isDone);

  return (
    <div className="">
      <h2 className="">Stats</h2>
      <div className="-mx-[10px] flex">
        <div className="flex-1 px-3">
          <div className="mt-[10px] text-base font-semibold">
            To Do({todoDone?.length})
          </div>
          <ul className="mt-2">
            {todoDone?.map((todo) => (
              <li
                className="mb-[10px] rounded bg-WHITE py-2 px-4 shadow-[0_0_5px_rgb(78,78,78)]"
                key={todo.id}
              >
                {todo.task}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-[10px] ml-2 text-base font-semibold">
          <div>Not Done({todoNotDone?.length})</div>
          <ul className="mt-2">
            {todoNotDone?.map((todo) => (
              <li
                className="mb-[10px] rounded bg-WHITE py-2 px-4 shadow-[0_0_5px_rgb(78,78,78)]"
                key={todo.id}
              >
                {todo.task}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StatsContainer;
