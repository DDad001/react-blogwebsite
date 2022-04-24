import {useNavigate} from 'react-router-dom';
import { Button } from "react-bootstrap";


function LogOutBtn() {
    let navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.clear();
        navigate("/Login")
    }

    return (
        <>
        <Button className="LogOutBtn" onClick={handleLogOut} >Log Out</Button>
        </>
    )
}

export default LogOutBtn;