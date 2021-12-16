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

import './Header.css'
import image from "../../img/logofabbi.png"

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    link: {
        margin: theme.spacing(1, 1.5),
        background: '#339999',
        color: '#ffffff',
    },
    banner: {
        margin: theme.spacing(1, 1.5),
        color: '#ffffff'
    },
    toolbarTitle: {
        flexGrow: 1,
    },


}));

function Header({login, user, isLogin}) {
    const classes = useStyles();
    const history = useNavigate();
    const [users, setUser] = useState("")

    //save users in localStorage
    useEffect(() => {
        setUser(user)
        const userName = localStorage.getItem("user")
        setUser(userName)
    }, [])

    const logoutHandle = () => {

    //delete data from localstorage and move to blacklist in BE
        isLogin()
        const response = axiosInstance.post('user/logout/blacklist/', {
            refresh_token: localStorage.getItem('refresh_token'),
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        axiosInstance.defaults.headers['Authorization'] = null;

    }

    return (
        <React.Fragment>

            <CssBaseline/>
            <AppBar
                position="fixed"
                color="default"
                elevation={0}
                className={classes.appBar}
                style={{background: '#343a40', color: '#ffffff'}}
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
                            Blog IT
                        </Link>
                        <Link
                            component={NavLink}
                            to="/"
                            underline="none"
                            color="textPrimary"
                            className={classes.banner}
                        >
                            Cá nhân
                        </Link>
                        <Link
                            component={NavLink}
                            to="/fabbi"
                            underline="none"
                            color="textPrimary"
                            className={classes.banner}
                        >
                            Fabbi
                        </Link>
                        <Link
                            component={NavLink}
                            to="/contacts"
                            underline="none"
                            color="textPrimary"
                            className={classes.banner}
                        >
                            Contact
                        </Link>

                    </Typography>
                    <nav>
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
                            className={classes.link}
                            onClick={() => history("/login")}
                        >
                            Đăng nhập
                        </Button> : <div>
                            {users}
                            <Button
                                color="primary"
                                variant="outlined"
                                className={classes.link}
                                onClick={logoutHandle}
                            >
                                Đăng xuất
                            </Button>
                        </div>}
                    </nav>

                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default Header;