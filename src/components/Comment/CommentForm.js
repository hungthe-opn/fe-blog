import React from 'react';
import Typography from '@mui/material/Typography';
import {Comment as Form, Icon} from "semantic-ui-react";
import FormPost from "./FormPost";
import Button from "@material-ui/core/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";
import './Comment.scss'

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
                     updateComment,
                     incrementVote,
                     upvote,
                     decrementVote
                 }) => {
    const fiveMinutes = 26000000
    const timePassed = new Date() - new Date(comment.created_at) > fiveMinutes;
    const checkTime = new Date() - new Date(comment.created_at)
    console.log(timePassed)
    console.log(checkTime)
    const canReply = Boolean(currentUserID)
    const adminPermission = localStorage.getItem('role');
    const canEdit = currentUserID === (comment.author_id || adminPermission.role === 'admin') && !timePassed
    const canDelete = currentUserID === (comment.author_id || adminPermission.role === 'admin') && !timePassed
    const createdAt = new Date(comment.created_at).toLocaleDateString();
    const isReplying = activeComment && activeComment.type === 'replying' &&
        activeComment.id === comment.id
    console.log(upvote)
    const isEditing = activeComment && activeComment.type === 'editing' &&
        activeComment.id === comment.id
    const replyID = reply_of ? reply_of : comment.id
    return (
        <div>
            <div style={{display: 'flex'}}>
                <div>
                    <Button onClick={() => incrementVote(comment.id)}><FontAwesomeIcon icon={faCaretUp}
                                                                     style={{padding: '9.5px 0px 0px 16px'}}
                                                                     className="fa fa-3x"/>
                    </Button>

                    <div className='screen-default_upvote_count'>
                        {upvote}
                    </div>
                    <Button onClick={() => decrementVote(comment.id)}><FontAwesomeIcon icon={faCaretDown}
                                                                     style={{padding: '0px 0px 0px 16px'}}

                                                                     className="fa fa-3x"/></Button>
                </div>

                <div>
                    <Form.Group>
                        <Form>
                            {/*<Form.Avatar as='a' className='body-image_comment' src={comment.avatar_author}/>*/}
                            <Form.Content>

                                <Form.Text style={{maxWidth: 1000}
                                }>
                                    {!isEditing &&

                                        <Typography variant="body1" gutterBottom
                                                    dangerouslySetInnerHTML={{__html: comment.body}}></Typography>}
                                    {isEditing && (
                                        <FormPost summitLabel='Update' hasCancelButton
                                                  body={comment.body}
                                                  handleSubmit={(text) => updateComment(text, comment.id)}
                                                  handleCancel={() => setActiveComment(null)}
                                        />
                                    )}
                                </Form.Text>
                                <div>
                                    <Form.Actions>
                                    {canReply && (

                                        <Form.Action onClick={() => setActiveComment({
                                            id: comment.id,
                                            type: 'replying'
                                        })}>Reply</Form.Action>
                                    )}
                                    {canEdit && (<Form.Action
                                        onClick={() => setActiveComment({
                                            id: comment.id,
                                            type: 'editing'
                                        })}>Edit</Form.Action>)}
                                    {canDelete &&
                                        (
                                            <Form.Action onClick={() => deleteComment(comment.id)}>Delete</Form.Action>)
                                    }
                                    <Form.Action>
                                        <Icon name='expand'/>
                                        Full-screen
                                    </Form.Action>
                                </Form.Actions>
</div>
                                <div></div>
                                <Form.Author>{comment.author_name}</Form.Author>
                                <Form.Metadata>
                                    <div>{createdAt}</div>
                                    <div>
                                        <Icon name='star'/>{followUser} Follow
                                    </div>
                                </Form.Metadata>
                                {isReplying && (
                                    <FormPost summitLabel='Reply' handleSubmit={(text) => replyComment(text, replyID)}/>
                                )}
                                {replies.length > 0 && (
                                    <Typography>
                                        {replies.map((reply) => (
                                            <Comment comment={reply} key={reply.id} replies={[]}
                                                     currentUserID={currentUserID}
                                                     replyComment={replyComment}
                                                     deleteComment={deleteComment}
                                                     addComment={addComment}
                                                     reply_of={comment.id}
                                                     activeComment={activeComment}
                                                     setActiveComment={setActiveComment}
                                                     updateComment={updateComment}
                                                     incrementVote={incrementVote}
                                                     decrementVote={decrementVote}
                                                     upvote={upvote}
                                            />
                                        ))}

                                    </Typography>
                                )
                                }
                            </Form.Content>
                        </Form>
                    </Form.Group>
                </div>

            </div>


        </div>
    )
}
export default Comment