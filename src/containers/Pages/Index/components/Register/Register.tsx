import './Register.css'
import { useEffect, useState } from 'react'

export default function Register() {

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const register = async (e: any) => {
        e.preventDefault()

        const response = await fetch(
            "http://localhost:3001/user/register", {
                method: 'POST',
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password
                })
            }
        )
        .then((response) => response.json()).catch((e) => {
            console.log(e)
        })
    }


    return ( 
        <>
        <section className="content">
            <form className='content-input' onSubmit={register}>
                <input className='input' type="text" placeholder='First name' onChange={(e) => setFirstName(e.target.value)}/>
                <input className='input' type="text" placeholder='Last name' onChange={(e) => setLastName(e.target.value)}/>
                <input className='input' type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                <input className='input' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                <button className='btn' type='submit'>Submit</button>
            </form>        
        </section>
        </>
     );
}

// first name
//last name
//email
// password
// submit