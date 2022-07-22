import React from 'react'
import {Placeholder} from 'semantic-ui-react'
import {Alert} from "@mui/material";
import mainLogo from "../../img/1.png";
import Banner from '../../Banner/Banner'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

const Error = () => (
    <div>
        <div>
            <div className="body_image">
                <img src={mainLogo} alt="" className='body_image_banner'/>
            </div>

        </div>
        <Banner/>
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="sm">
                <Alert style={{paddingTop:'38%'}} severity="warning">Không tìm thấy bài viết, vui lòng kiểm tra lại!!</Alert>

                <Placeholder>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                </Placeholder> </Container>
        </React.Fragment>
    </div>

)

export default Error