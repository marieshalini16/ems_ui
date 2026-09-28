import { useEffect, useState, } from "react";

import TaskList from "../../features/admin/tasks/TaskList";
import type { Task, TaskEmployee, TaskFormData, } from "../../features/admin/tasks/tasks.types";
import { useAppDispatch, useAppSelector, } from "../../app/hooks";
import { fetchTasks, fetchTaskPriorities, fetchTaskStatuses, addTask, editTask, removeTask, setSearch, setPriorityId, setStatusId, setAssignTo, setPage, } from "../../store/slices/taskSlice";
import { getEmployees, } from "../../features/admin/employees/employees.api";

export default function TaskListPage() {

  const dispatch = useAppDispatch();
  const { tasks, priorities, statuses, search, priorityId, statusId, assignTo, page, totalPages, loading, formLoading} 
  = useAppSelector( (state) => state.tasks, );

  const [ employees, setEmployees, ] = useState<TaskEmployee[]>([]);
  const [ showForm, setShowForm, ] = useState(false);
  const [ formMode, setFormMode, ] = useState< "create" | "edit" >("create");
  const [ selectedTask, setSelectedTask, ] = useState< Task | undefined >();

  useEffect(() => {

    dispatch( fetchTasks({

        search: search.trim() || undefined,
        priority_id: priorityId ? Number(priorityId) : undefined,
        status_id: statusId ? Number(statusId) : undefined,
        assign_to: assignTo ? Number(assignTo) : undefined,
        page,
        limit: 5,
      }),
    );

  }, [dispatch, search, priorityId, statusId, assignTo, page]);


  useEffect(() => {

    dispatch( fetchTaskPriorities(), );
    dispatch( fetchTaskStatuses(), );

  }, [dispatch]);


  useEffect(() => {

    const loadEmployees = async () => {

        try {

          const response = await getEmployees({
              page: 1,
              limit: 100,
              is_active: 1,
            });


          setEmployees( response.data.map( (employee) => ({
                id: employee.id,
                full_name: employee.full_name,
                email: employee.email,
              }),
            ),
          );

        } 
        
        catch (error) {

          console.error( "Failed to load employees:", error, );
        }
      };

    loadEmployees();

  }, []);


  const handleAddTask = () => {

    setSelectedTask( undefined); 
    setFormMode( "create"); 
    setShowForm( true);
  };

  const handleEditTask = ( task: Task, ) => {

    setSelectedTask( task, ); 
    setFormMode( "edit", ); 
    setShowForm( true, );
  };

  const handleSubmit = async ( data: TaskFormData, ): Promise<void> => {

    try {

      if ( data.assign_to === "" ) {
        console.error( "Assign To is required.", );
        return;
      }

      if ( data.priority_id === "" ) {
        console.error( "Priority is required.", );
        return;
      }

      if ( data.status_id === "" ) {
        console.error( "Status is required.", );
        return;
      }

      const taskData = {
        title: data.title,
        description: data.description || undefined,
        assign_to: data.assign_to, 
        priority_id: data.priority_id, 
        status_id: data.status_id,
        due_date: data.due_date || undefined,
        comments: data.comments || undefined,
      };

      if ( formMode === "create" ) {
        await dispatch( addTask(taskData), ).unwrap();

      }

      else if ( selectedTask ) {

        await dispatch( editTask({
            id: selectedTask.id,
            data: taskData,
          }),
        ).unwrap();
      }

      setShowForm(false);
      setSelectedTask( undefined, );

      dispatch( fetchTasks({

          search: search.trim() || undefined,
          priority_id: priorityId ? Number(priorityId) : undefined,
          status_id: statusId ? Number(statusId) : undefined,
          assign_to: assignTo ? Number(assignTo) : undefined,
          page,
          limit: 5,
        }),
      );

    } 
    
    catch (error) {

      console.error( "FAILED TO SAVE TASK:", error, );
    }
  };

  const handleDeleteTask = async ( task: Task, ) => {

    const confirmed = window.confirm( `Are you sure you want to delete "${task.title}"?`, );


    if (!confirmed) {
      return;
    }

    try {

      await dispatch( removeTask(task.id), ).unwrap();

      dispatch( fetchTasks({

          search: search.trim() || undefined,
          priority_id: priorityId ? Number(priorityId) : undefined,
          status_id: statusId ? Number(statusId) : undefined,
          assign_to: assignTo ? Number(assignTo) : undefined,
          page,
          limit: 5,
        }),
      );

    } 
    
    catch (error) {

      console.error( "Failed to delete task:", error, );
    }
  };

  const handleLogout = () => {

    localStorage.removeItem( "access_token", ); 
    window.location.href = "/login";
  };

  const handleCloseForm = () => {

    setShowForm(false);
    setSelectedTask( undefined, );
  };

  return (

    <TaskList
      userName="Admin"
      tasks={tasks}
      employees={employees}
      priorities={priorities}
      statuses={statuses}
      search={search}
      priorityId={priorityId}
      statusId={statusId}
      assignTo={assignTo}
      page={page}
      totalPages={totalPages}
      loading={loading}
      formLoading={formLoading}
      showForm={showForm}
      formMode={formMode}
      selectedTask={selectedTask}
      onLogout={handleLogout}
      onAddTask={handleAddTask}
      onEditTask={handleEditTask}
      onDeleteTask={handleDeleteTask}
      
      onSearchChange={(value) => {
        dispatch( setSearch(value));
      }}

      onPriorityChange={(value) => {
        dispatch( setPriorityId(value));
      }}

      onStatusChange={(value) => {
        dispatch( setStatusId(value));
      }}

      onAssignToChange={(value) => {
        dispatch( setAssignTo(value));
      }}

      onPageChange={(value) => {
        dispatch( setPage(value));
      }}

      onSubmit={handleSubmit}
      onCloseForm={ handleCloseForm }
    />
  );
}