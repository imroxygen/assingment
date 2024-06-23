import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import Swal from 'sweetalert2'
import man from '../image/man.png'
import revenueData from '../data/revenueData.json'
import sourceData from '../data/sourceData.json'
import { defaults } from 'chart.js/auto'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import useUpdate from "../hooks/useUpdate"

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";


const Dashboard = () => {
  const [chart,setChart]=useState(false);
  const [pro,setPro]=useState(true);
  const [update,setUpdate]=useState(false);
  const { logout, userData } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = () => {
    logout();
    Swal.fire({
      icon: 'success',
      title: 'Logged out successfully!',
      showConfirmButton: false,
      timer: 1000
    });
  };
  const handleChart=()=>{
    setChart(true);
    setPro(false);
    setUpdate(false);

  }
  const handleUpdate=()=>{
    setChart(false);
    setPro(false);
    setUpdate(true);
  };

  return (
    <>
      <nav>
        <Link to="/" className="title">
          Welcome:{userData.name}
        </Link>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <NavLink onClick={handleChart} >Chart</NavLink>
          </li>
          <li>
            <NavLink onClick={handleUpdate} >Update</NavLink>
          </li>
          <li>
            <NavLink onClick={handleLogout}>Log Out</NavLink>
          </li>
        </ul>
      </nav>

      {
        pro && <UserDetails user={userData}/>
      }
      {
        chart && <ChartDetails/>
      }
      {
        update && <UserUpdate/>
      }
      

      
      <footer className='footer'>&copy; 2024 All rights reserved.</footer>
    </>

  );
};




const UserDetails = ({ user }) => {
  return (
    <div className="user-details-container">
      <div className="user-details">
        <div className="user-avatar">
          <img src={man} alt="User Avatar" />
        </div>
        <div className="user-info">
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </div>
  );
};



const ChartDetails = () => {
  return (
    <>
    <div className="chart-container">
        <div className="dataCard revenueCard">
          <Line
            data={{
              labels: revenueData.map((data) => data.label),
              datasets: [
                {
                  label: "Revenue",
                  data: revenueData.map((data) => data.revenue),
                  backgroundColor: "#064FF0",
                  borderColor: "#064FF0",
                },
                {
                  label: "Cost",
                  data: revenueData.map((data) => data.cost),
                  backgroundColor: "#FF3030",
                  borderColor: "#FF3030",
                },
              ],
            }}
            options={{
              elements: {
                line: {
                  tension: 0.5,
                },
              },
              plugins: {
                title: {
                  text: "Yearly Revenue & Cost",
                },
              },
            }}
          />
        </div>

        <div className="dataCard customerCard">
          <Bar
            data={{
              labels: sourceData.map((data) => data.label),
              datasets: [
                {
                  label: "Percentage",
                  data: sourceData.map((data) => data.value),
                  backgroundColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                    "rgba(253, 135, 135, 0.8)",
                    "rgba(75, 192, 192, 0.8)",
                    "rgba(153, 102, 255, 0.8)",
                    "rgba(255, 159, 64, 0.8)",
                  ],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: "Revenue Source category wise",
                },
              },
            }}
          />
        </div>

        <div className="dataCard categoryCard">
          <Doughnut
            data={{
              labels: sourceData.map((data) => data.label),
              datasets: [
                {
                  label: "percentage",
                  data: sourceData.map((data) => data.value),
                  backgroundColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                    "rgba(253, 135, 135, 0.8)",
                    "rgba(75, 192, 192, 0.8)",
                    "rgba(153, 102, 255, 0.8)",
                    "rgba(255, 159, 64, 0.8)",
                  ],
                  borderColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                    "rgba(253, 135, 135, 0.8)",
                    "rgba(75, 192, 192, 0.8)",
                    "rgba(153, 102, 255, 0.8)",
                    "rgba(255, 159, 64, 0.8)",
                  ],
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: "Revenue Source category wise",
                },
              },
            }}
          />
        </div>
      </div>
    </>
  )
}

//update component

const UserUpdate = () => {
  const navigate=useNavigate();
  const {token}=useAuth();
  const {updateUser}=useUpdate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
   updateUser({name,email,token});
   navigate("/");
  };

  return (
    <div className="user-update-container">
      <h2>Update User Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};


export default Dashboard;
