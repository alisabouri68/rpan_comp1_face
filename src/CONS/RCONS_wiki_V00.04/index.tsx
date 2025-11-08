import { Helmet } from "react-helmet-async";

function index() {
  return (
    <>
      <Helmet>
        <title>Wiki</title>
        <meta name="robots" content="noindex" />
      </Helmet>
    </>
  );
}

export default index;
