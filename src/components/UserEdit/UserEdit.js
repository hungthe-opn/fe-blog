import React, {useEffect, useState} from "react";
import axiosInstance from "../../axios";
import './UserEdit.scss'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

const UserEdit = () => {
    return (<>
            <div>
                <div className='container'>
                    <div className='form-edit'>
                        <div className='form-edit_body'>
                            <h1>Chỉnh sửa thông tin tài khoản</h1>
                            <p>Quản lý thông tin</p>
                            <form action="">
                                <div className='form-edit_body_image'>
                                    <img className='form-edit_body_image_rounded' src="" alt=""/>
                                </div>
                                <div className='form-edit_body_user'>
                                    <label htmlFor="">Tên tài khoản</label>
                                    <input className='form-control' type="text" name="" id="" disabled
                                    />
                                </div>
                                <div className='form-edit_body_user'>
                                    <label htmlFor="">Tên hiển thị</label>
                                    <input className='form-control' type="text" name="" id=""
                                    />
                                </div>
                                <div className='form-edit_body_user'>
                                    <label htmlFor="">Họ và tên</label>
                                    <input className='form-control' type="text" name="" id=""
                                    />
                                </div>
                                <div className='hidden-rd-infor_body_user'>
                                    <label htmlFor="">Thông tin thêm</label>
                                    <input className='form-control text-ara' type="text" name="" id=""
                                    />
                                </div>
                                <Button className='btn-summit'variant="contained" color="success">
                                    Success
                                </Button>
                                <Button className='btn-close'src='/blog' variant="contained" color="error">
                                    Close
                                </Button>

                            </form>
                        </div>

                    </div>
                </div>


                <div className="footer"><h2 className="footer-item"></h2></div>
            </div>
        </>
    )
}
export default UserEdit;