import config from '~/config';

// Layouts
import NoLayout from '~/layouts/NoLayout';
import AuthLayout from '~/layouts/AuthLayout';

// Pages
import Home from '~/pages/Home';
import Link from '~/pages/Link';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import GetLink from '~/pages/GetLink/GetLink';
import Contact from '~/pages/Contact';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.links, component: Link },
    { path: config.routes.login, component: Login, layout: AuthLayout },
    { path: config.routes.register, component: Register, layout: AuthLayout },
    { path: config.routes.getLink, component: GetLink , layout: NoLayout},
    { path: config.routes.contact, component: Contact },
    // { path: config.routes.about, component: About, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };