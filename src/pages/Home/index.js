import AuthMiddleware from "~/middlewares/AuthMiddleware";

function Home() {
    AuthMiddleware();
    return <h2>Home page</h2>;
}

export default Home;