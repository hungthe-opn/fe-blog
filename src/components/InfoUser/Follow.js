import React, {useEffect, useState} from 'react';
import cx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import {useFadedShadowStyles} from '@mui-treasury/styles/shadow/faded';
import {useGutterBorderedGridStyles} from '@mui-treasury/styles/grid/gutterBordered';
import axiosInstance from "../../axios";
import {useParams} from "react-router-dom";
import Button from "@mui/material/Button";

const useStyles = makeStyles(({palette}) => ({
    card: {
        borderRadius: 12,
        minWidth: 256,
        textAlign: 'center',
    },
    backgroundColor:{backgroundColor: 'transparent'},

    avatar: {
        width: 60,
        height: 60,
        margin: 'auto',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: '0.5px',
        marginTop: 8,
        marginBottom: 0,
    },
    subheader: {
        fontSize: 14,
        color: palette.grey[500],
        marginBottom: '0.875em',
    },
    statLabel: {
        fontSize: 12,
        color: palette.grey[500],
        fontWeight: 500,
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        margin: 0,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
        letterSpacing: '1px',
    },
}));

export const Follow = React.memo(function ProfileCard() {
    const styles = useStyles();
    const shadowStyles = useFadedShadowStyles();
    const [infor, setInfor] = useState([]);
    const param = useParams()
    const IdUser = param.id

    function fetchData() {
        axiosInstance.get(`user-blog/get-user/${IdUser}`).then((res) => {
            const allPosts = res.data.data;
            setInfor(allPosts);
        });
    }

    useEffect(() => {
        fetchData()
    }, []);

    const FollowUser = (e) => {
        axiosInstance
            .post(`user-blog/follow/${IdUser}`)
            .then((res) => {
                const allPosts = res.data
                if (allPosts.response_msg === 'SUCCESS') {
                    fetchData()
                }
            }).catch((err) => {
            alert('errrrrr')
        });
    }

    const Unfollow = (e) => {
        axiosInstance
            .delete(`user-blog/follow/${IdUser}`)
            .then((res) => {
                const allPosts = res.data
                if (allPosts.response_msg === 'SUCCESS') {
                    fetchData()
                }
            }).catch((err) => {
            alert('errrrrr')
        });
    }
    const borderedGridStyles = useGutterBorderedGridStyles({
        borderColor: 'rgba(0, 0, 0, 0.08)',
        height: '50%',
    });
    return (
        <Card className={cx(styles.card, shadowStyles.root)}>
            <CardContent className={styles.backgroundColor}>
                <Avatar className={styles.avatar} src={infor.image}/>
                <h3 className={styles.heading}>{infor.user_name}</h3>
                <span className={styles.subheader}>{infor.email}</span>
            </CardContent>
            <Divider light/>
            <Box display={'flex'}>
                <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
                    <p className={styles.statLabel}>Followers</p>
                    <p className={styles.statValue}>{infor?.follower_counter}</p>
                </Box>
                <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
                    <p className={styles.statLabel}>Following</p>
                    <p className={styles.statValue}>{infor.following_counter}</p>
                </Box>
            </Box>
            {
                infor.is_following ? <Button onClick={Unfollow}>Unfollow</Button>
                    : <Button onClick={FollowUser}>Follow</Button>
            }
        </Card>
    );
});

export default Follow