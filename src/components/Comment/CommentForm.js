import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import Button from "@mui/material/Button";
import {Comment as Form, Icon} from "semantic-ui-react";
import FormPost from "./FormPost";

const Div = styled('div')(({theme}) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
}));

const Comment = ({
                     comment,
                     replies,
                     currentUserID,
                     deleteComment,
                     activeComment,
                     setActiveComment,
                     followUser,
                     replyComment,
                     addComment,
                     reply_of = null,
    updateComment
                 }) => {
    const fiveMinutes = 300000
    const timePassed = new Date() - new Date(comment.created_at) > fiveMinutes;
    const canReply = Boolean(currentUserID)
    const adminPermission = localStorage.getItem('role');
    const canEdit = currentUserID === comment.author_id || adminPermission.role === 'admin'
    const canDelete = currentUserID === comment.author_id || adminPermission.role === 'admin'
    const createdAt = new Date(comment.created_at).toLocaleDateString();
    const isReplying = activeComment && activeComment.type === 'replying' &&
        activeComment.id === comment.id

    const isEditing = activeComment && activeComment.type === 'editing' &&
        activeComment.id === comment.id
    const replyID = reply_of ? reply_of : comment.id
    return (
        <div style={{paddingTop: '20px'}}>
            <Form.Group>
                <Form>
                    <Form.Avatar as='a' className='body-image_comment' src={comment.avatar_author}/>
                    <Form.Content>
                        <Form.Author>{comment.author_name}</Form.Author>
                        <Form.Metadata>
                            <div>{createdAt}</div>
                            <div>
                                <Icon name='star'/>{followUser} Follow
                            </div>
                        </Form.Metadata>
                        <Form.Text>
                            {!isEditing && <Typography dangerouslySetInnerHTML={{__html: comment.body}}></Typography>}
                            {isEditing &&(
                                <FormPost summitLabel='Update' hasCancelButton
                                          body={comment.body}
                                          handleSubmit={(text)=>updateComment(text, comment.id)}
                                          handleCancel = {()=> setActiveComment(null)}
                                />
                            )}
                        </Form.Text>
                        <Form.Actions>
                            {canReply && (

                                <Form.Action onClick={() => setActiveComment({
                                    id: comment.id,
                                    type: 'replying'
                                })}>Reply</Form.Action>
                            )}
                            {canEdit && (<Form.Action
                                onClick={() => setActiveComment({id: comment.id, type: 'editing'})}>Edit</Form.Action>)}
                            {canDelete &&
                                (
                                    <Form.Action onClick={() => deleteComment(comment.id)}>Delete</Form.Action>)
                            }
                            <Form.Action>
                                <Icon name='expand'/>
                                Full-screen
                            </Form.Action>
                        </Form.Actions>
                        {isReplying && (
                            <FormPost summitLabel='Reply' handleSubmit={(text) => replyComment(text, replyID)}/>
                        )}
                        {replies.length > 0 && (
                            <Typography>
                                {replies.map((reply) => (
                                    <Comment comment={reply} key={reply.id} replies={[]} currentUserID={currentUserID}
                                             replyComment={replyComment}
                                             deleteComment={deleteComment}
                                             addComment={addComment}
                                             reply_of={comment.id}
                                             activeComment={activeComment}
                                             setActiveComment={setActiveComment}
                                             updateComment={updateComment}
                                    />
                                ))}

                            </Typography>
                        )
                        }
                    </Form.Content>
                </Form>
            </Form.Group>

        </div>
    )
}
export default Comment