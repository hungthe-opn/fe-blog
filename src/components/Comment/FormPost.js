import React from 'react';
import {useEffect, useState} from "react";
import axiosInstance from "../../axios";
import Comment from "./CommentForm";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';
import Button from "@material-ui/core/Button";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

const FormPost = ({
                      summitLabel, handleSubmit, commentDetail, handleCancel,body='', handleCancelButton='false' ,
                  }) => {
    const initialFormData = Object.freeze({
        body: ''
    });
    const [text, setText] = useState(body);
    const isTextareaDisabled = text.length === 0;
    const handleChangeContent = (body) => {
        const newFormValue = {...text, body: body}
        setText(newFormValue)
    };

    const onSummit = (e) => {
        e.preventDefault();
        handleSubmit(text)
        setText("");
    };
    return (
        <Box>
            <form action="" onSubmit={onSummit}>
                <SunEditor
                    setContents={text}
                    name="body"
                    width="101%"
                    height="151px"
                    setOptions={{
                        buttonList: [["undo", "redo"], ["removeFormat"], ["bold", "underline", "italic", "fontSize"], ["fontColor", "hiliteColor"], ["align", "horizontalRule", "list"], ["table", "link", "image", "imageGallery", "preview", "blockquote", "formatBlock", "formatBlock", "paragraphStyle"], ["showBlocks", "codeView", "textStyle"]],
                        colorList: [["#828282", "#FF5400", "#676464", "#F1F2F4", "#FF9B00", "#F00", "#fa6e30", "#000", "rgba(255, 153, 0, 0.1)", "#FF6600", "#0099FF", "#74CC6D", "#FF9900", "#CCCCCC"]],

                    }}
                    onChange={handleChangeContent}
                />
                <Button
                    type="submit"
                    style={{margin: '12px 0px'}}
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                    onClick={handleSubmit} disabled={isTextareaDisabled}
                >
                    {summitLabel}
                </Button>
                {handleCancelButton &&(<Button variant="outlined" color="error"  startIcon={<DeleteIcon />} onClick={handleCancel}>Cancel</Button>)}
            </form>
        </Box>
    )
}
export default FormPost
