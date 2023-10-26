import React,{useState} from "react";
import {Link} from 'react-router-dom'
import Validation from './SignupValidation'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Signup() {

    const[values,SetValues]= useState({
        name:'',
        email:'',
        password:''
    })
   
    const navigate = useNavigate();
    const [errors,setErrors] =useState({})
    const handleInput = (event) =>{
        SetValues(prev =>({...prev,[event.target.name]:[event.target.value]}))
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        setErrors(Validation(values));
        if (errors.name === "" && errors.email === "" && errors.password === "") {

            axios.post('http://localhost:5002/signup',values)
            .then(res =>{
                navigate ('/login');
            })

            .catch(err => console.log(err));
            

        }
       
    }



    return(
        <div className=' d-flex justify-content-center align-items-center bg-dark vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <form action="" onSubmit={handleSubmit}>
                <h2>Sing Up</h2>
            <div className='mb-3'>
                    <label htmlFor='Name'> <strong> Name </strong> </label>
                    <input type='text' placeholder='Enter Name' name='name'
                    onChange={handleInput} className='form-control rounded-0'/>
                    <span>{errors.name && <span className='text-danger'>{errors.name}</span>}</span>
                </div>
                <div className='mb-3'>
                    <label htmlFor='email'> <strong> Email </strong> </label>
                    <input type='text' placeholder='Enter email' name='email'
                    onChange={handleInput} className='form-control rounded-0'/>
                    <span>{errors.email && <span className='text-danger'>{errors.email}</span>}</span>
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='text' placeholder='Enter password' name='password'
                    onChange={handleInput} className='form-control rounded-0' />
                    <span>{errors.password && <span className='text-danger'>{errors.password}</span>}</span>
                </div>
                <button type='Submit'className='btn btn-success w-100 rounded-0'>Sign Up</button>
                <p>You are agree to aour terms and policies</p>
                <Link to="/Login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
            </form>
        </div>
    </div>
    )

}
export default Signup