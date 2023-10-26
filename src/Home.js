import Axios from 'axios'
import {useState} from 'react'


function Home() {

  const [name,setName] = useState("");
  const [age,setAge] = useState(0);
  const [country,setCountry] = useState("");
  const [position,setPosition] = useState("");
  const [wage,setWage] = useState(0);
  const [newwage,setNewWage] = useState(0);


  const[employeeList, setEmployeeList] = useState([]);

  const getEmployees = () =>{
    Axios.get('http://localhost:3001/employees').then((response)=> {
      setEmployeeList(response.data);
    });

 

  }

  const addEmployee =() =>{
    Axios.post('http://localhost:3001/create',{
      name:name,
      age:age,
      country:country,
      position:position,
      wage:wage
    }).then(() =>{
      setEmployeeList([
        ...employeeList,
      {
        name:name,
        age:age,
        country:country,
        position:position,
        wage:wage
      }
      ])
    })  
  }

  const updateEmployeeWage = (id) => {
    Axios.put('http://localhost:3001/update',{ wage: newwage, id:id}).then((response) =>{
      setEmployeeList(
        employeeList.map((val)=>{
          return val.id == id ?{
            id:val.id,
            name:val.name,
            age:val.age,
            country:val.country,
            position:val.position,
            wage:newwage
          }: val;
          
        })
      )
    })
  }

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
        setEmployeeList(
            employeeList.filter((val) => {
                return val.id !== id;
            })
        );
    });
  } ;


  

  return (
    <div className="App containder bg-dark vh-100 "  >
      <br/>
      <h1 className="text-info " >EMPLOYEE INFORMATION</h1>
      <br/>
      <div className="information" >
        <form action="" >
          <div className="mb-3">
            <label htmlFor="name" className="text-light" >
              Name:
            </label>
            
            <input
              type="text"
              className="form-control w-50"
              placeholder="Enter name"
              onChange={(event) =>{
                setName(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Age" className="text-light">
              Age:
            </label>
            <input
              type="number"
              className="form-control w-50 "
              placeholder="Enter age"
              onChange={(event) =>{
                setAge(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="country" className="text-light ">
              Country :
            </label>
            <input
              type="text"

              className="form-control w-50"
              placeholder="Enter country "
              onChange={(event) =>{
                setCountry(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="position" className="text-light">
              Position:
            </label>
            <input
              type="text"
              
              className="form-control w-50"
              placeholder="Enter position"
              onChange={(event) =>{
                setPosition(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="wage" className="text-light">
              Wage:
            </label>
            <input
              type="number"
              className="form-control w-50 "
              placeholder="Enter wage"
              
              onChange={(event) =>{
                setWage(event.target.value);
              }}
            />
          </div >
          <br/>
          <button className="btn btn-success  w-50 " onClick={addEmployee}>Add Employee</button>
        </form>
      </div>
      <hr/>
      <div className="employees bg-dark">
        <button className="btn btn-primary  w-50 " onClick={getEmployees}>Show employees</button>
        <br/><br/>

        {employeeList.map((val,key) =>{
          return(
            <div className="employee card  text-light bg-dark">
              <div className="card-body text-left">
                <p className="card-text">Name : {val.name}</p>
                <p className="card-text">Age : {val.age}</p>
                <p className="card-text">Country : {val.country}</p>
                <p className="card-text">Postion : {val.position}</p>
                <p className="card-text">Wage : {val.wage}</p>
                <div ClassName="d-flex">
                  <input 
                    type ="number"
                    style={{width:"250px"}}
                    placeholder='15000...'
                    onChange={(event) => {
                      setNewWage(event.target.value);
                    }}
                    
                  />
                 
                  <button className="btn btn-warning  " onClick={() => {updateEmployeeWage(val.id)}}>Update</button>
                  <br/>
                  <br/>
                  <button className="btn btn-danger w-25  " onClick={() => {deleteEmployee(val.id)}}>Delete</button>
                </div>
              </div>

            </div>
          )
        })}
        
      </div>
    </div>
  );
}

export default Home;
