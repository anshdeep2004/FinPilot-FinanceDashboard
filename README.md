
# FinPilot - Finance Dashboard

## Description

FinPilot is a comprehensive personal finance management web application built with React and Vite. It empowers users to track their income and expenses, visualize financial data through interactive graphs, gain insights into spending patterns, and manage transactions efficiently. The application features a clean, responsive design with dark and light mode support, ensuring a seamless user experience across devices.

The dashboard provides an overview of financial health, including balance tracking, monthly summaries, and category-wise expense breakdowns. Users can add, edit, and delete transactions, apply advanced filters for detailed analysis, and export data in CSV or JSON formats. Role-based access control (RBAC) ensures secure operations, while mock API integration simulates real-world data handling. The app gracefully handles scenarios with no data and includes settings for customization.

## Features

- **Dashboard Overview**: Displays current balance, monthly income/expense summaries, and interactive graphs for income vs. expenses.
- **Transaction Management**: Add, edit, delete, and view transactions with sorting by date and time.
- **Advanced Filtering and Grouping**: Filter transactions by search terms, category, type (income/expense), and month for targeted analysis.
- **Insights and Analytics**: Monthly insights with category-wise expense breakdowns and sentence-based insights for better understanding of financial patterns.
- **Export Functionality**: Export transaction data in CSV or JSON formats for external use.
- **Dark/Light Mode**: Toggle between themes for comfortable viewing in different environments.
- **Role-Based Access Control (RBAC)**: Admin and user roles with restricted permissions for secure operations.
- **Settings UI**: Customize currency, notifications, privacy settings, and data export options.
- **Mock API Integration**: Simulates backend interactions with local JSON data for development and testing.
- **Responsive Design**: Optimized for desktop and mobile devices using Tailwind CSS.
- **State Management**: Efficient local state handling with React hooks.
- **No Data Handling**: Graceful display of empty states with user-friendly messages.
- **Footer**: Provides additional navigation and information links.

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Charts**: Recharts
- **Linting**: ESLint
- **Package Manager**: npm

## Prerequisites

Before setting up the project, ensure you have the following installed on your system:

- **Node.js**: Version 16 or higher. Download from [nodejs.org](https://nodejs.org/).
- **npm**: Comes bundled with Node.js. Alternatively, you can use Yarn or pnpm.
- **Git**: For cloning the repository. Download from [git-scm.com](https://git-scm.com/).

To verify installations:
- Run `node --version` to check Node.js.
- Run `npm --version` to check npm.
- Run `git --version` to check Git.

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```
   git clone https://github.com/your-username/finpilot-finance-dashboard.git
   cd finpilot-finance-dashboard
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```
   This will install all required packages listed in `package.json`.

3. **Set Up Mock API** (Optional for full functionality):
   The application uses a mock API to simulate backend interactions. If you have a JSON server or similar tool, serve the `data/transactions.json` file on `http://localhost:3001/transactions`. For example, using `json-server`:
   ```
   npx json-server --watch data/transactions.json --port 3001
   ```
   If not set up, the app will handle API errors gracefully and use local state where possible.

## Usage

1. **Start the Development Server**:
   ```
   npm run dev
   ```
   This will start the Vite development server. Open your browser and navigate to `http://localhost:5173` (or the URL shown in the terminal).

2. **Navigate the Application**:
   - **Dashboard**: View your financial overview, add transactions, and see graphs.
   - **Transactions**: Manage and filter your transaction list, export data.
   - **Insights**: Analyze monthly spending with breakdowns and insights.
   - **Settings**: Customize preferences and export data.

3. **Role Simulation**:
   - By default, the app runs in "admin" mode. To simulate user role, open browser console and run:
     ```
     localStorage.setItem("role", "user");
     ```
     Reload the page. Admins can add/edit transactions; users have read-only access.

4. **Theme Toggle**:
   - Use the theme toggle in the header to switch between light and dark modes.

## Scripts

- `npm run dev`: Starts the development server with hot reloading.
- `npm run build`: Builds the project for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint to check for code quality issues.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

Ensure code follows the existing style and passes linting.
