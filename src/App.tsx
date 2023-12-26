import React, { useEffect, useCallback, useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from './components/Header';
import NotFound from './components/NotFound';

import TeamList from './pages/TeamList';
import TeamRoster, { Player } from './pages/TeamRoster';
import PlayerStats from './pages/PlayerStats';
import TeamGames from './pages/TeamGames';
import GameStats from './pages/GameStats';

import { setTeamsInfo } from './store/teamsSlice';
import { setPlayersInfo } from './store/playerSlice';
import { getTeams, getPlayers } from './services/apiService';
import { API_RESP_STATUS } from './config/enum';
import { MAX_PER_PAGE } from './config/enum';
import { DELAY_TIME } from './config/enum';

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  let players: Player[] = [];

  useEffect(() => {
    const getTeamData = async () => {
      const singleData = await getTeams(1, 1);
      if (singleData?.status === API_RESP_STATUS.SUCCESS) {
        const totalTeamsCnt = singleData.data.meta.total_count;
        const fetchData = await getTeams(1, totalTeamsCnt);
        if (fetchData?.status === API_RESP_STATUS.SUCCESS) {
          dispatch(setTeamsInfo(fetchData.data.data));
        }
      }
    };
    getTeamData();
  }, [dispatch]);

  type ThrottleFunction = (...args: any[]) => void;

  function throttle(func: ThrottleFunction, limit: number): ThrottleFunction {
    let inThrottle = false;

    return function (this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;

        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  }

  const useThrottling = (delay: number = DELAY_TIME) => {
    const throttledAPICall = useCallback(
      throttle(async (currentPage: number, per_page: number, query: string) => {
        try {
          await getPlayers(currentPage, per_page, query).then((response) => {
            if (response?.status === API_RESP_STATUS.SUCCESS) {
              players = [...players, ...response.data.data];
              dispatch(setPlayersInfo(players));
            }
          });
        } catch (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
      }, delay),
      [delay]
    );

    return throttledAPICall;
  };

  const fetchDataThrottled = useThrottling();

  const fetchPlayersSequentially = async () => {
    const singleData = await getPlayers(1, 1, "");
    if (singleData?.status === API_RESP_STATUS.SUCCESS) {
      const totalPages = Math.ceil(singleData.data.meta.total_count / MAX_PER_PAGE);
      for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        await new Promise((resolve) => setTimeout(resolve, DELAY_TIME));
        fetchDataThrottled(currentPage, MAX_PER_PAGE);
      }
    }
  };

  useEffect(() => {
    fetchPlayersSequentially();
    dispatch(setPlayersInfo(players));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<TeamList  />} />
        <Route path="/games" element={<TeamGames />} />
        <Route path="/players" element={<TeamRoster loading={loading} />} />
        <Route path="/player_stats" element={<PlayerStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
