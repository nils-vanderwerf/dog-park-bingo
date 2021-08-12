
import React, { useState, useEffect } from 'react';
import { FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import taskActions from '../../../redux/actions/taskActions';
import userActions from '../../../redux/actions/userActions';
import categoryActions from '../../../redux/actions/categoryActions'
import { getAllCategories } from '../../../redux/actions/categoryActions';
import { Button, Form, FormControl } from 'react-bootstrap'
import '../auth/Form.style.css'
const InputTaskForm = (props) => {
  const dispatch = useDispatch()
  let categories 
  = useSelector(state => state.categoriesReducer.categories)
  let currentUser = useSelector(state => state.currentUser.id)
  const tasks = useSelector(state => state.tasksReducer)
  
  const location = useLocation()
  const history = useHistory();
  const path = location.pathname
  const params = useParams()
  const taskToEdit = tasks.find(task => task.id == params.id)
  const [checkedCats, setCheckedCats] = useState([])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(userActions.getCurrentUser());
      dispatch(getAllCategories());
      console.log("Mounted current user: ", currentUser)
      setTaskForm({
        ...taskForm, task: {
          ...taskForm.task,
          category_ids:checkedCats
        }
    })
  }
  console.log("<=====category ids====>", taskForm.task.category_ids)
}, [dispatch, checkedCats])

  // Setting up local state using the useState hook
  const [taskForm, setTaskForm] =
    useState({
      task: {
        id: (taskToEdit) ? taskToEdit.id : null,
        title: (path === '/tasks/new') ? '' : taskToEdit.title,
        description: (path === '/tasks/new') ? '' : taskToEdit.description,
        category_ids: checkedCats,
        user_id: currentUser
      }
    })

  const handleCheckBoxChange = event => {
    let array = [...checkedCats]
    let index = array.indexOf(event.target.value)
    console.log("Array, index", array, index)
    if (event.target.checked) {
      const selectedEl =
        categories.find(cat => event.target.name === cat.title)
      console.log("selected Element", selectedEl)
      array = [...checkedCats, selectedEl.id]
      setCheckedCats(array)
    }
    else {
      array.splice(index, 1);
      setCheckedCats(array)
    }
  }
    console.log("CHECKED CATS", checkedCats)

    console.log("CURRRRENT USER", taskForm)
    console.log("CATEGORIES", categories)

    // Controlled form functions
    const handleChange = e => {
      setTaskForm({
        ...taskForm, task: {
          ...taskForm.task,
          [e.target.name]: e.target.value
        }
      });
    }

    const handleCreateTask = e => {
      e.preventDefault();
      console.log("Submitted task is:", taskForm)
      // console.log("This user is", currentUser)
      dispatch(taskActions.createTaskToDB(taskForm));
      history.push('/tasks');
    };

    const handleEdit = e => {
      e.preventDefault();
      dispatch(taskActions.updateTaskToDB(taskForm));
      history.push('/tasks');
    }

    // Destructuring keys from our local state to use in the form
    const { title, description } = taskForm.task;
    if (!categories) {
      return null
    }
    else {
    // Component code
    return (
      <div className="auth-form col-12">
        <div className="form-inner-content align-items-center justify-content-center col-sm-6">
          <Form onSubmit={(path === '/tasks/new') ? handleCreateTask : handleEdit}>
            <Form.Group className="mb-3">
              <h1 className="auth-header mb-4">{(path === '/tasks/new') ? "New Task" : "Edit task"}</h1>
              <FormControl className="title"
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="Task Title"
              />
            </Form.Group>
            <br />
            <Form.Group className="description">
              <textarea className="col-3 form-control"
                name="description"
                value={description}
                onChange={handleChange}
                cols="40"
                rows="5"
              />
            </Form.Group>

            <Form.Group>
              <div className="check-container d-flex">
                {categories.map(cat => {
                  return (
                    <div className="form-check col-sm-6 mb-2">
                      <input class="form-check-input"
                        type="checkbox"
                        name={cat.title}
                        key={cat.id}
                        value={cat.title}
                        onChange={handleCheckBoxChange}
                        id="flexCheckDefault"></input>
                      <label class="form-check-label" for="flexCheckDefault">
                        {cat.title}
                      </label>
                    </div>
                  )
                })}
              </div>
            </Form.Group>
            <Button type="submit">Create Task</Button>


          </Form>
        </div>
      </div>
    );
   }
  };

  export default InputTaskForm;