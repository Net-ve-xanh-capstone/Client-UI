import { Settings } from '@mui/icons-material';
import { IconLayoutDashboard, IconUsers } from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Trang chủ',
  },

  {
    id: uniqueId(),
    title: 'Thống kê',
    icon: IconLayoutDashboard,
    href: '/admin-management/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Quản lý',
  },
  {
    id: uniqueId(),
    title: 'Tài khoản',
    icon: IconUsers,
    href: '/admin-management/account',
  },
  {
    id: uniqueId(),
    title: 'tuỳ chỉnh',
    icon: Settings,
    href: '/admin-management/custom',
  },
];

export default Menuitems;
