import { useState } from 'react';
import './App.css';
import { Button,Input,Modal,ModalBody,ModalFooter,ModalHeader } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Task from './components/Tasks';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const[addTaskModal,setAddTaskModal]=useState(false)
  const[dataObj,setDataObj]=useState({Task:"",Description:""})
  const[dataObjects,setDataObjects]=useState([])
  const[isEdit,setIsIdit]=useState(false)
  // const taskList=[]
  // const [state, dispatch] = useReducer(reducer, taskList);

  const toggle = () => setAddTaskModal(!addTaskModal);


  
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

  function onSave() {
    //save for new and pre-existing task
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
  }

  function handleCheckbox(e,value){
   //use to display success message and delete that task 
  handleDelete(value.id)
  toast.success(`Task ${value.Task} completed!`);

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
      Todo List<br/><br/>
      <Button className="taskbutton"color="primary" size="" onClick={toggle}>Add Task </Button>
      {addMoreModal()}
      <br/><br/><br/>
      <ToastContainer />
      <Task dataObjects={dataObjects} handleDelete={handleDelete} handleEdit={handleEdit} handleCheckbox={handleCheckbox}></Task>
    </div>
  );
}

export default App;
