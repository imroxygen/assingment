import { useAuth } from "../contexts/AuthContext"
import axios from 'axios';
import Swal from 'sweetalert2'


const useSignup = () => {
    const { login } = useAuth();

    const registerUser = async (val) => {
       
        try {
            const res = await axios.post('http://localhost:3000/api/auth/signup', val);
            Swal.fire({
                icon: 'success',
                title: 'Signed up successfully!',
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

    return {  registerUser };

};

export default useSignup;