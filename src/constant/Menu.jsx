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
                sub: 'Explore',
                links: '/explore',
                public: true,
            },
            {
                id: 2,
                sub: 'Live Auctions',
                links: '/live-auctions',
                public: true,
            },
        ],
    },
    {
        id: 3,
        name: 'Activity',
        links: '#',
        namesub: [
            {
                id: 1,
                sub: 'Activity 01',
                links: '/activity-01',
                public: true,
            },
            {
                id: 2,
                sub: 'Activity 02',
                links: '/activity-02',
                public: true,
            },
        ],
    },
    {
        id: 4,
        name: 'Community',
        links: '#',
        namesub: [
            {
                id: 1,
                sub: 'Blog',
                links: '/blog',
                public: true,
            },
            {
                id: 2,
                sub: 'Blog Details',
                links: '/blog-details',
                public: true,
            },
            {
                id: 3,
                sub: 'Help Center',
                links: '/help-center',
                public: true,
            },
        ],
    },
    {
        id: 5,
        name: 'Trang',
        links: '#',
        namesub: [
            {
                id: 1,
                sub: 'Authors 01',
                links: '/authors-01',
                public: false,
            },
            {
                id: 2,
                sub: 'nộp bài',
                links: '/submit',
                public: false,
                role: [Role.COMPETITOR],
            },
            {
                id: 3,
                sub: 'Edit Profile',
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
                id: 6,
                sub: 'Ranking',
                links: '/ranking',
                public: true,
            },
            {
                id: 7,
                sub: 'No Result',
                links: '/no-result',
                public: true,
            },
            {
                id: 8,
                sub: 'FAQ',
                links: '/faq',
                public: true,
            },
        ],
    },
    {
        id: 7,
        name: 'Contact',
        links: '/contact-01',
        namesub: [
            {
                id: 1,
                sub: 'Contact 1',
                links: '/contact-01',
                public: true,
            },
        ],
    },
];

export default menus;
