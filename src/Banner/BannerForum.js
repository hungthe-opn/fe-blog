import React, {useContext, useEffect, useState} from "react";
import './Banner.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEdit, faPen} from "@fortawesome/free-solid-svg-icons";

const BannerForum = () => {

    var myData = localStorage.getItem('role');
    console.log(myData);

    return (
        <div className="">
            <div className='profile-tab'>
                <ul className='profile-tab_item'>
                    <a href="/blog" className='profile-tab_item_link'>Bài viết </a>
                    <a href="/series" className='profile-tab_item_link'>Series</a>
                    <a href="/" className='profile-tab_item_link'>Câu hỏi</a>
                    {myData == 'admin' ? (
                        <a href="/admin" className='profile-tab_item_link'>Quản lý</a>

                    ) : null}
                    <a href="/follow" className='profile-tab_item_link'>Đang theo dõi</a>
                    <a href="/contacts" className='profile-tab_item_link'>Cá nhân</a>
                    <div style={{padding: '11px', marginLeft: '257px'}}>
                        <a href="/create" className='profile-tab_post'>
                            <FontAwesomeIcon icon={faPen} className="fa profile-tab_post_pen"/>
                            Viết bài
                        </a>
                    </div>


                </ul>

            </div>
        </div>
    )
}

export default BannerForum;