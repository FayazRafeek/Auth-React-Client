import { useState } from 'react'
import LoginForm from './Components/LoginForm'
import RegisterForm from './Components/RegisterForm'
import FormFooter from './Components/FormFooter'
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'
import { LinearProgress } from '@material-ui/core'
import axios from 'axios'
import SelectInput from '@material-ui/core/Select/SelectInput'

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
  const [submitState, setSubmitState] = useState('inputting')
  //

  //MockSpleep
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  //Auth Logic
  const loginSubmit = async (data) => {
    console.log(data);
    setSubmitState('loading')
    const res = await axios.post('http://localhost:8000/auth/login',data)
    await sleep(2000)
  
    if(res.data.status){
      setSubmitState('success')
    } else {
      setSubmitState('failed')
      alert(res.data.message)
    }
  }
  //Register Logic
  const registerSubmit = async (data) => {
    console.log(data);
    setSubmitState('loading')
    const res = await axios.post('http://localhost:8000/auth/register',data)
    await sleep(2000)

    console.log(res.data);
    if(res.data.status)
      setSubmitState('success')
  
  }

  return (

    <MuiThemeProvider theme={theme}>

      <div className="App" style = {ParentContainerStyle}>
        {submitState === 'loading' && <LinearProgress/>}
        <div style = {paddingContainerStyle}>
          {currentForm === 'Login' && <LoginForm formChange={formChange} submitAction={loginSubmit} submitState={submitState}/>}
          {currentForm === 'Register' && <RegisterForm submitAction={registerSubmit} submitState={submitState}/>}
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