# Queries

## Total volume for a competition

```http
GET /competition_metadata?select=*,volume&id=eq.COMP_ID
```

## Eligible traders AND top 100 traders

```http
GET /competition_leaderboard_users?competition_id=eq.COMP_ID&is_eligible=eq.true&limit=100
Prefer: count=estimated
```

The body will be a JSON that contains every one of the top 100 users.

The count of eligible traders will be in the response header named `Content-Range` as follows: `Content-Range: 0-X/Y` where X is the number of returned rows - 1, and Y is the total approximated number of eligible traders.

## User information

```http
GET /competition_leaderboard_users?competition_id=eq.COMP_ID&user=eq.ADDR
```
