import React, {useEffect, useState} from "react";
import '../BlogIT/BlogDetail.scss'
import './ForumDetail.scss'
import {Link, useParams} from "react-router-dom";
import axiosInstance from "../../axios";
import {faCaretDown, faCaretUp, faComments,} from "@fortawesome/free-solid-svg-icons";
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
import {Comment as Form} from "semantic-ui-react";
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

    return (<div>
        <div className="body_image">

            <img src={mainLogo} alt="" className='body_image_banner'/>

        </div>
        <div className='container py-2'>
            <div className='screen-default'>
                <div className='row'>
                    <div className='col col-1 screen-default_upvote'>


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
                        <div>
                            <div>
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
                                <div style={{display: 'flex'}}>
                                    <div>
                                        <Button onClick={incrementVote}><FontAwesomeIcon icon={faCaretUp}
                                                                                         style={{padding: '9.5px 0px 0px 16px'}}
                                                                                         className="fa fa-3x"/>
                                        </Button>

                                        <div className='screen-default_upvote_count'>
                                            {upvote}
                                        </div>
                                        <Button onClick={decrementVote}><FontAwesomeIcon icon={faCaretDown}
                                                                                         style={{padding: '0px 0px 0px 16px'}}

                                                                                         className="fa fa-3x"/></Button>
                                    </div>

                                    <div>
                                        <Box mt={2} sx={{width: '100%', maxWidth: 900}}>
                                            <Typography variant="h5" gutterBottom component="div"
                                                        dangerouslySetInnerHTML={{__html: content}}>
                                            </Typography>
                                            <Typography>
                                                {blog?.length > 0 && blog.tags.map(item =>
                                                        <span className="post-tag_detail"
                                                              style={{fontSize: '60%%'}}>
                                        {item.title}
                                    </span>
                                                )}
                                            </Typography>
                                            <Typography className='fw-wrap'>
                                                <Typography className='fw-wrap_options'>
                                                    <Form.Actions>
                                                        <Form.Action>Share</Form.Action>
                                                        <Form.Action>Edit</Form.Action>
                                                        <Form.Action>Follow</Form.Action>
                                                    </Form.Actions>
                                                </Typography>

                                                <Typography className='fw-wrap_user_info'>
                                                    <img className='fw-wrap_user_info_bar' src={blog.avatar_author}
                                                         alt=""/>
                                                    <Typography className='fw-wrap_user_info_detail'>
                                                        <a href=""> <Link to={`/info/${blog.author_id}`}>{blog.author_name}</Link>
                                                        </a>
                                                        <Typography className='fw-wrap_user_info_detail_flair'>
                                                <span><FontAwesomeIcon icon={faComments}
                                                                       className="fa"/>
                                                    {blog.view_count}</span>
                                                            <span><FontAwesomeIcon icon={faComments}
                                                                                   className="fa"/>
                                                                {blog.view_count}</span>
                                                        </Typography>
                                                    </Typography>
                                                </Typography>
                                            </Typography>

                                        </Box>
                                    </div>
                                </div>


                            </div>

                        </div>

                        <Comments currentBlogID={idDetail} currentUserID={userID} followUser={follow}
                                  answer={blog.quantity_comments}/>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default ForumDetail;