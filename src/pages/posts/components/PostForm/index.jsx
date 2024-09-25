import React, { useState } from "react";
import { Container } from "../../../../components/ui/Container";
import * as SC from './styles'
import { Typo } from '../../../../components/ui/Typo/index'
import { Form } from "../../../../components/ui/Form";
import { Field } from "../../../../components/ui/Field";
import { Input } from "../../../../components/ui/Input";
import { Button } from "../../../../components/ui/Button";


const DEFAULT_VALUES = { title: '', body: '' }

export const PostForm = ({ title, onSubmitForm, defaultValues }) => {
    const [formValues, setFormValues] = useState(defaultValues || DEFAULT_VALUES);

    console.log('PostForm Values:', formValues);

    const onChage = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onSubmitForm(formValues);
        !defaultValues && setFormValues(DEFAULT_VALUES);
    };

    const disabled = !formValues.title || !formValues.body;

    return (
        <Container>
            <Typo>{title}</Typo>
            <Form onSubmit={onSubmit}>
                <Field>
                    <Input
                        type='text'
                        name='title'
                        value={formValues.title}
                        placeholder='Заголовок'
                        onChange={(e) => onChage(e.target.name, e.target.value)}
                    />
                </Field>
                <Field>
                    <SC.Textarea
                        name='body'
                        placeholder='Текст'
                        value={formValues.body}
                        rows={10} cols={30}
                        onChange={(e) => onChage(e.target.name, e.target.value)}
                    />
                </Field>
                <Button type="submit" disabled={disabled}>Сохранить</Button>
            </Form>
        </Container>
    );
};