import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PostLoading from "./PostLoading";
import {Link} from "react-router-dom";
import './post.css'

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        // paddingTop: '56%',
    width:'100%',
        height: '150px',
        // 16:9
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
    const {posts, loading} = props;
    const classes = useStyles();

    // check data
    if (loading === true) {
        return <PostLoading/>;
    }
    if (!posts || posts.length === 0) return <div>
        <p>Bạn đang không có bài viết nào</p>
    </div>

    console.log(posts)
    console.log("ahihi1")

    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">

                    {posts.map((post) => {
                        return (
                            // Enterprise card is full width at sm breakpoint
                            <Grid item key={post.id} xs={12} md={4}>
                                <Card className={classes.card}>
                                    <Link color='textPrimary' className={classes.link} to={'posts/' + post.slug}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image="https://scontent.fhan5-8.fna.fbcdn.net/v/t39.30808-6/263283550_887830681910625_6573427894929921994_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=2VLh6k0z2-YAX-a53Ps&_nc_ht=scontent.fhan5-8.fna&oh=00_AT_87DS8LZ4QerME9X4MJeijIFfS8wkTeJEjqShhckpHig&oe=61BDAB93"
                                            title="Image title"
                                        />
                                    </Link>
                                    <CardContent className={classes.cardContent}>
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            component="h2"
                                            className={classes.postTitle}
                                        >
                                            {post.title.substr(0, 25)}...
                                        </Typography>
                                        <div className={classes.postText}>
                                            <Typography color="textSecondary">
                                                {post.excerpt.substr(0, 25)}...
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </React.Fragment>
    );
};
export default Posts;