import React, { useState } from 'react';
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom';
import "../Components/AddSeller.css"

function AddSeller() {

    const history = useNavigate();
    const [ inputs, setInputs ] = useState({
        tankId: "",
        customerName: "",
        address: "",
        customerEmail: "",
        sellDate: "",
        nicNumber: "",
        contactNumber: "",
        price: "",
        warranty: "",
        description: "",
        invoiceNumber: "",
    });

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/api/sellers", {
            tankId: String(inputs.tankId),
            customerName: String(inputs.customerName),
            address: String(inputs.address),
            customerEmail: String(inputs.customerEmail),
            sellDate: String(inputs.sellDate),
            nicNumber: String(inputs.nicNumber),
            contactNumber: String(inputs.contactNumber),
            price: Number(inputs.price),
            warranty: Number(inputs.warranty),
            description: String(inputs.description),
            invoiceNumber: String(inputs.invoiceNumber),
        })
        .then((res) => res.data);
    };

    // Fixed handleSubmit function
    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => {
            alert("Seller added successfully!");
            // Optional: Reset form
            setInputs({
                tankId: "",
                customerName: "",
                address: "",
                customerEmail: "",
                sellDate: "",
                nicNumber: "",
                contactNumber: "",
                price: "",
                warranty: "",
                description: "",
                invoiceNumber: "",
            });
            // Optional: Navigate to sellers list
            // navigate('/sellers');
            history("/sellers");
        }).catch((error) => {
            console.error("Error: ", error);
            alert("Failed to add seller");
        });
    
    };

  return (
    <div>

    <Link to={"/sellers"}>
        <button>Back</button>
    </Link>

      <form onSubmit={ handleSubmit }>
        <h1>Add Tanks</h1>
        <label>Tank id: </label>
        <input type="text"
        name="tankId"
        value={inputs.tankId}
        onChange={handleChange}
        required
        /> <br/>

        <label>Customer Name: </label>
        <input type="text"
        name="customerName"
        value={inputs.customerName}
        onChange={handleChange}
        required
        /> <br/>

        <label>Address: </label>
        <input type="text"
        name="address"
        value={inputs.address}
        onChange={handleChange}
        required
        /> <br/>

        <label>Email : </label>
        <input type="email"
        name="customerEmail"
        value={inputs.customerEmail}
        onChange={handleChange}
        required
        /> <br/>

        <label>Sell Date : </label>
        <input type="date"
        name="sellDate"
        value={inputs.sellDate}
        onChange={handleChange}
        required
        /> <br/>

        <label>NIC number: </label>
        <input type="text"
        name="nicNumber"
        value={inputs.nicNumber}
        onChange={handleChange}
        required
        /> <br/>

        <label>Contact Number: </label>
        <input type="number"
        name="contactNumber"
        value={inputs.contactNumber}
        onChange={handleChange}
        required
        /> <br/>

        <label>Price: </label>
        <input type="number"
        name="price"
        value={inputs.price}
        onChange={handleChange}
        required
        /> <br/>

        <label>Warranty</label>
        <input type="number"
        name="warranty"
        value={inputs.warranty}
        onChange={handleChange}
        required
        /> <br/>

        <label>Description: </label>
        <input type="text"
        name="description"
        value={inputs.description}
        onChange={handleChange}
        required
        /> <br/>

        <label>Invoice Number: </label>
        <input type="number"
        name="invoiceNumber"
        value={inputs.invoiceNumber}
        onChange={handleChange}
        required
        /> <br/>

        <button type="submit">Submit</button>

      </form>
    </div>
  )
}

export default AddSeller
