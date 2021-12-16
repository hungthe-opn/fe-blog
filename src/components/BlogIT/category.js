import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import './category.css'

const Category = (props) => {
    const [blogs, setBlogs] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('')
    const {id} = useParams()

        // Capitalize the first letter
    useEffect(() => {
        setCurrentCategory(capitalizeFirstLetter(id))
        const a = {
            category: id
        }

        //post to categories to return id
        const fetchData = async () => {
            try {
                const res = await axios.post(`http://localhost:8000/api/blog/category`, a);
                setBlogs(res.data)
            } catch (err) {
            }
        }
        fetchData()
    }, [id]);

      // toUpperCase text
    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';

    }
    const getCategoryBlogs = () => {
        let list = []
        let result = [];
        blogs.map(blogPost => {
            return list.push(
                <div
                    className="row blog-strong g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static"
                         style={{minHeight: '150px', width: '100px'}}>

                        <strong className="d-inline-block mb-2 text-primary"> Danh mục
                            : {capitalizeFirstLetter(blogPost.category)}</strong>
                        <h3 className="mb-0 blog-title">{blogPost.title}</h3>
                        <div>
                            <div className="mb-1 text-muted"> Tháng đăng :{blogPost.month}- Ngày đăng
                                bài: {blogPost.day} - Lượt Xem: {blogPost.viewCount}</div>
                        </div>
                        <p className="card-text mb-auto"> Excrerpt: {blogPost.excerpt}</p>
                        <Link to={`/blog/${blogPost.slug}`} className="stretched-link">
                            Continue reading
                        </Link>
                    </div>

                </div>
            );
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

    return (

        <div className='container mt-3'>
            <h3 className='display-4'>
                Category: {currentCategory}
            </h3>
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
            {getCategoryBlogs()}
        </div>

    )
}

export default Category