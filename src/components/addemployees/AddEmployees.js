import React, { useState } from "react";
import './AddEmployees.css';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddEmployees() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [employee, setEmployee] = useState(null);
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const empobj = async (details) => {
        setEmployee(details);
        try {
            const response = await axios.post('https://employees-backend-606c861f4061.herokuapp.com/put', details);
            console.log(response);
            navigate("/employees");
        } catch (error) {
            if (error.response) {
                setErr(error.message);
            } else if (error.request) {
                setErr(error.message);
            } else {
                setErr(error.message);
            }
        }
    }

    return (
        <div>
            <h1 className="text-center display-6">Employee Registration</h1>
            <div className="row">
                <div className="col-11 col-sm-8 col-md-6 mx-auto">
                    <form onSubmit={handleSubmit(empobj)}>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Name" {...register("ename", { required: true, minLength: 4 })} />
                            {errors.ename && <p className="text-danger">* {errors.ename.type === "required" ? "Name is mandatory." : "Minimum length is 4."}</p>}
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Surname" {...register("esurname", { required: true, minLength: 4 })} />
                            {errors.esurname && <p className="text-danger">* {errors.esurname.type === "required" ? "Surname is mandatory." : "Minimum length is 4."}</p>}
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Email" {...register("eemail", { required: true, pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i })} />
                            {errors.eemail && <p className="text-danger">* {errors.eemail.type === "required" ? "Email is mandatory." : "This is not a valid email."}</p>}
                        </div>
                        <div className="mb-3">
                            <input type="date" className="form-control" placeholder="DD-MM-YYYY" {...register("edob", { required: true })} />
                            {errors.edob && <p className="text-danger">* DOB is required.</p>}
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="ImgUrl" {...register("eimgurl", { required: true })} />
                            {errors.eimgurl && <p className="text-danger">* Image URL is mandatory.</p>}
                        </div>
                        <button type="submit" className="btn btn-success float-end">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddEmployees;
