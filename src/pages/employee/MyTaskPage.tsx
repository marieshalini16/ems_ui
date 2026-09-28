import { useEffect, useState, } from "react";

import MyTaskList from "../../features/employee/mytask/MyTaskList";
import MyTaskUpdateForm from "../../features/employee/mytask/MyTaskUpdateForm";
import { getMyTasks, getMyTaskStatuses, updateMyTask, } from "../../features/employee/mytask/mytask.api";
import type { MyTask, MyTaskStatus, UpdateMyTaskRequest, } from "../../features/employee/mytask/mytask.types";


export default function MyTasksPage() {

  const [ tasks, setTasks, ] = useState<MyTask[]>([]);
  const [ statuses, setStatuses, ] = useState<MyTaskStatus[]>([]);
  const [ loading, setLoading, ] = useState(true); 
  const [ formLoading, setFormLoading, ] = useState(false);
  const [ error, setError, ] = useState<string | null>(null); 
  const [ selectedTask, setSelectedTask, ] = useState<MyTask | null>(null);

  async function loadTasks() {
  
    try {
    setLoading(true);
    setError(null);

    const [taskData, statusData] = await Promise.all([
      getMyTasks(),
      getMyTaskStatuses(),
    ]);

    setTasks(taskData);
    setStatuses(statusData);
  } 
  
  catch (error) {
    setError( error instanceof Error ? error.message : "Failed to load tasks", );
  } 
  
  finally {
    setLoading(false);
  }
}

  useEffect(() => {
    loadTasks();
  }, []);

  
  function handleUpdateTask(task: MyTask) {
  setSelectedTask(task);
}


  async function handleSubmit( data: UpdateMyTaskRequest, ) {
    
    if (!selectedTask) {
      return;
    }

    try {
      setFormLoading(true);
      setError(null);

      await updateMyTask( selectedTask.id, data, );
      setSelectedTask(null);
      await loadTasks();
    } 
    
    catch (error) {
      setError( error instanceof Error ? error.message : "Failed to update task");
    } 
    
    finally {
      setFormLoading(false);
    }
  }

  
  function handleLogout() {
    
    localStorage.removeItem( "access_token", );
    window.location.href = "/login";
  }

  if ( error && !selectedTask ) {
   
    return (
      <div className=" flex min-h-screen items-center justify-center bg-background " >
        <div className="text-center">
          <p className=" text-sm font-medium text-danger-600 " >
            {error}
          </p>

          <button
            type="button"
            onClick={loadTasks}
            className=" mt-3 text-sm font-medium text-primary-600 hover:text-primary-700 "
          >
            Try again
          </button>
        </div>
      </div>
    );
  }


  return (
    <>
      <MyTaskList
        userName="Employee"
        tasks={tasks}
        loading={loading}
        onUpdateTask={ handleUpdateTask }
        onLogout={ handleLogout }
      />

      {selectedTask && (
        <MyTaskUpdateForm
          task={selectedTask}
          statuses={statuses}
          loading={formLoading}
          onSubmit={ handleSubmit } 
          onClose={() => setSelectedTask(null) }
        />
      )}

      {error && selectedTask && (
        <div className=" fixed bottom-5 right-5 z-[60] rounded-md border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-700 shadow-card " >
          {error}
        </div>
      )}
    </>
  );
}