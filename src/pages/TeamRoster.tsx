import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

import BridgeInTable from "../components/BridgeInTable";
import { Team } from "./TeamList";

import { DEFAULT_PAGE_SIZE, PLAYERS_COLUMN } from "../config/enum";
import { getPlayersInfo } from "../store/playerSlice";
import { getTeamsInfo } from "../store/teamsSlice";

export interface Player {
  id: number;
  first_name: string;
  height_feet: number | null;
  height_inches: number | null;
  last_name: string;
  position: string;
  weight_pounds: number | null;
  team: Team;
}

interface TeamRoasterProps {
  loading: boolean;
}

const TeamRoaster = ({ loading }: TeamRoasterProps) => {
  const teamsData = useSelector(getTeamsInfo);
  const totalPlayRoaster = useSelector(getPlayersInfo);
  const [teamRoasterData, setTeamRoasterData] = useState<Player[]>([]);
  const [pageData, setPageData] = useState<Player[]>([]);
  const [totalCount, setTotalCount] = useState<number>();
  const [teamId, setTeamId] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(1);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    const temp = totalPlayRoaster?.filter(
      (player: any) => player.team.id === teamId
    );
    setTotalCount(temp.length);
    setTeamRoasterData(temp);
    setPageCount(Math.ceil(temp.length / DEFAULT_PAGE_SIZE));
  }, [teamId, totalPlayRoaster]);

  useEffect(() => {
    setPageData(
      teamRoasterData.slice(
        currentPage * DEFAULT_PAGE_SIZE,
        (currentPage + 1) * DEFAULT_PAGE_SIZE
      )
    );
  }, [currentPage, teamRoasterData]);

  return (
    <div className="pt-[150px] px-40">
      <div className="flex flex-row mb-20">
        <caption className="mr-10">select a team</caption>
        <select
          onChange={(e: any) => {
            setTeamId(+e.target.value);
          }}
        >
          {teamsData.map((item: Team, index: number) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      Total {totalCount} Players
      <BridgeInTable
        columns={PLAYERS_COLUMN}
        data={pageData}
        currentPage={currentPage}
        pageCount={pageCount}
        handlePageClick={handlePageClick}
        loading={loading}
      />
    </div>
  );
};

export default TeamRoaster;
