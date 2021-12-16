import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import "../BlogIT/blogit.css"
import './fabbi.css'
import axiosInstance from "../../axios";

const Fabbi = () => {

    const [blogs, setBlogs] = useState([]);
    const [featuredBlog, setFeaturedBlog] = useState([]);

    useEffect(() => {

        axiosInstance.get('fabbi/featured/').then((res) => {
            const allPosts = res.data[0];
            setFeaturedBlog(allPosts);
            console.log(allPosts);
        });

    }, []);

    useEffect(() => {
        axiosInstance.get('fabbi/').then((res) => {
            const allPosts = res.data;
            setBlogs(allPosts);
            console.log(allPosts);
        });
    }, []);
    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    }

    const getBlogs = () => {
        let list = [];
        let result = [];
        if (blogs.length > 0) {
            blogs.map(blogPost => {
                return list.push(
                    <div
                        className="row blog-strong g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-4 d-flex flex-column position-static"
                             style={{minHeight: '150px', width: '100px'}}>

                            <strong className="d-inline-block mb-2 text-primary"> Danh mục
                                : {capitalizeFirstLetter(blogPost.category)}</strong>
                            <h3 className="mb-0 blog-title">{blogPost.title.substr(0, 20)}...</h3>
                            <div>
                                <div className="mb-1 text-muted"> Tháng đăng: {blogPost.month}- Ngày đăng
                                    bài: {blogPost.day}</div>
                            </div>
                            <p className="card-text mb-auto"> Excrerpt: {blogPost.excerpt.substr(0, 30)}...</p>
                            <Link to={`/fabbi/${blogPost.slug.substr(0, 20)}...}`} className="blog-link">
                                Continue reading...
                            </Link>
                        </div>
                        <div className="col-auto d-lg-block img-blog">
                            <img width='250px' className="blog-image" src={blogPost.thumbnall} alt="thumbnail"/>

                        </div>
                    </div>
                );
            })
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
        }

        return result

    }
    return (<>
            <div>

                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0"
                                className="active" aria-current="true" aria-label="Slide 1"/>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                                aria-label="Slide 2"/>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                                aria-label="Slide 3"/>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                src="https://scontent.fhan5-4.fna.fbcdn.net/v/t39.30808-6/264816028_888400868520273_8416373013159576747_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=e3f864&_nc_ohc=BZS511iCCtwAX-oKR9a&_nc_ht=scontent.fhan5-4.fna&oh=1b651597217c1ce6dc6fe95843c35543&oe=61BA2786"
                                className="d-block w-100" alt="..."/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://scontent.fhan5-4.fna.fbcdn.net/v/t39.30808-6/264816028_888400868520273_8416373013159576747_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=e3f864&_nc_ohc=BZS511iCCtwAX-oKR9a&_nc_ht=scontent.fhan5-4.fna&oh=1b651597217c1ce6dc6fe95843c35543&oe=61BA2786"
                                className="d-block w-100" alt="..."/>

                            <div className="carousel-caption d-none d-md-block">
                                <h5>Second slide label</h5>
                                <p>Some representative placeholder content for the second slide.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://scontent.fhan5-4.fna.fbcdn.net/v/t39.30808-6/264816028_888400868520273_8416373013159576747_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=e3f864&_nc_ohc=BZS511iCCtwAX-oKR9a&_nc_ht=scontent.fhan5-4.fna&oh=1b651597217c1ce6dc6fe95843c35543&oe=61BA2786"
                                className="d-block w-100" alt="..."/>

                            <div className="carousel-caption d-none d-md-block">
                                <h5>Third slide label</h5>
                                <p>Some representative placeholder content for the third slide.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='container mt-3'>
                <div className="nav-scroller py-1 mb-2">
                    <nav className="nav d-flex justify-content-between">
                    </nav>
                </div>
                <div className="row ">
                    <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark col-md-6">
                        {featuredBlog.length === 0 ? "Bạn phải đăng nhập mới xem được bài viết!" :
                            <div className="col-md-6 px-0">

                                <h1 className="display-4 featured fst-italic">{featuredBlog.title}</h1>
                                <p className="lead my-3">{featuredBlog.excerpt.substr(0, 30)}...</p>
                                <p className="lead mb-0">
                                    <Link to={`/fabbi/${featuredBlog.slug}`}
                                          className="text-white fw-bold btn btn-info">
                                        Continue reading...</Link>
                                </p>
                            </div>}

                    </div>
                    <div className="col-md-4">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/F074LkX6zr4"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>

                    </iframe></div>
                </div>
                {blogs.length > 0 && getBlogs()}

            </div>
            <div className="footer"><h2 className="footer-item"></h2>
            </div>
        </>
    )

};
export default Fabbi;
