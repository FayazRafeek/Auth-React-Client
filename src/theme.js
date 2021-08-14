import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
    palette : {
        primary : {
            main : '#000'
        },
        secondary : {
            main : 'fff'
        },
        error: {
            main: 'red'
        },
        background: {
            main: '#fff'
        }
    }
})

export default theme;