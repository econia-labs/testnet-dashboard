interface ErrorMessage {
  title: string;
  message: string;
}

interface ErrorList {
  [key: string]: ErrorMessage;
}

const MAINTENANCE_ERROR: ErrorMessage = {
  title: "Under Maintenance",
  message:
    "The leaderboard backend is offline for maintenance and will be back online shortly. Your data is not lost, because all of the data is indexed straight from the blockchain! 💙",
};

const RATE_LIMITED_ERROR: ErrorMessage = {
  title: "You've Been Rate-Limited",
  message:
    "You've been rate-limited by the leaderboard due to frequent requests or high local WiFi traffic. Try a mobile hotspot or sharing a screen in high-traffic areas. 💙",
};

export const ERROR_LIST: ErrorList = {
  MAINTENANCE_ERROR,
  RATE_LIMITED_ERROR,
};
