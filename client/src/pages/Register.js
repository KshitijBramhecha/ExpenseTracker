import React, { useEffect, useState } from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from "../axiosConfig"
import Spinner from '../components/Spinner'
import '../styles/RegisterPage.css'

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    //form submit
    const submitHandler = async (values) => {
        try {
            setLoading(true)
            await axios.post('/api/v1/users/register', values)
            message.success('Registeration Successfull')
            setLoading(false)
            navigate('/login')
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                // Handle specific error scenarios based on response status
            } else if (error.request) {
                console.error('No response received from the server');
            } else {
                console.error('Error during request setup:', error.message);
            }
            message.error('Something went wrong during registration');

        }
    }
    //prevent for login user
    useEffect(() => {
        if(localStorage.getItem('user')){
            navigate('/')
        }
    },[navigate]);

    return (
        <>
            <div className='register-page'>
                {loading && <Spinner />}
                <Form className='register-form' layout='vertical' onFinish={submitHandler}>
                    <h1>Register</h1>
                    <Form.Item label="Name" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input type='email' />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type='password' />
                    </Form.Item>
                    <div className='d-flex flex-column justify-content-between align-items-center'>
                        <div>
                        Already Registered ? Click here to
                        <Link to="/login"> Login</Link>
                        </div>
                        <div className='button'>
                        <button type='submit' className='btn btn-primary'>Register</button>
                        </div>
                        
                    </div>
                </Form>
            </div>
        </>
    )
}

export default Register