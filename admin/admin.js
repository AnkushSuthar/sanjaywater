/* ==============================
   SANJAY WATER ADMIN DASHBOARD
================================ */


/* ==============================
   ADMIN LOGIN
================================ */

const ADMIN_NAME = "Sanjay Singh";
const ADMIN_PASSWORD = "748525";

const loginScreen = document.getElementById("loginScreen");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");


// Check previous login
if (sessionStorage.getItem("sanjayAdminLoggedIn") === "true") {
    loginScreen.classList.add("hidden");
}


// Login
loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("adminName").value.trim();
    const password = document.getElementById("adminPassword").value;

    if (name === ADMIN_NAME && password === ADMIN_PASSWORD) {

        sessionStorage.setItem(
            "sanjayAdminLoggedIn",
            "true"
        );

        loginScreen.classList.add("hidden");

        loginError.textContent = "";

    } else {

        loginError.textContent =
            "❌ Admin name या password गलत है।";

    }

});



/* Demo Orders
   Later these will come from database
*/

let orders = [

    {
        id: "SW1001",
        name: "Rahul Kumar",
        mobile: "9876543210",
        address: "Main Road, Dangra",
        bottle: "20 Litre",
        quantity: 2,
        date: "23 Aug 2026",
        status: "Pending",
        amount: 160
    },

    {
        id: "SW1002",
        name: "Amit Suthar",
        mobile: "8765432109",
        address: "Bus Stand, Dangra",
        bottle: "10 Litre",
        quantity: 3,
        date: "23 Aug 2026",
        status: "Confirmed",
        amount: 180
    },

    {
        id: "SW1003",
        name: "Ramesh Kumar",
        mobile: "9988776655",
        address: "Station Road",
        bottle: "20 Litre",
        quantity: 1,
        date: "22 Aug 2026",
        status: "Delivered",
        amount: 80
    },

    {
        id: "SW1004",
        name: "Mohan Lal",
        mobile: "9090909090",
        address: "Market Area",
        bottle: "5 Litre",
        quantity: 4,
        date: "22 Aug 2026",
        status: "Cancelled",
        amount: 160
    }

];


let currentFilter = "all";


/* ==============================
   PAGE NAVIGATION
================================ */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {

    link.addEventListener("click", function(e) {

        e.preventDefault();

        const section = this.dataset.section;

        showSection(section);

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

        document.getElementById("sidebar").classList.remove("open");

    });

});


function showSection(sectionName) {

    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.remove("active");
    });

    const selected = document.getElementById(sectionName);

    if (selected) {
        selected.classList.add("active");
    }

    const titles = {
        dashboard: "Dashboard",
        orders: "Orders",
        customers: "Customers",
        products: "Products",
        settings: "Settings"
    };

    document.getElementById("pageTitle").textContent =
        titles[sectionName] || "Dashboard";

}


/* ==============================
   MOBILE MENU
================================ */

document.getElementById("menuBtn").addEventListener("click", () => {

    document.getElementById("sidebar").classList.toggle("open");

});


/* ==============================
   DASHBOARD STATS
================================ */

function updateStats() {

    const total = orders.length;

    const pending = orders.filter(
        order => order.status === "Pending"
    ).length;

    const delivered = orders.filter(
        order => order.status === "Delivered"
    ).length;

    const cancelled = orders.filter(
        order => order.status === "Cancelled"
    ).length;

    const revenue = orders
        .filter(order => order.status !== "Cancelled")
        .reduce((total, order) => total + order.amount, 0);


    document.getElementById("totalOrders").textContent = total;

    document.getElementById("pendingOrders").textContent = pending;

    document.getElementById("deliveredOrders").textContent = delivered;

    document.getElementById("cancelledOrders").textContent = cancelled;

    document.getElementById("totalRevenue").textContent =
        "₹" + revenue.toLocaleString("en-IN");

}


/* ==============================
   STATUS HTML
================================ */

function statusHTML(status) {

    return `
        <span class="status ${status}">
            ${status}
        </span>
    `;

}


/* ==============================
   RECENT ORDERS
================================ */

function renderRecentOrders() {

    const table = document.getElementById("recentOrdersTable");

    table.innerHTML = "";

    const recent = orders.slice(0, 5);

    recent.forEach(order => {

        table.innerHTML += `

            <tr>

                <td><strong>${order.id}</strong></td>

                <td>${order.name}</td>

                <td>${order.mobile}</td>

                <td>${order.bottle}</td>

                <td>${order.quantity}</td>

                <td>
                    ${statusHTML(order.status)}
                </td>

            </tr>

        `;

    });

}


