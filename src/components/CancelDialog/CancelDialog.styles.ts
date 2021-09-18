import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    display: 'flex',
    padding: theme.spacing(4),
    flexDirection: 'column',
    minWidth: 500,
  },
  nakedInput: {
    border: 0,
    background: 'transparent',
    padding: 0,
    margin: 0,
    fontFamily: theme.typography.fontFamily,
    color: 'white',
    textAlign: 'right',
    outline: 'none',
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  successContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  successIcon: {
    width: '30%',
    height: 'auto',
    marginBottom: theme.spacing(2),
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
  divider: {
    background: theme.palette.text.secondary,
    opacity: 0.5,
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));
