import React from "react";
import './dashboard.css'

export default function Dashboard () {
    return (
    <div className="dashboard">
        <div className="dashboard-inner">
            <h1>Wizard Dashboard</h1>
            <div className="search-container">
                <input type="text" id="searchInput" placeholder="Search users..." />
            </div>
            <div className="search-container">
                <button>Add User</button>
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
                    <tr>
                        <td>1</td>
                        <td>John Doeasasdasdasdsadsadasdsadsaddasdasd</td>
                        <td>fanunaf@gmail.com</td>
                        <td className="status active">EDIT</td>
                        <td >
                            DELETE
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
    )
}