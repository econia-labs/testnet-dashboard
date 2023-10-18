# Queries

## Total volume for a competition

```http
GET /competition_metadata?select=*,volume&id=eq.COMP_ID
```

## Eligible traders

```http
HEAD /competition_leaderboard_users?competition_id=eq.COMP_ID&is_eligible=eq.true
Prefer: count=estimated
```

The response is in a header named `Content-Range`.

## User information

```http
GET /competition_leaderboard_users?competition_id=eq.COMP_ID&user=eq.ADDR
```

## Top 100

```http
GET /competition_leaderboard_users?competition_id=eq.COMP_ID&limit=100
```
