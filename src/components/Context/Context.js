import React, {useState, useEffect, useRef, createContext, } from "react";

export const UserContext = createContext()


const Store =(props) =>{
        const [user, setUser] = useState();
        const [image, setImage] = useState();
        const [email, setEmail] = useState();
        const setData = (userId, imageId, emailId) =>{
                setUser(userId)
                setImage(imageId)
                setEmail(emailId)
        }

        return (
            <UserContext.Provider value={{
                    user,
                    image,
                    email,
                    setData

            }}>{props.children}</UserContext.Provider>
        )
}

export default Store