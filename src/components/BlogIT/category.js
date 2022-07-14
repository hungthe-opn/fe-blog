import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import "./blogit.css"
import axiosInstance from "../../axios";
import "./Blog.scss"
import mainLogo from "../../img/1.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEye, faUser} from "@fortawesome/free-solid-svg-icons";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Banner from '../../Banner/Banner'
import {makeStyles} from "@material-ui/core/styles";
import cx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import {useN03TextInfoContentStyles} from '@mui-treasury/styles/textInfoContent/n03';
import {useLightTopShadowStyles} from '@mui-treasury/styles/shadow/lightTop';
import Container from '@mui/material/Container'
import {Grid} from "@mui/material";

const PER_PAGE = 10;
const useStyles = makeStyles(() => ({
    root: {
        borderRadius: 20,
    },
    content: {
        padding: 24,
    },
    link_blog: {
        '&:hover': {
            color: "#000000",
        },
    }
}));
const Category = () => {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategory] = useState([]);
    const [page, setPages] = useState(1);
    const [pagi, setPagi] = useState()
    console.log(categories)
    const param = useParams()
    const idCategory = param.id
    // get featured data

    useEffect(() => {
        axiosInstance.get('category/').then((res) => {
            const allPosts = res.data.data;
            setCategory(allPosts);
        });

    }, []);
    const handleChangePage = (e, page) => {
        setPages(page)

    }
    useEffect(() => {
        axiosInstance.get(`blog/category/${idCategory}?page=${page}`).then((res) => {
            const allPosts = res.data.data;
            setBlogs(allPosts);
            setPagi(res.data.pagination)
        });
    }, [page]);

    // toUpperCase text
    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    }

    const ProjectCardDemo = () => {
        const styles = useN03TextInfoContentStyles();
        const shadowStyles = useLightTopShadowStyles();
        const cardStyles = useStyles();

        let result = [];
        const list = blogs && blogs.length > 0 && blogs.map((blogPost) => {
            return (
                <div style={{paddingTop: '22px'}}>
                    <Card className={cx(cardStyles.root, shadowStyles.root)}>
                        <div>
                            <img className='body-post_img' style={{margin: '20px', height: '50px', width: '50px'}}
                                 src={blogPost.avatar_author} alt=""/>
                            <a href="" className='body-post_feed_meta_user'>
                                {blogPost.rank == 'Quản trị viên' ? (
                                    <span>
                        <FontAwesomeIcon icon={faUser}
                                         className="fa"/>{blogPost.author_name}
                        </span>
                                ) : (
                                    <span>{blogPost.author_name}</span>)
                                }
                                <div className='body-post_feed_meta_user_info'>
                                    <div className='body-post_feed_meta_user_info_user'>

                                        <a href="" className='body-post_feed_meta_user_info_user_a'>
                                            <img src={blogPost.avatar_author}
                                                 className='body-post_feed_meta_user_info_user_a_img' alt=""/>
                                        </a>
                                        <div className='body-post_feed_meta_user_info_user_name'>
                                            <a href="" className='body-post_feed_meta_user_info_user_name_a'>
                                                {blogPost.rank == 'Quản trị viên' ? (

                                                    <span>
                                             <FontAwesomeIcon icon={faCheck}
                                         className="fa"/>{blogPost.author_name}
                                            </span>
                                                ) : (<div>{blogPost.author_name}
                                                </div>)
                                                }
                                            </a>
                                            <div><span className='body-post_feed_meta_user_info_user_name_span'>
                                             @{blogPost.author_email}
                                             </span>
                                                <div>
                                                    {blogPost.rank == 'Quản trị viên' ? (
                                                        <span
                                                            className="badge rounded-pill bg-primary">{blogPost.rank}</span>
                                                    ) : (<span
                                                            className="badge rounded-pill bg-success">{blogPost.rank}</span>
                                                    )}
                                                </div>
                                                <div className='body-post_feed_meta_user_info_user_name_div'>
                                                    <FontAwesomeIcon icon={faEye}
                                                                     className="fa"/>
                                                    {blogPost.view_count}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='body-post_feed_meta_user_info_user_follow'>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            {blogPost.tags.map(item =>
                                    <span className="badge text-bg-secondary body-post_feed_title_word_tags_cate "
                                          style={{fontSize: '100%%'}}>
                    {item.title}
                        </span>
                            )}

                            <span className='body-post_feed_meta_link'>
                        <div style={{paddingLeft: '85px'}}>
                        Lượt đọc {blogPost.view_count} -
                        Thời gian tạo {blogPost.time_post}
                        </div>

                        </span>
                        </div>
                        <Link className="link_blog" to={`/blog/${blogPost.slug}`} style={{color: '#0056b3'}}>
                            <CardContent className={cardStyles.content}>
                                <TextInfoContent
                                    classes={styles}
                                    overline={blogPost.category_name}
                                    heading={blogPost.title}
                                    body={
                                        blogPost.description ? blogPost.description.substring(0, 70) : ''
                                    }
                                />
                            </CardContent>
                        </Link>
                    </Card>

                </div>
            )
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
    return (<>
            <div className="body">
                <div className="body_image">
                    <img src={mainLogo} alt="" className='body_image_banner'/>
                </div>
                <Banner></Banner>
                <div className="text-center">
                    <a href="" className="text-center_body"> >> Tham gia Facebook group "Vì một tương lai
                        lập trình viên
                        hàng đâu" để cùng nhau học tập và kết nối </a>
                </div>
                <Container style={{maxWidth: '1377px !important'}}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <div>
                                {ProjectCardDemo()}
                            </div>
                            <div style={{padding: ' 35px 0px 41px 44%'}}><Stack spacing={2}>
                                <Pagination color="primary" count={Math.ceil(pagi?.total_row / PER_PAGE) || 0}
                                            page={page}
                                            onChange={handleChangePage} variant="outlined"/>
                            </Stack></div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <div className="footer"><h2 className="footer-item"></h2></div>
        </>
    )
};
export default Category;
