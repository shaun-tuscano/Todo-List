import React, { useState } from 'react';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,Input
} from 'reactstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './Task.css'


function Task({ dataObjects,handleEdit,handleDelete,handleCheckbox}) {
  const [open, setOpen] = useState('');

  const toggle = (id) => {
    //accordion toggle mode
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };



  return (
    <div >

      <Accordion open={open} toggle={toggle}>

        {dataObjects.map((item) => (
          <div key={item.id} className='accordion-container'>
          <AccordionItem key={item.id}>
            <AccordionHeader targetId={item.id.toString()}>
                <div>{item.Task}</div>
                <div className='icons-container'>
                 &nbsp;&nbsp;&nbsp;
                  <FaTrash className="icon" onClick={() =>handleDelete(item.id) } />
                  &nbsp;
                  <FaEdit className="icon" onClick={() =>handleEdit(item) } />
                  &nbsp;
                  <Input type="checkbox" onChange={(e) => handleCheckbox(e, item)} />
                </div>
            
            </AccordionHeader>
            <AccordionBody accordionId={item.id.toString()}>{item.Description}</AccordionBody>

          </AccordionItem>
          <br/>
          </div>
        ))}
      </Accordion>
      {dataObjects.length===0 && <div>No task added at the moment</div>}

    </div>
  )


}

export default Task;