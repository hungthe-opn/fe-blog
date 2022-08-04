import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../../axios";
import Comments from '../Comment/Comment'
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton
} from 'react-share';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Comment as Form, Icon} from "semantic-ui-react";
import {faCaretDown, faCaretUp,} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './ForumDetail.scss'
import mainLogo from "../../img/QA.png"
import moment from "moment";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SelectRE from "react-select";
import SunEditor from "suneditor-react";
import {makeStyles} from "@material-ui/core/styles";
import 'suneditor/dist/css/suneditor.min.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1500,
    overflow: 'scroll',
    height: 780,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const deletebtn = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
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
const ForumDetail = ({IdUserLogin, infor}) => {

    const [blog, setBlog] = useState({})
    const initialFormData = Object.freeze({
        title: '', content: '', description: '', tag: '[]', slug: ''
    });
    const [upvote, setUpvote] = useState(blog.upvote);
    const [data, setData] = useState([])
    const [activateUpvote, setActivateUpvote] = useState(blog.is_upvote)
    const content = blog.content
    const [follow, setFollow] = useState(1)
    const param = useParams()
    const idDetail = param.id
    const idUpvote = blog.id
    const userID = IdUserLogin
    const canEdit = userID === blog.author_id
    const canDelete = userID === blog.author_id
    const shareUrl = +process.env.REACT_APP_IS_LOCALHOST === 1 ? "https://peing.net/ja/" : window.location.href;
    const createAt = moment.utc(blog.created_at).local().startOf('seconds').fromNow()
    const updateAt = moment.utc(blog.time_edit).local().startOf('seconds').fromNow()
    const [open, setOpen] = React.useState(false);
    const [opendelete, setDelete] = React.useState(false);
    const [owner, setOwner] = useState(null);
    const [blogDetail, setBlogDetail] = useState(initialFormData)
    const history = useNavigate();

    const [contects, setContects] = useState(initialFormData);
    const [formData, updateFormData] = useState(initialFormData);
    const [formtag, setFormTag] = useState(initialFormData);
    const [tag, setTag] = useState();

    function fetchData() {
        axiosInstance.get(`forum/detail-forum/${idDetail}`).then((res) => {
            const allPosts = res.data.data;
            setBlog(allPosts);
            setUpvote(res.data.data.upvote)
            setActivateUpvote(allPosts.is_upvote);
            updateFormData({
                ...formData,
                ['title']: res.data.data.title,
                ['content']: res.data.data.content,
                ['description']: res.data.data.description,
                ['tag']: res.data.data.tag,
                ['slug']: res.data.data.slug
            })
        });
    }

    useEffect(() => {
        axiosInstance.get('blog/tag/').then((res) => {
            const allPosts = res.data.data;
            setTag(allPosts);
            console.log(allPosts)
        });
    }, [])
    const classes = useStyles();
    const disableOtherButtons = (currentButton) => {
        if (activateUpvote === currentButton) {
            setActivateUpvote()
        } else {
            setActivateUpvote(currentButton)
        }
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

    const handleChangeContent = (content) => {
        const newFormValue = {...contects, content: content}
        setContects(newFormValue)
    };

    const handleChangeDes = (e) => {
        console.log(e)
        const newFormValue = {...formData, description: e.target.value}
        updateFormData(newFormValue)
    };
    const onChangeTitle = (e) => {
        console.log(e.target.value)
        const newFormValue = {...formData, title: e.target.value}
        updateFormData(newFormValue)
    };

    const handleChangeTag = (id) => {
        console.log(id)
        const newFormValue = {...formtag, tag: id}
        setFormTag(newFormValue)
    };

    const handleSubmit = (owner) => {
        console.log(owner)
        axiosInstance.delete(`forum/edit-forum/${owner}`)
            .then((res) => {
                toast.success("Hủy thành công!");
                history('/');

            })
            .catch(function (error) {
                toast.error("Bạn đã đánh giá bài viết này rồi!");
            })


    };
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
    const handleOpen = (e) => {
        console.log(e)
        axiosInstance.get(`forum/detail-forum/${e}`).then((res) => {
            setBlogDetail(res.data.data)
            console.log(res.data.data)
        });
        setOpen(true)
    };
    const handleClose = () => {
        setOwner(null);
        setOpen(false);
    }
    const handleDelete = (e) => {
        setOwner(e);
        setDelete(true)
    };
    const handleCloseDelete = () => {
        setOwner(null);
        setDelete(false)
    };
    const handleSubmitEdit = (owner) => {
        axiosInstance.patch(`edit-forum/${owner}`)
            .then((res) => {
                window.location.reload();
            })
    };
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
                            hashtag={"#Forum"}
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
                                            <Typography>
                                                <Typography variant="h4" gutterBottom component="div"
                                                            style={{display: 'flex', justifyContent: 'space-between'}}>
                                                    {blog.title}

                                                    <Form.Group>
                                                        <Form>
                                                            <Form.Content style={{maxWidth: 900}}>
                                                                <Form.Actions>
                                                                    {canEdit && (<Form.Action
                                                                        onClick={handleOpen.bind(this, blog.id)}><Icon
                                                                        name='edit'/>
                                                                        Edit</Form.Action>)}
                                                                    {canDelete &&
                                                                        (
                                                                            <Form.Action
                                                                                onClick={handleDelete.bind(this, blog.id)}>
                                                                                <Icon name='trash alternate outline'/>
                                                                                Delete</Form.Action>)
                                                                    }
                                                                </Form.Actions>


                                                            </Form.Content>
                                                        </Form>
                                                    </Form.Group>
                                                </Typography>
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
                                                </Typography>
                                            </Typography>

                                        </Box>
                                    </div>
                                </header>
                                <div style={{display: 'flex'}}>
                                    <div style={{width: '67px'}}>
                                        {
                                            activateUpvote && activateUpvote ==='upvote'?<Button style={{color:'#5488c7'}} onClick={incrementVote} className=''
                                                ><FontAwesomeIcon
                                            icon={faCaretUp}
                                            style={{padding: '9.5px 0px 0px 16px'}}
                                            className="fa fa-3x"/></Button> : <Button onClick={incrementVote} style={{color:'#5b5b5b'}}
                                                ><FontAwesomeIcon
                                            icon={faCaretUp}
                                            style={{padding: '9.5px 0px 0px 16px'}}
                                            className="fa fa-3x"/>
                                        </Button>
                                        }
                                        <div className='screen-default_upvote_count'>
                                            {upvote}
                                        </div>
                                        {
                                            activateUpvote && activateUpvote ==='downvote'?<Button style={{color:'#5488c7'}} onClick={decrementVote} className=''
                                                ><FontAwesomeIcon
                                            icon={faCaretDown}
                                            style={{padding: '0px 0px 0px 16px'}}
                                            className="fa fa-3x"/></Button> :
                                                <Button onClick={decrementVote} style={{color: '#5b5b5b'}}
                                                ><FontAwesomeIcon
                                                    icon={faCaretDown}
                                                    style={{padding: '0px 0px 0px 16px'}}
                                                    className="fa fa-3x"/>
                                                </Button>
                                        }
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
                                    <div style={{width:'90%', maxWidth: 900}}>
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

                                                <Typography className='fw-wrap_user_info' style={{marginBottom:'20px'}}>
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
                                                                <Icon name='heart outline'/>{blog.follower_counter}
                                                            </Form.Actions>
                                                            <Form.Actions
                                                                className='fw-wrap_user_info_detail_flair_icon'>
                                                                <Icon name='thumbs up outline'/>{blog.points}
                                                            </Form.Actions>
                                                            <Form.Actions
                                                                className='fw-wrap_user_info_detail_flair_icon'>
                                                                <Icon name='star outline'/>{blog.reputation}
                                                            </Form.Actions>
                                                            <Form.Actions
                                                                className='fw-wrap_user_info_detail_flair_icon'>
                                                                <Icon name='comments outline'/>{blog.quantity_comments}
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
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>

                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Edit Post
                                </Typography>
                                <form action="">
                                    <form className={classes.form} noValidate>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    value={formData?.title || ''}
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="title"
                                                    label="Nhập tiêu đề"
                                                    name="title"
                                                    autoComplete="title"
                                                    onChange={onChangeTitle}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    value={formData?.description || ''}
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="description"
                                                    label="Nhập lý do"
                                                    name="description"
                                                    autoComplete="description"
                                                    onChange={handleChangeDes}
                                                    multiline
                                                    rows={4}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <SelectRE
                                                    isMulti
                                                    name="colors"
                                                    options={tag}
                                                    className="basic-multi-select"
                                                    classNamePrefix="Chọn thẻ cho bài viết"
                                                    getOptionValue={(option) => option.id}
                                                    getOptionLabel={(option) => option.title}
                                                    onChange={handleChangeTag}
                                                />
                                            </Grid>
                                        </Grid>

                                        <SunEditor
                                            value={formData?.content || ''}
                                            setContents={formData.content}
                                            name="content"
                                            width="100%"
                                            height="150px"
                                            setOptions={{
                                                buttonList: [["undo", "redo"], ["removeFormat"], ["bold", "underline", "italic", "fontSize"], ["fontColor", "hiliteColor"], ["align", "horizontalRule", "list"], ["table", "link", "image", "imageGallery", "preview", "blockquote", "formatBlock", "formatBlock", "paragraphStyle"], ["showBlocks", "codeView", "textStyle"]],
                                                colorList: [["#828282", "#FF5400", "#676464", "#F1F2F4", "#FF9B00", "#F00", "#fa6e30", "#000", "rgba(255, 153, 0, 0.1)", "#FF6600", "#0099FF", "#74CC6D", "#FF9900", "#CCCCCC"]],
                                            }}
                                            onChange={handleChangeContent}
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={handleSubmitEdit}
                                        >
                                            Đăng bài
                                        </Button>
                                    </form>

                                </form>

                            </Box>
                        </Modal>
                        <Modal
                            open={opendelete}
                            onClose={handleCloseDelete}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            style={{border: '20%'}}
                        >
                            <Box sx={deletebtn}>
                                <form>
                                    <Typography id="modal-modal-title" variant="h6" component="h2" ml={2.5}>
                                        Bạn có chắc chắn muốn xóa không?
                                    </Typography>
                                    <div className='row' style={{textAlign: 'center'}}>
                                        <div
                                            className='col col-6'
                                            style={{
                                                borderRight: '1px solid  #dee2e6',
                                                float: 'left',
                                                padding: ' 1em 0px'
                                            }}
                                            data-dismiss="modal"

                                        >
                                            <Button variant="contained" color="success"
                                                    onClick={handleSubmit.bind(this, owner)}>
                                                Đồng ý
                                            </Button>
                                        </div>
                                        <div className="col col-6 message-del" data-dismiss="modal" aria-label="Close"
                                             style={{padding: '1em 0px', float: 'right'}}>
                                            <Button variant="outlined" color="error" onClick={handleCloseDelete}>
                                                Không
                                            </Button></div>
                                    </div>

                                </form>

                            </Box>
                        </Modal>
                        <Comments currentBlogID={idDetail} currentUserID={userID} followUser={follow}
                                  answer={blog.quantity_comments} data={data}/>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default ForumDetail;