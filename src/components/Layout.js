import { Outlet } from "react-router-dom";
import React from 'react'
import Home from "./Home";
import LeftBar from './LeftBar';
import RightBar from './RightBar';

const Layout = () => {
    return (
        <div className="layout-con">
            <div className="layout-header">
                <Home />
            </div>
            <div className="layout-mid-sidebars flex-row">
                <div className="layout-sidebars">
                    <LeftBar />
                </div>
                <div className="layout-midbar">
                    {/* <Blogs /> */}
                    <Outlet />
                </div>
                <div className="layout-sidebars rightbar">
                    <RightBar />
                </div>
            </div>
        </div>
    );
}

export default Layout