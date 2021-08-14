import React from 'react'
import { useState } from 'react';
//Ui DP
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { FormControlLabel, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Checkbox } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',

  },
  formNameInline : {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap:theme.spacing(2)
  },
  textField: {
    [`& fieldset`]: {
      borderRadius: '9px',
    },
    borderRadius : '50%',
    marginTop: theme.spacing(2)
  },
  rememberBox : {
    marginTop: theme.spacing(1)
  },
  submit: {
    minWidth:'8rem',
    borderRadius: '8px',
    margin: 'auto',
    marginTop: theme.spacing(2),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: '#fff'
  },
  heading: {
    marginBottom: ".5rem"
  }
}));


function RegisterForm(props) {
    

    //Form State
    const [formData, setFormData] = useState({
        fName : '',
        lName : '',
        email : '',
        password : '',
        remember : false
      })
    
    const [showPassword, setShowPassword] = useState(false)
    const [formError, setFormError] = useState({
        fNameError : '',
        lNameError : '',
        emailError : '',
        passwordError : '',
        isFormError: false
    })

    const formDataChange = (prop) => (event) => {
        if(prop !== 'remember'){
            setFormData({...formData,[prop] : event.target.value})
            if(formError.isFormError)
                setFormError({...formError,[prop + 'Error'] : ''})
        } 
        else
          setFormData({...formData, [prop] : event.target.checked})
      } 

    //

    //Form Submit
    const formSubmit = (e) => {
        e.preventDefault();
        if(validateInputs)
            props.submitAction(formData)
    }
    //Input Validation
    const validateInputs = () => {
        let fName = formData.fName
        let lName = formData.lName
        let email = formData.email
        let password = formData.password

        if(!fName || fName === ''){
            setFormError({...formError, fNameError : 'This field is required' ,isFormError : true})
            return false
        }
        if(!lName || lName === ''){
            setFormError({...formError, lNameError : 'This field is required' ,isFormError : true})
            return false
        }
        if(!email || email === ''){
            setFormError({...formError, emailError : 'This field is required', isFormError : true})
            return false
        }
        if(!password || password === ''){
            setFormError({...formError, passwordError : 'Invalid password' ,isFormError : true})
            return false
        }

        setFormError({emailError : '', passwordError : '', fNameError : '', lNameError : '', isFormError : false})
        return true
    }
    
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
       
          <div className={classes.paper}>
            <Typography className={classes.heading} component="h1" variant="h5">Create new account</Typography>

            <form className={classes.form} noValidate onSubmit={formSubmit}>


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
                helperText={formError.fNameError !== '' ? formError.fNameError : ''}
                error={formError.fNameError !== '' ? true : false}
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
                helperText={formError.lNameError !== '' ? formError.lNameError : ''}
                error={formError.lNameError !== '' ? true : false}
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
                helperText={formError.emailError !== '' ? formError.emailError : ''}
                error={formError.emailError !== '' ? true : false}
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
                helperText={formError.passwordError !== '' ? formError.passwordError : ''}
                error={formError.passwordError !== '' ? true : false}
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
