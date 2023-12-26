import axios from 'axios';

const API_URL = 'https://free-nba.p.rapidapi.com';

const fetchAllTeams = async () => {
  try {
    const response = await axios.get(`${API_URL}/teams`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
        'X-RapidAPI-Key': 'f50a47a7ddmsh482e257a603d514p106077jsn56e5e9623fd3',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw new Error('Failed to fetch teams');
  }
};

export { fetchAllTeams };
