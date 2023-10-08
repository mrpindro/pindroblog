import { Outlet, useNavigate } from "react-router-dom";
import React from 'react'
import Home from "./Home";
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import { AiOutlineFileSearch } from "react-icons/ai";
import Footer from "./Footer";

const Layout = () => {
    const navigate = useNavigate();

    return (
        <div className="layout-con">
            <div className="layout-header">
                <Home />
            </div>
            <div className="layout-mid-sidebars flex-row">
                <div className="layout-sidebars leftbar">
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
            <div className="layout-footer flex-column">
                <Footer />
            </div>

        </div>
    );
}

export default Layout