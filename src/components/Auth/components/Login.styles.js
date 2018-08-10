const styles = theme => (
  {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      marginTop: theme.spacing.unit * 4,
      width: '80%',
    },
    button: {
      margin: theme.spacing.unit,
      width: '80%',
    },
  }
);

export default styles;
