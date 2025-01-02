import { useState, useRef } from "react";
import { useMyContext } from "./context";
import Axios from "axios";
import Swal from "sweetalert2";
import defaultimage from "@/assets/default.png";
import { CloudUploadIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";

function New() {
  const [image, setimage] = useState(null);
  const [title, settitle] = useState(null);
  const [type, settype] = useState(null);
  const [content, setcontent] = useState(null);
  const { user } = useMyContext();
  const [preview, setpreview] = useState(null);
  const inputRef = useRef(null);

  const handledp = () => {
    inputRef.current.click();
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("id", user);
    formData.append("image", image);
    formData.append("title", title);
    formData.append("type", type);
    formData.append("content", content);
    Axios.post("https://blog-website-3-1pha.onrender.com/new", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        if (response.data.message) {
          console.log("error");
          alert("an error has been found!");
        } else {
          console.log("posted");
          Swal.fire({
            title: "Good job!",
            text: "Your message sent successfully!",
            icon: "success",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleimageupload = (e) => {
    setimage(e.target.files[0]);
    let url = URL.createObjectURL(e.target.files[0]);
    setpreview(url);
  };
  return (
    <div className="bg-[#222222] w-full min-h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-4xl text-white font-custom font-bold">Post Form</h1>
      <form
        className="bg-[#414141] flex flex-col pr-10 p-4 rounded-md pl-10 gap-2 border border-slate-400/20 shadow-md shadow-slate-200/30"
        onSubmit={handlesubmit}
      >
        {preview == null ? <img src={defaultimage} className="h-48 w-80 object-cover rounded-sm"/> : <img src={preview} className="h-48 w-80 object-cover rounded-sm"/>}
        <div
          onClick={handledp}
          className="flex justify-center items-center gap-2 mt-2 mb-2 border-2 rounded-lg p-1"
        >
          <CloudUploadIcon className="bg-slate-500 p-2 h-10 w-10 rounded-full stroke-white font-poppins" />
          <p className="text-base font-bold text-slate-300">Upload Image</p>
          <input
            name="image"
            type="file"
            className="hidden"
            onChange={handleimageupload}
            ref={inputRef}
            required
          ></input>
        </div>

        <input
          type="text"
          placeholder="Title"
          name="title"
          className="bg-[#737272] h-10 pl-2 rounded-md text-slate-300 font-poppins placeholder:text-slate-300 placeholder:font-poppins w-80"
          onChange={(e) => {
            settitle(e.target.value);
          }}
          required
        ></input>

        <select
          name="type"
          onChange={(e) => {
            settype(e.target.value);
          }}
          className="bg-[#737272] text-slate-300 h-10 rounded-md p-1 outline-none hover:bg-white/30 "
        >
          <option name="null" className="bg-[#353434]">Select the type</option>
          <option className="bg-[#353434] hover:bg-slate-400/20">Travels</option>
          <option className="bg-[#353434]">Science</option>
          <option className="bg-[#353434]">History</option>
          <option className="bg-[#353434]">Politics</option>
          <option className="bg-[#353434]">Others</option>
        </select>

        <textarea
          type="text"
          placeholder=" Write your Content here..."
          name="content"
          onChange={(e) => {
            setcontent(e.target.value);
          }}
          className="bg-[#737272] h-32 text-sm text-slate-300 outline-none p-2 placeholder:italic font-poppins rounded-md "
          required
        ></textarea>
        <button type="submit" className="bg-gradient-to-r from-sky-500 h-10 to-indigo-500 mt-3 p-1 text-white rounded-lg w-2/5 text-base font-semibold"
        >
          <p> Post </p>
        </button >
      </form>
    </div>
  );
}
export default New;
