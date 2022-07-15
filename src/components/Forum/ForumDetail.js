import React, {useEffect, useState} from "react";
import './BlogDetail.scss'
import {Link, useParams} from "react-router-dom";
import axiosInstance from "../../axios";
import {faCaretDown, faCaretUp, faCheck, faEye, faShare, faUser,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import mainLogo from "../../img/1.png"
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton
} from 'react-share';
import Button from '@material-ui/core/Button';
import {Alert, AlertTitle} from "@mui/material";

const BlogDetail = (props) => {
    const [blog, setBlog] = useState([])
    const [upvote, setUpvote] = useState(blog.upvote);
    const content = blog.content
    const param = useParams()
    const up = param.slug
    const idUpvote = blog.id
    const shareUrl = +process.env.REACT_APP_IS_LOCALHOST === 1 ? "https://peing.net/ja/" : window.location.href;
    const incrementVote = (e) => {
        axiosInstance.post(`blog/upvote/${idUpvote}`).then((res) => {
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
        axiosInstance.post(`blog/downvote/${idUpvote}`).then((res) => {
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
    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance
            .post(`user-blog/follow/${e}`)
            .then((res) => {

            });
    };
    useEffect(() => {
        axiosInstance.get(`blog/slug/${up}`).then((res) => {
            const allPosts = res.data.data;
            setBlog(allPosts);
            setUpvote(res.data.data.upvote)
        });
    }, []);

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
                        <div className='d-md-flex'></div>
                        <div>
                            <div dangerouslySetInnerHTML={{__html: content}}/>

                        </div>
                        <div className=''>
                            <Alert severity="info">
                                <AlertTitle>Nguồn :</AlertTitle>
                                Tài liệu tham khảo tại : — <strong><a href={blog.source}>{blog.source}</a></strong>
                            </Alert>
                            <div className="fb-comments" data-href="http://localhost:3000/blog/data-grid-components"
                                 data-width="700" data-numposts="2"></div>
                        </div>

                    </div>
                    <div className='col col-3'>
                        <div className='artice-show'>
                            <div className='artice-show_card'>
                                <a className='artice-show_card_flex' href="">
                                    <img className='artice-show_card_flex_avatar' src={blog.avatar_author} alt=""/>
                                    <span className='artice-show_card_flex_link'>
                                    <Link to={`/info/${blog.author_id}`}>{blog.author_name}</Link>

                                    </span>
                                </a>
                                <button value="Button" onClick={handleSubmit.bind(this,blog.author_id)}
                                        className='artice-show_card_follow'>Follow
                                </button>
                                <div className='artice-show_card_about'>{blog.author_about}</div>
                                <ul className='artice-show_card_user'></ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default BlogDetail;