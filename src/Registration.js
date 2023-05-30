import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function Registration() {
    const [persons, setPersons] = useState([]);
    const [mood, setMood] = useState("create");



    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [id, setId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let done = true;



        if (name === "")
        {done = false;
            setError("Please enter a  name!")
        }
        
        if (email === "")
        {done = false;
        setError("Please enter an email!")}
        
        if (password === "")
        {done = false;
            setError("Please enter a password!")}

            

                
        if(done && mood === "create") {

            const data = {name, email, password};
            console.log(name, email, password)
            axios.post('http://localhost:5000/record', {
                    name: name,
                    email: email,
                    password: password,

            })
              .then(function (response) {
                
              })
              .catch(function (error) {
              });

              setName("")
              setEmail("")
              setPassword("")
 
        }
       

        if(done && mood === "update") {
                   
            axios.put('http://localhost:5000/records/' + id, {
                     name: name,
                     email: email,
                     password: password,            
            })
              .then(function (response) {
              
              })
              .catch(function (error) {
              });
              setMood("create")
              setName("")
              setEmail("")
              setPassword("")
        }
    }


    useEffect(() => {
        axios.get('http://localhost:5000/records')
        .then((response) => {
            setPersons(response.data);
        })
        .catch((error) => console.log(error.message))
    }, [persons]);

    const handleDelete = (id) => {
        axios.delete('http://localhost:5000/records/'+id)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => console.log(error.message))
    }

    const handleUpdate = (id) => {
        setId(id);
        setMood("update"); 
    }


    return (


<>

<div>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div>
                    <a href="/">
                        <h3 className="text-4xl font-bold text-purple-600">
                            Logo
                        </h3>
                    </a>
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Name
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="name"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={name}
                                    onChange={(e) => {setName(e.target.value);}}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="email"
                                    name="email"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={email}
                                    onChange={(e) => {setEmail(e.target.value);}}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Password
                            </label>

                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="password"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={password}
                                    onChange={(e) => {setPassword(e.target.value);}}
                                />
                            </div>

                        </div>
    
                        <div className="flex items-center justify-end mt-4">
                   
                            <div>
        <h3 className='text-warning font-bold'>{error}</h3>
       { mood === "create" && <button type='submit' className="btn btn-active">ADD</button>}
       { mood === "update" && <button type='submit' className="btn btn-active">UPDATE</button>}
      </div>
                        </div>




                    </form>



                    
                </div>
            </div>
        </div>



        <div style={{display: "flex", justifyContent: "center", margin: "2rem"}}>
  <table classname="table w-full">
    <thead>
      <tr>
        <th>Name </th>
        <th>Email </th>
        <th>password </th>
        <th>Edit </th>
        <th>Delete </th>
      </tr>
    </thead>
    <tbody>

        { persons?.map((person) => {
            return ( <tr key={person.id}>
             <td>{person.name}</td>
             <td>{person.email}</td>
             <td>{person.password}</td>

             <td><button className="btn btn-active" onClick={() => {
                   setName(person.name)
                   setEmail(person.email)
                   setPassword(person.password)
                   
                
                handleUpdate(person.id)}}>Edit</button></td>
             <td><button className="btn btn-active" onClick={() => handleDelete(person.id)}>Delete</button></td>
           </tr>)
           })}
   </tbody>
  </table>
  
</div>



</>


       
    );
}