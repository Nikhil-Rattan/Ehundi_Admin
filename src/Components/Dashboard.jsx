import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const Dashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                {/* Sidebar */}
                <nav className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        {/* Admin Dashboard Title */}
                        <a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 fw-bolder d-none d-sm-inline">Admin Dashboard</span>
                        </a>

                        {/* Sidebar toggle button only visible on small screens */}
                        <button
                            className="navbar-toggler d-md-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#sidebarMenu"
                            aria-controls="sidebarMenu"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {/* Sidebar Menu */}
                        <div className="collapse navbar-collapse w-100 d-md-block" id="sidebarMenu">
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link text-white px-0 align-middle">
                                        <i className="fs-4 bi-speedometer2"></i>
                                        <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/manage-user" className="nav-link px-0 align-middle text-white">
                                        <i className="fs-4 bi-people"></i>
                                        <span className="ms-1 d-none d-sm-inline">Manage Users</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/category" className="nav-link px-0 align-middle text-white">
                                        <i className="fs-4 bi-grid"></i>
                                        <span className="ms-1 d-none d-sm-inline">Category</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link px-0 align-middle text-white">
                                        <i className="fs-4 bi-person"></i>
                                        <span className="ms-1 d-none d-sm-inline">Profile</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link px-0 align-middle text-white">
                                        <i className="fs-4 bi-power"></i>
                                        <span className="ms-1 d-none d-sm-inline">Logout</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Main content area */}
                <div className="col p-0 m-0">
                    <div className='p-2 d-flex justify-content-between align-items-center shadow'>
                        <h4>Ehundi</h4>
                        <button
                            className="navbar-toggler d-md-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#sidebarMenu"
                            aria-controls="sidebarMenu"
                            aria-expanded="false"
                            aria-label="Toggle sidebar"
                        >
                            <i className="bi bi-list"></i>
                        </button>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
