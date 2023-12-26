import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Team } from "./TeamList";
import { Player } from "./TeamRoster";
import Spinner from "../components/Spinner";

import { API_RESP_STATUS } from "../config/enum";
import { getPlayersInfo } from "../store/playerSlice";
import { getTeamsInfo } from "../store/teamsSlice";
import { getPlayerDetail } from "../services/apiService";

const PlayerStatus = () => {
  const teamsData = useSelector(getTeamsInfo);
  const totalPlayRoaster = useSelector(getPlayersInfo);
  const [playersData, setPlayersData] = useState<Player[]>([]);
  const [teamId, setTeamId] = useState<number>(1);
  const [playerId, setPlayerId] = useState<number>();
  const [playerStats, setPlayerStats] = useState<Player>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const temp = totalPlayRoaster?.filter(
      (player: any) => player.team.id === teamId
    );
    setPlayersData(temp);
    setPlayerId(temp[0]?.id);
  }, [teamId, totalPlayRoaster]);

  useEffect(() => {
    const getPlayerStats = async () => {
      setLoading(true);
      if (playerId) {
        const fetchData = await getPlayerDetail(playerId);
        if (fetchData?.status === API_RESP_STATUS.SUCCESS) {
          setPlayerStats(fetchData.data);
          setLoading(false);
        }
      }
    };
    getPlayerStats();
  }, [playerId, teamId, totalPlayRoaster]);

  return (
    <div className="pt-[150px] px-40">
      <div className="flex flex-row mb-20">
        <caption className="mr-10">select a team</caption>
        <select
          onChange={(e: any) => {
            setTeamId(+e.target.value);
          }}
          value={teamId}
        >
          {teamsData.map((item: Team, index: number) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-row mb-20">
        <caption className="mr-10">select a player</caption>
        <select
          onChange={(e: any) => {
            setPlayerId(+e.target.value);
          }}
          value={playerId}
        >
          {playersData.map((item: Player, index: number) => (
            <option key={index} value={item.id}>
              {item.first_name}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className=" min-h-96 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          Id: {playerStats?.id}
          <br />
          First Name: {playerStats?.first_name}
          <br />
          Last Name: {playerStats?.last_name}
          <br />
          Height Feet: {playerStats?.height_feet}
          <br />
          Height Inches: {playerStats?.height_inches}
          <br />
          Position: {playerStats?.position}
          <br />
          Weight: {playerStats?.weight_pounds}
          <br />
          Team: {playerStats?.team.name}
          <br />
        </>
      )}
    </div>
  );
};

export default PlayerStatus;