/* ==============================
   ALL ORDERS
================================ */

function renderOrders() {

    const table = document.getElementById("ordersTable");

    table.innerHTML = "";

    let filteredOrders = orders;


    if (currentFilter !== "all") {

        filteredOrders = orders.filter(
            order => order.status === currentFilter
        );

    }


    const search =
        document.getElementById("searchInput").value
        .toLowerCase()
        .trim();


    if (search) {

        filteredOrders = filteredOrders.filter(order =>

            order.name.toLowerCase().includes(search) ||

            order.mobile.includes(search) ||

            order.id.toLowerCase().includes(search)

        );

    }


    if (filteredOrders.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="9" style="text-align:center;padding:30px;">
                    No orders found
                </td>
            </tr>
        `;

        return;
    }


    filteredOrders.forEach(order => {

        table.innerHTML += `

            <tr>

                <td>
                    <strong>${order.id}</strong>
                </td>

                <td>${order.name}</td>

                <td>${order.mobile}</td>

                <td>${order.address}</td>

                <td>${order.bottle}</td>

                <td>${order.quantity}</td>

                <td>${order.date}</td>

                <td>

                    <select
                        onchange="changeStatus('${order.id}', this.value)"
                        class="status-select"
                    >

                        <option value="Pending"
                            ${order.status === "Pending" ? "selected" : ""}>
                            Pending
                        </option>

                        <option value="Confirmed"
                            ${order.status === "Confirmed" ? "selected" : ""}>
                            Confirmed
                        </option>

                        <option value="Delivered"
                            ${order.status === "Delivered" ? "selected" : ""}>
                            Delivered
                        </option>

                        <option value="Cancelled"
                            ${order.status === "Cancelled" ? "selected" : ""}>
                            Cancelled
                        </option>

                    </select>

                </td>

                <td>

                    <button
                        class="action-btn"
                        onclick="viewOrder('${order.id}')"
                    >
                        View
                    </button>

                </td>

            </tr>

        `;

    });

}


/* ==============================
   CHANGE ORDER STATUS
================================ */

function changeStatus(id, status) {

    const order = orders.find(order => order.id === id);

    if (!order) return;

    order.status = status;

    updateStats();

    renderOrders();

    renderRecentOrders();

}


/* ==============================
   SEARCH
================================ */

document.getElementById("searchInput")
    .addEventListener("input", renderOrders);


/* ==============================
   FILTER
================================ */

document.querySelectorAll(".filter-btn")
    .forEach(button => {

        button.addEventListener("click", function() {

            document.querySelectorAll(".filter-btn")
                .forEach(btn => btn.classList.remove("active"));

            this.classList.add("active");

            currentFilter = this.dataset.filter;

            renderOrders();

        });

    });


/* ==============================
   ORDER DETAILS
================================ */

function viewOrder(id) {

    const order = orders.find(order => order.id === id);

    if (!order) return;

    document.getElementById("orderDetails").innerHTML = `

        <div class="order-detail">

            <p><strong>Order ID:</strong> ${order.id}</p>

            <p><strong>Customer:</strong> ${order.name}</p>

            <p><strong>Mobile:</strong> ${order.mobile}</p>

            <p><strong>Address:</strong> ${order.address}</p>

            <p><strong>Bottle:</strong> ${order.bottle}</p>

            <p><strong>Quantity:</strong> ${order.quantity}</p>

            <p><strong>Date:</strong> ${order.date}</p>

            <p><strong>Amount:</strong> ₹${order.amount}</p>

            <p>
                <strong>Status:</strong>
                ${statusHTML(order.status)}
            </p>

        </div>

    `;

    document.getElementById("orderModal")
        .classList.add("show");

}


function closeModal() {

    document.getElementById("orderModal")
        .classList.remove("show");

}


/* ==============================
   CUSTOMERS
================================ */

function renderCustomers() {

    const grid = document.getElementById("customerGrid");

    grid.innerHTML = "";

    const uniqueCustomers = [];

    orders.forEach(order => {

        const exists = uniqueCustomers.find(
            customer => customer.mobile === order.mobile
        );

        if (!exists) {
            uniqueCustomers.push(order);
        }

    });


    uniqueCustomers.forEach(customer => {

        grid.innerHTML += `

            <div class="customer-card">

                <h3>${customer.name}</h3>

                <p>📱 ${customer.mobile}</p>

                <p>📍 ${customer.address}</p>

            </div>

        `;

    });

}


/* ==============================
   INITIALIZE
================================ */

updateStats();

renderRecentOrders();

renderOrders();

renderCustomers();