import Header from "../constants/header";
import Footer from "../constants/footer";
import Nopost from "../constants/nopost";
import Cards from "../constants/card";
import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import Axios from "axios";
function createcard(event) {
  <Cards
    url={event.image}
    title={event.title}
    type={event.type}
    content={event.content}
  />;
}

function Blogs() {
  const rowperpage = 8;
  const [post, setpost] = useState(false);
  const [inputs, setinputs] = useState([]);
  const [startindex, setstartindex] = useState(0);
  const [endindex, setendindex] = useState(rowperpage);
  const [noofpost, setnoofpost] = useState(0);
  let reqpostlen = 0;
  useEffect(() => {
    Axios.post("https://blog-website-3-1pha.onrender.com/blogs", {})
      .then((response) => {
        if (response.data.message) {
          setpost(false);
        } else {
          console.log("Posts Available");
          setinputs(response.data);
          setpost(true);
          setnoofpost(response.data.length);
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
  console.log(inputs);

  return (
    <div className="flex flex-col justify-center items-center bg-[#414141]">
      <Header />
      <h1 className="mt-6 text-4xl text-white font-custom font-bold">Blogs</h1>
      <div className="w-fit p-8 rounded-md m-10 bg-slate-200">
        {post ? (
          <div>
            <div className="grid sm:grid-cols-2  lg:grid-cols-3 gap-10 xl:grid-cols-4">
              {inputs.slice(startindex, endindex).map((post) => (
                <>
                  <Cards
                    key={post.id}
                    url={`/src/assets/${post.image}`}
                    title={post.title}
                    type={post.type}
                    content={post.content}
                  ></Cards>
                </>
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
          </div>
        ) : (
          <Nopost />
        )}
      </div>
      <Footer />
    </div>
  );
}
export default Blogs;
