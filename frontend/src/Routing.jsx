import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid';
import Foodqty from './Foodqty'
import Menu from './Menu'
import Foodcat from './Foodcat'
import Dashboard from './Dashboard'
import caticon from './assets/caticon.png'
import { createSvgIcon } from '@mui/material/utils';
import menuicon from './assets/3073798.png'
import qtyicon from './assets/qtyicon.png'
import './Background.css'
import LogoutButton from './login/Logout';
import { createTheme } from '@mui/material/styles';

const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  'Home',
);

// Page Components
// const Dashboard = () => <div>Dashboard Content</div>;
// Navigation Config
const NAVIGATION = [
  { kind: 'header', title:<span className="nav-head">DIGIMENU ITEMS</span> },
  { kind: 'divider' },
  { segment: 'dashboard', title: <span className="nav-title">Dashboard</span>, icon: <HomeIcon color="primary" /> },
  { segment: 'menu', title: <span className="nav-title">Menu</span>, icon: <img src={menuicon} width="24" height="24" alt="menu Icon" /> },
  { segment: 'food_category', title: <span className="nav-title">Food Category</span>, icon: <img src={caticon} width="24" height="24" alt="category Icon" /> },
  { segment: 'food_quantity', title: <span className="nav-title">Food Quantity</span>, icon: <img src={qtyicon} width="24" height="24" alt="quantity Icon" /> },
];



// Theme Configuration
// const demoTheme = extendTheme({
//   colorSchemes: { dark: true, light:false },
//   colorSchemeSelector: 'class',
//   breakpoints: { values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 } },
//   components: {
//     MuiDrawer: {
//       styleOverrides: {
//         paper: {
//           backgroundColor: ' #36454F', // Change drawer background color
//         },
//       },
//     },
//   },
// });
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


// Custom Router Hook
function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);
  const router = React.useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path) => setPathname(String(path)),
  }), [pathname]);
  return router;
}

// Function to Render Components Dynamically
const getPageComponent = (pathname) => {
  switch (pathname) {
    case '/dashboard': return <Dashboard/>;
    case '/menu': return <Menu />;
    case '/food_category': return <Foodcat/> 
    case '/food_quantity': return <Foodqty/>   
    default: return <Dashboard />;
  }
};

export default function Routing(props) {
  const router = useDemoRouter('/dashboard'); // Default route
  return (
    <>
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={darkTheme}

      branding={{
        logo: <img src="https://cdn-icons-png.flaticon.com/512/1046/1046747.png" alt="digimenu logo" style={{ height: 38 }} />,
        title: 'DIGIMENU',
        homeUrl: '/toolpad/core/introduction',

      }}
    >
      {/* Logout floating in top-right */}
      <div style={{
        position: 'absolute',
        top: 14,
        right: 30,
        zIndex: 9999
      }}>
        <LogoutButton/>
      </div>

      <DashboardLayout>
        <PageContainer>
          <Grid container spacing={2}>
            <Grid item xs={12}>{getPageComponent(router.pathname)}</Grid>
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
     </>
  );
 
}
