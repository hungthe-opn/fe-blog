import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import axiosInstance from "../../axios";
import Modal from '@mui/material/Modal';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {faEdit, faEraser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Stack from "@mui/material/Stack";
import {useNavigate} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@mui/material/MenuItem";
import SelectRE from "react-select";
import SunEditor from "suneditor-react";
import {makeStyles} from "@material-ui/core/styles";

const PER_PAGE = 10;
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

const CustomizedTables = () => {

    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1500,
        overflow: 'scroll',
        height: 780,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const deletebtn = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    function createData(name, calories, fat, carbs, protein) {
        return {name, calories, fat, carbs, protein};
    }

    const history = useNavigate();
    const initialFormData = Object.freeze({
        title: '', slug: '', excerpt: '', content: '', description: '', category: '', source: '', tag: '[]'
    });
    const [formData, updateFormData] = useState(initialFormData);
    const [contects, setContects] = useState(initialFormData);
    const [formtag, setFormTag] = useState(initialFormData);
    const [page, setPages] = useState(1);
    const [blogs, setBlogs] = useState([]);
    const [pagi, setPagi] = useState()
    const [open, setOpen] = React.useState(false);
    const [opendelete, setDelete] = React.useState(false);
    const [owner, setOwner] = useState(null);
    const [tag, setTag] = useState();
    const [blogDetail, setBlogDetail] = useState(initialFormData)


    const handleOpen = (e) => {
        console.log(e)
        axiosInstance.get(`blog/${e}`).then((res) => {
            setBlogDetail(res.data.data)
            console.log(res.data.data)
        });
        setOpen(true)
    };
    const handleClose = () => {
        setOwner(null);
        setOpen(false);
    }
    const handleDelete = (e) => {
        setOwner(e);
        setDelete(true)
    };
    const handleCloseDelete = () => {
        setOwner(null);
        setDelete(false)
    };
    const handleChangePage = (e, page) => {
        setPages(page)

    }


    const [category, setCategory] = useState();
    useEffect(() => {
        axiosInstance.get('category/').then((res) => {
            const allPosts = res.data.data;
            setCategory(allPosts);
        });
    }, []);

    useEffect(() => {
        axiosInstance.get('blog/tag/').then((res) => {
            const allPosts = res.data.data;
            setTag(allPosts);
        });
    }, [])

    const onChangeCategory = (e) => {
        console.log(e)

        const newFormValue = {...formData, category: e.target.value}
        updateFormData(newFormValue)
    }
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

    const handleChangeSource = (e) => {
        const newFormValue = {...formData, source: e.target.value}
        updateFormData(newFormValue)
    };

    const handleChangeTag = (id) => {

        console.log(id);

        const newFormValue = {...formtag, tag: id}
        console.log(newFormValue)
        setFormTag(newFormValue)
    };
    const handleChangeSlug = (e) => {
        const newFormValue = {...formData, slug: e.target.value}
        updateFormData(newFormValue)
    };

    const handleSubmit = (owner) => {
        axiosInstance.delete(`post-empl/delete-blog/${owner}`)
            .then((res) => {
                window.location.reload();
            })


    };
    useEffect(() => {
        axiosInstance.get(`blog?page=${page}`).then((res) => {
            const allPosts = res.data.data;
            setBlogs(allPosts);
            setPagi(res.data.pagination)
            console.log(allPosts)
        });
    }, [page]);
    console.log(blogs)
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 700}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left" width="12px">ID</StyledTableCell>
                        <StyledTableCell align="left" width="12px">Tag</StyledTableCell>
                        <StyledTableCell align="left" width="97px">Thời gian đọc</StyledTableCell>
                        <StyledTableCell align="left" width="20px">Tên tác giả</StyledTableCell>
                        <StyledTableCell align="center" width="132px">Rank</StyledTableCell>
                        <StyledTableCell align="left" width="132px">Tên danh mục</StyledTableCell>
                        <StyledTableCell align="center" width="132px">Tiêu đề</StyledTableCell>
                        <StyledTableCell align="center" width="632px">Nội dung</StyledTableCell>
                        <StyledTableCell align="center">Người xem</StyledTableCell>
                        <StyledTableCell align="center">Ngày tạo</StyledTableCell>
                        <StyledTableCell align="center">Nguồn</StyledTableCell>
                        <StyledTableCell align="center">Chức năng</StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {blogs && blogs.length > 0 && blogs.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.id}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <div className=''>
                                    {row.tags.map(item =>
                                            <span className="badge text-bg-secondary body-post_feed_title_word_tags_cate "
                                                  style={{fontSize: '60%%'}}>
                                        {item.title}
                                    </span>
                                    )}
                                </div>
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.time_read}</StyledTableCell>
                            <StyledTableCell align="left">{row.author_name}</StyledTableCell>
                            <StyledTableCell align="center">{row.rank}</StyledTableCell>
                            <StyledTableCell component="th" scope="row" align="center">
                                {row.category_name}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.title.substr(0, 30)}...</StyledTableCell>
                            <StyledTableCell align="center">{row.content.substr(0, 90)}...</StyledTableCell>
                            <StyledTableCell align="center">{row.view_count}</StyledTableCell>
                            <StyledTableCell align="left">{row.time_post.substr(0, 10)}...</StyledTableCell>
                            <StyledTableCell align="left">{row.source}</StyledTableCell>
                            <StyledTableCell align="center">
                                <div>
                                    <a onClick={handleOpen.bind(this, row.id)}>
                                        <FontAwesomeIcon icon={faEdit}
                                                         className="fa-2x"/>
                                    </a>
                                    <a onClick={handleDelete.bind(this, row.id)}>
                                        <FontAwesomeIcon icon={faEraser}
                                                         className="fa-2x"/>
                                    </a>
                                </div>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <div className='body-pagination' style={{paddingLeft: '50%'}}>
                <Stack spacing={2}>
                    <Pagination count={Math.ceil(pagi?.total_row / PER_PAGE) || 0} page={page}
                                onChange={handleChangePage} variant="outlined"/>
                </Stack>
            </div>
            <div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>

                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Edit Post
                        </Typography>
                        <form action="">
                            <form className={classes.form} noValidate>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            value={blogDetail?.title || ''}
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
                                            value={blogDetail?.description || ''}

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
                                            value={blogDetail?.source || ''}

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
                                            {blogDetail?.length > 0 && blogDetail.map((item) => {

                                                return (
                                                    <MenuItem value={item.category_id}>{item.category_name}</MenuItem>)
                                            })}
                                        </Select>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <SelectRE
                                            isMulti
                                            name="colors"
                                            options={blogDetail}
                                            className="basic-multi-select"
                                            classNamePrefix="Chọn thẻ cho bài viết"
                                            getOptionValue={(option) => option.id}
                                            getOptionLabel={(option) => option.title}
                                            onChange={handleChangeTag}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            value={blogDetail?.slug || ''}

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
                                    value={blogDetail?.content || ''}
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
                                >
                                    Đăng bài
                                </Button>
                            </form>

                        </form>

                    </Box>
                </Modal>
                <Modal
                    open={opendelete}
                    onClose={handleCloseDelete}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    style={{border: '20%'}}
                >
                    <Box sx={deletebtn}>
                        <form>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Bạn có chắc chắn muốn xóa không?
                            </Typography>
                            <div className='row' style={{textAlign: 'center'}}>
                                <div
                                    className='col col-6'
                                    style={{borderRight: '1px solid  #dee2e6', float: 'left', padding: ' 1em 0px'}}
                                    data-dismiss="modal"

                                >
                                    <Button variant="contained" color="success"
                                            onClick={handleSubmit.bind(this, owner)}>
                                        Đồng ý
                                    </Button>
                                </div>
                                <div className="col col-6 message-del" data-dismiss="modal" aria-label="Close"
                                     style={{padding: '1em 0px', float: 'right'}}>
                                    <Button variant="outlined" color="error" onClick={handleCloseDelete}>
                                        Không
                                    </Button></div>
                            </div>

                        </form>

                    </Box>
                </Modal>
            </div>
        </TableContainer>
    );
}
export default CustomizedTables


