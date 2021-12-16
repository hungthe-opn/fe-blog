import React,{useEffect,useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import axiosInstance from "../../axios";
const FabbiDetail = (props) => {
    const [blog,setBlog] = useState({});
    const {slug} = useParams()
    const a = slug

      useEffect(() => {

            axiosInstance.get('fabbi/?slug=a,').then((res) => {
			const allPosts = res.data[0];
			setBlog(allPosts);
		});

    }, []);

    const createBlog = () => {
        return {__html:blog.content}
    }
     const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    }
    return (
        <div className='container mt-3'>
            <h1 className='display-2'></h1>
            <h2 className='text-muted mt-7 fabbi-img'> <img className="fabbi-imgs" src={blog.thumbnall} alt="ảnh" /></h2>
            <div className="alert alert-primary" role="alert">
               Category: {capitalizeFirstLetter(blog.category)}
            </div>
            <div className='row '>
                <div className="alert alert-warning" role="alert">
                  Thời gian đăng bài: Tháng:{blog.month}- Ngày:{blog.day}

                    <i className="bi bi-alarm-fill"></i>
                </div>

                </div>
            <div className='mt-5 mb-5' dangerouslySetInnerHTML={createBlog()}/>
              <hr/>
            <hr/>
            <p className='lead mb-5 font-weight-bold'><Link to='/fabbi' > Back to blogs</Link></p>
        </div>

    );
};
export default FabbiDetail;