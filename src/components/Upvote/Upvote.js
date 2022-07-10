import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axiosInstance from "../../axios";

const Upvote = () => {
    const [upvote, setUpvote] = useState();
    const [downvote, setDownvote] = useState();
    const {id} = useParams()

     useEffect(() => {
        axiosInstance.get('blog/upvote').then((res) => {
            const allPosts = res.data;
            setUpvote(allPosts);
            console.log(allPosts);
        });
    }, []);
    const increment = () => {
        setUpvote(upvote + 1)
    }

    const decrement = () => {
        setDownvote(downvote - 1)
    }


    return (
        <div>
            <button onClick={increment}>
                Increment
            </button>
            <button onClick={decrement}>
                Decrement
            </button>
            <div>{count}</div>
        </div>
    )
}

export default Upvote;