import { useState } from 'react';
import './App.css';
import { Button,Input,Modal,ModalBody,ModalFooter,ModalHeader } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Task from './components/Tasks';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const[addTaskModal,setAddTaskModal]=useState(false)//decides weather to open modal 
  const[dataObj,setDataObj]=useState({Task:"",Description:""}) //holds one single task
  const[dataObjects,setDataObjects]=useState([]) //holds array of tasks 
  const[isEdit,setIsIdit]=useState(false) // decides weather user is editing previously created task
  const [completedCount, setCompletedCount] = useState(0); //gives number of completed tasks

  const toggle = () => setAddTaskModal(!addTaskModal);//sets value of addTaskModal


  
  function handleChange(e){
    //use to set dataobj for add task button
    const name = e.target.name;
    const value = e.target.value;
  
    setDataObj((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    
  }

  function handleDelete(value){
    //deletes element which corresponds to partuclar id given in value
    setDataObjects((prevDataObjects) =>
    prevDataObjects.filter((data) => data.id !== value)
  );
  }

  function handleEdit(value){
  //edit pre-existing task  
  setDataObj(value)  
  setIsIdit(true)
  toggle()
  }

  function validateTask(){
  //validation Task name and Description field   
  if(dataObj.Task.length===0){
    toast.error("Task name is mandatory");
    return false
  }
  else if(dataObj.Description.length===0){
    toast.error("Task description is mandatory");
    return false
  }  
  return true
  }



  function onSave() {
    //save for new and pre-existing task
    if(validateTask()) { 
      if (isEdit) {
        const updatedDataObjects = dataObjects.map((data) =>
        data.id === dataObj.id ? dataObj : data
      );
      setDataObjects(updatedDataObjects);
      setDataObj({ Task: "", Description: "" });
      setIsIdit(false)
      toggle();

      } else {
        setDataObjects((prevDataObjects) => [...prevDataObjects, { ...dataObj, id: uuidv4() }]);
        setDataObj({ Task: "", Description: "" })
        toggle()
      }
  }}

  function handleTaskComplete(e,value){
   //use to display success message and delete that task 
  handleDelete(value.id)
  toast.success(`Task ${value.Task} completed!`);
  setCompletedCount(completedCount+1)

  }

  function addMoreModal() {
    return (
      <div >
        <Modal isOpen={addTaskModal} toggle={toggle} >
          <ModalHeader toggle={toggle}>Add Task</ModalHeader>
          <ModalBody>
          <Input type='text' name='Task' placeholder='Task' onChange={handleChange} value={dataObj.Task}></Input> 
          <br/>
          <Input type='text' name='Description' placeholder='Description'onChange={handleChange} value={dataObj.Description}></Input>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={onSave}>Save</Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
  return (
    <div className="App">
    <h1 className="todo-title">Todo List</h1>
      <div className="task-counter">
        <span className="completed-counter">
          Completed: {completedCount}
        </span>
        <span className="pending-counter">Pending: {dataObjects.length}</span>
      </div>
      <br/><br/>
      <Button className="taskbutton"color="primary" size="" onClick={toggle}>Add Task </Button>
      {addMoreModal()}
      <br/><br/><br/>
      <ToastContainer autoClose={2000} />
      <Task dataObjects={dataObjects} handleDelete={handleDelete} handleEdit={handleEdit} handleTaskComplete={handleTaskComplete}></Task>
    </div>
  );
}

export default App;
