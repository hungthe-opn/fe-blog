import React, {useContext, useEffect, useState} from "react";
import './Banner.scss'

const Banner = () => {
    return (
        <div className="">
            <div className='profile-tab'>
                <ul className='profile-tab_item'>
                    <a href="/blog" className='profile-tab_item_link'>Bài viết </a>
                    <a href="/series" className='profile-tab_item_link'>Series</a>
                    <a href="/forum" className='profile-tab_item_link'>Câu hỏi</a>
                    <a href="/follow" className='profile-tab_item_link'>Đang theo dõi</a>
                    <a href="/contact" className='profile-tab_item_link'>Liên hệ</a>
                </ul>
            </div>
        </div>
    )
}

export default Banner;