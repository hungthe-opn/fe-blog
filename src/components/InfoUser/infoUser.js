import React, {useContext, useEffect, useState} from "react";
import axiosInstance from "../../axios";
import {useParams} from "react-router-dom";
import '../Userinfo/User.scss'
import {UserContext} from "../Context/Context";
import Follow from "./Follow"
import TabInfomation from "./tabUser"
import UserInfo from "../Userinfo/User";
const Account = () => {

    const [infor, setInfor] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const param = useParams()
    const IdUser = param.id

    const data1 = useContext(UserContext).setData(infor.user, infor.image, infor.email);
    useEffect(() => {
        axiosInstance.get(`user-blog/get-user/${IdUser}`).then((res) => {
            const allPosts = res.data.data;
            setInfor(allPosts);
        });
    }, []);

    useEffect(() => {
        axiosInstance.get('blog/count/').then((res) => {
                const allPosts = res.data.data;
                setBlogs(allPosts);
                console.log(1111111111111111111111, res)

            }
        )
            .catch((err) => {
                console.log(1111111111111111111111111111111, err)
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
                    {/*<img src="https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/293014405_735792834292885_5876708335354205721_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=3thw0nZ-SoEAX8f5Tna&_nc_oc=AQkX0X1PQWixe2HXV3lpibWRrDD9FR47SWSsT58U3SFtU4AKo7mlMBba0p3_rKx784AJyqK6lggVYDv5oR9KRmYe&_nc_ht=scontent.fhan5-3.fna&oh=00_AT_WXGvhRtVw4sat8JJTNXZXdGblb1OKpzlQsQ-MqFYtFQ&oe=62D57340" alt=""/>*/}
                    <Follow></Follow>

                    <div className='user-profile_card'>
                    </div>
                </div>
                <div className='profile-tabs'>
                    <ul className='profile-tabs_item'>
                        <TabInfomation></TabInfomation>
                    </ul>
                </div>
            </div>
        </>
    )

};
export default Account;