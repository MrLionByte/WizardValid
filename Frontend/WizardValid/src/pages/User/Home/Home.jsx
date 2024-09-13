import React, { useEffect, useState } from 'react'
import './Home.css'
import api from '../../../api'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {useAuthActions} from '../../../services/services.js';
import { setIsEdit } from '../../../Redux-Toolkit/slice.js'


export default function Home () {
    const [profile, setProfile] = useState(null);
    const [pic, setPic] = useState(null);
    const [file, setFile] = useState(null);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isEdit = useSelector((state) => state.edit.isEdit);

    const { logoutUser } = useAuthActions();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
    });

    const handleLogout = async () => {
        await logoutUser();
        navigate('/login');
    }

    const handleEdit = () => {
        dispatch(setIsEdit(true));
        setFormData({
            username: profile?.username || '',
            email: profile?.email || '',
        });
    }

    const handleUsername =()=>{
       if (profile.is_superuser){
        navigate('/dashboard',{ state: "is_superuser" })
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
        if (file) {
            data.append('profile_pic', file);
        }

        try {
            await api.post('/heart/update-profile-pic/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
  
            const response = await api.get('/heart/user-profile/');
            setProfile(response.data);
            dispatch(setIsEdit(false));
        } catch (error) {
            console.error('Error updating profile :', error);
            alert('Error updating profile. Please try again.');
        }
    };

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await api.get('/heart/user-profile/')
                console.log("RESPONSE :",response)
                setProfile(response.data);
                setPic(response.data?.user_model?.profile_pic || '');
                setFormData({
                    username: response.data?.username || '',
                    email: response.data?.email || '',
                });
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
                {!pic ? <p>Upload Profile pic</p>
                : 
                <img src={profile?.user_model?.profile_pic} alt='Profile Pic' className="profile"/>
            }
            </div>
            <h3 className="profile-name" onClick={handleUsername}>{profile?.username}</h3>
            
            <p className="about">Email : {profile?.email} <br/>  </p>
            <div className='button-space'>
                <button className="btn" onClick={handleEdit}>Edit<br/>profile</button>
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
                            <input type="file" accept="image/*" onChange={handleFileChange} value={formData.profile_pic}/><br />
                            <input type="text" name="username" value={formData.username} onChange={handleInputChange} /><br />
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} /><br />
                            
                            <button type="submit" className="btn">Upload</button>
                            <button type='button' onClick={()=>dispatch(setIsEdit(false))}>Cancel</button>
                        </form>
            </div>
            }
        </>
    )
}