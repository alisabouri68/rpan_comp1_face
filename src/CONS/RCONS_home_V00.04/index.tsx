import { Helmet } from "react-helmet-async";
import { DynaMan } from "../../ACTR/RACT_dynaman_V00.04";
import { useEffect } from "react";

function index() {
 
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="w-9/12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm rounded-md"></div>
      <div className="w-3/12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm rounded-md"></div>
    </>
  );
}

export default index;
