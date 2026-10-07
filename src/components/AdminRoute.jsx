import {
  Navigate,
  Outlet,
} from 'react-router-dom'


function AdminRoute() {

  const token =
    localStorage.getItem('token')

  const storedUser =
    localStorage.getItem('user')


  // ==============================
  // NOT LOGGED IN
  // ==============================

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }


  // ==============================
  // NO USER DATA
  // ==============================

  if (!storedUser) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    )
  }


  const user =
    JSON.parse(storedUser)


  // ==============================
  // CHECK ADMIN ROLE
  // ==============================

  if (user.role !== 'admin') {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    )
  }


  // ==============================
  // ADMIN IS ALLOWED
  // ==============================

  return <Outlet />
}


export default AdminRoute