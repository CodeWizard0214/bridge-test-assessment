import { useEffect, useState } from "react";
import BridgeInTable from "../components/BridgeInTable";
import { useSelector } from "react-redux";
import { getAllGames } from "../services/apiService";
import {
  DEFAULT_PAGE_SIZE,
  GAMES_COLUMN,
  PLAYERS_COLUMN,
} from "../config/enum";
import { API_RESP_STATUS } from "../config/enum";
import { getTeamsInfo } from "../store/teamsSlice";
import { Team } from "./TeamList";

export interface Game {
  id: number;
  date: string;
  home_team: Team;
  home_team_name: string;
  home_team_score: number;
  period: number;
  postseason: boolean;
  season: number;
  status: string;
  time: string;
  visitor_team: Team;
  visitor_team_score: number;
  visitor_team_name: string;
}

const TeamGames = () => {
  const teamsData = useSelector(getTeamsInfo);
  const [gamesData, setGamesData] = useState<Game[]>([]);
  const [teamId, setTeamId] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(30);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchData = await getAllGames(
        currentPage,
        DEFAULT_PAGE_SIZE,
        "[" + teamId + "]"
      );
      if (fetchData?.status === API_RESP_STATUS.SUCCESS) {
        const temp = fetchData.data.data;
        let games: Game[] = [];

        temp.map((item: Game) => {
          games.push({
            ...item,
            home_team_name: item.home_team.name,
            visitor_team_name: item.visitor_team.name,
          });
        });
        setGamesData(games);
        setTotalCount(fetchData.data.meta.total_count);
        setPageCount(
          Math.ceil(fetchData.data.meta.total_count / DEFAULT_PAGE_SIZE)
        );
        setLoading(false);
      }
    };
    fetchData();
  }, [teamId]);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="pt-[150px] px-40">
      <div className="flex flex-row mb-20">
        <caption className="mr-10">select a team</caption>
        <select
          onChange={(e: any) => {
            setTeamId(e.target.value);
          }}
        >
          {teamsData.map((item: Team, index: number) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      Total {totalCount} Games
      <BridgeInTable
        columns={GAMES_COLUMN}
        data={gamesData}
        currentPage={currentPage}
        pageCount={pageCount}
        handlePageClick={handlePageClick}
        loading={loading}
      />
    </div>
  );
};

export default TeamGames;
