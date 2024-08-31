import { Link, useParams, useNavigate } from "react-router-dom";
import TextAreaInput from "../../Components/TextAreaInput";
import SelectInput from "../../Components/SelectInput";
import InputError from "../../Components/InputError";
import InputLabel from "../../Components/InputLabel";
import GuestLayout from "../../Layouts/GuestLayout";
import TextInput from "../../Components/TextInput";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Create() {
  const navigate = useNavigate()
  const { id } = useParams();
  const [project, setProject] = useState({
    id: id,
    name: '',
    description: '',
    image_path: '',
    status: '',
    due_date: '',
    createdBy: '',
    updatedBy: { name: '' },
    created_at: '',
  });

  const getProject = async () => {
    await axios.get(`${import.meta.env.VITE_BASE_URL}/project-fetch/${id}`)
    .then(res => {
      setProject(res.data.project)
    })
    .catch(error => {
    });
  }

  const saveProject = async () => {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/project-update/${id}`, project)
    .then(res => {
      navigate(`/project-view/${id}`)
    })
    .catch(error => {
    });
  }

  const handleChange = (query) => {
    setProject((prev) => {
        return { ...prev, ...query }
    })
  }

  useEffect(() => {
    getProject();
  }, [])

  return (
    <GuestLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit project "{project.name}"
          </h2>
        </div>
      }
    >

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              {project.image_path && (
                <div className="mb-4">
                  <img src={project.image_path} className="w-64" />
                </div>
              )}
              <div>
                <InputLabel
                  htmlFor="project_image_path"
                  value="Project Image"
                />
                <TextInput
                  id="project_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  onChange={(e) => 
                    handleChange({image: e.target.files[0]})
                  }
                />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="project_name" value="Project Name" />

                <TextInput
                  id="project_name"
                  type="text"
                  name="name"
                  defaultValue={project.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => 
                    handleChange({name: e.target.value})
                  }
                />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_description"
                  value="Project Description"
                />

                <TextAreaInput
                  id="project_description"
                  name="description"
                  defaultValue={project.description}
                  className="mt-1 block w-full"
                  onChange={(e) => 
                    handleChange({description: e.target.value})
                  }
                />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_due_date"
                  value="Project Deadline"
                />

                <TextInput
                  id="project_due_date"
                  type="date"
                  name="due_date"
                  defaultValue={project.due_date}
                  className="mt-1 block w-full"
                  onChange={(e) => 
                    handleChange({due_date: e.target.value})
                  }
                />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="project_status" value="Project Status" />

                <SelectInput
                  name="status"
                  id="project_status"
                  className="mt-1 block w-full"
                  defaultValue={project.status}
                  onChange={(e) => 
                    handleChange({status: e.target.value})
                  }
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
              </div>
              <div className="mt-4 text-right">
                <Link
                  to={'/projects'}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button onClick={saveProject} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
