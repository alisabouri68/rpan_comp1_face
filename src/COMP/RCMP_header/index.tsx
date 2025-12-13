import { Add, FilterSearch, SearchNormal, TextBold } from "iconsax-react";

function Index(props: any) {
  const { title, setSerach, setCurrentPage, onAddClick } = props;

  return (
    <div className="bg-[#fbfcfd] mt-10 p-8 flex items-center justify-between">
      <span className=" ">{title}</span>
      <div className=" flex items-center justify-center gap-2">
        <div className="bg-white rounded-lg flex items-center px-4 py-1 cursor-pointer">
          <TextBold size={20} color="currentColor" />
          <span className="text-sm">Sort</span>
        </div>
        <div className="bg-white rounded-lg flex items-center px-4 py-1 cursor-pointer">
          <FilterSearch size={20} color="currentColor" />
          <span className="text-sm">Filter</span>
        </div>
        <div className="relative">
          <input
            type="text"
            onChange={(e) => {
              setSerach(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white border-0 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pe-10 p-1.5"
            placeholder="Search"
          />
          <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
            <SearchNormal
              size={24}
              color="currentColor"
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
            />
          </div>
        </div>
        <div
          onClick={onAddClick}
          className="bg-white rounded-lg flex items-center justify-center w-8 cursor-pointer border border-primery text-primery h-8"
        >
          <Add size={20} color="currentColor" />
        </div>
      </div>
    </div>
  );
}

export default Index;
