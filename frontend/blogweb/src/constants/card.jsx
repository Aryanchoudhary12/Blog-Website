import { Button } from "@/components/ui/button";
import { ListCheck } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import Swal from "sweetalert2";
function Cards(props) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/new?id=${props.client}`); // Pass the ID as a query parameter
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the blog post.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:4000/blogs/${props.client}`)
          .then(() => {
            Swal.fire("Deleted!", "The blog post has been deleted.", "success");
            if (props.onDelete) {
              props.onDelete(props.client); 
            }
            navigate(0);
          })
          .catch((error) => {
            console.error("Error deleting blog:", error);
            Swal.fire("Error!", "Failed to delete the blog post.", "error");
          });
      }
    });
  };
  return (
    <div className="flex flex-col items-center bg-[#4e4d4d] p-3 rounded-lg w-60 shadow-md shadow-black/70">
      <div className="w-full">
        <img src={props.url} alt="image" className="h-40 w-64 rounded-md object-cover" />
      </div>
      <div className="bg-[#6d6a6a] flex flex-col  -mt-4 z-10 w-10/12 p-2 rounded-lg ">
        <div className="flex flex-row  items-center bg-slate-300/80 p-1 rounded-full shadow-black/30 shadow-sm">
          <ListCheck className="border-2 border-slate-500 rounded-full p-1 stroke-sky-600 h-5 w-5 " />
          <h1 className="ml-1 text-sm text-slate-500  font-semibold  italic ">
            Post Title :
          </h1>
        </div>
        <h1 className="ml-2 text-lg font-semibold text-slate-50 ">
          {props.title}
        </h1>
      </div>
      <div className="w-full flex flex-col gap-1 ml-4">
        <div className="flex items-center justify-center bg-gradient-to-r from-sky-500  to-indigo-500 mt-3 pl-1 pr-1 rounded-lg w-20">
          <h2 className="  p-1 text-white  text-base font-semibold">
            {props.type}
          </h2>
        </div>
        <p className="ml-1 italic text-slate-300 font-semibold text-sm ">Description :</p>
        <p className="ml-1 font-semibold text-sm text-slate-50 w-11/12 mb-4">{props.content}</p>
      </div>
      <div className="flex row gap-3 h-full items-end">
      <Button  onClick={handleEdit}>Edit</Button>
      <Button  variant="outline" onClick={handleDelete}>Delete</Button>

      </div>
    </div>
  );
}

export default Cards;
