import Swal from "sweetalert2";
import axios from 'axios';
import {useAuth} from '../contexts/AuthContext'
const useUpdate = () => {

    const{update} =useAuth();

    const updateUser = async (val) => {
       
        try {
            const res=await axios.post('http://localhost:3000/api/auth/update', val);
            Swal.fire({
                icon: 'success',
                title: 'Update successfully!',
                showConfirmButton: false,
                timer: 1000
            });
            localStorage.removeItem('user_data');
            update();
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'An unexpected error occurred';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage
            });
        }
       
    };

    return { updateUser };

};

export default useUpdate;