export default [
  // =========================================================================
  // HOME
  // =========================================================================

  {
    path: '/home',
    name: 'home',
    icon: 'mdi-home',
    group: 'top',
    public: true,
    show: true,
    reduce: true,
    parameters: [],
    role: ['default'],
  },

  // =========================================================================
  // ABOUT
  // =========================================================================

  {
    path: '/about',
    name: 'about',
    icon: 'mdi-information',
    group: 'top',
    public: true,
    show: true,
    reduce: false,
    parameters: [],
    role: ['default'],
  },

  // =========================================================================
  // DASHBOARD
  // =========================================================================

  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'mdi-monitor-dashboard',
    group: 'top',
    public: true,
    show: true,
    reduce: true,
    parameters: [],
    role: ['default'],
  },

  // =========================================================================
  // PROFILE
  // =========================================================================

  {
    path: '/profile',
    name: 'profile',
    icon: 'mdi-account',
    group: 'top',
    public: false,
    show: true,
    reduce: true,
    parameters: [],
    role: ['default'],
  },

  // =========================================================================
  // LOGIN
  // =========================================================================

  {
    path: '/login',
    name: 'login',
    icon: 'mdi-account-circle',
    group: 'bot',
    public: true,
    show: true,
    reduce: true,
    parameters: [],
    role: ['default'],
  },

  // =========================================================================
  // REGISTER
  // =========================================================================

  {
    path: '/register',
    name: 'register',
    icon: 'mdi-account-plus',
    group: 'bot',
    public: true,
    show: true,
    reduce: true,
    parameters: [],
    role: ['default'],
  },

  // =========================================================================
  // SETTINGS
  // =========================================================================

  {
    path: '/settings',
    name: 'settings',
    icon: 'mdi-cog',
    group: 'top',
    public: true,
    show: true,
    reduce: true,
    parameters: [],
    role: ['default'],
  },
]
