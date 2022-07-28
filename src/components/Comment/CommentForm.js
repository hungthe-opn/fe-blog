import React from 'react';
import Typography from '@mui/material/Typography';
import {Comment as Form, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import FormPost from "./FormPost";
import Button from "@material-ui/core/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp, faComments} from "@fortawesome/free-solid-svg-icons";
import './Comment.scss'
import './CommentForm.scss'

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
    const canReply = Boolean(currentUserID)
    const adminPermission = localStorage.getItem('role');
    const canEdit = currentUserID === (comment.author_id || adminPermission.role === 'admin') && !timePassed
    const canDelete = currentUserID === (comment.author_id || adminPermission.role === 'admin') && !timePassed
    const createdAt = new Date(comment.created_at).toLocaleDateString();
    const updatedAt = new Date(comment.updated_at).toLocaleDateString();

    const isReplying = activeComment && activeComment.type === 'replying' &&
        activeComment.id === comment.id
    const isEditing = activeComment && activeComment.type === 'editing' &&
        activeComment.id === comment.id
    const replyID = reply_of ? reply_of : comment.id
    return (
        <div>
            <div style={{display: 'flex', boxShadow: '#a17d7d 0 0.5px 0px 0px', margin: '42px 0px 42px 0px'}}>
                <div>
                    <Button onClick={() => incrementVote(comment.id)}><FontAwesomeIcon icon={faCaretUp}
                                                                                       style={{padding: '0.5px 0px 0px 16px'}}
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
                            <Form.Content style={{maxWidth: 900}}>

                                <Form.Text style={{width: '100%', maxWidth: 1000}
                                }>
                                    {!isEditing &&

                                        <Typography variant="h5" gutterBottom component="div" style={{width: '130%'}}
                                                    dangerouslySetInnerHTML={{__html: comment.body}}></Typography>}
                                    {isEditing && (
                                        <FormPost summitLabel='Update' hasCancelButton
                                                  body={comment.body}
                                                  handleSubmit={(text) => updateComment(text, comment.id)}
                                                  handleCancel={() => setActiveComment(null)}
                                        />
                                    )}
                                </Form.Text>
                                <Typography className='comment-body' style={{margin: '24px 0px 24px 0px'}}>
                                    <Typography>
                                        <Form.Actions>
                                            {canReply && (

                                                <Form.Action onClick={() => setActiveComment({
                                                    id: comment.id,
                                                    type: 'replying'
                                                })}><Icon name='reply'/>
                                                    Reply</Form.Action>
                                            )}
                                            {canEdit && (<Form.Action
                                                onClick={() => setActiveComment({
                                                    id: comment.id,
                                                    type: 'editing'
                                                })}><Icon name='edit'/>
                                                Edit</Form.Action>)}
                                            {canDelete &&
                                                (
                                                    <Form.Action
                                                        onClick={() => deleteComment(comment.id)}>
                                                        <Icon name='delete'/>
                                                        Delete</Form.Action>)
                                            }
                                            <Form.Action>
                                                <Icon name='share'/>
                                                Share
                                            </Form.Action>
                                            <Form.Action>
                                                <Icon name='time'/>
                                                {createdAt}
                                            </Form.Action>
                                            <Form.Action>
                                                <Icon name='pencil alternate'/>
                                                {updatedAt}
                                            </Form.Action>
                                        </Form.Actions>
                                    </Typography>
                                    <Typography className='fw-wrap_user_info' style={{backgroundColor: '#b0e0e6'}}>
                                        <img className='fw-wrap_user_info_bar' src={comment.avatar_author}
                                             alt=""/>
                                        <Typography className='fw-wrap_user_info_detail'>
                                            <a href=""> <Link
                                                to={`/info/${comment.author_id}`}>{comment.author_name}</Link>
                                            </a>
                                            <Typography className='fw-wrap_user_info_detail_flair'>
                                                <span><FontAwesomeIcon icon={faComments}
                                                                       className="fa"/>
                                                    {comment.view_count}</span>
                                                <span><FontAwesomeIcon icon={faComments}
                                                                       className="fa"/>
                                                    {comment.view_count}</span>
                                            </Typography>
                                        </Typography>
                                    </Typography>

                                </Typography>
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