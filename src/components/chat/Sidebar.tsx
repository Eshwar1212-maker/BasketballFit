import { Search } from "./Search";

export const Sidebar = ({
  close,
  closeNav,
}: {
  close: any;
  closeNav: () => void;
}) => {
  return (
    <div className="w-[10%] xs:flex-col md:w-1/3 bg-slate-200 rounded-xl h-[100vh] text-black text-xl">
      <h1 className="text-3xl">Find users...</h1>
      <Search />
    </div>
  );
};
