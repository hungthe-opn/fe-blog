import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./blogit.css"
import axiosInstance from "../../axios";
import "./Blog.scss"
import mainLogo from "../../img/1.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAnchorCircleCheck, faCheck, faEye, faUser, faUsersViewfinder} from "@fortawesome/free-solid-svg-icons";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Banner from '../../Banner/Banner'
import {makeStyles} from "@material-ui/core/styles";
import cx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import BrandCardHeader from '@mui-treasury/components/cardHeader/brand';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import {useN03TextInfoContentStyles} from '@mui-treasury/styles/textInfoContent/n03';
import {useLightTopShadowStyles} from '@mui-treasury/styles/shadow/lightTop';
import CardMedia from '@material-ui/core/CardMedia';
import {useFourThreeCardMediaStyles} from '@mui-treasury/styles/cardMedia/fourThree';
import {useN04TextInfoContentStyles} from '@mui-treasury/styles/textInfoContent/n04';
import {useOverShadowStyles} from '@mui-treasury/styles/shadow/over';

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
const useStylesFeatured = makeStyles(() => ({
    root: {
        maxWidth: 343,
        margin: 'auto',
        borderRadius: 12,
        padding: 12,
    },
    media: {
        borderRadius: 6,
    },
}));
const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [featuredBlog, setFeaturedBlog] = useState([]);
    const [categories, setCategory] = useState([]);
    const [page, setPages] = useState(1);
    const [pagi, setPagi] = useState()

    // get featured data
    useEffect(() => {
        axiosInstance.get('blog/featured/').then((res) => {
            const allPosts = res.data.data;
            setFeaturedBlog(allPosts[0]);
        });

    }, []);
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
        axiosInstance.get(`blog?page=${page}`).then((res) => {
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
    const category = () => {
        let result = [];
        const list = categories && categories.length > 0 && categories.map((categorys) => {
            return (
                <span className="hidden-md-down_user-profile_stats_link">
                                        <p>
                                            <a href="">
                                                <Link to={`/blog/${categorys.id}`}>
                                            {categorys.name}
                                            </Link>
                                            </a>


                                        </p>
                                        <p className='hidden-md-down_user-profile_stats_link_count'>
                                            {categorys.counter}
                                        </p>
                                    </span>


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
    const BlogFeatured = () => {
        const styles = useStylesFeatured();
        const mediaStyles = useFourThreeCardMediaStyles();
        const textCardContentStyles = useN04TextInfoContentStyles();
        const shadowStyles = useOverShadowStyles({inactive: true});
        return (
            <div style={{paddingTop: '22px'}}>
                <Card className={cx(styles.root, shadowStyles.root)}>
                    <CardMedia
                        className={cx(styles.media, mediaStyles.root)}
                        image={
                            'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'
                        }
                    />
                    <Link to={`/blog/${featuredBlog.id}`} style={{color: '#0056b3'}}>
                        <CardContent>
                            <TextInfoContent
                                classes={textCardContentStyles}
                                overline={featuredBlog.category_name}
                                heading={featuredBlog.title}
                                body={
                                    featuredBlog.description ? featuredBlog.description.substring(0, 20) : ''
                                }

                            />
                        </CardContent>
                    </Link>
                </Card>
            </div>
        );
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

                            <span className='body-post_feed_meta_link'> Thời gian tạo {blogPost.time_post}</span>
                        </div>
                        <Link className="link_blog" to={`/blog/${blogPost.id}`} style={{color: '#0056b3'}}>

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
                    <a href="" className="text-center_body"> >> Tham gia Facebook group "Vì một tương lai lập trình viên
                        hàng đâu" để cùng nhau học tập và kết nối </a>
                </div>
                <div className="container"></div>
                <div className="container  mt-3">
                    <div className='row'>
                        <div className='col col-9'>
                            <div>

                                {ProjectCardDemo()}

                            </div>
                            <div className='body-pagination' style={{textAlign: 'center'}}>
                                <Stack spacing={2}>
                                    <Pagination color="primary" count={Math.ceil(pagi?.total_row / PER_PAGE) || 0} page={page}
                                                onChange={handleChangePage} variant="outlined"/>
                                </Stack>
                            </div>
                        </div>
                        <div className='col col-3'>
                            <div className='sticky'>

                                <div>

                                    {BlogFeatured()}</div>

                                <div className="sticky_section">
                                    <div><a className="sticky-section_a" href="">
                                        <h4 className="sticky-section_a_h4">
                                            Danh mục bài biết
                                        </h4>
                                    </a></div>
                                </div>
                                <div>
                                    <div className='hidden-md-down_user-profile_stats'>
                                        {category()}
                                    </div>

                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div className="footer"><h2 className="footer-item"></h2></div>

        </>
    )

};
export default Blog;
