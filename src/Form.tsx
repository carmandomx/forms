import React from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from 'react-select';


type Signup = {
    username: string;
    email: string;
    password: string;
    age: number;
    englishLevel: { label: string; value: number }
}

const schema = yup.object({
    username: yup.string().required(),
    email: yup.string().email(),
    age: yup.number().positive().integer().required().min(18).max(99),
    englishLevel: yup.object().required()
})

const SignupForm = () => {
    const { register, handleSubmit, formState: { errors }, control  } = useForm<Signup>({
        resolver: yupResolver(schema),
        defaultValues: {
            age: 50
        }
    });
    const onSubmit: SubmitHandler<Signup> = (data) => console.log(data);
    const onError: SubmitErrorHandler<Signup> = (errors) => console.log(errors);

    console.log(errors)

    return (
        <form className='Form' onSubmit={handleSubmit(onSubmit, onError)}>
            <label>
            Username
            <input  {...register('username', {
                maxLength: 5,
                required: true
            })} />
            </label>
            { errors.username?.type === 'required' && 'Username is required' }
            <label htmlFor='email' >
            Email
            <input id="email" type='email'  {...register('email', {
                required: true,
                pattern: /[\w\.@]+/i
            })} />
            </label>
            <label>
            Password
            <input type={'password'} {...register('password', { minLength: 8, maxLength: 20, required: true })} />
            </label>
            <label>
            Age
            <input type={'number'} {...register('age', { required: true, min: 18, max: 99 })} />
            </label>
            <Controller 
            name='englishLevel'
            control={control}
            render={({ field }) => <Select {...field} options={[ {label: 'Advanced', value: 5}, {label: 'Intermediate', value: 3}, { label: 'Basic', value: 1 } ]}/>}
            
            />
            
            <button type="submit">Comienza tu aventura!</button>
        </form>
    )
}


export default SignupForm


// JavaScript

// Condition && Expression -> Condition is True -> Expression

