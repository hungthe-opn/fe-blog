import React, {useEffect, useState} from "react";
import '../BlogIT/BlogDetail.scss'
import './ForumDetail.scss'
import {useParams} from "react-router-dom";
import axiosInstance from "../../axios";
import {faCaretDown, faCaretUp, faCheck, faEye, faGrinStars, faShare, faUser,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import mainLogo from "../../img/QA.png"
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import Comments from '../Comment/Comment'
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton
} from 'react-share';
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8), display: 'flex', flexDirection: 'column', alignItems: 'center',
    }, avatar: {
        margin: theme.spacing(1), backgroundColor: theme.palette.secondary.main,
    }, form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    }, submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const ForumDetail = () => {
    const initialFormData = Object.freeze({
        body: ''
    });
    const [blog, setBlog] = useState({})
    const [idUser, setidUser] = useState(blog.author_id)
    const [upvote, setUpvote] = useState(blog.upvote);
    const [contects, setContects] = useState(initialFormData);
    const [comment, setComment] = useState([])
    const content = blog.content
    const param = useParams()
    const [page, setPages] = useState(1);
    const [pagi, setPagi] = useState()
    const idDetail = param.id
    const idUpvote = blog.id
    const [infor, setInfor] = useState([]);
    const userID = blog.author_id
    const follow = infor.follower_counter
    const shareUrl = +process.env.REACT_APP_IS_LOCALHOST === 1 ? "https://peing.net/ja/" : window.location.href;
    const incrementVote = (e) => {
        axiosInstance.post(`forum/upvote-forum/${idUpvote}`).then((res) => {
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

    const FollowUser = (e) => {
        axiosInstance
            .post(`user-blog/follow/${userID}`)
            .then((res) => {
                const allPosts = res.data
                if (allPosts.response_msg === 'SUCCESS') {
                    fetchFollow()
                }
            }).catch((err) => {
            alert('errrrrr')
        });
    }
    const Unfollow = (e) => {
        axiosInstance
            .delete(`user-blog/follow/${userID}`)
            .then((res) => {
                const allPosts = res.data
                if (allPosts.response_msg === 'SUCCESS') {
                    fetchFollow()
                }
            }).catch((err) => {
            alert('errrrrr')
        });
    }

    function fetchData() {
        axiosInstance.get(`comment/${idDetail}?page=${page}`).then((res) => {
            const allPosts = res.data.data;
            setComment(allPosts);
            setPagi(res.data.pagination)
        });
    }

    function fetchFollow() {
        axiosInstance.get(`user-blog/get-user/${userID}`).then((res) => {
            const allPosts = res.data.data;
            setInfor(allPosts);
            console.log(allPosts)

        });
    }


    useEffect(() => {
        fetchData()
        fetchFollow()
    }, [page]);

    const decrementVote = (e) => {
        axiosInstance.post(`forum/downvote-forum/${idUpvote}`).then((res) => {
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
        axiosInstance.get(`forum/detail-forum/${idDetail}`).then((res) => {
            const allPosts = res.data.data;
            console.log(allPosts)
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
    const classes = useStyles();
    const getBlogs = () => {
        let result = [];
        const list = comment && comment.length > 0 && comment.map((commentPost) => {
            return (
                <div className='forum-post' style={{width: '695px'}}>
                    <img className='forum-post_img' style={{width: '45px', height: '45px'}}
                         src={commentPost.avatar_author} alt=""/>

                    <div className='forum-post_feed'>
                        <div className='forum-post_feed_meta'>
                            <a href="" className='forum-post_feed_meta_user'>
                                {commentPost.rank == 'Quản trị viên' ? (
                                    <span>
                                            <FontAwesomeIcon icon={faUser}
                                                             className="fa"/>{commentPost.author_name}
                                                </span>
                                ) : (<div>{commentPost.author_name}
                                </div>)
                                }
                                <div className='forum-post_feed_meta_user_info'>
                                    <div className='forum-post_feed_meta_user_info_user'>

                                        <a href="" className='forum-post_feed_meta_user_info_user_a'>
                                            <img src={commentPost.avatar_author}
                                                 className='forum-post_feed_meta_user_info_user_a_img' alt=""/>
                                        </a>
                                        <div className='forum-post_feed_meta_user_info_user_name'>
                                            <a href="" className='forum-post_feed_meta_user_info_user_name_a'>
                                                {commentPost.rank == 'Quản trị viên' ? (

                                                    <span>
                                            <FontAwesomeIcon icon={faCheck}
                                                             className="fa"/>{commentPost.author_name}
                                                </span>
                                                ) : (<div>{commentPost.author_name}
                                                </div>)
                                                }

                                            </a>
                                            <div>
                                                <div>
                                                    {commentPost.rank == 'Quản trị viên' ? (
                                                        <span
                                                            className="badge rounded-pill bg-primary">{commentPost.rank}</span>
                                                    ) : (<span
                                                            className="badge rounded-pill bg-success">{commentPost.rank}</span>
                                                    )}

                                                </div>
                                            </div>

                                        </div>
                                        <div className='forum-post_feed_meta_user_info_user_follow'>


                                        </div>
                                    </div>
                                </div>
                            </a>
                            <span className='body-post_feed_meta_link'
                                  style={{margin: '0px 8px 13px 0px'}}> Thời gian : {commentPost.created_at}</span>
                        </div>
                        <div className='forum-post_feed_title'>
                            <h3 className='forum-post_feed_title_word'>
                                <div className='forum-post_feed_title_word_title'>
                                    <Box width='100%' maxWidth='600' mt={2}>
                                        <Typography variant="body1" gutterBottom
                                                    dangerouslySetInnerHTML={{__html: commentPost.body}}></Typography>
                                    </Box>

                                </div>
                            </h3>
                        </div>
                        <div className='forum-post_feed_starts'>

                            <span className='forum-post_feed_starts_item'>
                            </span>

                        </div>
                    </div>

                </div>
            )
                ;

        })
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
                    <div className='col col-11'>
                        <header className='mb-05'>
                            <div className='forum-post'>
                                <img className='forum-post_img' style={{width: '45px', height: '45px'}}
                                     src={blog.avatar_author} alt=""/>

                                <div className='forum-post_feed' style={{width: '700px', height: '73px'}}>
                                    <div className='forum-post_feed_meta'>
                                        <a href="" className='forum-post_feed_meta_user'>
                                            {blog.rank == 'Quản trị viên' ? (<span>
                                            <FontAwesomeIcon icon={faUser}
                                                             className="fa"/>{blog.author_name}
                                                </span>) : (<div>{blog.author_name}
                                            </div>)}
                                            <div className='forum-post_feed_meta_user_info'>
                                                <div className='forum-post_feed_meta_user_info_user'>

                                                    <a href="" className='forum-post_feed_meta_user_info_user_a'>
                                                        <img src={blog.avatar_author}
                                                             className='forum-post_feed_meta_user_info_user_a_img'
                                                             alt=""/>
                                                    </a>
                                                    <div className='forum-post_feed_meta_user_info_user_name'>
                                                        <a href=""
                                                           className='forum-post_feed_meta_user_info_user_name_a'>
                                                            {blog.rank == 'Quản trị viên' ? (

                                                                <span>
                                            <FontAwesomeIcon icon={faCheck}
                                                             className="fa"/>{blog.author_name}
                                                </span>) : (<div>{blog.author_name}
                                                            </div>)}

                                                        </a>
                                                        <div><span
                                                            className='forum-post_feed_meta_user_info_user_name_span'>
                                                @{blog.author_email}
                                        </span>
                                                            <div>
                                                                {blog.rank == 'Quản trị viên' ? (<span
                                                                    className="badge rounded-pill bg-primary">{blog.rank}</span>) : (
                                                                    <span
                                                                        className="badge rounded-pill bg-success">{blog.rank}</span>)}

                                                            </div>
                                                            <div
                                                                className='forum-post_feed_meta_user_info_user_name_div'>
                                                                <FontAwesomeIcon icon={faGrinStars}
                                                                                 className="fa"/>
                                                                {infor?.follower_counter}
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='forum-post_feed_meta_user_info_user_follow'>


                                                    </div>
                                                </div>
                                            </div>
                                        </a>

                                        <span
                                            className='forum-post_feed_meta_link'> Thời gian tạo: {blog.time_post} </span>
                                        {
                                            blog.author_id !== infor.id ? (
                                                    infor.is_following ? <Button onClick={Unfollow}>Unfollow</Button>
                                                        : <Button onClick={FollowUser}>Follow</Button>
                                                ) :

                                                <FontAwesomeIcon icon={faUser}
                                                                 className="fa"/>
                                        }

                                    </div>

                                    <div className='forum-post_feed_starts'>
                                        <span className='forum-post_feed_starts_item'>
                                        <FontAwesomeIcon icon={faEye}
                                                         className="fa"/>
                                            {blog.view_count}
                                    </span>
                                        <span className='forum-post_feed_starts_item'>
                                        </span>
                                        <span className='forum-post_feed_starts_item'>
                                        <FontAwesomeIcon icon={faShare}
                                                         className="fa"/>
                                            7
                                    </span>
                                        <span className='forum-post_feed_starts_item'>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <div className='d-md-flex'></div>
                        <div>
                            <Box mt={2} sx={{width: '100%', maxWidth: 900}}>
                                <Typography variant="h3" gutterBottom component="div">
                                    {blog.title}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom component="div"
                                            dangerouslySetInnerHTML={{__html: content}}>

                                </Typography>
                            </Box>
                        </div>

                            <Comments currentBlogID={idDetail} currentUserID={userID} followUser={follow} />
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default ForumDetail;