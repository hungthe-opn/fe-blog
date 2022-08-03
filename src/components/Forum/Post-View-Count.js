import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faComments, faEye, faHandHoldingHeart, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axiosInstance from "../../axios";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import ErrorValue from "../Error/Error-Value";
import moment from "moment";

const PER_PAGE = 10;
const PostViewCount = () => {
    const [postNews, setPostNews] = useState([]);
    const [page, setPages] = useState(1);
    const [pagination, setPagination] = useState()
    const createdAt = moment.utc(postNews.created_at).local().startOf('seconds').fromNow()

    const handleChangePage = (e, page) => {
        setPages(page)
    }

    useEffect(() => {
        axiosInstance.get(`forum/list-view-count?page=${page}`).then((res) => {
            const allPosts = res.data.data;
            setPostNews(allPosts);
            setPagination(res.data.pagination)

        });
    }, [page]);

    const getBlogs = () => {
        let result = [];
        const list = postNews && postNews.length > 0 && postNews.map((postNew) => {
            return (
                <div className='body-post'>
                    <img className='body-post_img' src={postNew.avatar_author} alt=""/>

                    <div className='body-post_feed'>
                        <div className='body-post_feed_meta'>
                            <a href="" className='body-post_feed_meta_user'>
                                 {postNew.rank === 'Quản trị viên' ? (
                                    <span>
                        <FontAwesomeIcon icon={faUser}
                                         className="fa"/> <Link to={`/info/${postNew.author_id}`}>{postNew.author_name}</Link>
                        </span>
                                ) : (
                                    <span><Link to={`/info/${postNew.author_id}`}>{postNew.author_name}</Link></span>)
                                }
                                <div className='body-post_feed_meta_user_info'>
                                    <div className='body-post_feed_meta_user_info_user'>

                                        <a href="" className='body-post_feed_meta_user_info_user_a'>
                                            <img src={postNew.avatar_author}
                                                 className='body-post_feed_meta_user_info_user_a_img' alt=""/>
                                        </a>
                                        <div className='body-post_feed_meta_user_info_user_name'>
                                            <a href="" className='body-post_feed_meta_user_info_user_name_a'>
                                                {postNew.rank === 'Quản trị viên' ? (

                                                    <span>
                                            <FontAwesomeIcon icon={faCheck}
                                                             className="fa"/>{postNew.author_name}
                                                </span>
                                                ) : (<div>{postNew.author_name}
                                                </div>)
                                                }

                                            </a>
                                            <div><span className='body-post_feed_meta_user_info_user_name_span'>
                                                @{postNew.author_email}


                                        </span>
                                                <div>
                                                    {postNew.rank === 'Quản trị viên' ? (
                                                        <span
                                                            className="badge rounded-pill bg-primary">{postNew.rank}</span>
                                                    ) : (<span
                                                            className="badge rounded-pill bg-success">{postNew.rank}</span>
                                                    )}

                                                </div>
                                                <div className='body-post_feed_meta_user_info_user_name_div'>
                                                    <FontAwesomeIcon icon={faEye}
                                                                     className="fa"/>
                                                    {postNew.view_count}
                                                </div>
                                            </div>

                                        </div>
                                        <div className='body-post_feed_meta_user_info_user_follow'>


                                        </div>
                                    </div>
                                </div>
                            </a>
                            <span className='body-post_feed_meta_link'> Thời gian tạo : {moment.utc(postNew.created_at).local().startOf('seconds').fromNow()}</span>
                        </div>
                        <div className='body-post_feed_title'>
                            <h3 className='body-post_feed_title_word'>
                                <div className='body-post_feed_title_word_title'>
                                    <a href="" className='body-post_feed_title_word_a'>
                                        <Link to={`/forum/${postNew.id}`}>
                                            {postNew.title}
                                        </Link></a></div>
                                <div className='body-post_feed_title_word_tags'>
                                    {postNew.tags.map(item =>
                                            <span className="badge text-bg-secondary body-post_feed_title_word_tags_cate "
                                                  style={{fontSize: '60%%'}}>
                                        {item.title}
                                    </span>
                                    )}
                                </div>
                            </h3>
                        </div>
                        <div className='body-post_feed_starts'>
                            <span className='body-post_feed_starts_item'>
                            <FontAwesomeIcon icon={faEye}
                                             className="fa"/>
                                {postNew.view_count}
                        </span>
                            <span className='body-post_feed_starts_item'>
                                <FontAwesomeIcon icon={faHandHoldingHeart}
                                                 className="fa"/>
                                {postNew.upvote}
                            </span>
                            <span className='body-post_feed_starts_item'>
                                <FontAwesomeIcon icon={faComments}
                                                 className="fa"/>
                                {postNew.comment}
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
        if (!postNews || postNews.length===0) return <ErrorValue/>
    return (
        <div>
            <div className='container'>
                {getBlogs()}
            </div>
            <div className='body-pagination'>
                <div style={{padding: ' 35px 0px 41px 350px'}}><Stack spacing={2}>
                    <Pagination color="primary" count={Math.ceil(pagination?.total_row / PER_PAGE) || 0}
                                page={page}
                                onChange={handleChangePage} variant="outlined"/>
                </Stack></div>
            </div>
        </div>
    )
}
export default PostViewCount