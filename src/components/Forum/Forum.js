// import React, {useState, useEffect} from "react";
// import {Link} from "react-router-dom";
// import axiosInstance from "../../axios";
// import "./Forum.scss"
// import mainLogo from "../../img/QA.png"
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faAnchorCircleCheck, faCheck, faEye, faUser, faUsersViewfinder} from "@fortawesome/free-solid-svg-icons";
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
// import Banner from '../../Banner/Banner'
// const PER_PAGE = 10;
// const Forum = () => {
//     const [blogs, setBlogs] = useState([]);
//     const [featuredBlog, setFeaturedBlog] = useState([]);
//     const [categories, setCategory] = useState([]);
//     const [page, setPages] = useState(1);
//     const [pagi,setPagi] = useState()
//     // get featured data
//     useEffect(() => {
//         axiosInstance.get('blog/featured/').then((res) => {
//             const allPosts = res.data.data;
//             setFeaturedBlog(allPosts[0]);
//         });
//
//     }, []);
//  useEffect(() => {
//         axiosInstance.get('category/').then((res) => {
//             const allPosts = res.data.data;
//             setCategory(allPosts);
//         });
//
//     }, []);
// const handleChangePage=(e,page)=> {
//     setPages(page)
//
//     }
//     useEffect(() => {
//         axiosInstance.get(`blog?page=${page}`).then((res) => {
//             const allPosts = res.data.data;
//             setBlogs(allPosts);
//             setPagi(res.data.pagination)
//         });
//     }, [page]);
//
//     // toUpperCase text
//     const capitalizeFirstLetter = (word) => {
//         if (word)
//             return word.charAt(0).toUpperCase() + word.slice(1);
//         return '';
//     }
//     const category = ()=>{
//         let result = [];
//         const list = categories && categories.length > 0 && categories.map((categorys) => {
//             return (
//                                     <span className="hidden-md-down_user-profile_stats_link">
//                                         <p>
//                                             <a href="">
//                                                 <Link to={`/blog/${categorys.id}`}>
//                                             {categorys.name}
//                                             </Link>
//                                             </a>
//
//
//                                         </p>
//                                         <p className='hidden-md-down_user-profile_stats_link_count'>
//                                             {categorys.counter}
//                                         </p>
//                                     </span>
//
//
//             )
//                 ;
//
//         })
//   for (let i = 0; i < list.length; i +=2) {
//             result.push
//             (
//                 <div>
//                     <div className=''>
//                         {list[i]}
//
//                     </div>
//                     <div className=''>{list[i + 1] ? list[i + 1] : null}
//                     </div>
//                 </div>
//             )
//         }
//         return result
//     }
//     const getBlogs = () => {
//
//         let result = [];
//         const list = blogs && blogs.length > 0 && blogs.map((blogPost) => {
//             return (
//                 <div className='body-post'>
//                     <img className='body-post_img' src={blogPost.avatar_author} alt=""/>
//
//                     <div className='body-post_feed'>
//                         <div className='body-post_feed_meta'>
//                             <a href="" className='body-post_feed_meta_user'>
//                                   {blogPost.rank=='Quản trị viên'?(
//                                                 <span>
//                                             <FontAwesomeIcon icon={faUser}
//                                              className="fa" />{blogPost.author_name}
//                                                 </span>
//                                                ):(<div>{blogPost.author_name}
//                                             </div>)
//                                             }
//                             <div className='body-post_feed_meta_user_info'>
//                                 <div className='body-post_feed_meta_user_info_user'>
//
//                                     <a href="" className='body-post_feed_meta_user_info_user_a'>
//                                         <img src={blogPost.avatar_author} className='body-post_feed_meta_user_info_user_a_img' alt=""/>
//                                     </a>
//                                     <div className='body-post_feed_meta_user_info_user_name' >
//                                         <a href="" className='body-post_feed_meta_user_info_user_name_a'>
//                                             {blogPost.rank=='Quản trị viên'?(
//
//                                                 <span>
//                                             <FontAwesomeIcon icon={faCheck}
//                                              className="fa" />{blogPost.author_name}
//                                                 </span>
//                                                ):(<div>{blogPost.author_name}
//                                             </div>)
//                                             }
//
//                                         </a>
//                                         <div><span className='body-post_feed_meta_user_info_user_name_span'>
//                                                 @{blogPost.author_email}
//
//
//                                         </span>
//                                              <div>
//                                                  {blogPost.rank=='Quản trị viên'?(
//                                                      <span className="badge rounded-pill bg-primary">{blogPost.rank}</span>
//                                                  ):(<span className="badge rounded-pill bg-success">{blogPost.rank}</span>
//                                                  )}
//
//                                              </div>
//                                         <div className='body-post_feed_meta_user_info_user_name_div'>
//                                              <FontAwesomeIcon icon={faEye}
//                                              className="fa"/>
//                                 {blogPost.view_count}
//                                         </div></div>
//
//                                     </div>
//                                     <div className='body-post_feed_meta_user_info_user_follow'>
//
//
//                                     </div>
//                                 </div>
//                             </div>
//                             </a>
//                             <span className='body-post_feed_meta_link'> Thời gian tạo {blogPost.time_post}</span>
//                             <span className='body-post_feed_meta_link'> Ngày cập nhật {blogPost.time_update}</span>
//                         </div>
//                         <div className='body-post_feed_title'>
//                             <h3 className='body-post_feed_title_word'>
//                                 <div className='body-post_feed_title_word_title'>
//                                 <a href="" className='body-post_feed_title_word_a'>
//                                 <Link to={`/blog/${blogPost.id}`}>
//                                     {blogPost.title}
//                                 </Link></a></div>
//                                 <div className='body-post_feed_title_word_tags'>
//                                     {blogPost.tags.map(item =>
//                                          <span className="badge text-bg-secondary body-post_feed_title_word_tags_cate "
//                                           style={{fontSize: '60%%'}}>
//                                         {item.title}
//                                     </span>
//                                         )}
//                                 </div>
//                             </h3>
//                         </div>
//                         <div className='body-post_feed_starts'>
//                             <span className='body-post_feed_starts_item'>
//                             <FontAwesomeIcon icon={faEye}
//                                              className="fa"/>
//                                 {blogPost.view_count}
//                         </span>
//                             <span className='body-post_feed_starts_item'>
//                             </span>
//
//                         </div>
//                     </div>
//
//                 </div>
//             )
//                 ;
//
//         })
//         //automatically incremented by 1 value
//         for (let i = 0; i < list.length; i += 2) {
//             result.push
//             (
//                 <div>
//                     <div className=''>
//                         {list[i]}
//                     </div>
//                     <div className=''>{list[i + 1] ? list[i + 1] : null}
//                     </div>
//                 </div>
//             )
//         }
//         return result
//
//     }
//     return (<>
//             <div className="body">
//                 <div className="body_image">
//                     <img src={mainLogo} alt="" className='body_image_banner'/>
//                 </div>
//                 <Banner></Banner>
//                 <div className="text-center">
//                     <a href="" className="text-center_body"> >> Tham gia Facebook group "Vì một tương lai lập trình viên
//                         hàng đâu" để cùng nhau học tập và kết nối </a>
//                 </div>
//                 <div className="container"></div>
//                 <div className="container  mt-3">
//                     <div className='row'>
//                         <div className='col col-9'>
//                             <div>
//                                 {getBlogs()}
//                             </div>
//                             <div className='body-pagination'>
//                                 <Stack spacing={2}>
//                                 <Pagination count={Math.ceil(pagi?.total_row/PER_PAGE) || 0} page={page} onChange={handleChangePage} variant="outlined"/>
//                                 </Stack>
//                             </div>
//                         </div>
//                         <div className='col col-3'>
//                             <div className='sticky'>
//                                 <div className="sticky_section">
//                                     <a className="sticky-section_a" href="">
//                                         <h4 className="sticky-section_a_h4">
//                                             Bài biết đáng chú ý
//                                         </h4>
//                                     </a>
//                                 </div>
//                                 <div className="sticky_featured">
//                                         <h4>
//                                              <Link to={`/blog/${featuredBlog.id}`}>
//                                      {featuredBlog.title}
//                                 </Link>
//                                         </h4>
//                                     <div className="sticky_featured_sidebar">
//                                         {featuredBlog.view_count}
//                                     </div>
//                                      <div className="sticky_featured_feed">
//                                          <a href="">{featuredBlog.author_name} - {featuredBlog.time_post} </a>
//                                     </div>
//                                 </div>
//                                  <div className="sticky_section">
//                                      <div> <a className="sticky-section_a" href="">
//                                         <h4 className="sticky-section_a_h4">
//                                            Danh mục bài biết
//                                         </h4>
//                                     </a></div>
//                                 </div>
//                                  <div>
//                                                <div className='hidden-md-down_user-profile_stats'>
//                                          {category()}
//                                                </div>
//                                      </div>
//                                 <div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//
//                 </div>
//             </div>
//             <div className="footer"><h2 className="footer-item"></h2></div>
//
//         </>
//     )
//
// };
// export default Forum;
import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    margin: 'auto',
    borderRadius: spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    maxWidth: 500,
    marginLeft: 'auto',
    overflow: 'initial',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: spacing(2),
    [breakpoints.up('md')]: {
      flexDirection: 'row',
      paddingTop: spacing(2),
    },
  },
  media: {
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: spacing(-3),
    height: 0,
    paddingBottom: '48%',
    borderRadius: spacing(2),
    backgroundColor: '#fff',
    position: 'relative',
    [breakpoints.up('md')]: {
      width: '100%',
      marginLeft: spacing(-3),
      marginTop: 0,
      transform: 'translateX(-8px)',
    },
    '&:after': {
      content: '" "',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)',
      borderRadius: spacing(2), // 16
      opacity: 0.5,
    },
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial',
  },
}));

export const Forum = React.memo(function BlogCard() {
  const styles = useStyles();
  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();
  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
      <CardMedia
        className={styles.media}
        image={
          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Git_icon.svg/2000px-Git_icon.svg.png'
        }
      />
      <CardContent>
        <TextInfoContent
          classes={contentStyles}
          overline={'28 MAR 2019'}
          heading={'What is Git ?'}
          body={
            'Git is a distributed version control system. Every dev has a working copy of the code and...'
          }
        />
        <Button className={buttonStyles}>Read more</Button>
      </CardContent>
    </Card>
  );
});

export default Forum