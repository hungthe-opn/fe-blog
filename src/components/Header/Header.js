import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import {NavLink, useNavigate} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import {axiosInstance} from '../../axios'
import SearchBar from 'material-ui-search-bar';
import './Header.css'
import image from "../../img/logofabbi.png"
import {faExchange, faInfo, faSignOut, faUser, faUserEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';


const useStyles = makeStyles((theme) => ({
        appBar: {
            borderBottom: `1px solid ${theme.palette.divider}`,

        }, link: {
            margin: theme.spacing(1, 1.5),

        }, banner: {
            margin: theme.spacing(1, 1.5), color: '#1b1b1b'
        }, toolbarTitle: {
            flexGrow: 1,
            marginLeft: 170
        },
        user: {
            width: 200,
            height: 241,
            textAlign: 'left',
        },
        icon_user: {
            textAlign: 'left',
            padding: 12,
        },
    }))
;

function Header({login, user, isLogin}) {
    const classes = useStyles();
    const history = useNavigate();
    const [users, setUser] = useState("")
    let navigate = useNavigate();
    const [data, setData] = useState({search: ''});
    const [anchorEl, setAnchorEl] = React.useState(null);
    //save users in localStorage
    useEffect(() => {
        setUser(user)
        const userName = localStorage.getItem("user")
        setUser(userName)
    }, [])
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const logoutHandle = () => {
        isLogin()
        const response = axiosInstance.post('user/logout/blacklist/', {
            refresh_token: localStorage.getItem('refresh_token'),
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        axiosInstance.defaults.headers['Authorization'] = null;
    }
    const goSearch = (e) => {
        navigate('/search/?search=' + data.search, {replace: true});
        window.location.reload();
    }
    return (<React.Fragment>

        <CssBaseline/>
        <AppBar
            position="fixed"
            color="default"
            elevation={0}
            className={classes.appBar}
            style={{background: '#ffffff', color: '#ffffff'}}
        >
            <Toolbar className={classes.toolbar}>

                <Typography
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.toolbarTitle}
                >
                    <Link
                        component={NavLink}
                        to="/blog"
                        underline="none"
                        color="textPrimary"
                        className={classes.banner}
                    >
                        <img className="logo" src={image} width="6%" height="48px;" alt="sssss"/>

                    </Link>


                    <Link
                        component={NavLink}
                        to="/blog"
                        underline="none"
                        color="textPrimary"
                        className={classes.banner}
                    >
                        Bài viết
                    </Link>
                    <Link
                        component={NavLink}
                        to="/"
                        underline="none"
                        color="textPrimary"
                        className={classes.banner}
                    >
                        Hỏi đáp
                    </Link>
                    <Link
                        component={NavLink}
                        to="/fabbi"
                        underline="none"
                        color="textPrimary"
                        className={classes.banner}
                    >
                        Thảo luận
                    </Link>
                    <Link
                        component={NavLink}
                        to="/contacts"
                        underline="none"
                        color="textPrimary"
                        className={classes.banner}
                    >
                        Liên hệ
                    </Link>

                </Typography>
                <SearchBar
                    value={data.search}
                    onChange={(newValue) => setData({search: newValue})}
                    onRequestSearch={() => goSearch(data.search)}
                />
                <div>
                    {!login && <Link
                        color="textPrimary"
                        href="#"
                        className={classes.link}
                        component={NavLink}
                        to="/register"
                    >
                        Tạo tài khoản !
                    </Link>}

                    {!login ? <Button
                        color="primary"
                        variant="outlined"
                        className={classes.link && 'animation'}
                        onClick={() => history("/login")}
                    >
                        Đăng nhập
                    </Button> : <div className='user'>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Avatar alt="Remy Sharp"
                                    src="http://localhost:8001/media/291330163_3285768135022912_5520841210545778977_n.jpg"/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            classes='menu-user'
                        >
                            <div className='aax-container'>

                                <Avatar alt="Remy Sharp" className='avatar'
                                        src="http://localhost:8001/media/291330163_3285768135022912_5520841210545778977_n.jpg"/>
                                <p className='user_name'>{users}
                                    <div className='email'> @{users}</div>
                                </p>



                            </div>

                            <MenuItem onClick={handleClose} className="fa"> {users}</MenuItem>
                            <MenuItem onClick={handleClose} className="fa"> <FontAwesomeIcon icon={faUser}
                                                                                             className="fa"/>Thông tin cá nhân</MenuItem>
                                 <MenuItem onClick={handleClose} className="fa"> <FontAwesomeIcon icon={faUserEdit}
                                                                                             className="fa"/>Chỉnh sửa thông tin</MenuItem>
                            <MenuItem onClick={logoutHandle}>
                                <FontAwesomeIcon icon={faSignOut} className="fa"/>
                                Đăng xuất</MenuItem>

                        </Menu>
                    </div>}</div>

            </Toolbar>
        </AppBar>
    </React.Fragment>);
}

export default Header;