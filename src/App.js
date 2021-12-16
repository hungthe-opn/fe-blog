import React, {useEffect, useState} from 'react';
import './App.css'
import Posts from "./components/Post/Posts";
import PostLoading from './components/Post/PostLoading'
import axiosInstance from '../src/axios'
import {Link} from "react-router-dom";

function App({loading, dataBlog}) {
    const [appState, setAppState] = useState({
            loading: false,
            posts: [],
        }
    )
    useEffect(() => {
        setAppState({loading: false, posts: dataBlog});
    }, [])

    useEffect(() => {
        axiosInstance.get().then((res) => {
            const allPosts = res.data;
            setAppState({loading: false, posts: allPosts});
            console.log(res.data);
        });
    }, [setAppState]);

    if (!loading) {
        return (<div>
            <div className='app-err'>
                <div className="alert alert-danger container" role="alert">
                    <p className='app-err_text'>Vui lòng đăng nhập để truy cập các bài viết cá nhân nhé ^^. <div
                        className="spinner-border text-success" role="status">
                    </div></p>
                </div>
            </div>

        </div>);
    }
    return (
        <div className="App">
            <h1 className='fabbi-text'>FABBIER</h1>
            <Link to='/admin'> <button type="button" className="btn btn-info"> Admin</button></Link>
            <Link to='admin/create'>  <button type="button" className="btn btn-primary"> Add Blog</button></Link>
            <Posts posts={appState.posts} loading={appState.loading}/>
        </div>

    )
}

export default App;