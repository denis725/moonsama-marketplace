import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  placeholderContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    margin: '20 0',
  },
  nftWrapper: {
    position: 'relative',
    width: '280px',
    height: '430px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 12,
    textAlign: 'center'
  },
  scene: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    perspective: '1000px',
    userSelect: 'none',
  },
  poster: {
    position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      overflow: 'hidden',
  },
  glass: {
      position: 'absolute',
      width: '280px',
      height: '430px',
      transform: 'translateZ(3px)',
      backgroundPosition: '0px 0px',
      opacity: '0.01',
      border: '5px solid #000',
  },
  canvas: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '280px',
    height: '430px',
    transformOrigin: 'center center 0px',
    transform: 'translate(-50%, -50%)',
    transformStyle: 'preserve-3d',
    background: '#28495B',

    'div': {
      position: 'absolute',
      transformStyle: 'preserve-3d',
    },
},
}))

