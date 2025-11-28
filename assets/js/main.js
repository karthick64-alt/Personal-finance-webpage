// Main JavaScript file for Personal Finance Hub

// Initialize tooltips and popovers
document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation item based on current page
    function setActiveNavItem() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
        
        // Page mapping for navigation highlighting
        const pageMap = {
            'index.html': 'index.html',
            'articles.html': 'articles.html',
            'article-detail.html': 'articles.html',
            'tools.html': 'tools.html',
            'courses.html': 'courses.html',
            'course-detail.html': 'courses.html',
            'guides.html': 'guides.html',
            'guide-detail.html': 'guides.html',
            'comparison.html': 'comparison.html',
            'budget.html': 'budget.html',
            'dashboard.html': 'dashboard.html',
            'profile.html': 'profile.html',
            'about.html': 'about.html',
            'contact.html': 'contact.html',
            'faq.html': 'faq.html',
            'terms.html': 'terms.html',
            'privacy.html': 'privacy.html',
            'disclaimer.html': 'disclaimer.html',
            'login.html': null, // Don't highlight Account for login
            'signup.html': null // Don't highlight Account for signup
        };
        
        const targetPage = pageMap[currentPage];
        
        if (targetPage) {
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href) {
                    link.classList.remove('active');
                    // Check if href matches targetPage (exact match or contains)
                    if (href === targetPage || href.includes(targetPage.split('.')[0])) {
                        link.classList.add('active');
                    }
                }
            });
        } else {
            // Remove active class from all nav links if page doesn't match
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
        }
    }
    
    // Call function to set active nav item
    setActiveNavItem();
    
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize Bootstrap popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Show toast notifications
    window.showToast = function(message, type = 'info') {
        const toastContainer = document.querySelector('.toast-container') || createToastContainer();
        const toast = createToast(message, type);
        toastContainer.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        toast.addEventListener('hidden.bs.toast', function() {
            toast.remove();
        });
    };

    function createToastContainer() {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }

    function createToast(message, type) {
        const toast = document.createElement('div');
        toast.className = 'toast align-items-center text-white bg-' + type + ' border-0';
        toast.setAttribute('role', 'alert');
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        return toast;
    }

    // Format currency
    window.formatCurrency = function(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Format number with commas
    window.formatNumber = function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Check if user is logged in (localStorage check)
    window.isLoggedIn = function() {
        return localStorage.getItem('user') !== null;
    };

    // Get current user
    window.getCurrentUser = function() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    };

    // Logout function
    window.logout = function() {
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    };

    // Update navbar based on login status
    function updateNavbar() {
        const dropdownToggle = document.querySelector('#navbarDropdown');
        if (!dropdownToggle) return; // Skip if navbar structure is different (like dashboard.html or profile.html)
        
        const dropdownMenu = dropdownToggle.closest('.dropdown')?.querySelector('.dropdown-menu');
        const isLoggedIn = window.isLoggedIn();
        const user = window.getCurrentUser();

        if (!dropdownMenu) return; // Skip if dropdown menu not found

        if (isLoggedIn && user) {
            // User is logged in - show Dashboard, Profile, Logout
            dropdownMenu.innerHTML = `
                <li><a class="dropdown-item" href="dashboard.html">Dashboard</a></li>
                <li><a class="dropdown-item" href="profile.html">Profile Settings</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
            `;
            
            // Update dropdown toggle to show user info
            if (dropdownToggle) {
                const userName = user.name || 'User';
                const userEmail = user.email || '';
                const avatarName = userName.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
                dropdownToggle.innerHTML = `
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&size=32&background=fff&color=0d6efd&bold=true" alt="${userName}" class="rounded-circle me-2" style="width: 32px; height: 32px; object-fit: cover;">
                    <span>${userName}</span>
                `;
                dropdownToggle.classList.add('d-flex', 'align-items-center');
            }
        } else {
            // User is not logged in - show Login and Sign Up only (hide Dashboard)
            dropdownMenu.innerHTML = `
                <li><a class="dropdown-item" href="login.html">Login</a></li>
                <li><a class="dropdown-item" href="signup.html">Sign Up</a></li>
            `;
            
            // Reset dropdown toggle to show "Account"
            if (dropdownToggle) {
                dropdownToggle.innerHTML = 'Account';
                dropdownToggle.classList.remove('d-flex', 'align-items-center');
            }
        }
    }

    // Call updateNavbar on page load
    updateNavbar();

    // Protect routes that require authentication
    const protectedRoutes = ['dashboard.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedRoutes.includes(currentPage) && !isLoggedIn()) {
        window.location.href = 'login.html';
    }
});

