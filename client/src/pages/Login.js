import React, { useState, useEffect } from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Spinner from '../components/Spinner';
import "../styles/Loginpage.css"


const Login = () => {
    const img =
        "https://d31bgfoj87qaaj.cloudfront.net/blog/wp-content/uploads/2022/03/How-to-Track-Your-Finances-768x576.jpg";
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const submitHandler = async (values) => {
        try {
            setLoading(true)
            const { data } = await axios.post('/api/v1/users/login', values)
                .catch(function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                });
            setLoading(false)
            message.success('Login Successfull')
            localStorage.setItem('user', JSON.stringify({ ...data.user, password: '' }))
            navigate('/')
        } catch (error) {
            setLoading(false)
            message.error('invalid username or password')
        }
    }
    //prevent for login user
    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/')
        }
    }, [navigate]);

    return (
        <>
            <div className='login-page'>
                {loading && <Spinner />}
                <div className="row container">
                    <h1 className="text-center text-white">Expense Tracker</h1>
                    <div className="col-md-6">
                        <img src={img} alt="login-img" width={"100%"} height={"100%"} />
                    </div>
                    <div className="col-md-4 login-form">
                        <Form layout='vertical' onFinish={submitHandler}>
                            <h1>Login Form</h1>


                            <Form.Item label="Email" name="email">
                                <Input type='email' />
                            </Form.Item>
                            <Form.Item label="Password" name="password">
                                <Input type='password' />
                            </Form.Item>
                            <div className='d-flex flex-column justify-content-between align-items-center'>
                                <div>
                                Not a User ? Click here to
                                <Link to="/register"> Register </Link>
                                </div>
                                
                                <div className='button'> 
                                <button className='btn btn-primary'>Login</button>
                                </div>
                                
                            </div>


                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login