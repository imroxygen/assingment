import Swal from "sweetalert2";
import { useAuth } from "../contexts/AuthContext"
import axios from 'axios';

const useLogin = () => {
    const { login } = useAuth();

    const loginUser = async (val) => {
       
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', val);
            Swal.fire({
                icon: 'success',
                title: 'Login successfully!',
                showConfirmButton: false,
                timer: 1000
            });
            login(res.data.token, res.data.user);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'An unexpected error occurred';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage
            });
        }
       
    };

    return { loginUser };

};

export default useLogin;