import { useEffect, useState } from "react";

// Third-party imports
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { animations } from "@formkit/drag-and-drop";
import { useDispatch, useSelector } from "react-redux";

// Slice Imports
import { updateColumns } from "./redux-store/slices/kanban";

// Component Imports
import KanbanList from "./KanbanList";
import KanbanDrawer from "./KanbanDrawer";

const KanbanBoard = () => {
  // State
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Hooks
  const kanbanStore = useSelector((state) => state.kanbanReducer);
  const dispatch = useDispatch();

  const [boardRef, columns, setColumns] = useDragAndDrop(kanbanStore.columns, {
    plugins: [animations()],
    dragHandle: ".list-handle",
  });

  // To get the current task for the drawer
  const currentTask = kanbanStore.tasks.find(
    (task) => task.id === kanbanStore.currentTaskId
  );

  // Update Columns on Drag and Drop
  useEffect(() => {
    if (columns !== kanbanStore.columns) dispatch(updateColumns(columns));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns]);

  return (
    <div className="flex items-start gap-6 w-full">
      <div
        ref={boardRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {columns.map((column) => (
          <KanbanList
            key={column.id}
            dispatch={dispatch}
            column={column}
            store={kanbanStore}
            setDrawerOpen={setDrawerOpen}
            columns={columns}
            setColumns={setColumns}
            currentTask={currentTask}
            tasks={column.taskIds.map((taskId) =>
              kanbanStore.tasks.find((task) => task.id === taskId)
            )}
          />
        ))}
      </div>
      {/* <NewColumn addNewColumn={addNewColumn} /> */}
      {currentTask && (
        <KanbanDrawer
          task={currentTask}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          dispatch={dispatch}
          columns={columns}
          setColumns={setColumns}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
