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
import PostViewCount from '../components/Forum/Post-View-Count'
const BannerForum = () => {
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    var myData = localStorage.getItem('role');

    return (
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
                <TabPanel value="1"><PostViewCount/></TabPanel>
                <TabPanel value="2">
                    <PostNew/>
                </TabPanel>
                <TabPanel value="3"><PostFollow/></TabPanel>
                <TabPanel value="4">Item Three</TabPanel>

            </TabContext>
        </Box>
    )
}

export default BannerForum;