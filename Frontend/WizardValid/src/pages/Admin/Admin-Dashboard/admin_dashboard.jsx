import React, { useEffect, useState } from "react";
import './dashboard.css'
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import { adminLogout } from '../../../Redux-Toolkit/slice.js'
import { useDispatch, useSelector } from "react-redux";


export default function Dashboard () {
    const [profiles, setProfiles] = useState(null);
    const [isNewuser, setIsNewUser] = useState(false);
    const [currentEditUserId, setCurrentEditUserId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");


    const {isAdminAuthenticated} = useSelector((state)=>state.adminAuth)

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    console.log("PROFILES",profiles)

    const handleNewUser = ()=> {
        setIsNewUser(true);
    }

    const handleEdit = (profile) => {
        setCurrentEditUserId(profile.id);
        setFormData({
            username: profile.username,
            email: profile.email,
            password: ''
        });
    };

    const handleCancelClick = () =>{
        setIsNewUser(false);
        setCurrentEditUserId(null);
        setFormData({
            username: '',
            email: '',
            password: ''
        });
    }

    const handleLogout = async () => {
        await dispatch(adminLogout());
        navigate('/admin-login');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
       

        if (!formData.username || !formData.password || !formData.email) {
            alert("Please fill in all the required fields.");
            return;
        }
        const newUserData = new FormData();
        newUserData.append('username', formData.username);
        newUserData.append('email', formData.email);
        newUserData.append('password', formData.password);
        
        try {
            await api.post("heart/user/register/", newUserData);
            setIsNewUser(false); 
            fetchData();
        } catch (error) {
            console.log("ERROR:", error);
        }
   };

    const handleSaveEdit = async (userId, method) => {
        try {
            console.log("userId",userId.id);
            
            const updatedData = new FormData();

            if (method === 'edit') {
            console.log("userId",userId.id);
            updatedData.append('username', formData.username);
            updatedData.append('email', formData.email);
            updatedData.append('user_id', currentEditUserId);
            } else {
            updatedData.append('user_id', userId.id)
            updatedData.append('is_active', false)
            }
            await api.post(`/heart/update-profile-pic/`, updatedData);
            setCurrentEditUserId(null); // Reset editing mode
        } catch (error) {
            console.log("Error updating user:", error);
        } finally {
            fetchData();
        }
    };
    
    const fetchData = async () => {
        try {
            const response = await api.get('/heart/dashboard/');
            console.log("RESPONSE :",response.data)
            const activeUsers = response.data.filter(user => user.is_active);
            console.log("RESPONSE :",activeUsers)
            setProfiles(activeUsers);
            
        } catch (error){
            console.log(error)
        }
    };

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();  // Safely extract value from the event
        setSearchTerm(searchValue);
    };

    const filteredProfiles = profiles?.filter(profile => 
        profile.username.toLowerCase().includes(searchTerm) || 
        profile.email.toLowerCase().includes(searchTerm)
    );
    console.log(filteredProfiles)
    useEffect(()=>{
        if (isAdminAuthenticated){
            navigate('/dashboard')
        }
        fetchData();
    },[])

    return (
    <div className="dashboard">
        {isAdminAuthenticated ? (
        <div className="dashboard-inner">
            <h1>Wizard Dashboard</h1>
            <div className="search-container">
                <input type="text"  onChange={handleSearch}  id="searchInput" placeholder="Search users..." />
            </div>
            <div className="search-container">
                     {!isNewuser &&  <button onClick={handleNewUser}>Add User</button> }
                     <button onClick={handleLogout}>Logout</button>
               
                        {isNewuser && (
                        <div>
                            <h2>New User Form</h2>
                        
                            <form className="new-user">
                                <input type="text" placeholder="Username" onChange={(e) => setFormData({ ...formData, username: e.target.value })}  /><br />
                                <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })}  /><br />
                                <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} /><br />
                                <button type="submit" className="button" onClick={handleSubmit} >Add User</button>
                                <button type="button" className="button new-user-cancel" onClick={handleCancelClick}>Cancel</button>
                            </form>
                        </div>
                    )}
            </div>
            

            <table className="users-table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProfiles?.map((profile,index) => (
                        <tr key={profile.id}>
                            <td>{index+1}</td>
                            {currentEditUserId === profile.id ? (
                                    <>
                                        <td><input type="text" className="edit-user" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} /></td>
                                        <td><input type="email" className="edit-user" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></td>
                                    </>
                                ) : (
                                    <>
                                        <td>{profile.username}</td>
                                        <td>{profile.email}</td>
                                    </>
                                )}
                                {currentEditUserId === profile.id ? (
                                    <>
                                    <td>
                                    <button onClick={() => handleSaveEdit(profile.id,"edit")} className="save">Save</button>
                                    </td>
                                    <td>
                                    <button onClick={handleCancelClick} className="cancel">Cancel</button>
                                    </td>   
                                    </> )
                                    : (
                                    <>
                            <td className="status active">{profile.is_superuser ? "" : <button
                                        onClick={()=> handleEdit(profile)} className="edit">EDIT</button>}</td>
                            <td>
                            {profile.is_superuser ? "" :  <button 
                            onClick={()=> handleSaveEdit(profile,"delete")} className="delete">DELETE</button>}
                            </td>
                            </> )
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ) : <h1>NO PERMISSION</h1> }
    </div>
     
    )
}