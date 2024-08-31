import GuestLayout from "../../Layouts/GuestLayout";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddTask from './Add';
import axios from "axios";

export default function Create() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  
  const getProjects = () => {
      axios.post(`${import.meta.env.VITE_BASE_URL}/projects-fetch`)
      .then(res => {
          setProjects(res.data.data)
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
      getProjects();
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
            Cancel
          </Link>
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
              Create New Task
            </h2>
          </div>
        </>
      }
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white p-4 rounded-lg">
          <AddTask
            projects={projects}
            users={users}
          ></AddTask>
        </div>
      </div>
      
    </GuestLayout>
  );
}
