import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CategoryIcon from '@mui/icons-material/Category';
import Link from "next/link";

import { usePathname } from "next/navigation";

export default function MobileBottomNavigation() {
  const pathname = usePathname();

  return (
    <BottomNavigation
      value={pathname}
      className="fixed bottom-0 left-0 right-0"
      showLabels
    >
      <BottomNavigationAction
        component={Link}
        value="/"
        href="/"
        label="Home"
        icon={<HomeIcon />}
      />

      <BottomNavigationAction
        component={Link}
        value="/expenses"
        href="/expenses"
        label="Expenses"
        icon={<ShoppingBasketIcon />}
      />

      <BottomNavigationAction
        component={Link}
        value="/categories"
        href="/categories"
        label="Categories"
        icon={<CategoryIcon />}
      />
    </BottomNavigation>
  );
}
