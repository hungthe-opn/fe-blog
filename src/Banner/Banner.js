import React, {useContext, useEffect, useState} from "react";
import './Banner.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEdit, faPen} from "@fortawesome/free-solid-svg-icons";

const Banner = () => {

    var myData = localStorage.getItem('role');
    console.log(myData);

    return (
        <div className="">
            <div className='profile-tab'>
                <ul className='profile-tab_item'>
                    <a href="/blog" className='profile-tab_item_link'>Bài viết </a>
                    <a href="/series" className='profile-tab_item_link'>Series</a>
                    <a href="/" className='profile-tab_item_link'>Câu hỏi</a>
                    <a href="/follow" className='profile-tab_item_link'>Đang theo dõi</a>
                    <a href="/contacts" className='profile-tab_item_link'>Liên hệ</a>
                    {myData == 'author' || myData == 'admin' ? (
                        <div style={{padding: '11px', marginLeft: '257px'}}>
                         <a href="/create" className='profile-tab_post'>
                                <FontAwesomeIcon icon={faPen} className="fa profile-tab_post_pen"/>
                                Viết bài
                            </a>
                            <a href="/admin-blog" className='profile-tab_post' style={{marginLeft: '14px'}}>
                                <FontAwesomeIcon icon={faEdit} className="fa profile-tab_post_pen"/>
                                Chỉnh sửa
                            </a>

                        </div>
                    ) : null}

                </ul>

            </div>
        </div>
    )
}

export default Banner;