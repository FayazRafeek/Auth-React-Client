//Depenedncies
import React from 'react'
import { useState } from 'react';

//DP From Material-Ui
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { FormControlLabel } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';

//Style For Forms
import formStyle from './FormStyling'

//Component
function LoginForm(props) {

  //Form Data State 
  const [formData, setFormData] = useState({
    email : '',
    password : '',
    remember : false
  })

  //Pssword input visibility toggle state
  const [showPassword, setShowPassword] = useState(false)

  //Capture inputes from the form
  const formDataChange = (prop) => (event) => {

    if(prop !== 'remember'){
      setFormData({...formData,[prop] : event.target.value})
      if(props.errorState.isFormError)
        props.errorHandle({...props.errorState,[prop + 'Error'] : ''})
    }
    else
      setFormData({...formData, [prop] : event.target.checked})
  } 
  // 

  //Form Submit
  const formSubmit = (e) => {
    
    e.preventDefault();
    
    //Call Validate Inputs
    if(validateInputs()){
      //Submit data to submitAction in App()
      props.submitAction(formData)
    }
  }

  //Input Validation
  const validateInputs = () => {

    let email = formData.email
    let password = formData.password

    //Set Error State
    if(!email || email === ''){
      props.errorHandle({...props.errorState, emailError : 'This field is required', isFormError : true})
      return false
    }
    if(!password || password === ''){
      props.errorHandle({...props.errorState, passwordError : 'Invalid password' ,isFormError : true})
      return false
    }

    props.errorHandle({emailError : '', passwordError : '', isFormError : false})

    //Return true if validation success
    return true
  }
 
  //Get formsStyle as classes
  const classes = formStyle();

  //Render Method
    return (

        <Container component="main" maxWidth="xs">
       
          <div className={classes.paper}>

            {/* Header */}
            <Typography className={classes.heading} component="h1" variant="h5">Sign in</Typography>

            {/* Form */}
            <form className={classes.form} onSubmit={formSubmit}>

              <TextField 
              className={classes.textField}
                variant="outlined"
                fullWidth
                id="email"
                label="Email"
                name="Email"
                type="email"
                inputMode="email"
                onChange={formDataChange('email')}
                helperText={props.errorState.emailError !== '' ? props.errorState.emailError : ''}
                error={props.errorState.emailError !== '' ? true : false}
              />

              <TextField 
                className={classes.textField}
                variant="outlined"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label="Password"
                InputProps={{
                  endAdornment: 
                  <InputAdornment position="end" 
                  onClick={() => setShowPassword(!showPassword)}>
                    <IconButton 
                    aria-label="toggle password visibility">
                      {
                        showPassword ? <Visibility/> : <VisibilityOff/>
                      }
                      
                    </IconButton>
                  </InputAdornment>,
                  
                }}
                id="password"
                autoComplete="current-password"
                onChange={formDataChange('password')}
                helperText={props.errorState.passwordError !== '' ? props.errorState.passwordError : ''}
                error={props.errorState.passwordError !== '' ? true : false}
              />

              <FormControlLabel
                className={classes.rememberBox}
                control={<Checkbox value="remember" color="primary" onChange={formDataChange('remember')}/>}
                label="Remember me"
              />

              <Button 
                type="submit"
                variant="contained"
                className={classes.submit}
                size="large"
                disabled={props.submitState === 'loading' ? true : false}
              >Login</Button>
            </form>
              
          </div>

        </Container>
    )
}

export default LoginForm
