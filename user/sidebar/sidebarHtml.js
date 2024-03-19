document.write(`
<div class="main_header">

        <!--=============== Navbar ===============-->
        <header class="header">
            <div class="menu_and_site_logo">
                <div class="menu_icon" onclick="showSideBar()"></div>
                <div class="pro-sidebar-logo">
                    <img src="/global/files/logoDark.png" alt="">
                </div>
            </div>
            <div class="profile_icon">
                <a href="/auth/signIn"><span class="material-symbols-rounded"> account_circle </span></a>
            </div>
        </header>

        <!--=============== Sidebar ===============-->
        <aside class="sidebar hide_sidebar">
            <div class="closeSideBar" onclick="hideSideBar()"></div>
            <div class="sidebar-layout">
                <div class="sidebar-header">
                    <div class="close_sidebar_icon" onclick="hideSideBar()"></div>
                    <div class="pro-sidebar-logo">
                        <img src="/global/files/logoLight.png" alt="">
                    </div>
                </div>
                <div class="sidebar-content">
                    <nav class="menu open-current-submenu">
                        <ul>
                            <li class="menu-header">
                                <span> BILLING </span>
                            </li>
                            <li class="menu-item sub-menu">
                                <a href="/user/createInvoice">
                                    <span class="menu-title">Create Invoices</span>
                                    <span class="menu-suffix">
                                        <span class="badge primary">Free</span>
                                    </span>
                                </a>
                            </li>
                            <li class="menu-item sub-menu">
                                <a href="/user/generateQrCode">
                                    <span class="menu-title">Generate QR Code</span>
                                    <span class="menu-suffix">
                                        <span class="badge primary">Free</span>
                                    </span>
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