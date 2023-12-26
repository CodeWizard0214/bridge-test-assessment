import { useEffect, useState } from "react";
import BridgeInTable from "../components/BridgeInTable";

import { getTeams } from "../services/apiService";
import { DEFAULT_PAGE_SIZE, TEAMS_COLUMN } from "../config/enum";
import { API_RESP_STATUS } from "../config/enum";

export interface Team {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

const TeamList = () => {
  const [teamData, setTeamData] = useState<Team[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(30);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const fetchData = await getTeams(currentPage + 1, DEFAULT_PAGE_SIZE);
      if (fetchData?.status === API_RESP_STATUS.SUCCESS) {
        setTeamData(fetchData.data.data);
        setTotalCount(fetchData.data.meta.total_count);
        setPageCount(
          Math.ceil(fetchData.data.meta.total_count / DEFAULT_PAGE_SIZE)
        );
      }
      setLoading(false);
    };
    getData();
  }, [currentPage]);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="pt-[150px] container mx-auto">
      Total {totalCount} Teams
      <BridgeInTable
        columns={TEAMS_COLUMN}
        data={teamData}
        currentPage={currentPage}
        pageCount={pageCount}
        handlePageClick={handlePageClick}
        loading={loading}
      />
    </div>
  );
};

export default TeamList;
