
import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
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
      alignItems: 'flex-start'
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
