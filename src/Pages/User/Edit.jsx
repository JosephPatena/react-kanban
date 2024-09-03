import { Link, useParams, useNavigate } from "react-router-dom";
import TextAreaInput from "../../Components/TextAreaInput";
import SelectInput from "../../Components/SelectInput";
import InputLabel from "../../Components/InputLabel";
import GuestLayout from "../../Layouts/GuestLayout";
import TextInput from "../../Components/TextInput";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Create() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [user, setUser] = useState({
    id: id,
    name: '',
    email: '',
    password: '',
    confirmed: '',
  });

  const getUser = async () => {
    await axios.get(`${import.meta.env.VITE_BASE_URL}/user/fetch/${id}`)
    .then(res => {
      setUser(res.data.user)
      handleChange({redirect_not: true})
    })
    .catch(error => {
    });
  }

  const updateUser = async () => {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/user/update/${id}`, user)
    .then(res => {
      if (!res.data.id) {
        return;
      }
      
      navigate(`/user-view/${res.data.id}`)
    })
    .catch(error => {
    });
  }

  const handleChange = (query) => {
    setUser((prev) => {
        return { ...prev, ...query }
    })
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <GuestLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit user "{user.name}"
          </h2>
        </div>
      }
    >

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-10">
            <div className="mt-4">
              <InputLabel htmlFor="username" value="Name" />

              <TextInput
                id="username"
                type="text"
                name="name"
                className="mt-1 block w-full"
                defaultValue={user.name}
                onChange={(e) => 
                  handleChange({name: e.target.value})
                }
              />
            </div>
            <div className="mt-4">
              <InputLabel
                htmlFor="user_email"
                value="Email"
              />

              <TextInput
                id="user_email"
                type="text"
                name="email"
                className="mt-1 block w-full"
                defaultValue={user.email}
                onChange={(e) => 
                  handleChange({email: e.target.value})
                }
              />
            </div>
            <div className="mt-4">
              <InputLabel
                htmlFor="user_password"
                value="Password"
              />

              <TextInput
                id="user_password"
                type="password"
                name="password"
                className="mt-1 block w-full"
                onChange={(e) => 
                  handleChange({password: e.target.value})
                }
              />
            </div>
            <div className="mt-4">
                <InputLabel
                  htmlFor="user_password_confirmed"
                  value="Confirm Password "
                />

                <TextInput
                  id="user_password_confirmed"
                  type="password"
                  name="confirmed"
                  className="mt-1 block w-full"
                  onChange={(e) => 
                    handleQuery({confirmed: e.target.value})
                  }
                />
              </div>
            <div className="mt-4 text-right">
              <Link
                to={'/users'}
                className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
              >
                Cancel
              </Link>
              <button onClick={updateUser} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
