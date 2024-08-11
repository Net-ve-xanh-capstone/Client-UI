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
        links: '/',
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
        links: '/faq',
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
        links: '/blog',
        public: true,
      },
      {
        id: 2,
        sub: 'Chi tiết bài đọc',
        links: '/blog-details',
        public: true,
      },
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
        links: '/edit-profile',
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
        links: '/collection',
        public: true,
      },
      {
        id: 3,
        sub: 'Chấm thi',
        links: '/mark-report',
        public: false,
        role: [Role.EXAMINER],
      },
      {
        id: 4,
        sub: 'Không có kết quả',
        links: '/no-result',
        public: true,
      },
    ],
  },
  {
    id: 5,
    name: 'Liên hệ',
    links: '/contact',
    namesub: [
      {
        id: 1,
        sub: 'Liên hệ',
        links: '/contact',
        public: true,
      },
    ],
  },
];

export default menus;
