import React, {useEffect, useState,} from "react";
import './index.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import App from "./App";
import Header from './components/Header/Header'
// import {Footer} from './components/Footer/Footer'
import Register from './components/Register/Register'
import SignIn from './components/Login/login'
import SignUp from './components/Logout/logout'
import Blog from './components/BlogIT/blogit'
import CreateBlog from './components/BlogIT/CreateBlog'
import CreatePostForum from './components/Forum/CreateForum'
import Forum from './components/Forum/Forum'
import ForumDetail from './components/Forum/ForumDetail'
import BlogDetail from "./components/BlogIT/blogdetail";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Category from "./components/BlogIT/category";
import PostDetail from "./components/Post/postdetail";
import Fabbi from "./components/Fabbi/Fabbi";
import axiosInstance from './axios'
import FabbiDetail from './components/Fabbi/FabbiDetail'
import Contact from "./Contacts/Contacs";
import Admin from './Admin'
import Follow from "./components/InfoUser/Follow"
import Create from './components/adminblog/create'
import Edit from './components/adminblog/edit'
import UserInfo from './components/Userinfo/User'
import UserEdit from './components/UserEdit/UserEdit'
import Store from './components/Context/Context'
import CustomizedTables from './components/BlogIT/AdminBlog'
import Account from './components/InfoUser/infoUser'
import Search from './components/Search/Search'

const Application = () => {
    const [login, setLogin] = useState(false)
    const [userName, setUser] = useState("")

    const [blogs, setBlogs] = useState([]);
    const [infor, setInfor] = useState([]);
    const IdUserLogin = infor.id
    console.log(infor)
    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if (token === null) {
            setLogin(false)
        } else {
            setLogin(true)
        }
    }, [])
     useEffect(() => {
        axiosInstance.get('user-blog/info/').then((res) => {
            const allPosts = res.data.data;
            setInfor(allPosts);
        });
    }, []);
    const handleLogin = (userName) => {
        setLogin(true)
        setUser(userName)
    }

    const handleLogout = () => {
        setLogin(false)
    }

    return (
        <Router>
            <Store>
                <div className="scroll-container" style={{marginTop: '64px'}}>
                    <Header login={login} isLogin={handleLogout}/>
                    <ToastContainer/>
                    <Routes>
                        <Route path='/Fix' element={<App loading={login} dataBlog={blogs}/>}/>
                        <Route path='/' element={<Forum/>}/>
                        <Route path='/forum/:id' element={<ForumDetail infor={infor} IdUserLogin={IdUserLogin}/>}/>
                        <Route path='/forum/create' element={<CreatePostForum/>}/>
                        <Route path="/search" element={<Search/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path='/login' element={<SignIn login={handleLogin}/>}/>
                        <Route path='/logout' element={<SignUp/>}/>
                        <Route path='/blog' element={<Blog/>}/>
                        <Route path='/create' element={<CreateBlog/>}/>
                        <Route path='/admin-blog' element={<CustomizedTables/>}/>
                        <Route path='/info/:id' element={<Account/>}/>
                        <Route path='/test' element={<Follow/>}/>
                        <Route path='/blog/category/:id' element={<Category/>}/>
                        <Route path='/blog/:slug' element={<BlogDetail/>}/>
                        <Route path='/user' element={<UserInfo/>}/>
                        <Route path='/user-edit' element={<UserEdit/>}/>
                        <Route path='/posts/:slug' element={<PostDetail/>}/>
                        <Route path='/fabbi' element={<Fabbi/>}/>
                        <Route path='/fabbi/:slug' element={<FabbiDetail/>}/>
                        <Route path='/admin' element={<Admin/>}/>
                        <Route path='/admin/create/' element={<Create/>}/>
                        <Route path='/admin/edit/:id' element={<Edit/>}/>
                        <Route path='/contacts/' element={<Contact/>}/>
                        </Routes>
                        {/*<Footer/>*/}
                </div>
            </Store>
        </Router>

    );
}
export default Application;
