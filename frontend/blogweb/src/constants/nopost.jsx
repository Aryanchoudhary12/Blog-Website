import { CameraOff } from 'lucide-react';
function Nopost(){
    return(
        <div className='w-[95%] h-80 flex flex-col p-4 m-4 border-2 rounded-md justify-center items-center'>
            <h1 className='font-custom font-bold text-4xl'>No Post</h1>
             <CameraOff className='mt-5 bg-sky-200 h-20 w-20 p-3 rounded-full stroke-sky-800'/>
             <p className='mt-4 font-semibold italic text-slate-400'>User have not posted anything yet!</p>
          </div>
    )
}
export default Nopost;