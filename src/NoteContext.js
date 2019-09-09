import Data from "./dummy-store";
import React from "react";

const NoteContext = React.createContext({
  data: Data,
  folders: [],
  Notes: [],
  Delete: () => {},
  Push: () => {},
  Create: () => {}
});

export default NoteContext;
