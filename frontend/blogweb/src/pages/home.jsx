import Header from '../constants/header';
import Lottie from 'react-lottie';
import welcome from '../assets/welcome.json'
import vid from '../assets/bg-vid.mp4'
import Footer from '../constants/footer';
function Home() {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData:welcome,
    rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <div className="Home">
        <Header/>
        <div>
          <div className='flex justify-center items-center w-full relative'>
            <video autoPlay muted loop className=' absolute -z-10'>
                <source src={vid} type="video/mp4"/>
            </video>
            <div className='flex flex-col' >
              <h1 className='text-3xl font-extrabold mt-4'>Hello There !</h1>
              <h2 className='text-lg font-bold '>Welcome to my project<br></br><span className='text-4xl font-extrabold text-yellow-400 underline'>Thought Stream</span></h2>
              <Lottie options={defaultOptions} height={400} width={400}/>
            </div>
           
          </div>
        </div>  
        <Footer/>  
    </div>
  );
}

export default Home;