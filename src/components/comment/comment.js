import React, {useState, useEffect} from "react";
import axiosInstance from "../../axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import "./comment.css"

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const Comment = ({postId}) => {
    const history = useNavigate();
    const a = +postId;
    const initialFormData = Object.freeze({
        name: '',
        body: '',
    });
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false)
    const [blogs, setBlogs] = useState([]);
    console.log(blogs)


    useEffect(() => {
        axiosInstance.get(`comment/${a}`).then((res) => {
            const allPosts = res.data;
            setBlogs(allPosts);
            console.log(new Date());
        });
    }, []);
    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    // summit comment post
    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        axiosInstance
            .post(`comment/${a}`, {
                post: a,
                name: formData.name,
                body: formData.body,
            })
            .then((res) => {
                setLoading(false)
                window.scrollTo(0, 0)
                window.location.reload();
            });

    }

    // set css classes
    const classes = useStyles();

    const getBlogs = () => {
        let list = [];
        let result = [];
        if (blogs.length > 0) {
            blogs.map(blogPost => {
                return list.push(
                    <div
                        className="row blog-strong g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-4 d-flex flex-column position-static"
                             style={{minHeight: '81px', width: '691px'}}>
                            <div>
                                <div className="mb-1 text-muted">Time: {blogPost.date_created}</div>
                                <div className="mb-1 text-muted">User: {blogPost.name}</div>
                                <div className="mb-1 text-muted">Text: : {blogPost.body}</div>
                            </div>
                            <div className="col-auto d-lg-block img-blog">
                            </div>
                        </div>

                    </div>
                );
            })
            for (let i = 0; i < list.length; i += 2) {
                result.push
                (
                    <div key={i} className=''>
                        <div className=''>
                            {list[i]}
                        </div>
                        <div className=''>{list[i + 1] ? list[i + 1] : null}
                        </div>


                    </div>
                )
            }
        }

        return result

    }
    return (
        <div className="row">


            <div className="col-6">
                {/*<CssBaseline/>*/}
                <h1> Comment: </h1>
                <div className={classes.paper}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        onChange={e => onChange(e)}/>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="body"
                        label="body"
                        name="body"
                        autoComplete="body"
                        autoFocus
                        rows={5}
                        onChange={e => onChange(e)}/>
                    <form className={classes.form} noValidate>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={onSubmit}
                            fullWidth
                        >
                            Send
                        </Button>
                    </form>
                </div>


            </div>
            <div className="col-6 comment-text">
                {
                    getBlogs()
                }
            </div>

        </div>
    )
}

export default Comment

