import { useNavigate } from "react-router";
import backgroundimg from "../../assets/background img.jpg"

const BannerSection = () => {
  const navigate = useNavigate();

  return (
    <div
      className="hero min-h-[80vh]"
 
    >
        <img src={backgroundimg} alt="" />
      {/* Overlay */}
      <div className="hero-overlay  bg-opacity-60"></div>

      {/* Content */}
      <div className="hero-content text-center text-white">
        <div className="max-w-xl">
          <h1 className="mb-5 text-4xl md:text-5xl font-bold">
            Donate Blood, Save Lives
          </h1>
          <p className="mb-6 text-lg opacity-80">
            Join our community of lifesavers and help people
            in emergency situations.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/register")}
              className="btn btn-error"
            >
              Join as a Donor
            </button>

            <button
              onClick={() => navigate("/search")}
              className="btn btn-outline text-white"
            >
              Search Donors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
