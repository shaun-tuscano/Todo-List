import React, { Fragment } from 'react';
import {
  Input , Card ,CardBody ,CardTitle,CardText, CardFooter
} from 'reactstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './Task.css'


function Task({ dataObjects,handleEdit,handleDelete,handleTaskComplete}) {
 

  

  const handlecolour=(Priority)=>{
  const colourToUse = Priority >=90 ? "danger" : Priority >=50 ? "warning" : "info"  
  return colourToUse  
  }

  return (
    <Fragment>
    <div className='card-container'>

        {dataObjects.map((item) => (
          <Card
          className="my-2 "
          color={handlecolour(item.Priorty)}
          inverse
          style={{
            width: '18rem'
          }}
          id={item.id}
        >
          <CardBody>
            <CardTitle tag="h5">
            {item.Task}
            </CardTitle>
            <CardText>
            {item.Description}
            </CardText>
          </CardBody>
          <CardFooter >
              <div className='icons-container'>
                &nbsp;&nbsp;&nbsp;
                <FaTrash className="icon" onClick={() => handleDelete(item.id)} />
                &nbsp;
                <FaEdit className="icon" onClick={() => handleEdit(item)} />
                &nbsp;
                <Input type="checkbox" checked={false} onChange={(e) => handleTaskComplete(e, item)} />
              </div>
          </CardFooter>
        </Card>
        ))}

    </div>
    {dataObjects.length===0 && <h6>No task added at the moment</h6>}
    </Fragment>
  )


}

export default Task;