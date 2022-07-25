import React from "react";
import './Banner.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import PostFollow from '../components/Forum/Post-Follow'
import PostNew from '../components/Forum/Post-New'

const BannerForum = () => {
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    var myData = localStorage.getItem('role');
    console.log(myData);

    return (
        // <div className="">
        //     <div className='profile-tab'>
        //         <ul className='profile-tab_item'>
        //             <a href="/blog" className='profile-tab_item_link'>Bài viết </a>
        //             <a href="/series" className='profile-tab_item_link'>Series</a>
        //             <a href="/" className='profile-tab_item_link'>Câu hỏi</a>
        //             {myData === 'admin' ? (
        //                 <a href="/admin" className='profile-tab_item_link'>Quản lý</a>
        //
        //             ) : null}
        //             <a href="/follow" className='profile-tab_item_link'>Đang theo dõi</a>
        //             <a href="/contacts" className='profile-tab_item_link'>Cá nhân</a>
        //             <div style={{padding: '11px', marginLeft: '222px'}}>
        //                 <a href="/forum/create" className='profile-tab_post'>
        //                     <FontAwesomeIcon icon={faPen} className="fa profile-tab_post_pen"/>
        //                     Tạo câu hỏi
        //                 </a>
        //             </div>
        //
        //
        //         </ul>
        //
        //     </div>
        // </div>
        <Box sx={{width: '100%', typography: 'body1'}}>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Bài viết nổi bật" value="1"/>
                        <Tab label="Bài viết mới" value="2"/>
                        <Tab label="Người theo dõi" value="3"/>
                        <Tab label="Bookmarks" value="4"/>
                        <div style={{padding: '11px', marginLeft: '139px'}}>
                            <a href="/forum/create" className='profile-tab_post'>
                                <FontAwesomeIcon icon={faPen} className="fa profile-tab_post_pen"/>
                                Tạo câu hỏi
                            </a>
                        </div>
                    </TabList>

                </Box>
                <TabPanel value="1"></TabPanel>
                <TabPanel value="2">

                    <PostNew/>
                    {/*<div style={{padding: ' 35px 0px 41px 347px'}}><Stack spacing={2}>*/}
                    {/*    <Pagination color="primary" count={Math.ceil(pagi?.total_row / PER_PAGE) || 0}*/}
                    {/*                page={page}*/}
                    {/*                onChange={handleChangePage} variant="outlined"/>*/}
                    {/*</Stack></div>*/}
                    {/*<div className="col col-3 hidden-md-down">*/}
                    {/*    {InforBlogs()}*/}
                    {/*</div>*/}

                </TabPanel>
                <TabPanel value="3"><PostFollow/></TabPanel>
                <TabPanel value="4">Item Three</TabPanel>

            </TabContext>
        </Box>
    )
}

export default BannerForum;