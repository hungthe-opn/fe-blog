import React, {useEffect, useState} from 'react';
import axiosInstance from "../../axios";
import {useNavigate} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import SelectRE from 'react-select';
import {toast} from "react-toastify";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8), display: 'flex', flexDirection: 'column', alignItems: 'center',
    }, avatar: {
        margin: theme.spacing(1), backgroundColor: theme.palette.secondary.main,
    }, form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    }, submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function CreatePostForum() {

    const history = useNavigate();
    const initialFormData = Object.freeze({
        title: '', content: '', description: '', tag: '[]', slug: ''
    });
    const [formData, updateFormData] = useState(initialFormData);
    const [contects, setContects] = useState(initialFormData);
    const [formTag, setFormTag] = useState(initialFormData);
    const [tag, setTag] = useState();
    const isTextareaDisabled = formData.title.length === 0;
    useEffect(() => {
        axiosInstance.get('blog/tag/').then((res) => {
            const allPosts = res.data.data;
            setTag(allPosts);
        });
    }, [])
    const handleChangeContent = (content) => {
        const newFormValue = {...contects, content: content}
        setContects(newFormValue)
    };
    const handleChangeDes = (e) => {
        const newFormValue = {...formData, description: e.target.value}
        updateFormData(newFormValue)
    };
    const onChangeTitle = (e) => {
        const newFormValue = {...formData, title: e.target.value}
        console.log(newFormValue)
        updateFormData(newFormValue)
    };

    const handleChangeTag = (id) => {
        const newFormValue = {...formTag, tag: id}
        console.log(newFormValue)
        setFormTag(newFormValue)
    };

    const handleChangeSlug = (e) => {
        const newFormValue = {...formData, slug: e.target.value}
        updateFormData(newFormValue)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance
            .post(`forum/`, {
                title: formData.title,
                content: contects.content,
                description: formData.description,
                tags: formTag.tag,
                slug: formData.slug,
            })
            .then((res) => {
                  toast.success("Đăng bài thành công! Quản trị viên sẽ duyệt bài viết của bạn.");
                  setFormTag("")
                  history('/')
            })
            .catch((err) => {
                 toast.error("Quá trình đăng bài đang xảy ra lỗi, vui lòng thử lại sau");
            });
    };

    const classes = useStyles();

    return (<Container component="main">
        <CssBaseline/>
        <div className={classes.paper}>
            <Avatar className={classes.avatar}></Avatar>
            <Typography component="h1" variant="h5">
                Create New Post
            </Typography>
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="title"
                            label="Nhập tiêu đề"
                            name="title"
                            autoComplete="title"
                            onChange={onChangeTitle}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SelectRE
                            isMulti
                            name="colors"
                            options={tag}
                            className="basic-multi-select"
                            classNamePrefix="Chọn thẻ cho bài viết"
                            getOptionValue={(option) => option.id}
                            getOptionLabel={(option) => option.title}
                            onChange={handleChangeTag}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="description"
                            label="Nhập lý do"
                            name="description"
                            autoComplete="description"
                            onChange={handleChangeDes}
                            multiline
                            rows={4}
                        />
                    </Grid>

                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="slug"
                        label="slug"
                        name="slug"
                        autoComplete="slug"
                        onChange={handleChangeSlug}
                    />
                </Grid>
                <SunEditor
                    name="content"
                    width="100%"
                    height="150px"
                    setOptions={{
                        buttonList: [["undo", "redo"], ["removeFormat"], ["bold", "underline", "italic", "fontSize"], ["fontColor", "hiliteColor"], ["align", "horizontalRule", "list"], ["table", "link", "image", "imageGallery", "preview", "blockquote", "formatBlock", "formatBlock", "paragraphStyle"], ["showBlocks", "codeView", "textStyle"]],
                        colorList: [["#828282", "#FF5400", "#676464", "#F1F2F4", "#FF9B00", "#F00", "#fa6e30", "#000", "rgba(255, 153, 0, 0.1)", "#FF6600", "#0099FF", "#74CC6D", "#FF9900", "#CCCCCC"]],

                    }}
                    onChange={handleChangeContent}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                    disabled={isTextareaDisabled}
                >
                    Đăng bài
                </Button>
            </form>
        </div>
    </Container>);
}