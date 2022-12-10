import config from '~/config';

// Layouts
import NoLayout from '~/layouts/NoLayout';

// Pages
import Home from '~/pages/Home';
import Link from '~/pages/Link';
import Login from '~/pages/Login';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.links, component: Link },
    { path: config.routes.login, component: Login, layout: NoLayout },
    // { path: config.routes.about, component: About, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };