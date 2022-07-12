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

const PER_PAGE = 10;
const useStyles = makeStyles(() => ({
    root: {
        borderRadius: 20,
    },
    content: {
        padding: 24,
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
    const styles = useStyles();
    const ProjectCardDemo = () => {
        const styles = useN03TextInfoContentStyles();
        const shadowStyles = useLightTopShadowStyles();
        const cardStyles = useStyles();

        let result = [];
        const list = blogs && blogs.length > 0 && blogs.map((blogPost) => {
            return (
                <Card className={cx(cardStyles.root, shadowStyles.root)}>
                    <div>
                        <img className='body-post_img' style={{margin:'33px'}} src={blogPost.avatar_author} alt=""/>


                        {blogPost.time_read} MINUTES
                    </div>

                    <CardContent className={cardStyles.content}>
                        <TextInfoContent
                            classes={styles}
                            overline={'FACEBOOK INC.'}
                            heading={'React'}
                            body={
                                'A JavaScript library for building user interfaces. Build encapsulated components that manage their own state, then compose them to make complex UIs.'
                            }
                        />
                    </CardContent>
                </Card>)
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
    const getBlogs = () => {

        let result = [];
        const list = blogs && blogs.length > 0 && blogs.map((blogPost) => {
            return (
                <div className='body-post'>
                    <img className='body-post_img' src={blogPost.avatar_author} alt=""/>

                    <div className='body-post_feed'>
                        <div className='body-post_feed_meta'>
                            <a href="" className='body-post_feed_meta_user'>
                                {blogPost.rank == 'Quản trị viên' ? (
                                    <span>
                                            <FontAwesomeIcon icon={faUser}
                                                             className="fa"/>{blogPost.author_name}
                                                </span>
                                ) : (<div>{blogPost.author_name}
                                </div>)
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
                            <span className='body-post_feed_meta_link'> Thời gian tạo {blogPost.time_post}</span>
                            <span className='body-post_feed_meta_link'> Ngày cập nhật {blogPost.time_update}</span>
                        </div>
                        <div className='body-post_feed_title'>
                            <h3 className='body-post_feed_title_word'>
                                <div className='body-post_feed_title_word_title'>
                                    <a href="" className='body-post_feed_title_word_a'>
                                        <Link to={`/blog/${blogPost.id}`}>
                                            {blogPost.title}
                                        </Link></a></div>
                                <div className='body-post_feed_title_word_tags'>
                                    {blogPost.tags.map(item =>
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
                                {blogPost.view_count}
                        </span>
                            <span className='body-post_feed_starts_item'>
                            </span>

                        </div>
                    </div>

                </div>
            )
                ;

        })
        //automatically incremented by 1 value
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
                                {getBlogs()}
                            </div>
                            <div>

                                {ProjectCardDemo()}

                            </div>
                            <div className='body-pagination'>
                                <Stack spacing={2}>
                                    <Pagination count={Math.ceil(pagi?.total_row / PER_PAGE) || 0} page={page}
                                                onChange={handleChangePage} variant="outlined"/>
                                </Stack>
                            </div>
                        </div>
                        <div className='col col-3'>
                            <div className='sticky'>
                                <div className="sticky_section">
                                    <a className="sticky-section_a" href="">
                                        <h4 className="sticky-section_a_h4">
                                            Bài biết đáng chú ý
                                        </h4>
                                    </a>
                                </div>
                                <div className="sticky_featured">
                                    <h4>
                                        <Link to={`/blog/${featuredBlog.id}`}>
                                            {featuredBlog.title}
                                        </Link>
                                    </h4>
                                    <div className="sticky_featured_sidebar">
                                        {featuredBlog.view_count}
                                    </div>
                                    <div className="sticky_featured_feed">
                                        <a href="">{featuredBlog.author_name} - {featuredBlog.time_post} </a>
                                    </div>
                                </div>
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
            {/*<div*/}
            {/*    style={{*/}
            {/*        backgroundImage: 'url("https://images.pexels.com/photos/5483064/pexels-photo-5483064.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")',*/}
            {/*    }}*/}
            {/*    className="banner">*/}
            {/*    <div className="banner-content">*/}
            {/*        <h2>GAMO</h2>*/}
            {/*        <span>TUỔI TRẺ HÃY LUÔN LUÔN CỐ GẮNG!!</span>*/}
            {/*        <h1><a href="#id">Bắt đầu nào!!!</a></h1>*/}

            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className='container mt-3'>*/}
            {/*    <div className="row">*/}
            {/*        <div className="col col-9">*/}
            {/*        <div id="id"></div>*/}
            {/*        <div className="alert alert-primary" role="alert">*/}
            {/*            DANH MỤC*/}
            {/*        </div>*/}
            {/*        <div className="nav-scroller py-1 mb-2">*/}
            {/*            <nav className="nav d-flex justify-content-between nav-link">*/}
            {/*                <Link className="p-2 link-secondary" to='/category/html'>HTML</Link>*/}
            {/*                <Link className="p-2 link-secondary" to='/category/python'>PYTHON</Link>*/}
            {/*                <Link className="p-2 link-secondary" to='/category/react'>REACT</Link>*/}
            {/*                <Link className="p-2 link-secondary" to='/category/java'>JAVA</Link>*/}
            {/*                <Link className="p-2 link-secondary" to='/category/javascript'>JAVASCRIPT</Link>*/}
            {/*                <Link className="p-2 link-secondary" to='/category/c'>C</Link>*/}
            {/*                <Link className="p-2 link-secondary" to='/category/c++'>C++</Link>*/}
            {/*                <Link className="p-2 link-secondary" to='/category/c#'>C#</Link>*/}
            {/*                <Link className="p-2 link-secondary" to='/category/ruby'>RUBY</Link>*/}
            {/*                <Link className="p-2 link-secondary" to='/category/django'>DJANGO</Link>*/}
            {/*            </nav>*/}
            {/*        </div>*/}
            {/*        <div className="alert alert-info" role="alert">*/}
            {/*            BÀI ĐĂNG CHÚ Ý*/}
            {/*        </div>*/}
            {/*        <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">*/}
            {/*            {featuredBlog.length === 0 ? "Chờ xíu....." :*/}

            {/*                <div className="col-md-6 px-0">*/}

            {/*                    <h1 className="display-4 fst-italic">{featuredBlog.title}</h1>*/}
            {/*                    /!*<p className="lead my-3">{featuredBlog.excerpt.substr(0, 60)}...</p>*!/*/}
            {/*                    <p className="lead mb-0">*/}
            {/*                        <Link to={`/blog/${featuredBlog.slug}`} className="text-white fw-bold btn btn-info">*/}
            {/*                            Continue reading...</Link>*/}
            {/*                    </p>*/}
            {/*                </div>}*/}
            {/*        </div>*/}
            {/*        {blogs && blogs.length>0 && getBlogs()}*/}
            {/*    </div >*/}
            {/*     <div className="col col-3">*/}
            {/*    <button className="btn btn-primary"></button>*/}

            {/*    </div>*/}
            {/*    </div>*/}

            {/*</div>*/}

            <div className="footer"><h2 className="footer-item"></h2></div>

        </>
    )

};
export default Blog;
