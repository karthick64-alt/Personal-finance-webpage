# 💰 Personal Finance Website - FinanceHub

A comprehensive personal finance management website built with HTML, CSS, JavaScript, and Bootstrap 5.

## 🚀 Features

### 1️⃣ Landing / Home Page
- Hero section with tagline and CTA buttons
- Latest financial articles showcase
- Trending topics (Budgeting, Savings, Investing, Loans)
- Tools preview (EMI calculator, SIP calculator, Budget planner)
- Testimonials section

### 2️⃣ User Authentication
- **Login Page** (`login.html`) - Email/password and OTP login options
- **Signup Page** (`signup.html`) - User registration with validation
- **Profile Settings** (`profile.html`) - Manage personal information and password

### 3️⃣ Articles / Blog Module
- **Blog Listing** (`articles.html`) - Categorized articles with search
- Categories: Budgeting, Saving, Investments, Loans, Taxes, Insurance, Credit Cards
- **Article Detail** (`article-detail.html`) - Full article view with comments section

### 4️⃣ Finance Tools Module
- **Tools Page** (`tools.html`) with calculators:
  - EMI Calculator
  - SIP Calculator
  - Retirement Calculator
  - Income Tax Calculator
  - Emergency Fund Calculator
  - Loan Eligibility Calculator

### 5️⃣ Courses / Learning Module
- **Course Listing** (`courses.html`) - Browse available courses
- **Course Detail** (`course-detail.html`) - Course information and enrollment
- Courses include: Personal Finance Basics, Investment Course, Credit Score Improvement, Tax Planning, etc.

### 6️⃣ Investment & Savings Guides
- **Guides Page** (`guides.html`) - Comprehensive investment guides
- **Guide Detail** (`guide-detail.html`) - Detailed guide pages
- Topics: Mutual Funds, Stock Market, Fixed Deposits & RD, Crypto Basics
- Comparison charts for different investment options

### 7️⃣ Budgeting Module
- **Budget Planner** (`budget.html`) - Complete budget management
- Set monthly income
- Track expenses by category
- Visual charts and progress tracking
- Category breakdown analysis

### 8️⃣ Product Comparison Module
- **Comparison Page** (`comparison.html`) - Compare financial products
- Credit Cards comparison
- Loans comparison (Personal, Home, Car)
- Insurance plans comparison
- Mutual Funds comparison
- Filters and sorting options

### 9️⃣ User Dashboard
- **Dashboard** (`dashboard.html`) - Personal finance overview
- Budget summary
- Financial goals tracking
- Saved articles
- Investment planner
- Recent activity

### 🔟 Admin Panel
- **Admin Panel** (`admin.html`) - Content and user management
- Manage articles/blogs
- Manage tools & calculators
- User account management
- Finance categories & tags
- Analytics & reports
- Contact form submissions

### 1️⃣1️⃣ About / Info Pages
- **About Us** (`about.html`) - Company information and team
- **Contact Us** (`contact.html`) - Contact form and information
- **Terms & Conditions** (`terms.html`)
- **Privacy Policy** (`privacy.html`)
- **Disclaimer** (`disclaimer.html`)
- **FAQs** (`faq.html`) - Frequently asked questions

## 📁 Project Structure

```
Personal Finance/
├── index.html              # Landing/Home page
├── login.html              # User login
├── signup.html             # User registration
├── profile.html            # User profile settings
├── articles.html           # Blog/article listing
├── article-detail.html     # Individual article page
├── tools.html              # Financial calculators
├── courses.html            # Course listing
├── course-detail.html      # Course detail page
├── guides.html             # Investment guides
├── guide-detail.html       # Guide detail page
├── budget.html             # Budget planner
├── comparison.html         # Product comparison
├── dashboard.html          # User dashboard
├── admin.html              # Admin panel
├── about.html              # About us page
├── contact.html            # Contact page
├── faq.html               # FAQs page
├── terms.html             # Terms & Conditions
├── privacy.html           # Privacy Policy
├── disclaimer.html        # Disclaimer
├── README.md              # Project documentation
└── assets/
    ├── css/
    │   └── style.css      # Main stylesheet
    └── js/
        └── main.js        # Main JavaScript file
```

## 🛠️ Technologies Used

- **HTML5** - Structure and content
- **CSS3** - Styling and layout
- **JavaScript** - Interactivity and functionality
- **Bootstrap 5.3.0** - Responsive framework
- **Bootstrap Icons** - Icon library
- **Chart.js** - Charts and graphs (for budget module)

## 🎨 Features & Functionality

### Calculators
All calculators are fully functional:
- **EMI Calculator**: Calculate monthly EMI for loans
- **SIP Calculator**: Calculate SIP returns
- **Retirement Calculator**: Plan retirement corpus
- **Tax Calculator**: Calculate income tax
- **Emergency Fund Calculator**: Determine emergency fund needs
- **Loan Eligibility Calculator**: Check loan eligibility

### Budget Management
- Set monthly income
- Add expenses by category
- Track spending with visual charts
- Category-wise breakdown
- Progress tracking
- Data persistence using localStorage

### User Features
- User registration and login
- OTP-based login
- Profile management
- Dashboard with financial overview
- Save articles
- Track financial goals

## 🚀 Getting Started

1. **Clone or download** the project files
2. **Open** `index.html` in a web browser
3. **No build process required** - works directly in the browser

### Local Development
Simply open the HTML files in your browser. For better development experience, use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📝 Notes

- **Data Storage**: The application uses `localStorage` for client-side data persistence
- **Authentication**: Currently uses localStorage for demo purposes (not secure for production)
- **Responsive Design**: Fully responsive and works on all devices
- **Browser Support**: Works on all modern browsers (Chrome, Firefox, Safari, Edge)

## 🔒 Security Considerations

For production use, you should:
- Implement proper backend authentication
- Use secure session management
- Add CSRF protection
- Implement proper data validation
- Use HTTPS
- Add rate limiting
- Implement proper password hashing

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones

## 🎯 Future Enhancements

Potential features to add:
- Backend API integration
- Database integration
- Payment gateway integration (for premium features)
- Email notifications
- Advanced analytics
- Social media integration
- Mobile app version

## 📄 License

This project is created for educational purposes.

## 👥 Support

For questions or support, please use the contact form on the website or refer to the FAQs page.

---

**Built with ❤️ using HTML, CSS, JavaScript, and Bootstrap 5**



