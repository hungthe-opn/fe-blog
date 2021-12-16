import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import "./blogit.css"
import axiosInstance from "../../axios";


const Blog = () => {

    const [blogs, setBlogs] = useState([]);
    const [featuredBlog, setFeaturedBlog] = useState([]);
    const [numberPage, setNumberPage] = useState(4)

    // get featured data
   useEffect(() => {
        axiosInstance.get('blog/featured').then((res) => {
            const allPosts = res.data[0];
            setFeaturedBlog(allPosts);
            console.log(allPosts);
        });

    }, []);

  useEffect(() => {
        axiosInstance.get('blog/').then((res) => {
            const allPosts = res.data;
            setBlogs(allPosts);
            console.log(allPosts);
        });
    }, []);

  // toUpperCase text
    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    }

    const getBlogs = () => {

        let result = [];
        const list = blogs.map((blogPost, index) => {
            if (index < numberPage) {
                return (

                        <div

                            className="row blog-strong g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-2 d-flex flex-column position-static"
                                 style={{minHeight: '150px', width: '100px'}}>

                                <div className="row">
                                    <div className="col-4"><img className="blog-image"
                                                                src={blogPost.thumbnall} alt="thumbnail"/></div>
                                    <div className="col-6 post-list" >
                                        <strong className="d-inline-block mb-2 text-primary">

                                            Danh mục
                                            : {capitalizeFirstLetter(blogPost.category)}</strong>
                                        <h3 className="mb-0 blog-title">{blogPost.title}</h3>

                                        <p className="card-text mb-auto"> Excrerpt: {blogPost.excerpt}</p>
                                        <button type="button" className="btn btn-dark"><Link
                                            to={`/blog/${blogPost.slug}`}
                                            className="blog-link">
                                            Đọc tiếp...
                                        </Link></button>

                                    </div>

                                </div>
                            </div>
                        </div>
                );
            }
        })

        //automatically incremented by 1 value
        for (let i = 0; i < list.length; i += 2) {
            result.push
            (
                <div>
                    <div className=''>
                        {list[i]}
                    </div>
                    <div className=''>{list[i + 1] ? list[i + 1] : null}
                    </div>
                </div>
            )
        }
        return result
    }

    //increments to 6 when is pressed
    const handleSetNumber = () => {
        setNumberPage(numberPage + 6)
    }

    return (<>

            <div
                style={{
                    backgroundImage: 'url("https://images.pexels.com/photos/5483064/pexels-photo-5483064.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")',
                }}
                className="banner">
                <div className="banner-content">
                    <h2>GAMO</h2>
                    <span>TUỔI TRẺ HÃY LUÔN LUÔN CỐ GẮNG!!</span>
                    <h1><a href="#id">Bắt đầu nào!!!</a></h1>

                </div>
            </div>
            <div className='container mt-3'>
                <div id="id"></div>
                <div className="alert alert-primary" role="alert">
                    DANH MỤC
                </div>
                <div className="nav-scroller py-1 mb-2">
                    <nav className="nav d-flex justify-content-between nav-link">
                        <Link className="p-2 link-secondary" to='/category/html'>HTML</Link>
                        <Link className="p-2 link-secondary" to='/category/python'>PYTHON</Link>
                        <Link className="p-2 link-secondary" to='/category/react'>REACT</Link>
                        <Link className="p-2 link-secondary" to='/category/java'>JAVA</Link>
                        <Link className="p-2 link-secondary" to='/category/javascript'>JAVASCRIPT</Link>
                        <Link className="p-2 link-secondary" to='/category/c'>C</Link>
                        <Link className="p-2 link-secondary" to='/category/c++'>C++</Link>
                        <Link className="p-2 link-secondary" to='/category/c#'>C#</Link>
                        <Link className="p-2 link-secondary" to='/category/ruby'>RUBY</Link>
                        <Link className="p-2 link-secondary" to='/category/django'>DJANGO</Link>
                    </nav>
                </div>
                <div className="alert alert-info" role="alert">
                    BÀI ĐĂNG CHÚ Ý
                </div>
                <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
                    {featuredBlog.length === 0 ? "Chờ xíu....." :

                        <div className="col-md-6 px-0">

                            <h1 className="display-4 fst-italic">{featuredBlog.title}</h1>
                            <p className="lead my-3">{featuredBlog.excerpt.substr(0, 60)}...</p>
                            <p className="lead mb-0">
                                <Link to={`/blog/${featuredBlog.slug}`} className="text-white fw-bold btn btn-info">
                                    Continue reading...</Link>
                            </p>
                        </div>}
                </div>
                {getBlogs()}
                <button type="button" onClick={handleSetNumber} className="btn btn-success add">Thêm</button>
            </div>
            <div className="footer"><h2 className="footer-item"></h2>
            </div>
        </>
    )

};
export default Blog;
