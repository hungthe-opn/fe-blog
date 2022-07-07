import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import axiosInstance from "../../axios";
import {Link, useParams} from "react-router-dom";
import './User.scss'
import Avatar from "@mui/material/Avatar";
import {UserContext} from "../Context/Context";

const UserInfo = () => {

    const [infor, setInfor] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const data1 = useContext(UserContext).setData(infor.user, infor.image, infor.email);
    useEffect(() => {
        axiosInstance.get('user-blog/info/').then((res) => {
            const allPosts = res.data.data;
            setInfor(allPosts);
        });
    }, []);

    useEffect(() => {
        axiosInstance.get('blog/count/').
        then((res) => {
            const allPosts = res.data.data;
            setBlogs(allPosts);
                        console.log(1111111111111111111111,res)

        }
            )
        .catch((err) => {
                console.log(1111111111111111111111111111111,err)
            });
    }, []);

    // toUpperCase text
    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    }
    return (<>
            <div>
                <div className='user-profile'>
                    <div className='user-profile_card'>
                        <Avatar alt="Remy Sharp" className='avatar' sx={{width: 70, height: 70}}
                                src={infor.image}/>
                        <div className='user-profile_card_main_body'>
                            <div className='user-profile_card_main_body_username'>
                                <h1 className='user-profile_card_main_body_username_name'>{infor.user_name}</h1>
                                <h4 className='user-profile_card_main_body_username_email'>{infor.email}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='profile-tabs'>
                    <ul className='profile-tabs_item'>
                        <a href="/" className='profile-tabs_item_link'>Bài viết </a>
                        <a href="/" className='profile-tabs_item_link'>Series</a>
                        <a href="/" className='profile-tabs_item_link'>Câu hỏi</a>
                        <a href="/" className='profile-tabs_item_link'>Đang theo dõi</a>
                        <a href="/" className='profile-tabs_item_link'>Liên hệ</a>
                    </ul>
                </div>
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


                <div className="footer"><h2 className="footer-item"></h2></div>
            </div>
        </>
    )

};
export default UserInfo;