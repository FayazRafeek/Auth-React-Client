import React from 'react'
import { Typography } from '@material-ui/core'


function FormFooter(props) {
    return (
        <div style={{width:'90%', textAlign: 'center', margin:'1.5em auto 0em auto', }}>
            <div style={containerStyle}>
                <div style={lineStyle}></div>
                <div style={{textAlign:"center", padding: '0 20px'}}>OR</div>
                <div style={lineStyle}></div>            
            </div>
            {props.formType === 'Login' && 
            <Typography component='p' style={{cursor:'pointer'}} onClick={props.formChange}>
                Don't have an account? <span style={{color: '#FE6B8B'}} >Register</span>
            </Typography>}
            {props.formType === 'Register' && 
            <Typography component='p' style={{cursor:'pointer'}} onClick={props.formChange}>
                Already have an account? <span style={{color: '#FE6B8B'}}>Login</span>
            </Typography>}

        </div>
    )
}

const containerStyle = {
    display:"grid", 
    gridTemplateColumns: "1fr auto 1fr",
    justifyContent: "center",
    alignContent: "center",
    width:"100%",
    margin:'0 0 1em 0',
}
const lineStyle = {
    alignSelf: 'center',
    width: "100%",
    height:"2px",
    backgroundColor:"#ddd"
}

export default FormFooter
