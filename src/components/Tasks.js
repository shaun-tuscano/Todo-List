import React, { Fragment } from 'react';
import {
  Card, CardBody, CardTitle, CardText, CardFooter, Button
} from 'reactstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './Task.css'


function Task({ dataObjects, handleEdit, handleDelete, handleTaskComplete , activeTab }) {




  const handlecolour = (Priority) => {
    const colourToUse = Priority >= 80 ? "danger" : Priority >= 50 ? "warning" : "info"
    return colourToUse
  }

  function displaymsg(){
   return activeTab === "pending" ? <h6>No pending task at the moment</h6> : activeTab === "completed" ? <h6>No task completed at the moment</h6> : <h6>This feature is not yet implemented</h6>


  }
  return (
    <Fragment>
      {dataObjects.length!== 0 && <div className='card-container'>

        {dataObjects.map((item) => (
          <Card
            key={item.id}
            className="my-2 "
            color={activeTab=== "pending" ?handlecolour(item.Priorty) : "success"}
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
              <CardText className='card-description'>
                {item.Description}
              </CardText>
            </CardBody>
            <CardFooter >
              {activeTab=== "pending" && <div className='icons-container'>
                <div style={{marginRight: 16 }}>
                <Button color="success"  onClick={(e) => handleTaskComplete(e, item)}>
                  Done
                </Button>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <FaTrash className="icon" onClick={() => handleDelete(item.id)} />
                  &nbsp;
                  <FaEdit className="icon" onClick={() => handleEdit(item)} />
                  &nbsp;
                </div>
              </div>}
            </CardFooter>
          </Card>
        ))}

      </div>}
      {dataObjects.length === 0 && <div className='nodata-container'>{displaymsg()}</div>}
    </Fragment>
  )


}

export default Task;