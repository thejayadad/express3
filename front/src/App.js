
import Register from "./pages/register/Register";
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { useSelector } from 'react-redux';
import Create from "./pages/create/Create";
import BlogDetails from "./pages/blogdetails/BlogDetails";
import UpdateBlog from "./pages/updateBlog/UpdateBlog";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const { user } = useSelector((state) => state.auth)

  return (
    <div className="app" >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register"element={!user ? <Register /> : <Navigate to='/' />} />
        <Route path="/login"
        element={!user ? <Login /> : <Navigate to='/' />}
        />
        <Route
        path="/create"
        element={user ? <Create /> : <Navigate to='/login' />}
        />
      <Route path='/blogDetails/:id' element={user ? <BlogDetails /> : <Navigate to='/login' />} />
      <Route path='/updateBlog/:id' element={user ? <UpdateBlog /> : <Navigate to='/login' />} />


      </Routes>
    </div>
  );
}

export default App;
