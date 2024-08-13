import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconTypography,
} from '@tabler/icons';

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
    href: '/Client-UI/admin-management/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Cài đặt hệ thống',
  },
  {
    id: uniqueId(),
    title: 'Typography',
    icon: IconTypography,
    href: '/Client-UI/admin-management/ui/typography',
  },
  {
    id: uniqueId(),
    title: 'Shadow',
    icon: IconCopy,
    href: '/Client-UI/admin-management/ui/shadow',
  },
  {
    navlabel: true,
    subheader: 'Mở rộng',
  },
  {
    id: uniqueId(),
    title: 'Tiêu chí',
    icon: IconAperture,
    href: '/Client-UI/admin-management/sample-page',
  },
];

export default Menuitems;
