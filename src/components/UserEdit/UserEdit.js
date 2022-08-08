import React, {useContext, useEffect, useState} from "react";
import axiosInstance from "../../axios";
import './UserEdit.scss'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {UserContext} from "../Context/Context";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
const UserEdit = () => {

    const imageID = useContext(UserContext).image;
    const usernameID = useContext(UserContext).user;
    const emailID = useContext(UserContext).email;
    const aboutID = useContext(UserContext).about;
    const nameID = useContext(UserContext).name;
    const {register, errors} = useForm();

    const history = useNavigate();
    const initialFormData = Object.freeze({
        id: '',
        user_name: '',
        first_name: '',
        about: '',
        image: ''
    });

    const [formData, updateFormData] = useState(initialFormData);
    const [image, setImage] = useState(null);

    useEffect(() => {
        axiosInstance.get('user/update/').then((res) => {
            updateFormData({
                ...formData,
                ['id']: res.data.data.id,
                ['user_name']: res.data.data.user_name,
                ['first_name']: res.data.data.first_name,
                ['about']: res.data.data.about,
                ['image']: res.data.data.image
            });
            setImage(res.data.data.image);
        });
    }, [updateFormData]);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleChange1 = e => {
        setImage(URL.createObjectURL(e.target.files[0]));
    }
    const handleUser = () => {
        history('/user');
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        const min = 1;
        const max = 100;
        const rand = min + Math.random() *(max - min)
        const fileName = rand+(e.target[0].files) +('.png')
        const file = new File(e.target[0].files,fileName,)
        let formData = new FormData();
        formData.append('image', file)
        formData.append('user_name', e.target[2].value)
        formData.append('first_name', e.target[3].value)
        formData.append('about', e.target[4].value)
        axiosInstance.patch('user/update/', formData)
            .then((res) => {
                window.location.reload()
            })
    }
    return (<>
            <div>
                <div className='container'>
                    <div className='form-edit'>
                        <div className='form-edit_body'>
                            <h1>Chỉnh sửa thông tin tài khoản</h1>
                            <p>Quản lý thông tin</p>
                            <form onSubmit={handleSubmit}>
                                <div className='form-edit_body_image'>
                                    <div style={{position: 'relative'}}>
                                        <img className='form-edit_body_image_rounded' src={image} alt=""/>
                                        <div style={{position: 'absolute', bottom: '0',}}>
                                            <input id="image" name="image"
                                                   type="file" onChange={handleChange1}
                                                   accept="image/*"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='form-edit_body_user'>
                                    <label htmlFor="">Tên tài khoản</label>
                                    <input className='form-control' type="text" name="email" id="email" disabled
                                           autoComplete="email"
                                           value={emailID}/>
                                </div>
                                <div className='form-edit_body_user'>
                                    <label htmlFor="">Tên hiển thị</label>
                                    <input className='form-control' type="text" name="user_name" id="user_name"
                                           value={formData.user_name} onChange={handleChange} autoComplete="user_name"
                                    />
                                    <span {...register("user_name", {required: "Please enter your first name."})}></span>
                                </div>
                                <div className='form-edit_body_user'>
                                    <label htmlFor="">Họ và tên</label>
                                    <input className='form-control' type="text" name="first_name" id="first_name"
                                           autoComplete="first_name" placeholder="Tài khoản chưa cập nhật hồ sơ !!!"
                                           value={formData.first_name} onChange={handleChange}
                                    />
                                </div>
                                <div className='hidden-rd-infor_body_user'>
                                    <label htmlFor="">Thông tin thêm</label>
                                    <input className='form-control text-ara' type="text" name="about" id="about"
                                           placeholder="Tài khoản chưa cập nhật hồ sơ !!!" onChange={handleChange}
                                           value={formData.about} autoComplete="about"
                                    />
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div><Button className='btn-summit' variant="contained" color="success"
                                                 type="submit"
                                    >
                                        Update
                                    </Button></div>
                                    <div>

                                        <Button src='/user'  variant="contained" color="error"
onClick={handleUser}
                                    >
                                        Close
                                    </Button>
                                    </div>
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