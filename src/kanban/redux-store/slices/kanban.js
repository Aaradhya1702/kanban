// Third-party Imports
import { createSlice } from "@reduxjs/toolkit";

const db = {
  columns: [
    {
      id: 1,
      title: "Todo",
      taskIds: [1, 2],
    },
    {
      id: 2,
      title: "In Progress",
      taskIds: [3, 4],
    },
    {
      id: 3,
      title: "Done",
      taskIds: [5, 6],
    },
  ],
  tasks: [
    {
      id: 1,
      title: "Research FAQ page UX",
      badgeText: ["UX"],
      attachments: 4,
      comments: 12,
      assigned: [
        { src: "/avatars/1.png", name: "John Doe" },
        { src: "/avatars/2.png", name: "Jane Smith" },
        { src: "/avatars/3.png", name: "Robert Johnson" },
      ],
      dueDate: new Date(new Date().getFullYear(), 11, 30),
    },
    {
      id: 2,
      title: "Review Javascript code",
      badgeText: ["Code Review"],
      attachments: 2,
      comments: 8,
      assigned: [
        { src: "/avatars/4.png", name: "Emily Davis" },
        { src: "/avatars/5.png", name: " Tom Smith" },
      ],
      dueDate: new Date(new Date().getFullYear(), 5, 30),
    },
    {
      id: 3,
      title: "Review completed Apps",
      badgeText: ["Dashboard"],
      attachments: 8,
      comments: 17,
      assigned: [
        { src: "/avatars/6.png", name: "David Smith" },
        { src: "/avatars/2.png", name: "Jane Smith" },
      ],
      dueDate: new Date(new Date().getFullYear(), 8, 15),
    },
    {
      id: 4,
      title: "Find new images for pages",
      badgeText: ["Images"],
      attachments: 10,
      comments: 18,
      assigned: [
        { src: "/avatars/6.png", name: "David Smit" },
        { src: "/avatars/1.png", name: "John Doe" },
        { src: "/avatars/5.png", name: "Tom Smith" },
        { src: "/avatars/4.png", name: "Emily Davis" },
      ],
      dueDate: new Date(new Date().getFullYear(), 9, 20),
    },
    {
      id: 5,
      title: "Forms & tables section",
      badgeText: ["App"],
      attachments: 5,
      comments: 14,
      assigned: [
        { src: "/avatars/3.png", name: "Robert Johnson" },
        { src: "/avatars/2.png", name: "Jane Smith" },
        { src: "/avatars/1.png", name: "John Doe" },
      ],
      dueDate: new Date(new Date().getFullYear(), 10, 10),
    },
    {
      id: 6,
      title: "Complete charts & maps",
      badgeText: ["Charts & Map"],
      attachments: 6,
      comments: 21,
      assigned: [{ src: "/avatars/1.png", name: "John Doe" }],
      dueDate: new Date(new Date().getFullYear(), 11, 5),
    },
  ],
};

export const kanbanSlice = createSlice({
  name: "kanban",
  initialState: db,
  reducers: {
    addColumn: (state, action) => {
      const maxId = Math.max(...state.columns.map((column) => column.id));

      const newColumn = {
        id: maxId + 1,
        title: action.payload,
        taskIds: [],
      };

      state.columns.push(newColumn);
    },
    editColumn: (state, action) => {
      const { id, title } = action.payload;
      const column = state.columns.find((column) => column.id === id);

      if (column) {
        column.title = title;
      }
    },
    deleteColumn: (state, action) => {
      const { columnId } = action.payload;
      const column = state.columns.find((column) => column.id === columnId);

      state.columns = state.columns.filter((column) => column.id !== columnId);

      if (column) {
        state.tasks = state.tasks.filter(
          (task) => !column.taskIds.includes(task.id)
        );
      }
    },
    updateColumns: (state, action) => {
      state.columns = action.payload;
    },
    updateColumnTaskIds: (state, action) => {
      const { id, tasksList } = action.payload;

      state.columns = state.columns.map((column) => {
        if (column.id === id) {
          return { ...column, taskIds: tasksList.map((task) => task.id) };
        }

        return column;
      });
    },
    addTask: (state, action) => {
      const { columnId, title } = action.payload;

      const newTask = {
        id: state.tasks[state.tasks.length - 1].id + 1,
        title,
      };

      const column = state.columns.find((column) => column.id === columnId);

      if (column) {
        column.taskIds.push(newTask.id);
      }

      state.tasks.push(newTask);

      return state;
    },
    editTask: (state, action) => {
      const { id, title, badgeText, dueDate } = action.payload;
      const task = state.tasks.find((task) => task.id === id);

      if (task) {
        task.title = title;
        task.badgeText = badgeText;
        task.dueDate = dueDate;
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;

      state.tasks = state.tasks.filter((task) => task.id !== taskId);
      state.columns = state.columns.map((column) => {
        return {
          ...column,
          taskIds: column.taskIds.filter((id) => id !== taskId),
        };
      });
    },
    getCurrentTask: (state, action) => {
      state.currentTaskId = action.payload;
    },
  },
});
export const {
  addColumn,
  editColumn,
  deleteColumn,
  updateColumns,
  updateColumnTaskIds,
  addTask,
  editTask,
  deleteTask,
  getCurrentTask,
} = kanbanSlice.actions;
export default kanbanSlice.reducer;
