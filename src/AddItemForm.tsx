import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormType = {
    addItem: (title: string) => void
}

const AddItemForm = React.memo((props: AddItemFormType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const onNewTittleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(null)
    }
    const [error, setError] = useState<string | null>(null)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addItem()
        }
    }

    const addItem = () => {
        //метод обрезает строку
        const trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle) {
            props.addItem(newTaskTitle);
            setNewTaskTitle('');
        } else {
            setError('Tittle is required')
        }

    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                value={newTaskTitle}
                onChange={onNewTittleChangeHandler}
                onKeyPress={onKeyPressHandler}
                helperText={error ? 'error' : ''}
                label={'Title'}
                error={!!error}

            />
            <IconButton onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
})


export default AddItemForm