document.write(`
<div class="main_header">

        <!--=============== Navbar ===============-->
        <header class="header">
            <div class="menu_icon" onclick="showSideBar()"></div>
            <div class="profile_icon"></div>
        </header>

        <!--=============== Sidebar ===============-->
        <aside class="sidebar hide_sidebar">
            <div class="sidebar-layout">
                <div class="sidebar-header">
                    <div class="close_sidebar" onclick="hideSideBar()"></div>
                    <div class="pro-sidebar-logo">
                        <div>Ei</div>
                        <h5>Easy Invoice</h5>
                    </div>
                </div>
                <div class="sidebar-content">
                    <nav class="menu open-current-submenu">
                        <ul>
                            <li class="menu-header">
                                <span> BILLING </span>
                            </li>
                            <li class="menu-item sub-menu">
                                <a href="#">
                                    <span class="menu-title">Create Invoices</span>
                                    <span class="menu-suffix">
                                        <span class="badge primary">Free</span>
                                    </span>
                                </a>
                            </li>
                            <li class="menu-item sub-menu">
                                <a href="#">
                                    <span class="menu-title">Generate Estimates</span>
                                </a>
                            </li>
                            <li class="menu-item sub-menu">
                                <a href="#">
                                    <span class="menu-title">Create Receipts</span>
                                </a>
                            </li>
                            <li class="menu-item sub-menu">
                                <a href="#">
                                    <span class="menu-title">Revenue Forecast</span>
                                </a>
                            </li>
                            <li class="menu-item sub-menu">
                                <a href="#">
                                    <span class="menu-title">Theme</span>
                                </a>
                            </li>
                            <li class="menu-header" style="padding-top: 20px">
                                <span> INVENTORY </span>
                            </li>
                            <li class="menu-item">
                                <a href="#">
                                    <span class="menu-title">SKU Generator</span>
                                    <span class="menu-suffix">
                                        <span class="badge secondary">Beta</span>
                                    </span>
                                </a>
                            </li>
                            <li class="menu-item">
                                <a href="#">
                                    <span class="menu-title">Purchase Order Generator</span>
                                </a>
                            </li>
                            <li class="menu-item">
                                <a href="#">
                                    <span class="menu-title">Calculate Reorder Point</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="sidebar-footer">
                    
                </div>
            </div>
        </aside>
        <div id="overlay" class="overlay"></div>
    </div>
`);