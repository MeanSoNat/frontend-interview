import { useState, useEffect, useMemo } from "react";
import { Link , useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaChartColumn,
  FaBarsProgress,
  FaElementor,
  FaRocketchat,
  FaNetworkWired,
  FaDiamond,
  FaEarthAmericas,
} from "react-icons/fa6";
function Aside() {
  const scenes = useMemo(() => 
  [
    { page: "Data analytics", path: "Data-analytics", icon: <FaChartColumn /> },
    { page: "Intents", path: "Intents", icon: <FaBarsProgress /> },
    { page: "Entities", path: "Entities", icon: <FaElementor /> },
    {
      page: "Conversation flow",
      path: "Conversation-flow",
      icon: <FaRocketchat />,
    },
    {
      page: "Business Logic",
      path: "Business-Logic",
      icon: <FaNetworkWired />,
    },
    { page: "rule-based", path: "rule-based", icon: <FaDiamond /> },
    { page: "nlp", path: "nlp", icon: <FaEarthAmericas /> },
  ], [])
  const location = useLocation();
  const [selected, SetSelected] = useState("Dashboard");

  useEffect(() => {
    const currentPage = localStorage.getItem("selectedPage");
    if (currentPage) {
      SetSelected(currentPage);
    }
  }, []); 

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    const matchedScene = scenes.find(scene => scene.path === path);
    if (matchedScene) {
      SetSelected(matchedScene.page);
      localStorage.setItem("selectedPage", matchedScene.page);
    } else {
      SetSelected(null);
    }
  }, [location.pathname, scenes]);


  const handleSelect = (page) => {
    SetSelected(page);
    localStorage.setItem("selectedPage", page);
  };

  return (
    <div className="bg-[#212631] text-white min-w-full pt-5">
      <div className="flex-col py-2">
        <p className="uppercase font-bold text-center border-b-2">Dashboard</p>
        <motion.div
          initial={{ x: -9999 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col h-full min-h-full gap-3 pl-3 mt-5"
        >
          {scenes.map((scene, _) => {
            return (
              <Link
                key={_}
                className={` ${
                  scene.page == selected
                    ? "translate-x-2 bg-[#ffffff] text-black shadow-[2px_0px_50px_rgba(0,0,0,0.1)]"
                    : ""
                } flex ease duration-75 rounded-l-md py-3 px-2 gap-3 items-center text-xl hover:outline-1 hover:outline-blue-400`}
                onClick={() => {
                  handleSelect(scene.page);
                }}
                to={`/${scene.path}`}
              >
                {scene.icon} {scene.page}
              </Link>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export default Aside;
