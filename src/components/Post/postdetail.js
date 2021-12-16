import React, {useState, useEffect} from 'react';
import {axiosInstance} from '../../axios';
import {Link, useParams} from 'react-router-dom';
import Comment from "../comment/comment";
import './postdetail.css'


export default function Post(props) {
    const {slug} = useParams();
    const {posts} = props;
    const a = slug
    console.log(a)
    const [data, setData] = useState({posts: []});


    //useEffect data ?slug=value
    useEffect(() => {
        axiosInstance.get(`posts/?slug=${a}`).then((res) => {
            setData({posts: res.data[0]});
            console.log(res.data);
        });
    }, [setData]);

    return (

        <div className='container mt-3'>
            <h1 className='display-2'></h1>
            <div className="fabbi-title"><b>Tiêu đề: {data.posts.title}</b></div>
            <div className='row '>
                <div className="alert alert-warning" role="alert">
                    Thành viên đăng: {data.posts.excerpt}

                </div>

            </div>
            <hr/>
            <p className='lead mb-5 font-weight-bold'
               onClick={() => window.scrollTo(0, 0)}>Nội dung: {data.posts.content}</p>
            <hr/>
            {data.posts.length !== 0 && <Comment postId={data.posts.id}/>}
        </div>
    )

};
