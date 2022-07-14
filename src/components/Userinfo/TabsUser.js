import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import axiosInstance from "../../axios";
import Card from "@material-ui/core/Card";
import cx from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEye, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core/styles";
import {useN03TextInfoContentStyles} from '@mui-treasury/styles/textInfoContent/n03';
import {useLightTopShadowStyles} from '@mui-treasury/styles/shadow/lightTop';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

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
export default function TabInfomation() {
    const [value, setValue] = React.useState('1');
    const [infor, setInfor] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [userBlog, setUserBlog] = useState([]);
    const [page, setPages] = useState(1);
    const [pagi, setPagi] = useState()
    useEffect(() => {
        axiosInstance.get('user-blog/info/').then((res) => {
            const allPosts = res.data.data;
            setInfor(allPosts);
        });
    }, []);
    const handleChangePage = (e, page) => {
        setPages(page)

    }
    useEffect(() => {
        axiosInstance.get(`forum/user-blog?page=${page}`).then((res) => {
            const allPosts = res.data.data;
            console.log(allPosts)
            setBlogs(allPosts);
            setPagi(res.data.pagination)
        });
    }, [page]);
    useEffect(() => {
        axiosInstance.get('blog/count/').then((res) => {
                const allPosts = res.data.data;
                setBlogs(allPosts);
            }
        )
            .catch((err) => {
                alert(err.message)
            });
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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

    const InforBlogs = () => {
        return (
            <div className='hidden-md-down_user-profile'>
                <button className='hidden-md-down_user-profile_btn-share'>
                    <a href="https://www.facebook.com/profile.php?id=100071073641290">Liên kết với
                        facebook</a>
                </button>
                <div className='hidden-md-down_user-profile_stats'>
                                    <span className="hidden-md-down_user-profile_stats_link">
                                        <p>Tổng lượt xem</p>
                                        <p className='hidden-md-down_user-profile_stats_link_count'>{blogs.total_views}</p>
                                    </span>
                    <span className="hidden-md-down_user-profile_stats_link">
                                        <p>Bài viết</p>
                                        <p className='hidden-md-down_user-profile_stats_link_count'>{blogs.total_blogs}</p>
                                    </span>
                    <span className="hidden-md-down_user-profile_stats_link">
                                        <p>Số câu trả lời</p>
                                        <p className='hidden-md-down_user-profile_stats_link_count'>0</p>
                                    </span>
                    <span className="hidden-md-down_user-profile_stats_link">
                                        <p>Bookmark</p>
                                        <p className='hidden-md-down_user-profile_stats_link_count'>0</p>
                                    </span>
                </div>
            </div>

        )
    }
    const Infomations = () => {
        return (
            <div className='container mt-3'>

                <div className="row">
                    <div className="col col-9 hidden-rd-infor">
                        <div className='hidden-rd-infor_body'>
                            <h1>Thông Tin Cá Nhân</h1>
                            <p>Quản lý thông tin cá nhân của bạn</p>
                            <form action="">
                                <div className='hidden-rd-infor_body_user'>
                                    <label htmlFor="">Tên tài khoản</label>
                                    <input className='form-control' type="text" name="" id="" disabled
                                           value={infor.email}/>
                                </div>
                                <div className='hidden-rd-infor_body_user'>
                                    <label htmlFor="">Tên hiển thị</label>
                                    <input className='form-control' type="text" name="" id="" disabled
                                           value={infor.user_name}/>
                                </div>
                                <div className='hidden-rd-infor_body_user'>
                                    <label htmlFor="">Họ và tên</label>
                                    <input className='form-control' type="text" name="" id="" disabled
                                           value={infor.first_name}/>
                                </div>
                                <div className='hidden-rd-infor_body_user'>
                                    <label htmlFor="">Giới tính</label>
                                    <input className='form-control' type="text" name="" id="" disabled
                                           value={infor.sex}/>
                                </div>
                                <div className='hidden-rd-infor_body_user'>
                                    <label htmlFor="">Danh hiệu</label>
                                    <input className='form-control' type="text" name="" id="" disabled
                                           value={infor.rank}/>
                                </div>
                                <div className='hidden-rd-infor_body_user'>
                                    <label htmlFor="">Thông tin thêm</label>
                                    <input className='form-control text-ara' type="text" name="" id=""
                                           disabled value={infor.about}/>
                                </div>
                                <div className='hidden-rd-infor_body_user'>
                                    <label htmlFor="">Ngày khởi tạo</label>
                                    <input className='form-control' type="text" name="" id=""
                                           disabled value={infor.start_date}/>
                                </div>
                            </form>
                        </div>


                    </div>
                    <div className="col col-3 hidden-md-down">
                        <div className='hidden-md-down_user-profile'>
                            <button className='hidden-md-down_user-profile_btn-share'>
                                <a href="https://www.facebook.com/profile.php?id=100071073641290">Liên kết với
                                    facebook</a>
                            </button>
                            <div className='hidden-md-down_user-profile_stats'>
                                    <span className="hidden-md-down_user-profile_stats_link">
                                        <p>Tổng lượt xem</p>
                                        <p className='hidden-md-down_user-profile_stats_link_count'>{blogs.total_views}</p>
                                    </span>
                                <span className="hidden-md-down_user-profile_stats_link">
                                        <p>Bài viết</p>
                                        <p className='hidden-md-down_user-profile_stats_link_count'>{blogs.total_blogs}</p>
                                    </span>
                                <span className="hidden-md-down_user-profile_stats_link">
                                        <p>Số câu trả lời</p>
                                        <p className='hidden-md-down_user-profile_stats_link_count'>0</p>
                                    </span>
                                <span className="hidden-md-down_user-profile_stats_link">
                                        <p>Bookmark</p>
                                        <p className='hidden-md-down_user-profile_stats_link_count'>0</p>
                                    </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
    return (
        <Box sx={{width: '100%', typography: 'body1'}}>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Thông tin cá nhân" value="1"/>
                        <Tab label="Danh sách bài viết" value="2"/>
                        <Tab label="Người theo dõi" value="3"/>
                        <Tab label="Danh sách chặn" value="4"/>

                    </TabList>
                </Box>
                <TabPanel value="1">{Infomations()}</TabPanel>
                <TabPanel value="2">
                    <div className='container mt-3'>
                        <div className="row">
                            <div className="col col-9 hidden-rd-infor">
                                {ProjectCardDemo()}
                                <div style={{padding: ' 35px 0px 41px 347px'}}><Stack spacing={2}>
                                    <Pagination color="primary" count={Math.ceil(pagi?.total_row / PER_PAGE) || 0}
                                                page={page}
                                                onChange={handleChangePage} variant="outlined"/>
                                </Stack></div>
                            </div>
                            <div className="col col-3 hidden-md-down">
                                {InforBlogs()}
                            </div>
                        </div>
                    </div>

                </TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
                <TabPanel value="4">Item Three</TabPanel>

            </TabContext>
        </Box>
    );
}