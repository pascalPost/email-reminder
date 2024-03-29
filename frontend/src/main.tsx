import {createRoot} from 'react-dom/client';
import {Routes} from '@generouted/react-router';
import './globals.css';
import React from 'react';
import "./i18n.ts";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000';

const root = document.getElementById('root');

if (!root) {
    throw new Error('Root element not found');
}

createRoot(root).render(
    <React.StrictMode>
        <Routes/>
    </React.StrictMode>
)
