import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    // const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

    const users = useSelector(selectAllUsers);

    const onUserChanged = e => setUserId(e.target.value)
    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    
    const onSavePostClicked = () => {
        // if(title && content){

        //     // just send the raw data
        //     // don't need to know the structure of the state
        //     dispatch(postAdded(title,content, userId))

        //     setTitle("")
        //     setContent("");
        // }

        if(canSave){
            try {
                setAddRequestStatus('pending');
                dispatch(addNewPost({title, body:content, userId})).unwrap()
                setTitle("")
                setContent("");
                setUserId("");
            } catch (error) {
                console.error('Failed to add new post')
            }finally{
                setAddRequestStatus('idle');
            }
        }
    }

    const usersOptions = users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postUser">User:</label>
                <select id="postUser" value={userId} onChange={onUserChanged}>
                <option value={""}></option>
                {usersOptions}    
                </select>      
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    disabled={!canSave}
                    onClick={onSavePostClicked}
                >Save Post</button>
            </form>
        </section>
    )
}
export default AddPostForm