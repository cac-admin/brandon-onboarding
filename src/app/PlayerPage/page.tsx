// src/app/PlayerPage/page.tsx
import { Table } from "../_components/table";
import { Button } from "../_components/Modal";
import { HomePage, AdminPage, PlayerPage } from "../_components/PageHandler";

export default function PlayerPageView() {

  return (
    <div className = "App">
      <div className = "side-bar">
        <HomePage/>
        <AdminPage/>
        <PlayerPage/>
      </div>
      
      <h1 className = "title">Player Page</h1>
      <Table  />
      <Button />
    </div>
  );
}
