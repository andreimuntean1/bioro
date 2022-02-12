import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Business = (props) => {
  const { url, name, entrepreneur, shortDesc, videos } = props

  return (
    <Link href={`/${url}`}>
      <div className="flex justify-between gap-4 bg-lightBackground hover:bg-middleBackground transition-colors duration-300 p-5 md:p-7 rounded-2xl cursor-pointer">
        <div className="flex flex-col">
          <h1 className="font-nunito font-bold text-accent2 text-lg md:text-xl">{name}</h1>
          <p className="font-nunito text-white text-opacity-75 text-sm mt-1">{entrepreneur}</p>
          <p className="font-nunito font-semibold text-white mt-4">{shortDesc}</p>
        </div>
        <div className="flex gap-2 text-accent1 text-sm h-fit items-center">
          <p>{videos}</p>
          <FontAwesomeIcon icon={faVideo} className="w-4 mt-0.5" />
        </div>
      </div>
    </Link>
  );
}

export default Business;