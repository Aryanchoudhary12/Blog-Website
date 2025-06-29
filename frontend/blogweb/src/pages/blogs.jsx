import Header from "../constants/header";
import Footer from "../constants/footer";
import Nopost from "../constants/nopost";
import Cards from "../constants/card2";
import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
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
  const [filterType, setFilterType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");


  let reqpostlen = 0;
  useEffect(() => {
    Axios.post("http://localhost:4000/blogs", {})
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
  const filteredBlogs = inputs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "All" || blog.type === filterType;
    return matchesSearch &&  matchesFilter;
  });
  return (
    <div className="flex flex-col justify-center items-center bg-[#414141]">
      <Header />
      <h1 className="mt-6 text-4xl text-white font-custom font-bold pb-6">Blogs</h1>
      
        <div className="flex flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="bg-[#414141] text-white rounded-md p-2 w-full border-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="bg-[#414141] text-white rounded-md  border-2 p-2 w-full  "
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Travels">Travels</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="Politics">Politics</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div className="w-fit p-8 rounded-md m-10 bg-slate-200">
        {filteredBlogs.length > 0 ? (
          
          <div>
            <div className="grid sm:grid-cols-2  lg:grid-cols-3 gap-10 xl:grid-cols-4">
              {filteredBlogs.slice(startindex, endindex).map((post) => (
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
