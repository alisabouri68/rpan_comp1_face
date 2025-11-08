import { Helmet } from "react-helmet-async";

function index() {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="w-full h-full border border-red-600 flex">
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      </div>
    </>
  );
}

export default index;
