// src/app/PlayerPage/page.tsx
import { Table } from "../_components/table";
import { Button } from "../_components/Modal";

export default function PlayerPage() {
  return (
    <div className = "App">
      <h1 className = "title">Player Page</h1>
      <Table  />
      <Button />
    </div>
  );
}
