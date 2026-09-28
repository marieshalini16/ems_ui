import { createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";

import { getTasks, getTaskPriorities, getTaskStatuses, createTask, updateTask, updateTaskStatus, deleteTask} from "../../features/admin/tasks/tasks.api";
import type { CreateTaskRequest, Task, TaskPriority, TaskQuery, TaskStatus, UpdateTaskRequest, UpdateTaskStatusRequest} from "../../features/admin/tasks/tasks.types";


interface TaskState {

  tasks: Task[];
  priorities: TaskPriority[];
  statuses: TaskStatus[];
  search: string;
  priorityId: string;
  statusId: string;
  assignTo: string;
  page: number;
  totalPages: number;
  total: number;
  loading: boolean;
  formLoading: boolean;
  error: string | null;
}


const initialState: TaskState = {

  tasks: [],
  priorities: [],
  statuses: [],
  search: "",
  priorityId: "",
  statusId: "",
  assignTo: "",
  page: 1,
  totalPages: 1,
  total: 0,
  loading: false,
  formLoading: false,
  error: null,
};


export const fetchTasks = createAsyncThunk("tasks/fetchTasks",

  async (query: TaskQuery,{ rejectWithValue }) => {

    try {
      return await getTasks(query);
    } 
    
    catch (error: any) {

      return rejectWithValue(error?.response?.data?.message ??
        "Failed to load tasks.");
    }
  },
);


export const fetchTaskPriorities = createAsyncThunk("tasks/fetchPriorities",

    async (_,{ rejectWithValue }) => {

      try {
        return await getTaskPriorities();
      } 
      
      catch (error: any) {

        return rejectWithValue(error?.response?.data?.message ??
          "Failed to load priorities.",
        );
      }
    },
  );


export const fetchTaskStatuses = createAsyncThunk("tasks/fetchStatuses",

    async (_,{ rejectWithValue }) => {

      try {
        return await getTaskStatuses();
      } 
      
      catch (error: any) {

        return rejectWithValue(error?.response?.data?.message ??
          "Failed to load statuses.",
        );
      }
    },
  );


export const addTask = createAsyncThunk("tasks/addTask",

  async (data: CreateTaskRequest,{ rejectWithValue }) => {

    try {
      return await createTask(data);
    } 
    catch (error: any) {

      return rejectWithValue(error?.response?.data?.message ??
        "Failed to create task.",
      );
    }
  },
);


export const editTask = createAsyncThunk("tasks/editTask",

  async ({ id, data,}: { id: number; data : UpdateTaskRequest;},
    { rejectWithValue }) => {

    try {
      return await updateTask( id,data);
    } 
    
    catch (error: any) {

      return rejectWithValue( error?.response?.data?.message ??
        "Failed to update task.",
      );
    }
  },
);

export const changeTaskStatus = createAsyncThunk("tasks/changeStatus",

    async ({ id, data,}: { id: number;data: UpdateTaskStatusRequest;},
      { rejectWithValue }) => {

      try {
        return await updateTaskStatus(id,data);
      } 
      
      catch (error: any) {

        return rejectWithValue( error?.response?.data?.message ??
          "Failed to update task status.",
        );
      }
    },
  );


export const removeTask =createAsyncThunk("tasks/removeTask",

    async (id: number,{ rejectWithValue }) => {

      try {
        await deleteTask(id);
        return id;
      } 
      
      catch (error: any) {

        return rejectWithValue(error?.response?.data?.message ??
          "Failed to delete task.",
        );
      }
    },
  );


const taskSlice = createSlice({

  name: "tasks",
  initialState,
  reducers: {

    setSearch(state,action: PayloadAction<string>) {
      state.search =action.payload;
      state.page = 1;
    },


    setPriorityId(state,action: PayloadAction<string>) {
      state.priorityId =action.payload;
      state.page = 1;
    },


    setStatusId(state,action: PayloadAction<string>) {
      state.statusId =action.payload;
      state.page = 1;
    },


    setAssignTo(state,action: PayloadAction<string>) {
      state.assignTo =action.payload;
      state.page = 1;
    },


    setPage(state,action: PayloadAction<number>) {
      state.page =action.payload;
    },


    clearTaskError(state) {
      state.error = null;
    },
  },


  extraReducers: (builder) => {
    builder   
      .addCase(fetchTasks.pending,(state) => {

          state.loading = true;
          state.error = null;
        },
      )

      .addCase(fetchTasks.fulfilled,(state, action) => {

          state.loading = false;
          state.tasks = action.payload.data;
          state.total = action.payload.pagination.total;
          state.page = action.payload.pagination.page;
          state.totalPages = action.payload.pagination.totalPages;
        },
      )

      .addCase(fetchTasks.rejected,(state, action) => {

          state.loading = false;
          state.error = (action.payload as string) ?? "Failed to load tasks.";
        },
      )

      .addCase( fetchTaskPriorities.fulfilled, (state, action) => {

          state.priorities = action.payload;
        },
      )

      .addCase( fetchTaskStatuses.fulfilled, (state, action) => {

          state.statuses = action.payload;
        },
      )

      .addCase(addTask.pending,(state) => {

          state.formLoading = true;
          state.error = null;
        },
      )

      .addCase( addTask.fulfilled, (state) => {

          state.formLoading = false;
        },
      )

      .addCase( addTask.rejected, (state, action) => {

          state.formLoading = false;
          state.error = (action.payload as string) ?? "Failed to create task.";
        },
      )

      .addCase( editTask.pending,(state) => {

          state.formLoading = true;
          state.error = null;
        },
      )

      .addCase(editTask.fulfilled,(state) => {

          state.formLoading = false;
        },
      )

      .addCase(editTask.rejected,(state, action) => {

          state.formLoading = false;
          state.error =  (action.payload as string) ??  "Failed to update task.";
        },
      )


      .addCase(changeTaskStatus.pending,(state) => {

          state.formLoading = true;
          state.error = null;
        },
      )

      .addCase(changeTaskStatus.fulfilled,(state) => {

          state.formLoading = false;
        },
      )

      .addCase(changeTaskStatus.rejected,(state, action) => {

          state.formLoading = false;
          state.error = (action.payload as string) ?? "Failed to update task status.";
        },
      )

      .addCase(  removeTask.fulfilled,  (state, action) => {

          state.tasks =  state.tasks.filter( (task) =>
                task.id !== action.payload,
            );
        },
      )

      .addCase(removeTask.rejected,(state, action) => {

          state.error =  (action.payload as string) ??  "Failed to delete task.";
        },
      );
  },
});


export const {
  setSearch,
  setPriorityId,
  setStatusId,
  setAssignTo,
  setPage,
  clearTaskError,
} = taskSlice.actions;


export default taskSlice.reducer;