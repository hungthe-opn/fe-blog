import React, {useEffect, useState} from 'react';
import axiosInstance from "../../axios";
import Comment from "./CommentForm";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormPost from './FormPost'
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import {toast} from "react-toastify";

const PER_PAGE = 10;

const Comments = ({currentBlogID, currentUserID, followUser, answer, data}) => {
    const [backendComments, setBackendComments] = useState([])
    const [activeComment, setActiveComment] = useState(null)
    const [page, setPages] = useState(1);
    const [upvote, setUpvote] = useState(backendComments.quantity_upvote);
    const [paginationComments, setPaginationComments] = useState()
    const [list, setList] = useState(data)
    const rootComments = backendComments.filter((backendComment =>
        backendComment.reply_of === null))
    const incrementVote = (commentID) => {
        axiosInstance.post(`comment/upvote-comment/${commentID}/`).then((res) => {
            const allPosts = res.data;
            if (allPosts.response_msg === 'SUCCESS') {
                setUpvote((prev) => prev + 1);
                toast.success("Upvote thành công!");
            } else if (allPosts.message === 'downvote to upvote') {
                setUpvote((prev) => prev + 2);
                toast.success("Upvote lại bài viết thành công!");
            } else toast.error("Bạn đã đánh giá bài viết này rồi!");
        }).catch((err) => {
            toast.error("Bạn đã đánh giá bài viết này rồi!");
        })
        ;
    }
    const decrementVote = (commentID) => {
        axiosInstance.post(`comment/downvote-comment/${commentID}/`).then((res) => {
            const allPosts = res.data;
            if (allPosts.response_msg === 'SUCCESS') {
                setUpvote((prev) => prev - 1);
                toast.success("Downvote thành công!");
            } else if (allPosts.message === 'upvote to downvote') {
                setUpvote((prev) => prev - 2);
                toast.success("Downvote bài viết thành công!");
            } else toast.error("Bạn đã đánh giá bài viết này rồi!");
        }).catch((err) => {
            toast.error("Bạn đã đánh giá bài viết này rồi!");
        })
    }

    const getReplies = (commendID) => {
        return backendComments
            .filter(backendComment => backendComment.reply_of === commendID)
            .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    }

    const handleChangePage = (e, page) => {
        setPages(page)
    }

    function fetchData() {
        axiosInstance.get(`comment/${currentBlogID}?page=${page}`).then((res) => {
                const allPosts = res.data.data;
                setBackendComments(allPosts);
                setPaginationComments(res.data.pagination)
            }
        )
    }

    const deleteComment = (commentID) => {
        if (window.confirm('Are you sure you want to delete this comment')) {
            axiosInstance.delete(`comment/${commentID}`).then(() => {
                const updatedBackendComments = backendComments.filter((backendComment) => backendComment.id !== commentID)
                setPaginationComments(updatedBackendComments)
                toast.success("Xóa bình luận thành công thành công!");

            }).catch((err) => {
                toast.error("Xóa bình luận thuất bại, vui lòng thử lại!");
            });
        }
    }

    const addComment = (e) => {
        const data = axiosInstance
            .post(`comment/${currentBlogID}/`, e)
            .then(comment => {
                setBackendComments([comment, ...backendComments])
                setActiveComment(null)
                toast.success("Thêm bài viết thành công!");

            })
            .catch(err => {
                toast.error("Xóa bình luận thuất bại, vui lòng thử lại!");
            });
        return data.data
    }

    useEffect(() => {
        fetchData()
    }, [page]);

    const replyComment = (e, reply_of) => {
        let reply = {
            reply_of
        }
        let reply_of_comment = {
            ...e,
            ...reply
        }
        const data = axiosInstance
            .post(`comment/reply/${currentBlogID}/`, reply_of_comment)
            .then(comment => {
                setBackendComments([comment, ...backendComments])
                setActiveComment(null)
                toast.success("Thêm bài viết thành công!");

            })
            .catch((error) => {
                toast.error("Quá trình đăng thuất bại, vui lòng thử lại!");
            });
        return data.data
    }
    const updateComment = (text, commentID) => {
        const data = axiosInstance
            .patch(`comment/${commentID}/`, text)
            .then(()=> {
                const updateBackendComments = backendComments.map((backendComment) => {
                    if (backendComment.id === commentID) {
                        return {...backendComment, body: text}

                    }
                    return backendComment
                })
                setBackendComments(updateBackendComments)
                setActiveComment(null)
                toast.success("Chỉnh sửa bài viết thành công!");

            })

            .catch((error) => {
                toast.error("Quá trình chỉnh sửa thuất bại, vui lòng thử lại!");
            });
        return data.data
    }
    return (
        <div style={{boxShadow: '#a17d7d 0 0.5px 0px 0px'}}>
            <Box mt={2} sx={{width: '100%', maxWidth: 1000}}>

                <Typography style={{display: 'flex', paddingTop: "19px"}}>
                    <Typography variant="h5" gutterBottom component="div">
                        {answer} Answers
                    </Typography>
                </Typography>
                <div style={{padding: ' 6px 0px 25px 0px'}}><Stack spacing={2}>
                    <Pagination color="secondary" count={Math.ceil(paginationComments?.total_row / PER_PAGE) || 0}
                                page={page} variant="outlined" shape="rounded"
                                onChange={handleChangePage}/>
                </Stack></div>
                <div>
                    {rootComments.map((rootComment) => (
                        <Comment key={rootComment.id}
                                 comment={rootComment}
                                 replies={getReplies(rootComment.id)}
                                 currentUserID={currentUserID}
                                 deleteComment={deleteComment}
                                 activeComment={activeComment}
                                 setActiveComment={setActiveComment}
                                 followUser={followUser}
                                 addComment={addComment}
                                 replyComment={replyComment}
                                 updateComment={updateComment}
                                 incrementVote={incrementVote}
                                 decrementVote={decrementVote}
                                 upvote={upvote}
                        />
                    ))}
                </div>

                <Typography variant="h4" gutterBottom component="div">
                    Your Answer
                </Typography>
                <FormPost handleSubmit={addComment} summitLabel="Write"/>

            </Box>
        </div>
    )
}


export default Comments;