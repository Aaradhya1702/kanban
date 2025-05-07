// React Imports
import { useEffect, useState } from "react";

// MUI Imports
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { Divider, Menu } from "@mui/material";
// Third-party imports
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { animations } from "@formkit/drag-and-drop";
import classnames from "classnames";

// Slice Imports
import {
  addTask,
  editColumn,
  updateColumnTaskIds,
} from "./redux-store/slices/kanban";

// Component Imports
import TaskCard from "./TaskCard";
import NewTask from "./NewTask";

// Styles Imports
import styles from "./styles.module.css";

const KanbanList = (props) => {
  // Props
  const {
    column,
    tasks,
    dispatch,
    store,
    setDrawerOpen,
    columns,
    setColumns,
    currentTask,
  } = props;

  // States
  const [editDisplay, setEditDisplay] = useState(false);
  const [title, setTitle] = useState(column.title);

  // Hooks
  const [tasksListRef, tasksList, setTasksList] = useDragAndDrop(tasks, {
    group: "tasksList",
    plugins: [animations()],
    draggable: (el) => el.classList.contains("item-draggable"),
  });

  // Add New Task
  const addNewTask = (title) => {
    dispatch(addTask({ columnId: column.id, title: title }));
    setTasksList([
      ...tasksList,
      { id: store.tasks[store.tasks.length - 1].id + 1, title },
    ]);

    const newColumns = columns.map((col) => {
      if (col.id === column.id) {
        return {
          ...col,
          taskIds: [...col.taskIds, store.tasks[store.tasks.length - 1].id + 1],
        };
      }

      return col;
    });

    setColumns(newColumns);
  };

  // Handle Submit Edit
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    setEditDisplay(!editDisplay);
    dispatch(editColumn({ id: column.id, title }));

    const newColumn = columns.map((col) => {
      if (col.id === column.id) {
        return { ...col, title };
      }

      return col;
    });

    setColumns(newColumn);
  };

  // Cancel Edit
  const cancelEdit = () => {
    setEditDisplay(!editDisplay);
    setTitle(column.title);
  };

  // Update column taskIds on drag and drop
  useEffect(() => {
    if (tasksList !== tasks) {
      dispatch(updateColumnTaskIds({ id: column.id, tasksList }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasksList]);

  // To update the tasksList when a task is edited
  useEffect(() => {
    const newTasks = tasksList.map((task) => {
      if (task?.id === currentTask?.id) {
        return currentTask;
      }

      return task;
    });

    if (
      currentTask !== tasksList.find((task) => task?.id === currentTask?.id)
    ) {
      setTasksList(newTasks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTask]);

  // To update the tasksList when columns are updated
  useEffect(() => {
    let taskIds = [];

    columns.map((col) => {
      taskIds = [...taskIds, ...col.taskIds];
    });
    const newTasksList = tasksList.filter(
      (task) => task && taskIds.includes(task.id)
    );

    setTasksList(newTasksList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns]);

  return (
    <div
      ref={tasksListRef}
      className="flex bg-[#F5F5F5] p-4 rounded-md flex-col"
    >
      {editDisplay ? (
        <form
          className="flex items-center mbe-4"
          onSubmit={handleSubmitEdit}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              cancelEdit();
            }
          }}
        >
          <InputBase
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            required
            className="flex-auto"
          />
          <IconButton color="success" size="small" type="submit">
            <i className="tabler-check" />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            type="reset"
            onClick={cancelEdit}
          >
            <i className="tabler-x" />
          </IconButton>
        </form>
      ) : (
        <div
          id="no-drag"
          className={classnames(
            "flex items-center justify-between is-[16.5rem] bs-[2.125rem] mbe-4",
            styles.kanbanColumn
          )}
        >
          <h5 noWrap className="max-is-[80%] mb-3 flex items-center gap-2">
            <div
              className="w-[5px] h-[5px] rounded-full"
              style={{
                backgroundColor:
                  column.id === 1
                    ? "#5030E5"
                    : column.id === 2
                    ? "#FFA500"
                    : "#8BC48A",
              }}
            />
            {column.title}{" "}
            <p className="bg-[#E0E0E0] rounded-full flex items-center justify-center text-[12px] w-[25px] h-[25px] text-center">
              {tasksList.length}
            </p>
          </h5>
          <div className="flex items-center">
            <i
              className={classnames(
                "tabler-arrows-move text-textSecondary list-handle",
                styles.drag
              )}
            />
          </div>
        </div>
      )}
      <Divider
        sx={{
          marginBottom: "15px",
          height: "2.5px",
          borderRadius: "3px",
          backgroundColor:
            column.id === 1
              ? "#5030E5"
              : column.id === 2
              ? "#FFA500"
              : "#8BC48A",
        }}
      />
      {tasksList.map(
        (task) =>
          task && (
            <TaskCard
              key={task.id}
              task={task}
              dispatch={dispatch}
              column={column}
              setColumns={setColumns}
              columns={columns}
              setDrawerOpen={setDrawerOpen}
              tasksList={tasksList}
              setTasksList={setTasksList}
            />
          )
      )}
      <NewTask addTask={addNewTask} />
    </div>
  );
};

export default KanbanList;
