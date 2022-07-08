import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./blogit.css"
import axiosInstance from "../../axios";
import "./Blog.scss"
import mainLogo from "../../img/1.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faUser} from "@fortawesome/free-solid-svg-icons";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Banner from '../../Banner/Banner'
const Blog = () => {

    const [blogs, setBlogs] = useState([]);
    const [featuredBlog, setFeaturedBlog] = useState([]);
    // get featured data
    useEffect(() => {
        axiosInstance.get('blog/featured/').then((res) => {
            const allPosts = res.data;
            setFeaturedBlog(allPosts);
        });

    }, []);

    useEffect(() => {
        axiosInstance.get('blog/').then((res) => {
            const allPosts = res.data.data;
            setBlogs(allPosts);
            console.log(allPosts)
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
        const list = blogs && blogs.length > 0 && blogs.map((blogPost) => {
            return (
                // <div
                //     className="row blog-strong g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                //     <div className="col p-2 d-flex flex-column position-static"
                //          style={{minHeight: '150px', width: '100px'}}>
                //
                //         <div className="row">
                //             <div className="col-4"><img className="blog-image"
                //                                         src={blogPost.thumbnall} alt="thumbnail"/></div>
                //             <div className="col-6 post-list">
                //                 <strong className="d-inline-block mb-2 text-primary">
                //
                //                     Danh mục
                //                     : {capitalizeFirstLetter(blogPost.category)}</strong>
                //                 <h3 className="mb-0 blog-title">{blogPost.title}</h3>
                //
                //                 <p className="card-text mb-auto"> Excrerpt: {blogPost.excerpt}</p>
                //                 <button type="button" className="btn btn-dark"><Link
                //                     to={`/blog/${blogPost.slug}`}
                //                     className="blog-link">
                //                     Đọc tiếp...
                //                 </Link></button>
                //
                //             </div>
                //
                //         </div>
                //     </div>
                // </div>
                <div className='body-post'>
                    <img className='body-post_img' src={blogPost.avatar_author} alt=""/>

                    <div className='body-post-feed'>
                        <div className='body-post-feed_meta'>
                            <a href="" className='body-post-feed_meta_user'>{blogPost.author_name}</a>
                            <span className='body-post-feed_meta_link'> Thời gian tạo {blogPost.time_post}</span>
                            <span className='body-post-feed_meta_link'> Ngày cập nhật {blogPost.time_update}</span>
                        </div>
                        <div className='body-post-feed_title'>
                            <h3 className='body-post-feed_title_word'>
                                <a href="" className='body-post-feed_title_word_a'>{blogPost.title}</a>
                                <div className='body-post-feed_title_word_tags'>
                                    <span className="badge text-bg-secondary "
                                          style={{fontSize: '35%'}}>{blogPost.category_name}
                                    </span>
                                </div>
                            </h3>
                        </div>
                        <div className='body-post-feed_starts'>
                            <span className='body-post-feed_starts_item'>
                            <FontAwesomeIcon icon={faEye}
                                             className="fa"/>
                                2K
                        </span>
                            <span className='body-post-feed_starts_item'>
                            </span>

                        </div>
                    </div>

                </div>
            )
                ;

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

    return (<>

            <div className="body">
                <div className="body_image">

                    <img src={mainLogo} alt="" className='body_image_banner'/>

                </div>
                <Banner></Banner>
                <div className="text-center">
                    <a href="" className="text-center_body"> >> Tham gia Facebook group "Vì một tương lai lập trình viên
                        hàng đâu" để cùng nhau học tập và kết nối </a>
                </div>
                <div className="container"></div>
                <div className="container  mt-3">
                    <div className='row'>
                        <div className='col col-9'>
                            <div>
                                {getBlogs()}
                            </div>
                            <div className='body-pagination'>
                                <Stack spacing={2}>
                                <Pagination count={10} variant="outlined"/>
                                </Stack>
                            </div>

                        </div>
                        <div className='col col-3'>
                            <div className='sticky'>
                                <div className="sticky_section">
                                    <a className="sticky-section_a" href="">
                                        <h4 className="sticky-section_a_h4">
                                            Bài viết mới nhất
                                        </h4>
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            {/*<div*/}
            {/*    style={{*/}
            {/*        backgroundImage: 'url("https://images.pexels.com/photos/5483064/pexels-photo-5483064.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")',*/}
            {/*    }}*/}
            {/*    className="banner">*/}
            {/*    <div className="banner-content">*/}
            {/*        <h2>GAMO</h2>*/}
            {/*        <span>TUỔI TRẺ HÃY LUÔN LUÔN CỐ GẮNG!!</span>*/}
            {/*        <h1><a href="#id">Bắt đầu nào!!!</a></h1>*/}

            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className='container mt-3'>*/}
            {/*    <div className="row">*/}
            {/*        <div className="col col-9">*/}
            {/*        <div id="id"></div>*/}
            {/*        <div className="alert alert-primary" role="alert">*/}
            {/*            DANH MỤC*/}
            {/*        </div>*/}
            {/*        <div className="nav-scroller py-1 mb-2">*/}
            {/*            <nav className="nav d-flex justify-content-between nav-link">*/}
            {/*                <Link className="p-2 link-secondary" to='/category/html'>HTML</Link>*/}
            {/*                <Link className="p-2 link-secondary" to='/category/python'>PYTHON</Link>*/}
            {/*                <Link className="p-2 link-secondary" to='/category/react'>REACT</Link>*/}
            {/*                <Link className="p-2 link-secondary" to='/category/java'>JAVA</Link>*/}
            {/*                <Link className="p-2 link-secondary" to='/category/javascript'>JAVASCRIPT</Link>*/}
            {/*                <Link className="p-2 link-secondary" to='/category/c'>C</Link>*/}
            {/*                <Link className="p-2 link-secondary" to='/category/c++'>C++</Link>*/}
            {/*                <Link className="p-2 link-secondary" to='/category/c#'>C#</Link>*/}
            {/*                <Link className="p-2 link-secondary" to='/category/ruby'>RUBY</Link>*/}
            {/*                <Link className="p-2 link-secondary" to='/category/django'>DJANGO</Link>*/}
            {/*            </nav>*/}
            {/*        </div>*/}
            {/*        <div className="alert alert-info" role="alert">*/}
            {/*            BÀI ĐĂNG CHÚ Ý*/}
            {/*        </div>*/}
            {/*        <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">*/}
            {/*            {featuredBlog.length === 0 ? "Chờ xíu....." :*/}

            {/*                <div className="col-md-6 px-0">*/}

            {/*                    <h1 className="display-4 fst-italic">{featuredBlog.title}</h1>*/}
            {/*                    /!*<p className="lead my-3">{featuredBlog.excerpt.substr(0, 60)}...</p>*!/*/}
            {/*                    <p className="lead mb-0">*/}
            {/*                        <Link to={`/blog/${featuredBlog.slug}`} className="text-white fw-bold btn btn-info">*/}
            {/*                            Continue reading...</Link>*/}
            {/*                    </p>*/}
            {/*                </div>}*/}
            {/*        </div>*/}
            {/*        {blogs && blogs.length>0 && getBlogs()}*/}
            {/*    </div >*/}
            {/*     <div className="col col-3">*/}
            {/*    <button className="btn btn-primary"></button>*/}

            {/*    </div>*/}
            {/*    </div>*/}

            {/*</div>*/}

            <div className="footer"><h2 className="footer-item"></h2></div>

        </>
    )

};
export default Blog;
