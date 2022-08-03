import React from 'react';
import Typography from '@mui/material/Typography';
import {Comment as Form, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import FormPost from "./FormPost";
import Button from "@material-ui/core/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp, faComments} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import './Comment.scss'
import './CommentForm.scss'
import Box from "@mui/material/Box";
const BUTTON_COMMENT_STATUS = {
    show : 'Show',
    hidden: 'Hidden',
}

const Comment = ({
                     comment,
                     replies,
                     currentUserID,
                     deleteComment,
                     activeComment,
                     setActiveComment,
                     replyComment,
                     addComment,
                     reply_of = null,
                     updateComment,
                     incrementVote,
                     showComment,
                     setShowComment,
                     decrementVote,
                     index
                 }) => {
    const fiveMinutes = 26000000
    const timePassed = new Date() - new Date(comment.created_at) > fiveMinutes;
    const canReply = Boolean(currentUserID)
    const adminPermission = localStorage.getItem('role');
    const canEdit = currentUserID === (comment.author_id && !timePassed) || adminPermission.role === 'admin'
    const canDelete = currentUserID === (comment.author_id && !timePassed) || adminPermission.role === 'admin'
    const createdAt = moment.utc(comment.created_at).local().startOf('seconds').fromNow()
    const updatedAt = moment.utc(comment.time_edit).local().startOf('seconds').fromNow()
    const isReplying = activeComment && activeComment.type === 'replying' &&
        activeComment.id === comment.id
    const isEditing = activeComment && activeComment.type === 'editing' &&
        activeComment.id === comment.id
    const replyID = reply_of ? reply_of : comment.id
    return (
        <div>
            <div style={{display: 'flex', boxShadow: '#a17d7d 0 0.5px 0px 0px', margin: '42px 0px 42px 0px'}}>
                <div>
                    <Button onClick={() => incrementVote(comment.id, index)}><FontAwesomeIcon icon={faCaretUp}
                                                                                       style={{padding: '0.5px 0px 0px 16px'}}
                                                                                       className="fa fa-3x"/>
                    </Button>

                    <div className='screen-default_upvote_count'>
                        {comment.quantity_upvote}
                    </div>
                    <Button onClick={() => decrementVote(comment.id)}><FontAwesomeIcon icon={faCaretDown}
                                                                     style={{padding: '0px 0px 0px 16px'}}

                                                                     className="fa fa-3x"/></Button>
                </div>

                <div style={{width:'100%'}}>
                    <Form.Group>
                        <Form>
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
                                                })

                                                }><Icon name='reply'/>
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
                                {/*{!showComment && <Button> Show all</Button>}*/}

                                {
                                    replies.length > 0 && (
                                        <Box>
                                            <Button onClick={() => setShowComment(!showComment)}>{showComment? BUTTON_COMMENT_STATUS.hidden : BUTTON_COMMENT_STATUS.show}</Button>
                                            {/*<Button onClick={() => setShowComment(true)}>Show all</Button>*/}
                                            {showComment&&replies.map((reply, index) => (
                                                <Comment comment={reply} key={index} replies={[]}
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

                                                />
                                            ))}

                                        </Box>
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