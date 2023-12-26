// src/TeamList.tsx

import React, { useEffect, useState } from 'react';
import { fetchAllTeams } from './nbaService';

const TeamList: React.FC = () => {
    const [teams, setTeams] = useState<any[]>([]);

    useEffect(() => {
        const getTeams = async () => {
            try {
                const teamsData = await fetchAllTeams();
                setTeams(teamsData.data);
            } catch (error) {
                // Handle error
            }
        };

        getTeams();
    }, []);

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-3xl font-semibold mb-4">All NBA Teams</h2>
            <ul>
                {teams.map((team) => (
                    <li key={team.id} className="py-2">{team.full_name}</li>
                ))}
            </ul>
        </div>
    );
};

export default TeamList;
