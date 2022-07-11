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

const PER_PAGE = 10;

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

    const [page, setPages] = useState(1);
    const [blogs, setBlogs] = useState([]);
    const [pagi, setPagi] = useState()
    const [open, setOpen] = React.useState(false);
    const [opendelete, setDelete] = React.useState(false);
    const [owner, setOwner] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleDelete = (e) => {
        console.log(e)
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
    const handleSubmit = (owner) => {
        console.log(owner)
        axiosInstance.delete(`post-empl/delete-blog/${owner}`)

            .then((res) => {
            window.location.reload();

        })
        history({
            pathname: '/admin/',
        });

    };
    console.log({owner})
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
                            <StyledTableCell align="left">{row.source.substr(0, 22)}...</StyledTableCell>
                            <StyledTableCell align="center">
                                <div>
                                    <a onClick={handleOpen}>
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
                        <form>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Text in a modal
                            </Typography>
                            <Typography id="modal-modal-description" sx={{mt: 2}}>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
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
                    <Box sx={style}>
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
                                    <Button variant="contained" color="success" onClick={handleSubmit.bind(this, owner)}>
                                        Success
                                    </Button>
                                </div>
                                <div className="col col-6 message-del" data-dismiss="modal" aria-label="Close"
                                     style={{padding: '1em 0px', float: 'right'}}>
                                    <Button variant="outlined" color="error">
                                        Error
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


