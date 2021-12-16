import React, {useEffect, useState} from "react";
import Loader from 'react-loader-spinner'
import axiosInstance from '../axios'
import Button from "@material-ui/core/Button";
import "./Contac.css"
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {Grid} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const Contact = () => {

    const history = useNavigate();

    //freeze object email, name, subject, message
    const initialFormData = Object.freeze({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false)

    //onChange target name
    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    // summit value api contact
    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        axiosInstance
            .post(`contacts/`, {
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
            })
            .then((res) => {
                setLoading(false)
                window.scrollTo(0, 0)
                console.log(res.data)
                history('/blog');

            });
    }
    const classes = useStyles();

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}></Avatar>
                <Typography component="h1" variant="h5">
                    Contact Admin
                </Typography>
                <form className={classes.form} noValidate>
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
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={e => onChange(e)}/>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="subject"
                        label="Subject"
                        name="subject"
                        autoComplete="subject"
                        autoFocus
                        onChange={e => onChange(e)}/>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="message"
                        label="Message"
                        name="message"
                        autoComplete="message"
                        autoFocus
                        onChange={e => onChange(e)}/>

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
        </Container>

    )
}

export default Contact