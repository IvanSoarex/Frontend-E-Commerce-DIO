import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core/';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from './img/banner.jpg';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    grid: {
        backgroundImage: `url(${Image})`,
        height: '200px',
        padding: '0 40px 30px 380px',
    },
}));

const Header = () => {
    const cart = useSelector(state => state.cart)
    const classes = useStyles();
    return (
        <Grid container direction="row" justify="space-between" alignItems="flex-end" className={classes.grid}>
            <Box sx={{ typography: 'h2', fontFamily: 'Monospace' }}></Box>
            <Link to="/">
                <Button variant="contained" color="success" size="large">Produtos</Button>
            </Link>

            <Link to="/contato">
                <Button variant="contained" color="success" size="large">Contato</Button>
            </Link>
            <Link to="/carrinho">
                <Button variant="contained" color="success" size="large" startIcon={<ShoppingCartIcon />}>({cart.value})</Button>
            </Link>
        </Grid>

    )
}

export default Header;
