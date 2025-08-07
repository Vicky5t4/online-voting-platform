import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const [polls, setPolls] = useState([])

    useEffect(() => {
        const fetchPolls = async () => {
            try {
               const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/polls`);

                setPolls(response.data)
            } catch (error) {
                console.error('Error fetching polls:', error);
            }
        }
        fetchPolls()
    }, [])

    return (
        <div className='dashboard-container'>
            <h2>All Polls</h2>
            {polls.length === 0 ? (
                <p>No Polls Created</p>
            ) : (
                <div className='polls-grid'>
                    {polls.map((poll) => (
                        <div key={poll._id} className='poll-item'>
                            <Link to={`/poll/${poll._id}`} className='poll-link'>
                                {poll.question}
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dashboard
