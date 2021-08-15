//Dependencies
import { useState } from 'react'
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'
import { LinearProgress } from '@material-ui/core'
import axios from 'axios'
//Components
import LoginForm from './Components/LoginForm'
import RegisterForm from './Components/RegisterForm'
import FormFooter from './Components/FormFooter'


//Global Theme
const theme = createTheme({
  palette: {
    primary : {
      main : '#FF8E53'
    },
    secondary: {
      main: '#FE6B8B'
    }
  }
});


function App() {

  //Form State Logic
  const [currentForm, setCurrentForm] = useState('Login')
  const formChange = () => {
    const form = currentForm;
    if(form === 'Login')
      setCurrentForm('Register')
    else if(form === 'Register')
      setCurrentForm('Login')
  }

  //Form Submit State (enum{'inputting','loading','success','failed'})
  const [submitState, setSubmitState] = useState('inputting')

  /* Authentication Login */
  //Login
  const loginSubmit = async (data) => {

    //Set Submit state
    setSubmitState('loading')
    
    try {

      //Send POST req to server with inputted {data}
      const res = await axios.post('http://localhost:8000/auth/login',data)

      if(res.data){

        //Checking Response status 
        if(res.data.status){
          setSubmitState('success')
        } else {

          //Failed response
          setSubmitState('failed')

          let errorCode = res.data.errorCode
          //Handle Error
          if(errorCode === 100)
            setLoginError({...loginError, passwordError : 'Incorrect Password', isFormError : true})
          else if(errorCode === 303)
            setLoginError({...loginError, emailError : 'This email is not registered', isFormError : true})
          else 
            alert(res.data.message)
          // 
          
        }
      } else {
        alert('Unkown error occured')
      }

    } catch(error) {
      setSubmitState('failed')
      alert(error)
    }
  
  
  }

  //Register
  const registerSubmit = async (data) => {

    //Set Submit state
    setSubmitState('loading')

    try {

      //Send POST req to server with inputted {data}
      const res = await axios.post('http://localhost:8000/auth/register',data)

      if(res.data){

        if(res.data.status){

          setSubmitState('success')

        } else {
          setSubmitState('failed')

          //Error Handleing
          let errorCode = res.data.errorCode
          if(errorCode === 110)
            setregisterError({...registerError, emailError : 'User Already exists! Try Login', isFormError : true})
          else
            alert(res.data.message) //Alert returned errorMessage
        }
      } else {
        alert('Unknown error Occured') //Response is empty **Rare case
      }
      
    } catch(error) {
      alert(error) //Catch NetworkError, Connection refused error etc.
    }
   
  }

  //Authentication Error State **Includes State for input validation
  const [loginError, setLoginError] = useState({
    emailError : '',
    passwordError : '',
    isFormError : false
  })
  const [registerError, setregisterError] = useState({
    fNameError : '',
    lNameError : '',
    emailError : '',
    passwordError : '',
    isFormError : false
  })
  //

  //Redering Method
  return (

    <MuiThemeProvider theme={theme}>

      <div className="App" style = {ParentContainerStyle}>

        {/* Progress Bar */}
        {submitState === 'loading' && <LinearProgress/>}

        {/* Form Type Decision */}
        <div style = {paddingContainerStyle}>
          {currentForm === 'Login' && <LoginForm formChange={formChange} submitAction={loginSubmit} submitState={submitState} errorState={loginError} errorHandle={setLoginError}/>}
          {currentForm === 'Register' && <RegisterForm submitAction={registerSubmit} submitState={submitState} errorState={registerError} errorHandle={setregisterError}/>}
          
          {/* Footer to chenge Form [Login <--> Register] */}
          <FormFooter formType={currentForm} formChange={formChange}/>
          
        </div>

      </div>

    </MuiThemeProvider>

  );
}

export default App;

//Parent Container Style
const ParentContainerStyle = {
  backgroundColor : "#fff", 
  borderRadius : "20px",
  boxShadow: "2px 2px 5px 5px rgba(0,0,0,0.05)",
  width: "400px",
  boxSizing : "border-box",
  margin: "auto",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: 'hidden'
}
const paddingContainerStyle = {
  width: "100%",
  boxSizing : "border-box",
  padding: "3rem 1rem 3rem 1rem",
}