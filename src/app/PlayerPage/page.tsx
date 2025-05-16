// src/app/PlayerPage/page.tsx
import { Table } from "../_components/PlayerTable";
import { Button } from "../_components/Modal";
import Sidebar from "../_components/SideBar";
export default function PlayerPageView() {

  
  return (
    <div className = "App">
      <Sidebar />
      
      <h1 className = "title">Player Page</h1>
      <Table  />
      <Button />
    </div>
  );
}
