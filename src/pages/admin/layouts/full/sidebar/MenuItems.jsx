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
  // {
  //   navlabel: true,
  //   subheader: 'Cài đặt hệ thống',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Typography',
  //   icon: IconTypography,
  //   href: '/Client-UI/admin-management/ui/typography',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Shadow',
  //   icon: IconCopy,
  //   href: '/Client-UI/admin-management/ui/shadow',
  // },
  {
    navlabel: true,
    subheader: 'Quản lý',
  },
  {
    id: uniqueId(),
    title: 'Tài khoản',
    icon: IconUsers,
    href: '/admin-management/sample-page',
  },
];

export default Menuitems;
