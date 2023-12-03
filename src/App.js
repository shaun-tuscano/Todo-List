import { useState , useEffect} from 'react';
import './App.css';
import { Button,Input,Modal,ModalBody,ModalFooter,ModalHeader, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Task from './components/Tasks';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import Tabs from './components/tabs';



function App() {
  const[addTaskModal,setAddTaskModal]=useState(false)//decides weather to open modal 
  const[dataObj,setDataObj]=useState({Task:"",Description:"",Priorty:0}) //holds one single task
  const[dataObjects,setDataObjects]=useState([]) //holds array of pending tasks 
  const[completedTask,setCompletedTask]=useState([]) //holds array of completed tasks 
  const[isEdit,setIsIdit]=useState(false) // decides weather user is editing previously created task
  const [completedCount, setCompletedCount] = useState(0); //gives number of completed tasks
  const[resetModalToggle,setResetModalToggle]=useState(false)//decides weather to open modal 
  const[pendingTask,setPendingTask]= useState(0)
  const[tabName, setTabName]=useState("pending")

  const toggle = (isCancel) => {
    setAddTaskModal(!addTaskModal);
    if(isCancel)
    {setDataObj({ Task: "", Description: "" ,Priorty : 0});}  
  }//sets value of addTaskModal

  const toggleForReset=()=> {
    setResetModalToggle(!resetModalToggle);
  }
  
  function handleChange(e){
    //use to set dataobj for add task button
    const name = e.target.name;
    const value = e.target.value;
    setDataObj((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    
  }
  function tabopen(tabname){
    setTabName(tabname)
  // if(tabname === "completed"){
  //   // const storedCompletedTask= JSON.parse(localStorage.getItem('completedTask'));  
  //   // setCompletedTask(completedTask)

  // }
   if(tabname === "pending"){
    const storedDataObjects = localStorage.getItem('dataObjects');

    if (storedDataObjects) {
      // If present, parse and set the state
      setDataObjects(JSON.parse(storedDataObjects));
    }
     else {
      // If not present, set default empty array
      setDataObjects([]);
    }

  }
  else{


  }  



  }
  useEffect(() => {
    // Check if 'dataObjects' is present in local storage
    const storedDataObjects = localStorage.getItem('dataObjects');
    const storedCompletedTask=localStorage.getItem('completedTask') ;

    if (storedDataObjects) {
      // If present, parse and set the state
      setDataObjects(JSON.parse(storedDataObjects));
      setPendingTask(JSON.parse(storedDataObjects).length)
    }
     else {
      // If not present, set default empty array
      setDataObjects([]);
    }
    if(storedCompletedTask){
      setCompletedTask(JSON.parse(storedCompletedTask));  
      setCompletedCount(JSON.parse(storedCompletedTask).length)
    }
    

  }, []);

  function handleDelete(value){
    //deletes element which corresponds to partuclar id given in value
    setDataObjects((prevDataObjects) =>
    prevDataObjects.filter((data) => data.id !== value)
  );
  localStorage.setItem('dataObjects', JSON.stringify(dataObjects.filter((data) => data.id !== value)));
  setPendingTask(pendingTask-1)

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
  else if(dataObj.Priorty === 0){
    toast.error("Task Priority is mandatory");
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
      console.log(updatedDataObjects)
      localStorage.setItem('dataObjects', JSON.stringify(updatedDataObjects));
      setDataObj({ Task: "", Description: "" ,Priorty : 0});
      setIsIdit(false)
      toggle();

      } else {
        const item = { ...dataObj, id: uuidv4() }
         setDataObjects((prevDataObjects) => [...prevDataObjects, item]);
         localStorage.setItem('dataObjects', JSON.stringify([...dataObjects, item]));
        setDataObj({ Task: "", Description: "", Priorty : 0 })
        setPendingTask(pendingTask+1)
        toggle()
      }
  }}

  function handleTaskComplete(e, value) {

    let storedCompletedTask=localStorage.getItem('completedTask') ;

    if (storedCompletedTask) {
    storedCompletedTask = JSON.parse(storedCompletedTask)
    storedCompletedTask.push(value);
    localStorage.setItem('completedTask', JSON.stringify(storedCompletedTask));
    setCompletedTask(storedCompletedTask) 
    setCompletedCount(storedCompletedTask.length); 
    setPendingTask(pendingTask-1)
    }
     else {
      setCompletedCount(1);
      localStorage.setItem('completedTask', JSON.stringify([value]));
      setCompletedTask([value]);
    }
  
    handleDelete(value.id);
    toast.success(`Task ${value.Task} completed!`);
  }
  function resetHandler(){
    localStorage.setItem('completedTask', ([]));  
    localStorage.setItem('dataObjects', ([]));
    setDataObjects([])
    setCompletedTask([])
    setPendingTask(0)
    setCompletedCount(0)
    toggleForReset()


  }
  function resetmodal(){
    return (
      <div >
        <Modal isOpen={resetModalToggle} toggle={toggleForReset} centered >
          <ModalHeader toggle={()=>toggleForReset()}>Reset Modal</ModalHeader>
          <ModalBody>
          All your task will get deleted . are you sure you want to reset?
          </ModalBody>
          <ModalFooter>
          <Button color="secondary" onClick={()=>toggleForReset()}>
              Cancel
            </Button>
            <Button color="primary" onClick={resetHandler}>Reset</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    )  




  }
  function addMoreModal() {
    return (
      <div >
        <Modal isOpen={addTaskModal} toggle={toggle} centered >
          <ModalHeader toggle={()=>toggle()}>Add Task</ModalHeader>
          <ModalBody>
          <Input type='text' name='Task' placeholder='Task' onChange={handleChange} value={dataObj.Task}></Input> 
          <br/>
          <Input type='text' name='Description' placeholder='Description'onChange={handleChange} value={dataObj.Description}></Input>
          <br/>
            <Label for="exampleRange">
              Set Priority
            </Label>
          <Input type='range' name='Priorty' onChange={handleChange} value={dataObj.Priorty}></Input>
          </ModalBody>
          <ModalFooter>
          <Button color="secondary" className="task-btn" onClick={()=>toggle(true)}>
              Cancel
            </Button>
            <Button color="primary" className="task-btn" onClick={onSave}>Save</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    )
  }
  
  return (
    <div>
    <div className="App">
      <div className='header-container'>
      <h1 className="todo-title">Todo List</h1>
      <div className="task-counter">
        <span className="completed-counter">
          Completed: {completedCount}
        </span>
        <span className="pending-counter">Pending: {pendingTask}</span>
      </div>
      </div>
      <br/>
      <div className='button-container'>
      <Button className="taskbutton"color="primary" size="" onClick={toggleForReset}>Reset</Button>  
      <Button className="taskbutton"color="primary" size="" onClick={toggle}>Add Task </Button>
      </div>
      {addMoreModal()}
      {resetmodal()}
      <br/>
      <Tabs onPendingClicked={tabopen}/>
      <ToastContainer autoClose={2000} />
      <Task activeTab={tabName} dataObjects={tabName==="pending" ? dataObjects : tabName==="completed" ? completedTask : [] } handleDelete={handleDelete} handleEdit={handleEdit} handleTaskComplete={handleTaskComplete}></Task>
     
    </div>
    <br/>
     <Footer/>
    </div>
  );
}

export default App;
