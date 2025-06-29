
import { useState, useRef, useEffect } from "react";
import { useMyContext } from "./context";
import Axios from "axios";
import Swal from "sweetalert2";
import defaultimage from "@/assets/default.png";
import { CloudUploadIcon } from "lucide-react";
import { useLocation, useNavigate } from 'react-router-dom';

function New() {
  const { user } = useMyContext();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);
  const location = useLocation(); 
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    if (id) {
      Axios.get(`http://localhost:4000/blogs/${id}`)
        .then(response => {
          const blog = response.data;
          setTitle(blog.title);
          setType(blog.type);
          setContent(blog.content);
          setPreview(blog.image);  // Assuming the blog image is already uploaded
        })
        .catch(error => {
          console.error("Error fetching blog data:", error);
        });
    }
  }, [id]);

  const handleDp = () => {
    inputRef.current.click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("id", user);
    formData.append("image", image);
    formData.append("title", title);
    formData.append("type", type);
    formData.append("content", content);

    if (id) {
      Axios.put(`http://localhost:4000/blogs/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          Swal.fire({
            title: "Updated!",
            text: "Your blog post has been updated.",
            icon: "success",
          });
          navigate("/"); 
        })
        .catch((error) => {
          console.error(error);
          alert("Error updating the blog post!");
        });
    } else {
      Axios.post("http://localhost:4000/new", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          Swal.fire({
            title: "Posted!",
            text: "Your new blog post has been created.",
            icon: "success",
          });
          navigate("/");  
        })
        .catch((error) => {
          console.error(error);
          alert("Error posting the blog!");
        });
    }
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setPreview(url);
  };

  return (
    <div className="bg-[#222222] w-full min-h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-4xl text-white font-custom font-bold">
        {id ? "Edit Blog" : "Create Blog"}
      </h1>
      <form
        className="bg-[#414141] flex flex-col pr-10 p-4 rounded-md pl-10 gap-2 border border-slate-400/20 shadow-md shadow-slate-200/30"
        onSubmit={handleSubmit}
      >
        {preview == null ? (
          <img
            src={defaultimage}
            className="h-48 w-80 object-cover rounded-sm"
            alt="Blog Preview"
          />
        ) : (
          <img src={preview} className="h-48 w-80 object-cover rounded-sm" alt="Blog Preview" />
        )}

        <div
          onClick={handleDp}
          className="flex justify-center items-center gap-2 mt-2 mb-2 border-2 rounded-lg p-1"
        >
          <CloudUploadIcon className="bg-slate-500 p-2 h-10 w-10 rounded-full stroke-white font-poppins" />
          <p className="text-base font-bold text-slate-300">Upload Image</p>
          <input
            name="image"
            type="file"
            className="hidden"
            onChange={handleImageUpload}
            ref={inputRef}
          />
        </div>

        <input
          type="text"
          placeholder="Title"
          name="title"
          className="bg-[#737272] h-10 pl-2 rounded-md text-slate-300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-[#737272] text-slate-300 h-10 rounded-md p-1"
        >
          <option value="">Select the type</option>
          <option value="Travels">Travels</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="Politics">Politics</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Others">Others</option>
        </select>

        <textarea
          type="text"
          placeholder="Write your Content here..."
          name="content"
          className="bg-[#737272] h-32 text-sm text-slate-300 outline-none p-2 placeholder:italic rounded-md"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-sky-500 h-10 to-indigo-500 mt-3 p-1 text-white rounded-lg w-2/5 text-base font-semibold"
        >
          {id ? "Update" : "Post"}
        </button>
      </form>
    </div>
  );
}

export default New;
