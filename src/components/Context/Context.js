import React, {useState, createContext,} from "react";

export const UserContext = createContext()


const Store = (props) => {
    const [user, setUser] = useState();
    const [image, setImage] = useState();
    const [email, setEmail] = useState();
    const [about, setAbout] = useState();
    const [sex, setSex] = useState();
    const [name, setName] = useState();
    const [id, setID] = useState();


    const setData = (userId, imageId, emailId, aboutId, sexID, nameID,ID) => {
        setUser(userId)
        setImage(imageId)
        setEmail(emailId)
        setAbout(aboutId)
        setSex(sexID)
        setName(nameID)
        setID(ID)
    }
console.log(id)
    return (
        <UserContext.Provider value={{
            user,
            image,
            email,
            setData,
            about,
            sex,
            name,
            id
        }}>{props.children}</UserContext.Provider>
    )
}

export default Store