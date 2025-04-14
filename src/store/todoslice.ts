import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Task {
  id: string;
  title: string;
  subTasks: Task[];
}

interface TodoState {
  tasks: Task[];
}

const initialState: TodoState = {tasks: []};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    addSubTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    editTask: (state, action: PayloadAction<{id: string; title: string}>) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) task.title = action.payload.title;
    },
    editSubTask: (
      state,
      action: PayloadAction<{ taskId: string; subTaskId: string; title: string }>
    ) => {
      const { taskId, subTaskId, title } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
    
      if (task) {
        const subTask = task.subTasks.find(st => st.id === subTaskId);
        if (subTask) {
          subTask.title = title;
        }
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    deleteSubTask: (
      state,
      action: PayloadAction<{ taskId: string; subTaskId: string }>
    ) => {
      const { taskId, subTaskId } = action.payload;
      const taskIndex = state.tasks.findIndex(t => t.id === taskId);
    
      if (taskIndex !== -1) {
        state.tasks[taskIndex].subTasks = state.tasks[taskIndex].subTasks.filter(
          subTask => subTask.id !== subTaskId
        );
      }
    },
    resetTasks: () => initialState,
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  resetTasks,
  addSubTask,
  deleteSubTask,
  editSubTask
} = todoSlice.actions;
export default todoSlice.reducer;