// EMI Calculator
function calculateEMI() {
    const principal = parseFloat(document.getElementById('emi-principal').value) || 0;
    const rate = parseFloat(document.getElementById('emi-rate').value) || 0;
    const tenure = parseFloat(document.getElementById('emi-tenure').value) || 0;

    if (principal <= 0 || rate <= 0 || tenure <= 0) {
        showToast('Please enter valid values', 'danger');
        return;
    }

    const monthlyRate = rate / 12 / 100;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1);
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - principal;

    document.getElementById('emi-result').innerHTML = `
        <h4>₹${formatNumber(emi.toFixed(2))}</h4>
        <p class="mb-2">Monthly EMI</p>
        <hr>
        <div class="row text-start mt-3">
            <div class="col-6">
                <strong>Principal Amount:</strong><br>
                ₹${formatNumber(principal.toFixed(2))}
            </div>
            <div class="col-6">
                <strong>Total Interest:</strong><br>
                ₹${formatNumber(totalInterest.toFixed(2))}
            </div>
            <div class="col-12 mt-2">
                <strong>Total Amount:</strong><br>
                ₹${formatNumber(totalAmount.toFixed(2))}
            </div>
        </div>
    `;
    document.getElementById('emi-result').style.display = 'block';
}

// SIP Calculator
function calculateSIP() {
    const monthlyAmount = parseFloat(document.getElementById('sip-amount').value) || 0;
    const rate = parseFloat(document.getElementById('sip-rate').value) || 0;
    const tenure = parseFloat(document.getElementById('sip-tenure').value) || 0;

    if (monthlyAmount <= 0 || rate <= 0 || tenure <= 0) {
        showToast('Please enter valid values', 'danger');
        return;
    }

    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    const futureValue = monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvested = monthlyAmount * months;
    const returns = futureValue - totalInvested;

    document.getElementById('sip-result').innerHTML = `
        <h4>₹${formatNumber(futureValue.toFixed(2))}</h4>
        <p class="mb-2">Estimated Returns</p>
        <hr>
        <div class="row text-start mt-3">
            <div class="col-6">
                <strong>Total Invested:</strong><br>
                ₹${formatNumber(totalInvested.toFixed(2))}
            </div>
            <div class="col-6">
                <strong>Wealth Gain:</strong><br>
                ₹${formatNumber(returns.toFixed(2))}
            </div>
        </div>
    `;
    document.getElementById('sip-result').style.display = 'block';
}

// Retirement Calculator
function calculateRetirement() {
    const currentAge = parseFloat(document.getElementById('ret-current-age').value) || 0;
    const retirementAge = parseFloat(document.getElementById('ret-retirement-age').value) || 0;
    const currentSavings = parseFloat(document.getElementById('ret-current-savings').value) || 0;
    const monthlyContribution = parseFloat(document.getElementById('ret-monthly-contribution').value) || 0;
    const expectedReturn = parseFloat(document.getElementById('ret-expected-return').value) || 0;
    const inflation = parseFloat(document.getElementById('ret-inflation').value) || 0;

    if (currentAge <= 0 || retirementAge <= currentAge) {
        showToast('Please enter valid age values', 'danger');
        return;
    }

    const yearsToRetirement = retirementAge - currentAge;
    const monthlyRate = expectedReturn / 12 / 100;
    const months = yearsToRetirement * 12;

    // Future value of current savings
    const fvCurrentSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement);
    
    // Future value of monthly contributions
    const fvContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    const totalCorpus = fvCurrentSavings + fvContributions;
    const realValue = totalCorpus / Math.pow(1 + inflation / 100, yearsToRetirement);

    document.getElementById('retirement-result').innerHTML = `
        <h4>₹${formatNumber(totalCorpus.toFixed(2))}</h4>
        <p class="mb-2">Retirement Corpus</p>
        <hr>
        <div class="row text-start mt-3">
            <div class="col-12">
                <strong>Real Value (adjusted for inflation):</strong><br>
                ₹${formatNumber(realValue.toFixed(2))}
            </div>
        </div>
    `;
    document.getElementById('retirement-result').style.display = 'block';
}

// Tax Calculator
function calculateTax() {
    const income = parseFloat(document.getElementById('tax-income').value) || 0;
    const deductions = parseFloat(document.getElementById('tax-deductions').value) || 0;

    if (income <= 0) {
        showToast('Please enter valid income', 'danger');
        return;
    }

    const taxableIncome = Math.max(0, income - deductions - 50000); // Standard deduction
    
    let tax = 0;
    if (taxableIncome <= 250000) {
        tax = 0;
    } else if (taxableIncome <= 500000) {
        tax = (taxableIncome - 250000) * 0.05;
    } else if (taxableIncome <= 1000000) {
        tax = 12500 + (taxableIncome - 500000) * 0.20;
    } else {
        tax = 112500 + (taxableIncome - 1000000) * 0.30;
    }

    const cess = tax * 0.04;
    const totalTax = tax + cess;
    const netIncome = income - totalTax;

    document.getElementById('tax-result').innerHTML = `
        <h4>₹${formatNumber(totalTax.toFixed(2))}</h4>
        <p class="mb-2">Total Tax Liability</p>
        <hr>
        <div class="row text-start mt-3">
            <div class="col-6">
                <strong>Tax:</strong><br>
                ₹${formatNumber(tax.toFixed(2))}
            </div>
            <div class="col-6">
                <strong>Cess (4%):</strong><br>
                ₹${formatNumber(cess.toFixed(2))}
            </div>
            <div class="col-12 mt-2">
                <strong>Net Income:</strong><br>
                ₹${formatNumber(netIncome.toFixed(2))}
            </div>
        </div>
    `;
    document.getElementById('tax-result').style.display = 'block';
}

