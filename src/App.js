import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import Auth from "./components/Auth";
import UsersList from "./components/UsersList";
import EditUsers from "./components/EditUsers";
import BlogPage from "./components/BlogPage";
import EditBlog from "./components/EditBlog";
import CreateBlog from "./components/CreateBlog";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./components/PersistLogin";
import { Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Public from "./components/Public";
import Blogs from "./components/Blogs";
import PageNotFound from "./components/PageNotFound";

function App() {
  const { isAdmin } = useAuth();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Public />} />
          <Route path="auth" element={<Auth />} />

          <Route element={<PersistLogin />}>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/blogs" element={<Layout />}>
              <Route index element={<Blogs />} />
              <Route path="blogs/new" element={<CreateBlog />} />
              <Route path="blogs/:id" element={<BlogPage />} />
              <Route path="blogs/edit/:id" element={<EditBlog />} />
              <Route element={<Prefetch />}>
                <Route path="admin/users" 
                  element={isAdmin ? <UsersList /> : <Navigate to='/blogs' />} 
                />
                <Route path="admin/users/:id" 
                  element={isAdmin ? <EditUsers /> : <Navigate to='/blogs' />} 
                />
              </Route>
            </Route>
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
