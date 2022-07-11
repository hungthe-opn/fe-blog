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
import Pagination from '@mui/material/Pagination';

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

    const [page, setPages] = useState(1);
    const [blogs, setBlogs] = useState([]);
    const [pagi, setPagi] = useState()

    const handleChangePage = (e, page) => {
        setPages(page)

    }
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
                        <StyledTableCell align="left"  width="12px">Tag</StyledTableCell>
                        <StyledTableCell align="left" width="97px">ID Tác giả</StyledTableCell>
                        <StyledTableCell align="left">Tên tác giả</StyledTableCell>
                        <StyledTableCell align="left">ID Danh mục</StyledTableCell>
                        <StyledTableCell>Rank</StyledTableCell>
                        <StyledTableCell align="right">Tên danh mục</StyledTableCell>
                        <StyledTableCell align="right">Tiêu đề</StyledTableCell>
                        <StyledTableCell align="right">Nội dung</StyledTableCell>
                        <StyledTableCell align="right">Người xem</StyledTableCell>
                        <StyledTableCell align="right">Ngày tạo</StyledTableCell>
                        <StyledTableCell align="right">Nguồn</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row" >
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.calories}</StyledTableCell>
                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.calories}</StyledTableCell>
                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default CustomizedTables


