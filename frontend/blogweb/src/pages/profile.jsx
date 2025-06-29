import { useState, useEffect, useRef } from "react";
import boy from "../assets/boy.png";
import { Link } from "react-router-dom";
import Nopost from "../constants/nopost";
import Axios from "axios";
import { useMyContext } from "./context";
import Cards from "../constants/card";
import { PlusIcon, CableCar  } from "lucide-react";
import { HomeIcon } from "@radix-ui/react-icons";
import { useNavigation } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Header from "@/constants/header";

function Profile() {
  const [post, setpost] = useState(false);
  const [inputs, setinputs] = useState([]);
  const [username, setusername] = useState("Unknown");
  const [email, setemail] = useState("Mr.Unknown@gmail.com");
  const { user } = useMyContext();
  const inputRef = useRef(null);
  const [preview, setpreview] = useState(null);
  const [noofpost, setnoofpost] = useState(0);
  const rowperpage = 8;
  const [endindex, setendindex] = useState(rowperpage);
  const [startindex, setstartindex] = useState(0);
  const navigate = useNavigation();
  let reqpostlen = 0;

  const handledp = () => {
    inputRef.current.click();
  };


  const handleimageupload = (e) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setpreview(url);
  };

  useEffect(() => {
    Axios.post("http://localhost:4000/profile", {
      user: user,
    })
      .then((response) => {
        if (response.data.message) {
          setpost(false);
        } else {
          console.log("Posts Available");
          setusername(response.data.username);
          setemail(response.data.email);
          setpost(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    Axios.post("http://localhost:4000/profile/posts", {
      user: user,
    })
      .then((response) => {
        if (response.data.message) {
          setpost(false);
        } else {
          console.log("Posts Available");
          console.log(response.data);
          setinputs(response.data.value);
          const value = response.data.value;
          const count = value.length;
          setnoofpost(count);
          console.log("no of post:" + count);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  {
    noofpost % 8 == 0
      ? (reqpostlen = noofpost)
      : (reqpostlen = noofpost - (noofpost % 8) + 8);
  }



  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#414141]">
      <Header>
      </Header>
      
      <h1
        key={inputs.id}
        className="text-7xl font-bold text-center mt-10 mb-10 font-custom text-slate-50"
      >
        Welcome <span>{username}</span>!
      </h1>
      <div className="w-full flex flex-col items-center justify-center">
        {preview == null ? (
          <img src={boy} className="h-60 w-60" />
        ) : (
          <img src={preview} className="h-60 rounded-full w-60 object-cover" />
        )}
        <div
          onClick={handledp}
          className="w-10 h-10 bg-orange-400 rounded-full relative bottom-10 left-16 flex items-center justify-center"
        >
          <input
            type="file"
            ref={inputRef}
            className="hidden"
            onChange={handleimageupload}
          />
          <PlusIcon />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="sm:w-11/12 md:w-8/12">
          <Table className="w-full">
            <TableCaption className="text-base font-semibold text-slate-100">
              A list of user information.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-base font-semibold text-slate-100">
                  Username
                </TableHead>
                <TableHead className="text-base font-semibold text-slate-100">
                  Emial
                </TableHead>
                <TableHead className="text-base font-semibold text-right text-slate-100">
                  Number of Posts
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-base font-semibold text-slate-100">
                  {username}
                </TableCell>
                <TableCell className="text-base font-semibold text-slate-100">
                  {email}
                </TableCell>
                <TableCell className="text-base font-semibold text-right text-slate-100">
                  {noofpost}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <button className="flex items-center p-1 rounded-lg  flex-row gap-2 mt-4 bg-slate-300/20">
          <PlusIcon className="border-2 border-orange-400 rounded-md stroke-slate-50 h-8 w-8" />
          <Link to="/new" className="pr-2 font-semibold text-white">
            Create Post
          </Link>
        </button>
        {post ? (
          <div className="flex items-center justify-center mb-4">
            <Accordion type="single" collapsible>
              <AccordionItem
                value="item-1"
                className="flex flex-col justify-center items-center"
              >
                <AccordionTrigger className="max-w-52 mt-4">
                  <CableCar className="bg-sky-200 h-10 w-10 p-2 rounded-full stroke-sky-900 mr-2 text-slate-100" />
                  Your Posts
                </AccordionTrigger>
                <AccordionContent className=" bg-slate-300 p-8 rounded-md">
                  <div className="grid sm:grid-cols-2  lg:grid-cols-3 gap-10 xl:grid-cols-4">
                    {inputs.slice(startindex, endindex).map((post) => (
                      <Cards
                        key={post.id}
                        url={`/src/assets/${post.image}`}
                        title={post.title}
                        type={post.type}
                        content={post.content}
                        client ={post.id}
                      ></Cards>
                      
                    ))}
                  </div>
                  <Pagination className="mt-4">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          className={
                            startindex == 0
                              ? "pointer-events-none opacity-50 font-semibold"
                              : ""
                          }
                          onClick={() => {
                            setstartindex(startindex - rowperpage);
                            setendindex(endindex - rowperpage);
                          }}
                        />
                      </PaginationItem>

                      <PaginationItem>
                        <PaginationNext
                          className={
                            endindex === reqpostlen
                              ? "pointer-events-none opacity-50 font-semibold"
                              : ""
                          }
                          onClick={() => {
                            setstartindex(startindex + rowperpage);
                            setendindex(endindex + rowperpage);
                          }}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ) : (
          <Nopost />
        )}
      </div>
    </div>
  );
}
export default Profile;
