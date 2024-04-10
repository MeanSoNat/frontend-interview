import { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormDialog from "./form";
import { DataContext } from "../../provider/dataprovider/App";
import AlertDelteDialog from './DelteEntities'
import { motion } from "framer-motion";

function Entities() {
  const { data } = useContext(DataContext);

  return (
    <motion.div 
    className="pt-5"
    initial={{opacity:0, scale:0.5}}
    animate={{opacity:1, scale:1}}
    transition={{
      duration: 0.3,
      ease: [0, 0.71, 0.2, 1.01],
      scale: {
        type: "tween",
        damping: 5,
        stiffness: 100,
        restDelta: 0.001
      }
    }}
    >
      <FormDialog />
      <TableContainer component={Paper} sx={{backgroundColor: "white", marginTop: "2rem"}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell sx={{fontWeight: "bold", color: "black"}}>Intents</TableCell>
              <TableCell sx={{fontWeight: "bold", color: "black"}}>Sub intent</TableCell>
              <TableCell sx={{fontWeight: "bold", color: "black"}}>point</TableCell>
              <TableCell sx={{fontWeight: "bold", color: "black"}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" sx={{color: "black"}}>
                  {row.intent}
                </TableCell>
                <TableCell sx={{color: "black"}}>{row.subintent}</TableCell>
                <TableCell sx={{color: "black"}}>{row.point}</TableCell>
                <TableCell sx={{color: "black"}}>
                  <AlertDelteDialog item={row}  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </motion.div>
  );
}

export default Entities;

