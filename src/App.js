import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/store';
import Routes from './routes';
import { Container } from '@material-ui/core/';
import Header from './components/Header';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        padding:'0',
      },
}));

const App = () => { 
  const classes = useStyles();
  const localCart = JSON.parse(localStorage.getItem('dioshopping: cart')) 
  if(localCart !== null) {
    store.dispatch({type: 'CHANGE_CART', localCart})
  } 
  return(
     <Provider  store={store}>
      <Container maxWidth="x1"  classes={{root:classes.container}} > 
        <Router>
          <Header />
          <Routes /> 
         </Router> 
       </Container>  
     </Provider> 
  )
}

 export default App;