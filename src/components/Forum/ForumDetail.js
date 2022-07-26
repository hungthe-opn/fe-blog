import React, {useEffect, useState} from "react";
import '../BlogIT/BlogDetail.scss'
import './ForumDetail.scss'
import {useParams} from "react-router-dom";
import axiosInstance from "../../axios";
import {faCaretDown, faCaretUp, faCheck, faUser,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import mainLogo from "../../img/QA.png"
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
// import {UserContext} from "../Context/Context";

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

const ForumDetail = ({IdUserLogin}) => {
    const initialFormData = Object.freeze({
        body: ''
    });
    const [blog, setBlog] = useState({})
    const [upvote, setUpvote] = useState(blog.upvote);
    const [comment, setComment] = useState([])
    const content = blog.content
    const [follow, setFollow] = useState(1)
    const param = useParams()
    const idDetail = param.id
    const idUpvote = blog.id
    const userID = IdUserLogin
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

    // function fetchData() {
    //     axiosInstance.get(`comment/${idDetail}`).then((res) => {
    //         const allPosts = res.data.data;
    //         setComment(allPosts);
    //     });
    // }

    useEffect(() => {
        // fetchData()
    },);

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
                                                {commentPost.rank === 'Quản trị viên' ? (

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
                                                    {commentPost.rank === 'Quản trị viên' ? (
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
                                                                         className="fa fa-3x"/>
                        </Button>

                        <div className='screen-default_upvote_count'>
                            {upvote}
                        </div>
                        <Button onClick={decrementVote}><FontAwesomeIcon icon={faCaretDown}
                                                                         style={{paddingLeft: '16px'}}
                                                                         className="fa fa-3x"/></Button>


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

                                <Box mt={2} sx={{width: '100%', maxWidth: 900}}>
                                    <Typography variant="h4" gutterBottom component="div">
                                        {blog.title}
                                    </Typography>
                                    <Typography style={{display: 'flex',}}>
                                        <Typography gutterBottom component="div">
                                        Thời gian đăng : {blog.time_post}
                                    </Typography>
                                        <Typography gutterBottom component="div" ml={2}>
                                        Chỉnh sửa : {blog.updated_at}
                                    </Typography>
                                    <Typography gutterBottom component="div" ml={2}>
                                        Lượt xem : {blog.view_count}
                                    </Typography></Typography>

                                </Box>
                            </div>
                        </header>
                        <div className='d-md-flex'></div>
                        <div>
                            <Box mt={2} sx={{width: '100%', maxWidth: 900}}>
                                <Typography variant="h5" gutterBottom component="div"
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