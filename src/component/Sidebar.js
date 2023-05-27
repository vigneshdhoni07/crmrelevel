
import React from 'react'

import {CSidebar,CSidebarBrand,CSidebarNav,CNavTitle,CNavItem,CBadge,CNavGroup,CSidebarToggler} from "@coreui/react"
import {} from "@coreui/react"
//import { CSidebarNav,CNavTitle,cilPuzzle,cilSpeedometer,CNavItem,CIcon,CBadge,CNavGroup,CSidebarToggler } from '@coreui/react'


const Sidebar = () => {
  return (
    <CSidebar unfoldable className='vh-100 bg-black'>
  <CSidebarBrand>Sidebar Brand</CSidebarBrand>
  <CSidebarNav>
    <CNavTitle>Nav Title</CNavTitle>
    <CNavItem href="#">
      
      Nav item
    </CNavItem>
    <CNavItem href="#">
   
      With badge
      <CBadge color="primary ms-auto">NEW</CBadge>
    </CNavItem>
    <CNavGroup toggler="Nav dropdown">
      <CNavItem href="#">
        
      </CNavItem>
      <CNavItem href="#">
        
      </CNavItem>
    </CNavGroup>
  </CSidebarNav>
  <CSidebarToggler />
</CSidebar>
  )
}

export default Sidebar