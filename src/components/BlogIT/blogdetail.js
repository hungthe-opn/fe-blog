import React, {useEffect, useState} from "react";
import axios from "axios";
import './blogdetail.css'
import {Link, useParams} from "react-router-dom";
import axiosInstance from "../../axios";

const BlogDetail = (props) => {
    const [blog, setBlog] = useState({})
    const [blogs, setBlogs] = useState([]);
    const {slug} = useParams()
    const {id} = useParams()
    const a = slug
    // get blog
    useEffect(() => {
        axiosInstance.get('blog/').then((res) => {
            const allPosts = res.data;
            setBlogs(allPosts);
            console.log(allPosts);
        });
    }, []);

    //useEffect get id slug
    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/blog/${id}`);
                setBlog(res.data)
            } catch (err) {
            }
        }

        fetchData()

    }, []);

    const getBlogs = () => {


        let result = [];
        const list = blogs.map((blogPost, index) => {

                return (

                    <div

                        className="row blog-strong g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative pre-hight">
                        <div className="col p-2 d-flex flex-column position-static"
                             style={{minHeight: '150px', width: '100px'}}>

                            <div className="row">
                                <div className="col-4"><img className="blog-image"
                                                            src={blogPost.thumbnall} alt="thumbnail"/></div>
                                <div className="col-6 post-list">
                                    <strong className="d-inline-block mb-2 text-primary">

                                        Danh mục
                                        : {capitalizeFirstLetter(blogPost.category)}</strong>
                                    <h3 className="mb-0 blog-title">{blogPost.title.substr(0, 20)}</h3>

                                    <p className="card-text mb-auto"> Excrerpt: {blogPost.excerpt.substr(0, 20)}</p>
                                    <button type="button" className="btn btn-dark">
                                        <Link
                                        to={`/blog/${blogPost.slug}`}
                                        className="blog-link">
                                        Đọc tiếp...
                                    </Link>
                                    </button>

                                </div>

                            </div>
                        </div>
                    </div>

                );

        })

        //automatically incremented by 1 value
        for (let i = 0; i < list.length; i += 2) {
            result.push
            (
               <div key={i} className='row mb-2'>
                        <div className='col-md-6'>
                            {list[i]}
                        </div>
                        <div className='col-md-6'>{list[i + 1] ? list[i + 1] : null}
                        </div>


                    </div>
            )
        }
        return result
    }

    // display the data returned from the server
    const createBlog = () => {
        return {__html: blog.content}
    }

    //auto-capitalize
    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    }

    return (
        <div className='container mt-3'>
            <h1 className='display-2'>
                {blog.title}
            </h1>
            <div className="alert alert-primary" role="alert">
                Category: {capitalizeFirstLetter(blog.category)}
            </div>
            <div className='row '>
                <div className="alert alert-danger author" role="alert">
                    Auhor: {blog.author}
                </div>
                <div className="alert alert-warning" role="alert">
                    Thời gian đăng bài: Tháng:{blog.month} - Ngày:{blog.day} -

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                        <path
                            d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                    </svg> Lượt xem: {blog.viewCount}
                </div>

            </div>

                <div className='mt-5 mb-5' dangerouslySetInnerHTML={createBlog()}/>


            <hr/>
            <p className='lead mb-5 font-weight-bold'>Nguồn tham khảo:<a href="{blog.source}">{blog.source}</a>.</p>
            <hr/>
            <p className='lead mb-5 font-weight-bold'><Link to='/blog'> Back to blogs</Link></p>
            {getBlogs()}
        </div>

    );
};

export default BlogDetail;