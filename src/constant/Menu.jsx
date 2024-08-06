import Role from './Role';

const menus = [
  {
    id: 1,
    name: 'Trang chủ',
    links: '#',
    namesub: [
      {
        id: 1,
        sub: 'Trang chủ',
        links: '/Client-UI/',
        public: true,
      },
    ],
  },
  {
    id: 2,
    name: 'Tìm hiểu',
    links: '#',
    namesub: [
      {
        id: 1,
        sub: 'Câu hỏi thường gặp',
        links: '/Client-UI/faq',
        public: true,
      },
    ],
  },
  {
    id: 3,
    name: 'Cộng đồng',
    links: '#',
    namesub: [
      {
        id: 1,
        sub: 'Bài đọc',
        links: '/Client-UI/blog',
        public: true,
      },
      // {
      //   id: 2,
      //   sub: 'Chi tiết bài đọc',
      //   links: '/Client-UI/blog-details',
      //   public: true,
      // },
    ],
  },
  {
    id: 4,
    name: 'Trang',
    links: '#',
    namesub: [
      {
        id: 1,
        sub: 'Chỉnh sửa thông tin',
        links: '/Client-UI/edit-profile',
        public: false,
        role: [
          Role.COMPETITOR,
          Role.ADMIN,
          Role.STAFF,
          Role.EXAMINER,
          Role.GUARDIAN,
        ],
      },
      {
        id: 2,
        sub: 'Bộ sưu tập',
        links: '/Client-UI/collection',
        public: true,
      },
    ],
  },
  {
    id: 5,
    name: 'Liên hệ',
    links: '/Client-UI/contact',
    namesub: [
      {
        id: 1,
        sub: 'Liên hệ',
        links: '/Client-UI/contact',
        public: true,
      },
    ],
  },
];

export default menus;
