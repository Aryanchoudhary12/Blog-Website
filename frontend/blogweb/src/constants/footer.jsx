import React from "react";
import { Facebook,Instagram,Github } from "lucide-react";
import Swal from "sweetalert2";
import Logo from "../assets/logosticker.png";
import { Link } from "react-router-dom";
function Footer() {
  const time = new Date().getFullYear();
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "aff32320-19be-4d5e-b396-b9e151fdcfe6");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title: "Good job!",
        text: "Your message sent successfully!",
        icon: "success",
      });
    }
  };
  return (
    <footer className="bg-[#313131] w-full sm:h-96 md:h-72">
      <div className="flex flex-col md:flex-row h-full justify-around">
        <div className="flex flex-col gap-2 justify-center items-center md:pl-40">
          <img src={Logo} className="h-24" alt="" />
          <h1 className="text-slate-100 font-bold">GET IN TOUCH</h1>
          <form onSubmit={onSubmit} className="flex flex-row gap-x-2">
            <input
              type="text"
              placeholder="Write your message here..."
              name="message"
              className="bg-[#414141] pl-4 pr-4 rounded-md"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-sky-500 h-10 to-indigo-500  pl-2 pr-2 text-white rounded-lg w-2/5 text-base font-semibold"
            >Submit</button>
          </form>
        </div>

        <div className="flex flex-col w-full justify-center items-center gap-y-4 mt-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-row gap-x-12">
              <Facebook className="h-10 stroke-none bg-white/10 rounded-full w-10 p-2 fill-slate-100"/>
              <Instagram className="h-10 stroke-1 bg-white/10 rounded-full w-10 p-2 fill-slate-100"/>
              <Github className="h-10 stroke-none bg-white/10 rounded-full w-10 p-2 fill-slate-100"/>
            </div>
            <div className="flex flex-row gap-x-12">
              
                <Link to="/" className="text-lg text-slate-100 font-semibold hover:text-yellow-300">Home</Link>
                <Link to="/blogs" className="text-lg text-slate-100 font-semibold hover:text-yellow-300">Blogs</Link>
                <Link to="/profile" className="text-lg text-slate-100 font-semibold hover:text-yellow-300">Profile</Link>
        
            </div>
          </div>
          <div className="right_claim">
            <p className="text-lg text-slate-100 font-semibold mt-4">© Copyright {time} , all right reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
