import GuestLayout from "../../Layouts/GuestLayout";
import { Link, useParams  } from 'react-router-dom';
import { useState, useEffect } from "react";
import ViewTask from './View';
import axios from 'axios';

export default function Show() {
  const [ users, setUsers ] = useState('');
  const [ task, setTask ] = useState('');
  const { id } = useParams();

  const getTask = async () => {
    await axios.get(`${import.meta.env.VITE_BASE_URL}/task-fetch/${id}`)
    .then(res => {
        setTask(res.data.task)
    })
    .catch(error => {
    });
  }

  const getUsers = () => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/users-fetch`)
    .then(res => {
        setUsers(res.data.data)
    })
    .catch(error => {
    });
}

  useEffect(() => {
    getTask();
    getUsers();
  }, [])

  return (
    <GuestLayout
      header={
        <>
          <Link
            to={'/tasks'}
            className="bg-gray-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-gray-600 float-right"
          >
            Back
          </Link>
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
              View Task
            </h2>
          </div>
        </>
      }
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <ViewTask task={task} users={users}></ViewTask>
        </div>
      </div>
    </GuestLayout>
  );
}
