import React, {useContext, useEffect, useState} from 'react';
import axiosInstance from "../../axios";
import {useNavigate} from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SunEditor, {buttonList} from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import Select from '@material-ui/core/Select';
import MenuItem from "@mui/material/MenuItem";

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

export default function CreateBlog() {
    const history = useNavigate();
    const initialFormData = Object.freeze({
        title: '', slug: '', excerpt: '', content: '', description: '', category: '', source: ''
    });
    const [formData, updateFormData] = useState(initialFormData);
    const [contects, setContects] = useState(initialFormData);

    const [category, setCategory] = useState();
    useEffect(() => {
        axiosInstance.get('category/').then((res) => {
            const allPosts = res.data.data;
            setCategory(allPosts);
        });
    }, []);
    const onChangeCategory = (e) => {
        console.log(formData)

        const newFormValue = {...formData, category: e.target.value}
        updateFormData(newFormValue)
    }
    const handleChangeContent = (content) => {

        const newFormValue = {...contects, content: content}
        setContects(newFormValue)
    };
    console.log(contects)
    const handleChangeDes = (e) => {
        const newFormValue = {...formData, description: e.target.value}
        updateFormData(newFormValue)
    };
    const onChangeTitle = (e) => {

        const newFormValue = {...formData, title: e.target.value}
        console.log(newFormValue)
        updateFormData(newFormValue)
    };

    const handleChangeSource = (e) => {
        const newFormValue = {...formData, source: e.target.value}
        updateFormData(newFormValue)
    };

    const handleChangeExcerpt = (e) => {
        const newFormValue = {...formData, excerpt: e.target.value}
        updateFormData(newFormValue)
    };

    const handleChangeSlug = (e) => {
        const newFormValue = {...formData, slug: e.target.value}
        updateFormData(newFormValue)
    };

    console.log(formData)

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance
            .post(`post-empl/`, {
                title:formData.title,
                content:contects.content,
                slug:formData.slug,
                category:formData.category,
                source:formData.source,
                description:formData.description,
            })
            .then((res) => {
                console.log(res)
                history('/');
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
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="excerpt"
                            label="Nhập trích dẫn"
                            name="excerpt"
                            autoComplete="excerpt"
                            onChange={handleChangeExcerpt}
                            multiline
                            rows={4}
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
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="source"
                            label="Nhập nguồn của bài viết!"
                            name="source"
                            autoComplete="source"
                            onChange={handleChangeSource}
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            variant="outlined"
                            required
                            fullWidth
                            id="category"
                            label="Category"
                            name="category"
                            autoComplete="category"
                            onChange={onChangeCategory}
                            multiline
                            rows={4}
                        >
                            {category?.length > 0 && category.map((item) => {
                                return (<MenuItem value={item.id}>{item.name}</MenuItem>)
                            })}
                        </Select>
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
                </Grid>

                <SunEditor
                    name="content"
                    width="100%"
                    height="150px"
                    setOptions={{
                        buttonList: [["undo", "redo"], ["removeFormat"], ["bold", "underline", "italic", "fontSize"], ["fontColor", "hiliteColor"], ["align", "horizontalRule", "list"], ["table", "link", "image", "imageGallery","preview","blockquote","formatBlock","formatBlock","paragraphStyle"], ["showBlocks", "codeView","textStyle"]],
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
                >
                    Đăng bài
                </Button>
            </form>
        </div>
    </Container>);
}