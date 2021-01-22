import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: any) => ({
  [theme.breakpoints.down('sm')]: {
    mainContainer: {
      flexDirection:'column-reverse'
    }
  }
}));