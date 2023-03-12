import { Select, Input, Button, Grid, Header, Icon } from 'semantic-ui-react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const options = [
    { key: "estudio", text: "Estudio", value: "estudio" },
    { key: "trabajo", text: "Trabajo", value: "trabajo" },
    { key: "ejercicio", text: "Ejercicio", value: "ejercicio" },
    { key: "casa", text: "Casa", value: "casa" },
    { key: "recreacion", text: "Recreación", value: "recreacion" },
    { key: "otro", text: "Otro", value: "otro" },
]

export default function InputTask(props) {
    const [ task, setTask ] = useState({
        idTask: "",
        taskName: "",
        categoryTask: "",
    });
    const [ error, setError ] = useState(false);

    const { createTask } = props;



    const onChangeTask = (e) => {
        setTask({
            ...task,
            [ e.target.name ]: e.target.value
        })
    };


    const onChangeCategoryTask = (e, data) => {
        setTask({
            ...task,
            [ data.name ]: data.value,
        })
    };


    const onSubmitTask = (e) => {
        e.preventDefault();
        if (task.taskName.trim() === '' && task.categoryTask.trim() === '') {
            setError(true);
            return;
        }
        //Eliminar ms previo
        setError(false);

        //asignar un ID - descargamos uuid
        task.idTask = uuidv4();
        console.log(uuidv4());
        //crear la tarea

        createTask(task);


        //limpiar los inputs

        setTask({
            idTask: "",
            taskName: "",
            categoryTask: "",
        });
    };

    return (
        <>
            <Grid centered columns={2}>
                <Input type="text" action>
                    <Input
                        size="small"
                        icon="add"
                        placeholder="Escribe la Tarea"
                        iconPosition="left"
                        name="taskName"
                        value={task.taskName}
                        onChange={onChangeTask}
                    />
                    <Select compact options={options}
                        className="select-form-task"
                        name="categoryTask"
                        placeholder="Categoria"
                        value={task.categoryTask}
                        onChange={onChangeCategoryTask}
                    />
                    <Button type="submit" color="violet" onClick={onSubmitTask}> Agregar Tarea</Button>
                </Input>
            </Grid>
            {error && (
                <Grid centered>
                    <Header as="h4" color="blue" className="alert-error-form">
                        <Icon name="close" />
                        <Header.Content>La tarea es Obligatoria!!</Header.Content>
                        <Icon name="close" />
                    </Header>
                </Grid>)}

        </>

    )

}