import React, {useContext, useEffect, useState} from "react";
import axiosInstance from "../../axios";
import './UserEdit.scss'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {UserContext} from "../Context/Context";

const UserEdit = () => {

        const imageID = useContext(UserContext).image;
        const usernameID = useContext(UserContext).user;


    return (<>
            <div>
                <div className='container'>
                    <div className='form-edit'>
                        <div className='form-edit_body'>
                            <h1>Chỉnh sửa thông tin tài khoản</h1>
                            <p>Quản lý thông tin</p>
                            <form action="">
                                <div className='form-edit_body_image'>
                                    <div style={{ position: 'relative' }}>
                                        <img className='form-edit_body_image_rounded'  src={imageID} alt=""/>
                                            <div style={{position: 'absolute',bottom: '0',}}>
  <input
    type="file"
 multiple
  />
                                            </div>
                                    </div>

                                </div>
                                <div className='form-edit_body_user'>
                                    <label htmlFor="">Tên tài khoản</label>
                                    <input className='form-control' type="text" name="" id="" disabled
                                   value={usernameID} />
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
                                <div style={{display: 'flex',justifyContent : 'space-between'}}>
                                    <div> <Button className='btn-summit'variant="contained" color="success">
                                    Success
                                </Button></div>
                               <div><Button className='btn-close'src='/blog' variant="contained" color="error">
                                    Close
                                </Button></div>
                                </div>


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