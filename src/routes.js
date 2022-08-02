import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/home';
import Contatos from './Pages/contato';
import Carrinho from './Pages/carrinho';

const MainRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<HomePage />}
            />
            <Route
                path="/contato"
                element={<Contatos />}
            />
            <Route
                path="/carrinho"
                element={<Carrinho />}
            />
        </Routes>
    )
}

export default MainRoutes;
