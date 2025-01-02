import { Link } from "react-router-dom";
import { useMyContext } from "../pages/context";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logosticker.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatar from "@/assets/avatar.jpeg";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { List } from "lucide-react";
function Header() {
  const { islogin, setislogin } = useMyContext();
  const { user, setuser } = useMyContext();
  const navigate = useNavigate();
  console.log(islogin);

  function handleclick() {
    setislogin(false);
    setuser(null);
  }

  function navigation() {
    navigate("/profile");
  }
  return (
    <header className="bg-[#313131] h-20 m-0 w-full flex items-center  top-0">
      <nav className="w-full flex flex-row items-center justify-between">
        <div className="pl-2 flex flex-row justify-center items-center">
          <img src={Logo} className="h-12" alt="" />
          <h2 className="pl-1 font-bold text-yellow-300 text-lg">
            ThoughtStream.
          </h2>
        </div>
        <div className="flex flex-row mr-4 ">
          <ul className="flex flex-row gap-x-4 items-center pr-3 max-sm:invisible sm:invisible md:visible">
            <Link
              to="/"
              className="text-lg text-slate-100 font-semibold hover:text-yellow-300"
            >
              Home
            </Link>
            <Link
              to="/blogs"
              className="text-lg text-slate-100 font-semibold hover:text-yellow-300"
            >
              Blogs
            </Link>
            {islogin ? (
              <button
                className="rounded-md hover:bg-white/10 p-2"
                onClick={handleclick}
              >
                <Link
                  to="/signup"
                  className="text-lg text-slate-100 font-semibold"
                >
                  Sign out
                </Link>
              </button>
            ) : (
              <button
                className="rounded-md hover:bg-white/10 p-2"
                onClick={handleclick}
              >
                <Link to="/signup" className="text-lg font-semibold text-white">
                  Sign in
                </Link>
              </button>
            )}
            {islogin ? (
              <Avatar onClick={navigation}>
                <AvatarImage src={avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ) : (
              ""
            )}
          </ul>

          <Sheet>
            <SheetTrigger className="p-2 md:hidden">
              <List className="stroke-slate-200 h-8 w-8 fill-slate-200"/>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription className="flex flex-col justify-center items-center">
                  <div className="pl-2 flex flex-row justify-center items-center w-full h-24">
                    <img src={Logo} className="h-12" alt="" />
                    <h2 className="pl-1 font-bold text-yellow-300 text-lg">
                      ThoughtStream.
                    </h2>
                  </div>
                  <ul className="flex flex-col w-full bg-slate-600">
                    <Link
                      to="/"
                      className="text-base text-slate-100 font-semibold hover:bg-slate-700"
                    >
                      <div className="w-full border p-3">Home</div>
                    </Link>
                    <Link
                      to="/blogs"
                      className="text-base text-slate-100 font-semibold hover:bg-slate-700"
                    >
                      <div className="w-full border p-3">Blogs</div>
                    </Link>

                    {islogin ? (
                      <Link
                        to="/signup"
                        className="text-base text-slate-100 font-semibold  w-full"
                      >
                        <div className="w-full border p-3 hover:bg-slate-700">
                          Sign out
                        </div>
                      </Link>
                    ) : (
                      <Link
                        to="/signup"
                        className="text-base font-semibold text-white hover:bg-slate-700"
                      >
                        <div className="w-full border p-3">Sign in</div>
                      </Link>
                    )}

                    {islogin ? (
                      <Link
                        to="/profile"
                        className="text-base text-slate-100 font-semibold hover:bg-slate-700"
                      >
                        <div className="w-full border p-3"> Profile</div>
                      </Link>
                    ) : (
                      ""
                    )}
                  </ul>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

export default Header;
