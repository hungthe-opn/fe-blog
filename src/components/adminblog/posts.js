import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import axiosInstance from "../../axios";
import {NavLink, useNavigate} from "react-router-dom";
//review css for maturial

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[700],
    },
    postTitle: {
        fontSize: '16px',
        textAlign: 'left',
    },
    postText: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'baseline',
        fontSize: '12px',
        textAlign: 'left',
        marginBottom: theme.spacing(2),
    },
}));

const Posts = (props) => {

    const history = useNavigate();
    const {posts} = props;
    const classes = useStyles();

    // Check the data if it is not there, it will return an error
    if (!posts || posts.length === 0) return <p>Bi loi mat roi
        Bi loi mat roiBi loi mat roiBi loi mat roiBi loi mat roiBi loi mat roiBi loi mat roiBi loi mat roi</p>;

    // delete id
    const handleSubmit = (ids) => {
        axiosInstance.delete(`http://localhost:8000/api/admin/detele/${ids}`);
        window.location.reload();
        history({
            pathname: '/admin/',
        });

    };

    // posts map data
    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell align="left">Category</TableCell>
                                    <TableCell align="left">Title</TableCell>
                                    <TableCell align="left">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {posts.map((post) => {
                                    return (
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {post.id}
                                            </TableCell>
                                            <TableCell align="left">{post.category}</TableCell>

                                            <TableCell align="left">
                                                <Link
                                                    color="textPrimary"
                                                    href={'/posts/' + post.slug}
                                                    className={classes.link}
                                                >
                                                    {post.title}
                                                </Link>
                                            </TableCell>

                                            <TableCell align="left">
                                                <Link
                                                    color="textPrimary"
                                                    href={'/admin/edit/' + post.id}
                                                    className={classes.link}
                                                >
                                                    <EditIcon />
                                                </Link>
                                                <span
                                                    color="textPrimary"
                                                    onClick={() => handleSubmit(post.id)}
                                                    className={classes.link}
                                                >
													<DeleteForeverIcon></DeleteForeverIcon>
												</span>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                <TableRow>
                                    <TableCell colSpan={4} align="right">
                                        <Button
                                            href={'/admin/create'}
                                            variant="contained"
                                            color="primary"
                                        >
                                            New Post
                                        </Button>

                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </React.Fragment>
    );
};
export default Posts;