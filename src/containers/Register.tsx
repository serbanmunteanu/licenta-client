import { AxiosError, AxiosResponse } from "axios";
import { useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import UserService from "../data/services/UserService";
import { AuthenticationResponse } from "../data/entities/AuthenticationResponse";
import { useHistory } from "react-router-dom";

const Register = () => {
    const userContext = useContext(UserContext);
    const history = useHistory();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const userNameRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        if (emailRef.current && passwordRef.current && userNameRef.current) {
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            const userName = userNameRef.current.value;
            UserService.register(email, password, userName)
            .then((response: AxiosResponse<AuthenticationResponse>) => {
                userContext.authenticate(email, password);
                history.push('/');
            })
            .catch((error: AxiosError) => {
                console.log(error);
            });
        }
    }

    return (
        <div className="container-sm col-4 position-absolute top-50 start-50 translate-middle">
           <form> 
           <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                <input ref={userNameRef} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input ref={emailRef} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input ref={passwordRef} type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary" onClick={(event) => handleSubmit(event)}>Submit</button>
            </form>
        </div>
    )
}

export default Register;