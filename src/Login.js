import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



function Login(){

    const[values,SetValues]= useState({
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
        if (errors.email === "" && errors.password === "") {

            axios.post('http://localhost:5002/login',values)
            .then(res =>{
               if(res.data === "Success"){
                    navigate('/Home?');
               }else{
                    alert("No record existed");
               }
            })

            .catch(err => console.log(err));
            

        }
        
       
    }


    return(
        <div className=' d-flex justify-content-center align-items-center bg-dark vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <form action="" onSubmit={handleSubmit}>
                    <h2>Sign In</h2>
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
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
                    <p>You are agree to aour terms and policies</p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login;