import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from "react-bootstrap";
import { getAllTasks } from '../../../redux/actions/taskActions'
import TaskItem from './TaskItem'
import './Tasks.style.css'

const TaskList = () => {
    const tasks = useSelector(state => state.tasksReducer)
    console.log("USER TASKS", tasks)
    const [confirmMessage, setConfirmMessage] = useState(null);

    console.log(tasks)
    const dispatch = useDispatch()

    const [showState, setShowState] = useState(false)
    const showModal = () => setShowState(true)
    const hideModal = () => setShowState(false)
  
    useEffect(() => {
      dispatch(getAllTasks())
        
    }, [dispatch])

    return (
        <>
        <div className="all-tasks main-container p-10">
        <h1>Your Tasks</h1>
            {confirmMessage && <Alert variant="success hide">{confirmMessage}</Alert>}
            <ul className="task-list d-flex flex-wrap">
                
                {tasks && tasks.map(
                        (task, index) => (
                        <div className="task col-sm-4" key={task.id}>
                            <TaskItem 
                                taskIndex={index} 
                                task={task}
                                showModal={showModal} 
                                hideModal={hideModal}
                                showState={showState}
                                confirmMessage={setConfirmMessage}
                                />
                        </div>
                        )
                    )
                }
            </ul>
        </div>
    </>
    )
}

export default TaskList
