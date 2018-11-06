import React, { Component } from 'react';
import axios from 'axios';
import {
    getFromStorage,
    getInStorage,
    setInStorage
} from '../utils/storage';


export default class CreateReport extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            signUpError: '',
            signInError: '',
            masterError: '',
            signInEmail: '',
            signInPassword: '',
            signUpFirstName: '',
            signUpLastName: '',
            signUpEmail: '',
            signUpPassword: '',
        }

        this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this)
        this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this)
        this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this)
        this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this)
        this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this)
        this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this)

        this.onSubmit = this.onSubmit.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
        this.logout = this.logout.bind(this);

    }

    componentDidMount(){
        const obj = getFromStorage('the_main_app')
        
        if(obj && obj.token){
            const { token } = obj
            //Verify the token
            axios.get('http://localhost:4200/serveruser/verify?token=' + token)
            .then(response => {
                if(JSON.success){
                  this.setState({ 
                      serverusers: response.data,
                      token,
                      isLoading: false
                });
              console.log(response.data)  
                } else {
                    this.setState({
                        isLoading: false
                    })
                }
              
            })
            .catch(function (error) {
              console.log(error);
            })
        } else {
            this.setState({
                isLoading:false
            })
        }
    }

    onTextboxChangeSignInEmail(event){
        this.setState({
            signInEmail: event.target.value,
        })
    }

    onTextboxChangeSignInPassword(event){
        this.setState({
            signInPassword: event.target.value,
        })
    }

    onTextboxChangeSignUpFirstName(event){
        this.setState({
            signUpFirstName: event.target.value,
        })
    }

    onTextboxChangeSignUpLastName(event){
        this.setState({
            signUpLastName: event.target.value,
        })
    }

    onTextboxChangeSignUpEmail(event){
        this.setState({
            signUpEmail: event.target.value,
        })
    }

    onTextboxChangeSignUpPassword(event){
        this.setState({
            signUpPassword: event.target.value,
        })
    }

    onSignUp(e){
        e.preventDefault();
    
        const newUser = {
            firstName: this.state.signUpFirstName,
            lastName: this.state.signUpLastName,
            email: this.state.signUpEmail,
            password: this.state.signUpPassword,
            
        }
        axios.post('http://localhost:4200/serveruser/add', newUser)
        .then(res => console.log(res.data));
            
        this.setState({
            signUpFirstName: '',
            signUpLastName: '',
            signUpPassword: '',
            signUpEmail: '',
        })

    } 

    onSubmit(e){
        e.preventDefault();
    
        const newUser = {
            email: this.state.signInEmail,
            password: this.state.signInPassword,
            token: this.token
            
        }
        axios.post('http://localhost:4200/serveruser/signin', newUser)
        .then(res => {
        console.log(res.data)
        setInStorage('the_main_app', { token: this.token})
        }
        );
        
        

        this.setState({
            signInPassword: '',
            signInEmail: '',
        })


    }

    logout(){
        this.setState({
            isLoading: true,
        })
        const obj = getFromStorage('the_main_app')
        
        if(obj && obj.token){
            const { token } = obj
            //Verify the token
            axios.get('http://localhost:4200/serveruser/logout?token=' + token)
            .then(response => {
                if(JSON.success){
                  this.setState({ 
                      serverusers: response.data,
                      token: '',
                      isLoading: false
                });
              console.log('Hey que pedo: ', response.data)  
                } else {
                    this.setState({
                        isLoading: false
                    })
                }
              
            })
            .catch(function (error) {
              console.log(error);
            })
        } else {
            this.setState({
                isLoading:false
            })
        }
    }



    render(){        
        const {
            isLoading,
            token,
            signInError,
            signInEmail,
            signInPassword,
            signUpError,
            signUpFirstName,
            signUpLastName,
            signUpEmail,
            signUpPassword
        } = this.state;
        return (
            <div style={{marginTop: 50}}>
                <h3>Iniciar Sesión</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>E-mail: </label>
                        <input type="email" placeholder="Email" className="form-control" value={signInEmail} onChange={this.onTextboxChangeSignInEmail}/>
                    </div>
                    <div className="form-group">
                        <label>Contraseña: </label>
                        <input type="password" placeholder="Password" className="form-control" value={signInPassword} onChange={this.onTextboxChangeSignInPassword}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Iniciar sesión" className="btn btn-primary" />
                    </div>
                </form>
                
            </div>
        )

        // if (isLoading){
        //     return (<div><p>Loading... </p></div>);
        // }

        // if(!token){
        //     return (
        //     <div>
        //         {
        //             (signInError) ? (
        //                 <p>{signInError}</p>
        //             ) : (null)
        //         }
        //         <p>Sign in</p>
        //         <input type="email" placeholder="Email" value={signInEmail} onChange={this.onTextboxChangeSignInEmail}/>
                
        //         <input type="password" placeholder="Password" value={signInPassword} onChange={this.onTextboxChangeSignInPassword}/>
        //         <button onClick={this.onSignIn}>Sign in</button>

        //         <div>
        //         {
        //             (signUpError) ? (
        //                 <p>{signUpError}</p>
        //             ) : (null)
        //         }
        //         <p>Sign up</p>
        //         <input type="firstName" placeholder="First Name" value={signUpFirstName} onChange={this.onTextboxChangeSignUpFirstName} />
        //         <input type="lastName" placeholder="Last Name" value={signUpLastName} onChange={this.onTextboxChangeSignUpLastName}/>
        //         <input type="email" placeholder="Email" value={signUpEmail} onChange={this.onTextboxChangeSignUpEmail}/>
        //         <input type="password" placeholder="Password"value={signUpPassword} onChange={this.onTextboxChangeSignUpPassword}/>
        //         <button onClick={this.onSignUp}>Sign up</button>
        //         </div>
        //         <div><p>Account</p>
        //         <button onClick={this.logout}>Logout</button>
        //     </div>
        //     </div>
            
        //     )
        //     }
        

        // return(
        //     <div><p>Account</p>
        //         <button onClick={this.logout}>Logout</button>
        //     </div>
        // )
    }

}