import React, { useEffect, useState } from 'react'
import './Home.css'
import api from '../../../api'
import { useNavigate } from 'react-router-dom';


export default function Home () {
    const [profile, setProfile] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [pic, setPic] = useState(null);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: ''
    });

    const handleLogout = () => {
        navigate('/logout')
    }

    const handleEdit = () => {
        setIsEdit(true);
        setFormData({
            username: profile?.username || '',
            email: profile?.email || '',
            phone: profile?.user_model?.phone || ''
        });
    }
    let x = 0
    const handleUsername =()=>{
        x ++;
        console.log(x)
        if (x >= 3){
            setEditData(true)
        }
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPic(URL.createObjectURL(selectedFile));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('username', formData.username);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        if (file) {
            data.append('profile_pic', file);
        }

        try {
            await api.post('/heart/update-profile-pic/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Optionally, refetch the profile data to reflect changes
            const response = await api.get('/heart/user-profile/');
            setProfile(response.data);
            setIsEdit(false);
        } catch (error) {
            console.error('Error updating profile picture:', error);
            alert('Error updating profile picture. Please try again.');
        }
    };

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await api.get('/heart/user-profile/')
                console.log("RESPONSE :",response)
                setProfile(response.data);
                setPic(response.data?.user_model?.profile_pic || '');
            } catch (error){
                alert(error)
            }
        };
        fetchData();
    },[])


    return (
        <>
        {!isEdit ? 
        <div className="card">
            <div className="cover-photo">
                <img src={pic} alt='Profile Pic' className="profile"/>
            </div>
            <h3 className="profile-name" onClick={handleUsername}>{profile?.username}</h3>
            
            <p className="about">Email : {profile?.email} <br/> Phone : {profile?.user_model?.phone} </p>
            <div className='button-space'>
                <button className="btn" onClick={handleEdit}>change<br/>profile</button>
                <button className="btn" onClick={handleLogout}>Logout</button>
            </div>
            <div className="icons">
                <i className="fa-brands fa-linkedin"></i>
                <i className="fa-brands fa-github"></i>
                <i className="fa-brands fa-youtube"></i>
                <i className="fa-brands fa-twitter"></i>
            </div>
    </div>
            : 
            <div className="card">
                        <div className="cover-photo">
                            <img src={pic} alt='Profile Pic' className="profile"/>
                        </div>
                        <br />
                        <br />
                        <br />
                        <form onSubmit={handleUpdate}>
                            <input type="file" onChange={handleFileChange} value={formData.profile_pic}/><br />
                            <input type="text" name="username" value={formData.username} onChange={handleInputChange} /><br />
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} /><br />
                            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} /><br />
                            
                            <button type="submit" className="btn">Upload</button>
                            <button type='button' onClick={()=>setIsEdit(false)}>Cancel</button>
                        </form>
            </div>
            }
        </>
    )
}