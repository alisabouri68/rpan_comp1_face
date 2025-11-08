import { Helmet } from "react-helmet-async";

function index() {
  return (
    <>
      <Helmet>
        <title>HOT</title>
        <meta name="robots" content="noindex" />
      </Helmet>
    </>
  );
}

export default index;