// Emergency Fund Calculator
function calculateEmergencyFund() {
    const monthlyExpenses = parseFloat(document.getElementById('ef-monthly-expenses').value) || 0;
    const months = parseFloat(document.getElementById('ef-months').value) || 6;

    if (monthlyExpenses <= 0) {
        showToast('Please enter valid monthly expenses', 'danger');
        return;
    }

    const emergencyFund = monthlyExpenses * months;

    document.getElementById('emergency-result').innerHTML = `
        <h4>₹${formatNumber(emergencyFund.toFixed(2))}</h4>
        <p class="mb-2">Recommended Emergency Fund</p>
        <hr>
        <div class="row text-start mt-3">
            <div class="col-12">
                <strong>This covers ${months} months of expenses</strong>
            </div>
        </div>
    `;
    document.getElementById('emergency-result').style.display = 'block';
}

// Budget Management
let budgetData = JSON.parse(localStorage.getItem('budgetData')) || {
    income: 0,
    expenses: [],
    categories: ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Other']
};

function saveBudgetData() {
    localStorage.setItem('budgetData', JSON.stringify(budgetData));
}

function addExpense() {
    const category = document.getElementById('expense-category').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const description = document.getElementById('expense-description').value;

    if (!category || !amount || amount <= 0) {
        showToast('Please fill all fields correctly', 'danger');
        return;
    }

    budgetData.expenses.push({
        id: Date.now(),
        category,
        amount,
        description,
        date: new Date().toISOString().split('T')[0]
    });

    saveBudgetData();
    updateBudgetDisplay();
    document.getElementById('expense-form').reset();
    showToast('Expense added successfully', 'success');
}

function deleteExpense(id) {
    budgetData.expenses = budgetData.expenses.filter(exp => exp.id !== id);
    saveBudgetData();
    updateBudgetDisplay();
    showToast('Expense deleted', 'success');
}

function updateBudgetDisplay() {
    const totalExpenses = budgetData.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const remaining = budgetData.income - totalExpenses;
    const percentage = budgetData.income > 0 ? (totalExpenses / budgetData.income) * 100 : 0;

    document.getElementById('total-income').textContent = formatCurrency(budgetData.income);
    document.getElementById('total-expenses').textContent = formatCurrency(totalExpenses);
    document.getElementById('remaining-budget').textContent = formatCurrency(remaining);
    
    const progressBar = document.getElementById('budget-progress-bar');
    if (progressBar) {
        progressBar.style.width = Math.min(percentage, 100) + '%';
        progressBar.className = 'budget-progress-bar ' + (percentage > 80 ? 'bg-danger' : percentage > 60 ? 'bg-warning' : 'bg-success');
        progressBar.textContent = percentage.toFixed(1) + '%';
    }

    // Update expense list
    const expenseList = document.getElementById('expense-list');
    if (expenseList) {
        expenseList.innerHTML = budgetData.expenses.map(exp => `
            <tr>
                <td>${exp.category}</td>
                <td>${exp.description}</td>
                <td>${formatCurrency(exp.amount)}</td>
                <td>${exp.date}</td>
                <td><button class="btn btn-sm btn-danger" onclick="deleteExpense(${exp.id})">Delete</button></td>
            </tr>
        `).join('');
    }

    // Update category breakdown
    updateCategoryBreakdown();
}

function updateCategoryBreakdown() {
    const categoryTotals = {};
    budgetData.expenses.forEach(exp => {
        categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    });

    const breakdownDiv = document.getElementById('category-breakdown');
    if (breakdownDiv) {
        breakdownDiv.innerHTML = Object.entries(categoryTotals).map(([cat, amount]) => `
            <div class="mb-2">
                <div class="d-flex justify-content-between">
                    <span>${cat}</span>
                    <span>${formatCurrency(amount)}</span>
                </div>
                <div class="progress" style="height: 8px;">
                    <div class="progress-bar" role="progressbar" style="width: ${(amount / budgetData.income) * 100}%"></div>
                </div>
            </div>
        `).join('');
    }
}

function setIncome() {
    const income = parseFloat(document.getElementById('monthly-income').value);
    if (income > 0) {
        budgetData.income = income;
        saveBudgetData();
        updateBudgetDisplay();
        showToast('Income updated', 'success');
    }
}

// Initialize budget display on page load
if (document.getElementById('budget-progress-bar')) {
    updateBudgetDisplay();
}

