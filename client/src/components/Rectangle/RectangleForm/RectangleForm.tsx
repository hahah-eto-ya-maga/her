import React, {ChangeEvent, useState} from 'react';
import './RectangleForm.css';

interface IRectangleFormProps {
    operationName: string;
}

type TValues = {
    a: string,
    b: string,
    c: string,
    d: string,
}

const RectangleForm = ({ operationName }: IRectangleFormProps) => {
    const [values, setValues] = useState<TValues>({
        a: '',
        b: '',
        c: '',
        d: '',
    });

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, argument: keyof TValues) => {
        setValues({...values, [argument]: e.target.value});
    }

    const getResult = async () => {
        const response = await fetch(`http://localhost/counteroffensive/server/index.php?method=${operationName}&values=${values}`);
        return await response.json();
    }

    const onClickHandler = async () => {
        const response = await getResult();
    }

    return (
        <div className="rectangleForm">
            <p className="operationName">{operationName}</p>
            <div>
                <div>
                    <input onChange={(e) => {onChangeHandler(e, 'a')}} value={values.a} type="text" placeholder="x y z"/>
                    <input onChange={(e) => {onChangeHandler(e, 'b')}} value={values.b} type="text" placeholder="x y z"/>
                </div>
                <div>
                    <input onChange={(e) => {onChangeHandler(e, 'c')}} value={values.c} type="text" placeholder="x y z"/>
                    <input onChange={(e) => {onChangeHandler(e, 'd')}} value={values.d} type="text" placeholder="x y z"/>
                </div>
                <button onClick={onClickHandler}>Посчитать</button>
            </div>
        </div>
    );
};

export default RectangleForm;