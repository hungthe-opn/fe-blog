import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axiosInstance from "../../axios";
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
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Comment as Form, Icon} from "semantic-ui-react";
import {faCaretDown, faCaretUp,} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './ForumDetail.scss'
import mainLogo from "../../img/QA.png"
import moment from "moment";

const ForumDetail = ({IdUserLogin, infor}) => {
    const [blog, setBlog] = useState({})
    const [upvote, setUpvote] = useState(blog.upvote);
    const [data, setData] = useState([])
    const [activateUpvote, setActivateUpvote] = useState(blog.is_upvote)
    const content = blog.content
    const [follow, setFollow] = useState(1)
    const param = useParams()
    const idDetail = param.id
    const idUpvote = blog.id
    const userID = IdUserLogin
    const shareUrl = +process.env.REACT_APP_IS_LOCALHOST === 1 ? "https://peing.net/ja/" : window.location.href;
    const createAt = moment.utc(blog.created_at).local().startOf('seconds').fromNow()
    const updateAt = moment.utc(blog.updated_at).local().startOf('seconds').fromNow()

    function fetchData() {
        axiosInstance.get(`forum/detail-forum/${idDetail}`).then((res) => {
            const allPosts = res.data.data;
            setBlog(allPosts);
            setUpvote(res.data.data.upvote)
            setActivateUpvote(allPosts.is_upvote);
        });
    }

    const disableOtherButtons = (currentButton) => {
        if (activateUpvote === currentButton) {
            setActivateUpvote()
        } else {
            setActivateUpvote(currentButton)
        }
    }
    const doStuff1 = () => {
        disableOtherButtons('upvote')
    }
    const doStuff2 = () => {
        disableOtherButtons('downvote')
    }

    function deleteIncrementVote() {
        axiosInstance
            .delete(`forum/upvote-forum/${idUpvote}`)
            .then((res) => {
                const allPosts = res.data;
                if (allPosts.response_msg === 'SUCCESS') {
                    setUpvote((prev) => prev - 1);
                    toast.success("Hủy thành công!");
                    fetchData()
                } else toast.error("Err");
            }).catch((error) => {
            toast.error("Bạn đã đánh giá bài viết này rồi!");
        })
        ;
    }

    const incrementVote = (e) => {
        axiosInstance
            .post(`forum/upvote-forum/${idUpvote}`)
            .then((res) => {
                const allPosts = res.data;
                if (allPosts.response_msg === 'SUCCESS') {
                    setUpvote((prev) => prev + 1);
                    toast.success("Upvote thành công!");
                    disableOtherButtons('upvote')
                    fetchData()

                } else if (allPosts.message === 'downvote to upvote') {
                    toast.success("Upvote lại bài viết thành công!");
                    setUpvote((prev) => prev + 2);
                    disableOtherButtons('upvote')
                    fetchData()

                }
            }).catch(() => {
                deleteIncrementVote()
                disableOtherButtons(null)
            }
        )
        ;
    }


    const decrementVote = (e) => {
        axiosInstance
            .post(`forum/downvote-forum/${idUpvote}`)
            .then((res) => {
                const allPosts = res.data;
                if (allPosts.response_msg === 'SUCCESS') {
                    setUpvote((prev) => prev - 1);
                    toast.success("Downvote thành công!");
                    fetchData()
                    disableOtherButtons('downvote')

                } else if (allPosts.message === 'upvote to downvote') {
                    setUpvote((prev) => prev - 2);
                    toast.success("Downvote bài viết thành công!");
                    fetchData()
                    disableOtherButtons('downvote')

                } else {
                    deleteDecrementVote()
                    disableOtherButtons(null)

                }
            })
    }

    function deleteDecrementVote() {
        axiosInstance
            .delete(`forum/downvote-forum/${idUpvote}`)
            .then((res) => {
                const allPosts = res.data;
                if (allPosts.response_msg === 'SUCCESS') {
                    setUpvote((prev) => prev + 1);
                    toast.success("Hủy thành công!");
                    fetchData()
                } else toast.error("Err");
            }).catch((error) => {
            toast.error("Bạn đã đánh giá bài viết này rồi!");
        })
        ;
    }

    const addBookmark = (e) => {
        axiosInstance
            .post(`forum/post-bookmark/${idUpvote}`)
            .then((res) => {
                const allPosts = res.data
                if (allPosts.response_msg === 'SUCCESS') {
                    toast.success("Thêm vào Bookmark thành công!");
                    fetchData()
                }
            }).catch((err) => {
            toast.error("Bạn đã thêm vào bookmark viết này rồi!");
        });
    }
    const unAddBookmark = (e) => {
        axiosInstance
            .delete(`forum/post-bookmark/${idUpvote}`)
            .then((res) => {
                const allPosts = res.data
                if (allPosts.response_msg === 'SUCCESS') {
                    toast.success("Hủy vào Bookmark thành công!");
                    fetchData()

                }
            }).catch((err) => {
            toast.error("Bạn đã hủy vào bookmark viết này rồi!");
        });
    }

    useEffect(() => {
        fetchData()
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
                                                    Thời gian đăng : {createAt}
                                                </Typography>
                                                <Typography gutterBottom component="div" ml={2}>
                                                    Chỉnh sửa : {updateAt}
                                                </Typography>
                                                <Typography gutterBottom component="div" ml={2}>
                                                    Lượt xem : {blog.view_count}
                                                </Typography></Typography>

                                        </Box>
                                    </div>
                                </header>
                                <div style={{display: 'flex'}}>
                                    <div style={{width: '67px'}}>
                                        <Button onClick={incrementVote}
                                                ><FontAwesomeIcon
                                            icon={faCaretUp}
                                            style={{padding: '9.5px 0px 0px 16px'}}
                                            className="fa fa-3x"/>
                                        </Button>

                                        <div className='screen-default_upvote_count'>
                                            {upvote}
                                        </div>

                                        <Button onClick={decrementVote}
                                                ><FontAwesomeIcon
                                            icon={faCaretDown}
                                            style={{padding: '0px 0px 0px 16px'}}

                                            className="fa fa-3x"/></Button>
                                        {blog.is_bookmarks ? <Button onClick={unAddBookmark}>
                                            <Form.Actions style={{textAlign: 'center', marginLeft: '12px'}}>
                                                <Icon name='bookmark ' size='big'/>
                                            </Form.Actions>
                                        </Button> : <Button onClick={addBookmark}>
                                            <Form.Actions style={{textAlign: 'center', marginLeft: '12px'}}>
                                                <Icon name='bookmark outline' size='big'/>
                                            </Form.Actions>
                                        </Button>

                                        }
                                    </div>
                                    <div>
                                        <Box mt={2} sx={{width: '100%', maxWidth: 900}}>
                                            <Typography variant="h5" gutterBottom component="div"
                                                        dangerouslySetInnerHTML={{__html: content}}>
                                            </Typography>
                                            <Typography>
                                                {blog.tags && blog.tags.map((item) =>
                                                    <span className="post-tag_detail"
                                                          style={{fontSize: '60%%'}}>
                                                              {item.title}
                                                        </span>
                                                )}
                                            </Typography>
                                            <Typography className='fw-wrap'>
                                                <Typography className='fw-wrap_options'>

                                                </Typography>

                                                <Typography className='fw-wrap_user_info'>
                                                    <img className='fw-wrap_user_info_bar' src={blog.avatar_author}
                                                         alt=""/>
                                                    <Typography className='fw-wrap_user_info_detail'>
                                                        <a href=""> <Link
                                                            to={`/info/${blog.author_id}`}>{blog.author_name}</Link>
                                                        </a>
                                                        {/*<marquee>{blog.rank}</marquee>*/}

                                                        <Typography className='fw-wrap_user_info_detail_flair'>
                                                            <Form.Actions
                                                                className='fw-wrap_user_info_detail_flair_icon'>
                                                                <Icon name='heart outline'/>{infor.follower_counter}
                                                            </Form.Actions>
                                                            <Form.Actions
                                                                className='fw-wrap_user_info_detail_flair_icon'>
                                                                <Icon name='thumbs up outline'/>{infor.points}
                                                            </Form.Actions>
                                                            <Form.Actions
                                                                className='fw-wrap_user_info_detail_flair_icon'>
                                                                <Icon name='star outline'/>{infor.reputation}
                                                            </Form.Actions>
                                                            <Form.Actions
                                                                className='fw-wrap_user_info_detail_flair_icon'>
                                                                <Icon name='comments outline'/>{infor.quantity_comments}
                                                            </Form.Actions>
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
                                  answer={blog.quantity_comments} data={data}/>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default ForumDetail;