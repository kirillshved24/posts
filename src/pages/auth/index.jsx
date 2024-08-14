import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../../components/ui/Container";
import { Typo } from "../../components/ui/Typo";
import { Form } from "../../components/ui/Form/styles";
import { Input } from "../../components/ui/Input";
import { Field } from "../../components/ui/Field";
import { useDispatch } from 'react-redux'
import { login } from "../../redux/slices/authSlice";
export const AuthPage = () => {

    const [formValues, setFormValues] = useState({ email: '', password: '' })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        try {
            const users = JSON.parse(localStorage.getItem('users'))

            if (!users) {
                alert('Данный пользователь не найден в системе')
                return
            }

            const currentUser = users.find((user) => user.email === formValues.email && user.password === formValues.password)

            if (!currentUser) {
                alert('Данный пользователь не найден в системе')
                return
            }

            dispatch(login(currentUser))

            navigate('/posts')

        } catch (e) {
            console.log(e)
        }
    }


    const onChage = (name, value) => {
        setFormValues({ ...formValues, [name]: value })
    }

    const disabled = !formValues.email || !formValues.password

    return <Container>
        <Typo>Страница авторизации</Typo>
        <Form onSubmit={onSubmit}>
            <Field>
                <Input
                    type='email'
                    name='email'
                    value={formValues.email}
                    placeholder='Email'
                    onChange={(e) => onChage(e.target.name, e.target.value)}
                    autoComplete='off'
                />
            </Field>
            <Field>
                <Input
                    type='password'
                    name='password'
                    value={formValues.password}
                    placeholder='Пароль'
                    onChange={(e) => onChage(e.target.name, e.target.value)}
                    autoComplete='off'
                />
            </Field>
            <button type='submit' disabled={disabled}>Авторизация</button>
        </Form>
    </Container>
}