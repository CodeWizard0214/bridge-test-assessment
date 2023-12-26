interface Column {
  Header: string;
  accessor: string;
}

interface Response_status {
  SUCCESS: string;
  FAIL: string;
}

export const MAX_PER_PAGE = 100;

export const DELAY_TIME = 50;

export const DEFAULT_PAGE_SIZE = 10;

export const API_RESP_STATUS: Response_status = {
  SUCCESS: "success",
  FAIL: "fail",
};

export const TEAMS_COLUMN: Column[] = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Abbreviation",
    accessor: "abbreviation",
  },
  {
    Header: "City",
    accessor: "city",
  },
  {
    Header: "Conference",
    accessor: "conference",
  },
  {
    Header: "Division",
    accessor: "division",
  },
  {
    Header: "Team Name",
    accessor: "full_name",
  },
  {
    Header: "Name",
    accessor: "name",
  },
];

export const PLAYERS_COLUMN: Column[] = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "First Name",
    accessor: "first_name",
  },
  {
    Header: "Last name",
    accessor: "last_name",
  },
  {
    Header: "Height Feet",
    accessor: "height_feet",
  },
  {
    Header: "Height inches",
    accessor: "height_inches",
  },

  {
    Header: "Position",
    accessor: "position",
  },
  {
    Header: "Weight",
    accessor: "weight_pounds",
  },
];

export const GAMES_COLUMN: Column[] = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Home Team",
    accessor: "home_team_name",
  },
  {
    Header: "Home Team Score",
    accessor: "home_team_score",
  },
  {
    Header: "Period",
    accessor: "period",
  },

  {
    Header: "postseason",
    accessor: "postseason",
  },
  {
    Header: "Season",
    accessor: "season",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Time",
    accessor: "time",
  },
  {
    Header: "Visitor Team",
    accessor: "visitor_team_name",
  },
  {
    Header: "Visitor Team Score",
    accessor: "visitor_team_score",
  },
];
