import HeaderComponent from '@/components/HeaderComponent';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {

    return (
        <div>
            <HeaderComponent/>
            <Outlet/>
        </div>
    );
};

export default MainLayout;