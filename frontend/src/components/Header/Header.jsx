import React from 'react'
import { useUsercontext } from '../../context/UserContext.jsx'
import UserHeader from './UserHeader.jsx';
import GuestHeader from './GuestHeader.jsx';

function Header() {

  const { user, loading} = useUsercontext();

  if(loading) return null;
  
  return user ? <UserHeader /> : <GuestHeader />
}

export default Header
