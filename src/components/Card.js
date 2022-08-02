import React from 'react';
import { Paper, Grid, Typography, Button, makeStyles } from '@material-ui/core/';
import { useSelector, useDispatch } from 'react-redux';
import cartActions from './store/actions/cart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        backgroundColor: 'aliceblue'
    },
    button: {
        backgroundColor: '#607d8b'
    },
}));

const Card = ({ product, children }) => {
    const cart = useSelector(state => state.cart.value)
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <Grid item xs={3}>
            <Paper className={classes.paper}>
                <Grid container direction='column'>
                    <Grid item>
                        <img width="140px" src={product.image} alt={product.name_product} />
                        <Typography variant='h6'>
                            {children}
                        </Typography>
                        <Typography variant='subtitle1'>
                            R$ {product.price.toFixed(2)}
                        </Typography>
                    </Grid>

                    <Button
                        className={classes.button}
                        variant="contained"
                        onClick={() => dispatch(cartActions.Add(cart, product))}
                        startIcon={<ShoppingCartIcon />}
                    >
                        Adicionar
                    </Button>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Card;
