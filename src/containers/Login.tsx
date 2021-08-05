import { useContext, useRef } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../context/UserContext";

interface Props {}

const Login = (props: Props) => {
    const userContext = useContext(UserContext);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const authenticate =  async () => {
        if (emailRef.current && passwordRef.current) {
            userContext.authenticate(emailRef.current.value , passwordRef.current.value);
        }
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        authenticate();
    }

    return (
        userContext.isAuthenticated 
        ? <Redirect to ="/"/> 
        : <div className="container-sm col-4 position-absolute top-50 start-50 translate-middle">
           <form> 
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
    );
}

export default Login;