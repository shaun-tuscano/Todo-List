import React from "react";
import { Nav, NavItem, NavLink ,DropdownItem,Dropdown,DropdownMenu,DropdownToggle } from 'reactstrap';
import { useMediaQuery } from 'react-responsive';
import "./Styles/tabs.css";

function Tabs({ onPendingClicked }) {
  const isMobile = useMediaQuery({ maxWidth: 740 });
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('pending');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = (tab) => {
    onPendingClicked(tab);
    setActiveTab(tab)
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <div>
        <Dropdown nav isOpen={isOpen} toggle={handleToggle}>
        <DropdownToggle nav caret>
          {activeTab}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem  header><div onClick={()=>handleTabClick("completed")}>Completed</div></DropdownItem>
          <DropdownItem  header><div onClick={()=>handleTabClick("pending")}>Pending</div></DropdownItem>
          <DropdownItem  header><div onClick={()=>handleTabClick("deleted")}>Deleted</div></DropdownItem>
         
        </DropdownMenu>
      </Dropdown>
      </div>
    );
  }

  return (
    <Nav tabs >
      <NavItem>
        <NavLink href="#" onClick={() => handleTabClick("completed")} className="nav-items" style={{backgroundColor: activeTab==="completed" ? "lightgreen":null}}>
          Completed
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#" onClick={() => handleTabClick("pending")} style={{backgroundColor: activeTab==="pending" ? "lightcoral":null}} className="nav-items">
          Pending
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#" onClick={() => handleTabClick("deleted")} style={{backgroundColor: activeTab==="deleted" ? "lightgrey":null}} className="nav-items">
          Deleted
        </NavLink>
      </NavItem>
    </Nav>
  );
}

export default Tabs;
