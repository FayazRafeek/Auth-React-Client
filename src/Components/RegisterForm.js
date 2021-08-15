//Dependencies
import React from 'react'
import { useState } from 'react';

//UDP from Material-ui
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import { FormControlLabel, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Checkbox } from '@material-ui/core';

//Style For Forms
import formStyle from './FormStyling'


// Component
function RegisterForm(props) {
    

    //Form Data State
    const [formData, setFormData] = useState({
        fName : '',
        lName : '',
        email : '',
        password : '',
        remember : false
      })
    
    //Password visibility toggle state
    const [showPassword, setShowPassword] = useState(false)

    //Get inputted data from Form onChange()
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
        //Validate Inputs
        if(validateInputs()){
          //Submit form data
          props.submitAction(formData)
        }
    }
    // 

    //Input Validation
    const validateInputs = () => {

      let fName = formData.fName
      let lName = formData.lName
      let email = formData.email
      let password = formData.password

      //Check inputs
      if(fName.length === 0){
          props.errorHandle({...props.errorState, fNameError : 'This field is required' ,isFormError : true})
          return false
      }
      if(lName.length === 0){
          props.errorHandle({...props.errorState, lNameError : 'This field is required' ,isFormError : true})
          return false
      }
      if(email.length === 0){
          props.errorHandle({...props.errorState, emailError : 'This field is required', isFormError : true})
          return false
      }
      if(password.length === 0){
          props.errorHandle({...props.errorState, passwordError : 'Invalid password' ,isFormError : true})
          return false
      }

      props.errorHandle({emailError : '', passwordError : '', fNameError : '', lNameError : '', isFormError : false})
      
      //Return true if everything is perfect
      return true
    }
    
    //Create styles classes
    const classes = formStyle();

    //Render Method
    return (

        <Container component="main" maxWidth="xs">
       
          <div className={classes.paper}>

            {/* Header */}
            <Typography className={classes.heading} component="h1" variant="h5">Create new account</Typography>

            {/* Form */}
            <form className={classes.form} onSubmit={formSubmit}>

              <div className={classes.formNameInline}>

            <TextField 
              className={classes.textField}
                variant="outlined"
                fullWidth
                id="fName"
                label="First Name"
                name="fName"
                type="text"
                inputMode="text"
                onChange={formDataChange('fName')}
                helperText={props.errorState.fNameError !== '' ? props.errorState.fNameError : ''}
                error={props.errorState.fNameError !== '' ? true : false}
              />

            <TextField 
              className={classes.textField}
                variant="outlined"
                fullWidth
                id="lName"
                label="Last Name"
                name="lName"
                type="text"
                inputMode="text"
                onChange={formDataChange('lName')}
                helperText={props.errorState.lNameError !== '' ? props.errorState.lNameError : ''}
                error={props.errorState.lNameError !== '' ? true : false}
              />
            </div>

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
              >GET STARTED</Button>
            </form>
          
          </div>

        </Container>
)}

export default RegisterForm
