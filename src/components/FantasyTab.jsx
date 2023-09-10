import React from "react";
import { slideAnimation } from "../utils/motion";
import { motion } from "framer-motion";

function FantasyTab() {
  return <motion.h1 {...slideAnimation("left")}>hi fantasy</motion.h1>;
}

export default FantasyTab;
