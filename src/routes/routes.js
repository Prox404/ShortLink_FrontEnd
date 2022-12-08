import config from '~/config';

// Layouts
// import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Link from '~/pages/Link';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.links, component: Link },
    // { path: config.routes.about, component: About, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };