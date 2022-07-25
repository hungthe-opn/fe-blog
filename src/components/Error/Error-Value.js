import React from 'react'
import {Alert} from "@mui/material";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

const ErrorValue = () => (
    <div>
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="sm">
                <Alert severity="warning">Không tìm thấy bài viết, vui lòng kiểm tra lại!!</Alert>
               </Container>
        </React.Fragment>
    </div>

)

export default ErrorValue