import GuestLayout from "../../Layouts/GuestLayout";
import AdvancedSearch from "./AdvancedSearch";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import TasksTable from "./TasksTable";
import axios from 'axios';

export default function Index() {
  document.title = "Tasks - React";

  const [activeLink, setActiveLink] = useState(`${import.meta.env.VITE_BASE_URL}/task/fetch-all`);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [links, setLinks] = useState([]);
  const [users, setUsers] = useState([]);

  const [queries, setQuery] = useState({
      show: 25,
      testers: [],
      statuses: [],
      assignees: [],
      reviewers: [],
      priorities: [],
      from_task_page: true,
      sort_direction: 'desc',
      sort_field : 'created_at',
  });

  const getTasks = async () => {
      await axios.post(activeLink, queries)
      .then(res => {
          setTasks(res.data.data)
          setLinks(res.data.meta.links)
      })
      .catch(error => {
      });
  }

  const getProjects = () => {
      axios.post(`${import.meta.env.VITE_BASE_URL}/project/fetch-all`)
      .then(res => {
          setProjects(res.data.data)
      })
      .catch(error => {
      });
  }

  const getUsers = () => {
      axios.post(`${import.meta.env.VITE_BASE_URL}/user/fetch-all`)
      .then(res => {
          setUsers(res.data.data)
      })
      .catch(error => {
      });
  }

  useEffect(() => {
    getProjects();
    getUsers()
  }, [])

  useEffect(() => {
    getTasks();
  }, [activeLink])

  return (
    <GuestLayout
      header={
        <>
          <div className="flex items-center space-x-4">
          <div className="flex-grow">
            <AdvancedSearch
              getTasks={getTasks}
              projects={projects}
              setQuery={setQuery}
              queries={queries}
              users={users}
              className='w-full'
            />
          </div>
            <Link
              to={'/task-create'}
              className="p-2 rounded-md bg-green-600 border border-green-700 text-white font-semibold hover:bg-green-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            >
              Add New
            </Link>
          </div>
        </>
      }
    >

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <TasksTable
                tasks={tasks}
                links={links}
                queries={queries}
                setQuery={setQuery}
                getTasks={getTasks}
                setActiveLink={setActiveLink}
              />
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
