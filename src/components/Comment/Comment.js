import React from 'react';
import {useEffect, useState} from "react";
import axiosInstance from "../../axios";
import Comment from "./CommentForm";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormPost from './FormPost'
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

const PER_PAGE = 10;

const Comments = ({currentBlogID, currentUserID, followUser}) => {

    const [backendComments, setBackendComments] = useState([])
    const [activeComment, setActiveComment] = useState(null)
    const [page, setPages] = useState(1);
    const [paginationComments, setPaginationsComments] = useState()
    const rootComments = backendComments.filter((backendComment =>
        backendComment.reply_of === null))

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
            setPaginationsComments(res.data.pagination)

        });
    }

    const deleteComment = (commentID) => {
        if (window.confirm('Are you sure you want to delete this comment')) {
            axiosInstance.delete(`comment/${commentID}`).then(() => {
                const updatedBackendComments = backendComments.filter((backendComment) => backendComment.id !== commentID)
                setPaginationsComments(updatedBackendComments)

            })
        }

    }
    const addComment = (e) => {
        const data = axiosInstance
            .post(`comment/${currentBlogID}/`, e)
            .then(comment => {
                setBackendComments([comment, ...backendComments])
                setActiveComment(null)
            })
            .catch(err => {
                console.log(err)
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
            .post(`comment/${currentBlogID}/`, reply_of_comment)
            .then(comment => {
                setBackendComments([comment, ...backendComments])
                setActiveComment(null)

            })
            .catch(error => {
                console.error(error)
            });
        return data.data
    }
    const updateComment = (text, commentID) => {
        const data = axiosInstance
            .patch(`comment/${commentID}/`, text)
            .then(()=>{
                const updateBackendComments = backendComments.map((backendComment)=>{
                 if (backendComment.id === commentID) {
                     return {...backendComment, body:text}

                 }
                 return backendComment
                })
                setBackendComments(updateBackendComments)
                setActiveComment(null)
            })


            .catch(error => {
                console.error(error)
            });
        return data.data
    }
    return (
        <div style={{boxShadow: '#a17d7d 0 0.5px 0px 0px'}}>
            <Box mt={20} sx={{width: '100%', maxWidth: 698}}>
                <Typography variant="h4" gutterBottom component="div">
                    Bình luận
                </Typography>
                <FormPost handleSubmit={addComment} summitLabel="Write"/>
                <Typography variant="h4" gutterBottom component="div">
                    Câu trả lời
                </Typography>
                <div style={{paddingTop: '10px'}}>
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
                        />
                    ))}
                </div>
                <div style={{padding: ' 35px 0px 41px 296px'}}><Stack spacing={2}>
                    <Pagination color="primary" count={Math.ceil(paginationComments?.total_row / PER_PAGE) || 0}
                                page={page}
                                onChange={handleChangePage} variant="outlined"/>
                </Stack></div>
            </Box>
        </div>
    )
}


export default Comments;