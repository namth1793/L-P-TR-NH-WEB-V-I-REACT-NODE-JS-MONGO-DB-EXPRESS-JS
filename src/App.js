import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import './styles/Form.css';
import './styles/List.css';
import axios from 'axios';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </div>
  );
}


const api = "https://62d8aea99c8b5185c78b409c.mockapi.io/users/users";

function Form() {
  const [users, setUser] = useState([]);
  const [buttonOn, setButton] = useState(1);
  useEffect(() => {
    axios.get(api).then((res) => {
      setUser(res.data);
    });
  }, [users])
  if (!users) return null;
  const state = {
    button: 1
  };

  const onSubmit = e => {
    e.preventDefault();
    let branchNo = e.target.branch.value;
    let NAME = e.target.name.value;
    let BRANCH = e.target.branch.value;
    if (state.button === 1) {
      if (branchNo == "001") {
        document.getElementById("address").innerHTML = "43 Domenic Horse";
      } else if (branchNo == "002") {
        document.getElementById("address").innerHTML = "92 Run Bear";
      } else {
        document.getElementById("address").innerHTML = "75 Chauncey Lion";
      }
    }
    if (state.button === 2) {
      axios.post(api, {
        name: NAME,
        branch: BRANCH,
        address: "DA NANG"
      }).then((res) => {
        alert("create success");
        setUser(res.data);
      })
    }
  };
  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.value.length > 0) {
      setButton(0);
    } else {
      setButton(1);
    }
  }
  return (
    <div className='block'>
      <nav className='nav'>
        <Link className="nav_item" to="/list">LIST</Link>
        <Link className="nav_item" to="/">Form</Link>
      </nav>
      <div className='block_1'>
        <h3>LẬP TRÌNH WEB VỚI REACT, NODE JS, MONGO DB, EXPRESS JS</h3>
        <p style={{ color: "red" }}>ReactJS Batch 22</p>
      <hr/>
        <form className='block_2' onSubmit={onSubmit}>
          <label htmlFor='name'>Name</label><br/>
          <input type="text" name="name" id='name' placeholder='Name'/><br/>
          <label htmlFor='branch'>Branch<br/> <span style={{fontSize:"12px"}}>Please enter Branch.No</span></label><br/>
          <input type="text" name="branch" id='branch' onChange={handleChange} placeholder='Branch' maxLength={5} required />
          <button type='submit' name="submit1" onClick={()=> (state.button = 1)} disabled={buttonOn} id="genaddress">gen address</button>
          <div id="address">please gen address</div>
          <button type='submit' name="submit2" onClick={()=>( state.button = 2)}>Create User</button>
        </form>
      </div>
    </div>
  )
}

function List() {
  const [users, setUser] = useState([]);


  useEffect(() => {
    axios.get(api).then((res) => {
      setUser(res.data);
    });
  }, [users])
  if (!users) return null;


  function deleteUser(x) {
      axios
        .delete(`${api}/${x.id}`)
        .then(() => {
          setUser(null)
        })
  }
  return (
    <div className='block'>
      <nav className='nav'>
        <Link className="nav_item" to="/list">LIST</Link>
        <Link className="nav_item" to="/">Form</Link>
      </nav>
      <div className='block_1'>
        <h3>LẬP TRÌNH WEB VỚI REACT, NODE JS, MONGO DB, EXPRESS JS</h3>
        <p style={{ color: "red" }}>ReactJS Batch 22</p>
      <hr/>
        <table border={1} className="list">
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>BRANCH</th>
            <th>ADDRESS</th>
            <th>MORE</th>
          </tr>
          {users.map((user) => 
            <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.branch}</td>
            <td>{user.address}</td>
            <td><button type="submit" onClick={() => deleteUser(user)}>DELETE</button></td>
          </tr>
          )}
        </table>
      </div>
    </div>
  );
}
