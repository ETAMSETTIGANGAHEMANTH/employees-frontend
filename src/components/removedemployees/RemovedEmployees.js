import React from 'react';
import './RemovedEmployees.css';
import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";
function RemovedEmployees(){
	
	let [employees,setEmployees] = useState([]);
	let [err,setErr] = useState("");
	
	let deletingoff = (obj)=>{
		axios.delete("https://employees-backend-17f82ce5e426.herokuapp.com/deleteperminent", { data: obj });
	}
	useEffect(()=>{
		axios.get("https://employees-backend-17f82ce5e426.herokuapp.com/gettingdeleted")
		.then((response) => {
			setEmployees(response.data);
		})
		.catch((err)=>{
			if(err.response){
				setErr(err.message);
			}
			else if(err.request){
				setErr(err.message);
			}
			else{
				setErr(err.message);
			}
		})
	})
	
	return(
		<div className='container'>
		<div className='flex d-flex justify-content-around'>
		{
			employees.map((employee) => (
				<div key={employee.id} className="card gap-2" style={{ width: '18rem' }}>
            <img src={employee.eimgurl} className="card-img-top" alt="this is an image" style={{height:'18rem', width:'18rem'}}></img>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{employee.ename}</li>
              <li className="list-group-item">{employee.esurname}</li>
              <li className="list-group-item">{employee.eemail}</li>
              <li className="list-group-item">{employee.edob}</li>
            </ul>
            <div className="card-body">
              <button className="btn btn-danger" onClick={()=>deletingoff(employee)}>delete</button>
            </div>
          </div>
			))
		}
		</div>
		</div>
	);
}
export default RemovedEmployees;
