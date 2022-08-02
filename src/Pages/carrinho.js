import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cartActions from '../components/store/actions/cart';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Paper, Grid, makeStyles } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'center',
        marginTop: '20px'
    },
    paper: {
        textAlign: 'center',
        border: '3px solid #eeeeee',
        backgroundColor: 'aliceblue',
        padding: '0 20px 10px 0'
    }
}));

const Carrinho = () => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const classes = useStyles();

    let totalPrice = 0;

    for (let i = 0; i < cart.Cart.length; i++) {
        totalPrice += (cart.Cart[i].price * cart.Cart[i].quantity)
    }

    if (cart.value > 0) {
        localStorage.setItem('dioshopping: cart', JSON.stringify(cart))
    }

    return (
        <Grid container className={classes.root}>
            <Paper className={classes.paper}>
                <div className="modal fade" id="CartModal" aria-labelledby="CartModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title" id="CartModalLabel">Meu Carrinho</h3>
                            </div>

                            <div className="modal-body table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Produto</th>
                                            <th scope="col">Qtd</th>
                                            <th scope="col">Preço</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.Cart.map(item => {
                                            return (
                                                <tr key={item.id}>
                                                    <th><IconButton onClick={() => dispatch(cartActions.DeleteItem(cart, item))} aria-label="delete">
                                                        <DeleteIcon />
                                                    </IconButton></th>
                                                    <th><img className="img-fluid img-thumbnail" src={item.image} alt={item.Name} width="50px" /></th>
                                                    <th><span className="badge badge-pill bg-warning">
                                                        {item.quantity}
                                                    </span></th>
                                                    <th>R$ {item.price.toFixed(2)}</th>
                                                    <th><IconButton onClick={() => dispatch(cartActions.AddItem(cart, item))} color='primary' variant="contained">
                                                        <AddIcon />
                                                    </IconButton></th>
                                                    <th><IconButton onClick={() => dispatch(cartActions.RemoveItem(cart, item))} color='secondary'>
                                                        <RemoveIcon />
                                                    </IconButton></th>
                                                    <th>R$ {(item.price * item.quantity).toFixed(2)}</th>
                                                </tr>
                                            )
                                        })}
                                        <tr>
                                            <th colSpan="2" scope="col">Total</th>
                                            <th colSpan="3">{cart.value} itens</th>
                                            <th colSpan="2">R$ {totalPrice.toFixed(2)}</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
        </Grid>
    )
}

export default Carrinho;