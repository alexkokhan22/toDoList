import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditTableSpanType = {
    title: string
    changeItem: (title: string) => void
}


function EditTableSpan(props: EditTableSpanType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title);

    const onEditMOde = () => {
        setEditMode(true)
    }

    const offEditMOde = () => {
        setEditMode(false)
        props.changeItem(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <TextField autoFocus={true} onBlur={offEditMOde} onChange={onChangeHandler} value={title}/>
            : <span  onDoubleClick={onEditMOde}>{props.title}</span>
    )
}

export default EditTableSpan;