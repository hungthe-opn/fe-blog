import React, {useEffect, useState} from "react";
import axios from "axios";
import './BlogDetail.scss'
import {Link, useParams} from "react-router-dom";
import axiosInstance from "../../axios";
import {faCaretDown, faCaretUp, faCheck, faEye, faFan, faShare, faUser,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import mainLogo from "../../img/1.png"
import {
    FacebookIcon, FacebookShareButton, TwitterShareButton, TwitterIcon, EmailShareButton, EmailIcon
} from 'react-share';
import Button from '@material-ui/core/Button';
import {Alert, AlertTitle} from "@mui/material";
import {FacebookProvider, Comments, Share} from 'react-facebook';
import Comment from '../Comment/Comment'

const BlogDetail = (props) => {
    const [blog, setBlog] = useState({})
    const [blogs, setBlogs] = useState([]);
    const [upvote, setUpvote] = useState(blog.upvote);
    const content = blog.content
    const param = useParams()
    const up = param.id
    const shareUrl = +process.env.REACT_APP_IS_LOCALHOST === 1 ? "https://peing.net/ja/" : window.location.href;
    console.log(process.env.REACT_APP_IS_LOCALHOST)


    const incrementVote = (e) => {
        axiosInstance.post(`blog/upvote/${up}`).then((res) => {
            const allPosts = res.data;
            if (allPosts.response_msg === 'SUCCESS') {
                setUpvote((prev) => prev + 1);

            } else if (allPosts.message === 'downvote to upvote') {
                setUpvote((prev) => prev + 2);
            } else alert('errrrrr')
        }).catch((err) => {
            alert('errrrrr')
        })
        ;
    }
    const decrementVote = (e) => {
        axiosInstance.post(`blog/downvote/${up}`).then((res) => {
            const allPosts = res.data;
            console.log(allPosts)
            if (allPosts.response_msg === 'SUCCESS') {
                setUpvote((prev) => prev - 1);

            } else if (allPosts.message === 'upvote to downvote') {
                setUpvote((prev) => prev - 2);
            }
        }).catch((err) => {
            alert('vui long nhap lai')
        })
    }

    useEffect(() => {
        axiosInstance.get('blog/' + up).then((res) => {
            console.log(res)
            const allPosts = res.data.data;
            console.log(allPosts)

            setBlog(allPosts);
            setUpvote(res.data.data.upvote)

        });
    }, []);


    const getBlogs = () => {


        let result = [];
        const list = blogs && blogs.length > 0 && blogs.map((blogPost) => {
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
            result.push(<div key={i} className='row mb-2'>
                <div className='col-md-6'>
                    {list[i]}
                </div>
                <div className='col-md-6'>{list[i + 1] ? list[i + 1] : null}
                </div>


            </div>)
        }
        return result
    }

    // display the data returned from the server
    const createBlog = () => {
        return {__html: blog.content}
    }

    //auto-capitalize
    const capitalizeFirstLetter = (word) => {
        if (word) return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    }

    return (<div>
        <div className="body_image">

            <img src={mainLogo} alt="" className='body_image_banner'/>

        </div>
        <div className='container py-2'>
            <div className='screen-default'>
                <div className='row'>
                    <div className='col col-1 screen-default_upvote'>
                        <Button onClick={incrementVote}><FontAwesomeIcon icon={faCaretUp} style={{paddingLeft: '16px'}}
                                                                         className="fa"/>
                        </Button>

                        <div className='screen-default_upvote_count' style={{paddingLeft: '9px'}}>
                            {upvote}
                        </div>
                        <Button onClick={decrementVote}><FontAwesomeIcon icon={faCaretDown}
                                                                         style={{paddingLeft: '16px'}}
                                                                         className="fa"/></Button>


                        <FacebookShareButton
                            url={shareUrl}
                            quote={blog.title}
                            hashtag={"#Blog"}
                            description={blog.description}
                            className="Demo__some-network__share-button"
                        >
                            <FacebookIcon size={32} round={true}/>
                        </FacebookShareButton>
                        <br/>
                        <TwitterShareButton
                            title={"test"}
                            url={"https://peing.net/ja/"}
                            hashtags={["hashtag1", "hashtag2"]}
                        >
                            <TwitterIcon size={32} round={true}/>
                        </TwitterShareButton>
                        <br/>
                        <EmailShareButton
                            title={"test"}
                            url={"https://drive.google.com/drive/u/0/my-drive"}
                            hashtags={["hashtag1", "hashtag2"]}
                        >
                            <EmailIcon size={32} round={true}/>
                        </EmailShareButton>
                    </div>
                    <div className='col col-8'>
                        <header className='mb-05'>
                            <div className='body-post' style={{width: '760px', height: '73px'}}>
                                <img className='body-post_img' style={{width: '45px', height: '45px'}}
                                     src={blog.avatar_author} alt=""/>

                                <div className='body-post_feed' style={{width: '700px', height: '73px'}}>
                                    <div className='body-post_feed_meta'>
                                        <a href="" className='body-post_feed_meta_user'>
                                            {blog.rank == 'Quản trị viên' ? (<span>
                                            <FontAwesomeIcon icon={faUser}
                                                             className="fa"/>{blog.author_name}
                                                </span>) : (<div>{blog.author_name}
                                            </div>)}
                                            <div className='body-post_feed_meta_user_info'>
                                                <div className='body-post_feed_meta_user_info_user'>

                                                    <a href="" className='body-post_feed_meta_user_info_user_a'>
                                                        <img src={blog.avatar_author}
                                                             className='body-post_feed_meta_user_info_user_a_img'
                                                             alt=""/>
                                                    </a>
                                                    <div className='body-post_feed_meta_user_info_user_name'>
                                                        <a href=""
                                                           className='body-post_feed_meta_user_info_user_name_a'>
                                                            {blog.rank == 'Quản trị viên' ? (

                                                                <span>
                                            <FontAwesomeIcon icon={faCheck}
                                                             className="fa"/>{blog.author_name}
                                                </span>) : (<div>{blog.author_name}
                                                            </div>)}

                                                        </a>
                                                        <div><span
                                                            className='body-post_feed_meta_user_info_user_name_span'>
                                                @{blog.author_email}


                                        </span>
                                                            <div>
                                                                {blog.rank == 'Quản trị viên' ? (<span
                                                                    className="badge rounded-pill bg-primary">{blog.rank}</span>) : (
                                                                    <span
                                                                        className="badge rounded-pill bg-success">{blog.rank}</span>)}

                                                            </div>
                                                            <div
                                                                className='body-post_feed_meta_user_info_user_name_div'>
                                                                <FontAwesomeIcon icon={faEye}
                                                                                 className="fa"/>
                                                                {blog.view_count}
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='body-post_feed_meta_user_info_user_follow'>


                                                    </div>
                                                </div>
                                            </div>
                                        </a>

                                        <span
                                            className='body-post_feed_meta_link'> Thời gian tạo: {blog.time_post}</span>
                                        <span
                                            className='body-post_feed_meta_link'> Thời gian đọc: 9 phút</span>
                                    </div>
                                    <div className='body-post_feed_starts'>
                                        <span className='body-post_feed_starts_item'>
                                        <FontAwesomeIcon icon={faEye}
                                                         className="fa"/>
                                            {blog.view_count}
                                    </span>
                                        <span className='body-post_feed_starts_item'>
                                        </span>
                                        <span className='body-post_feed_starts_item'>
                                        <FontAwesomeIcon icon={faShare}
                                                         className="fa"/>
                                            7
                                    </span>
                                        <span className='body-post_feed_starts_item'>
                                        </span>
                                    </div>
                                </div>


                            </div>
                        </header>
                        <h1 className='content-type'>Version 1.x.x: compatible with React versions 0.13.x, 0.14.x and
                            15.x.x.</h1>
                        <div className='d-md-flex'></div>
                        <div>
                            <div dangerouslySetInnerHTML={{__html: content}}/>
                            Từ thuở sơ khai, systems administrators chuẩn bị server vật lý như cài đặt OS, driver, đảm
                            bảo memory/disk/processor để deploy phần mềm. Ngoài ra họ còn phải quan tâm tới việt
                            upgrades và những thứ khác liên quan phần cứng để deploy phần mềm(software). Phần
                            cứng(hardware) bị gắn chặt với software. Giai đoạn này có tên là Bare metal

                            Tiếp theo đó tới giai đoạn virtual machine, ở giai đoạn này, người ta tạo ra các máy ảo, khi
                            phần hardware bị lỗi, người ta có thể migrate máy ảo sang phần hardware khác. Ngoài ra
                            system administrator cũng có thể cho chạy nhiều máy ảo trên cùng một phần cứng để tiết kiệm
                            chi phí. Tuy nhiên máy ảo có khá nhiều hạn chế.

                            Kỉ nguyên containerized development, tiêu biểu của containerized development là Docker,
                            OpenVZ... Kỹ thuật này cho phép system administrator chạy nhiều ứng dụng khác nhau trên cùng
                            hệ thống mà không làm ảnh hưởng tới nhau, cung cấp môi trường nhẹ hơn nhiều so với virtual
                            machine, hoạt động thống nhất giữa các môi trường.... bạn có thể tìm hiểu thêm về điểm vượt
                            bật của containerized development so với virtual machine tại đây

                            Với các kiểu mô hình server truyền thống ở trên, chúng ta xây dựng và triển khai trang
                            web/ứng dụng trên một số cơ sở hạ tầng và phải có trách nhiệm cung cấp, quản lý tài nguyên
                            cho server. Tuy nhiên, chúng ta có thể gặp một số vấn đề sau:


                        </div>
                        <div className=''>
                            <Alert severity="info">
                                <AlertTitle>Nguồn :</AlertTitle>
                                Tài liệu tham khảo tại : — <strong><a href={blog.source}>{blog.source}</a></strong>
                            </Alert>
                        </div>

                    </div>
                    <div className='col col-3'>
                        <Comment></Comment>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default BlogDetail;