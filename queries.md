# Queries

## Trading Frontend

### Order book data

To get all the open orders, you can query this endpoint:

```http
GET /limit_orders?order_status=eq.open&order=last_increase_stamp.asc&market_id=eq.MARKET_ID
```

The `last_increase_stamp` field indicates the order priority. The lower this value, the higher it is in the priority queue.

You can optionally query by side by adding `&side=eq.SIDE` where `SIDE` is either `ask` or `bid`, or by price by adding `&price=OPERATOR.PRICE` where `OPERATOR` is any of the PostgREST filtering operators (see [official docs](https://postgrest.org/en/stable/references/api/tables_views.html#operators) for more info), and `PRICE` is an integer.

Note that you will need to use pagination (see PostgREST pagination documentation [here](https://postgrest.org/en/stable/references/api/tables_views.html#limits-and-pagination)).

### Trade history

```http
GET /limit_orders?user=eq.ADDRESS
GET /market_orders?user=eq.ADDRESS
GET /swap_orders?signing_account=eq.ADDRESS
```

This will get you all limit, market and swap orders for a given user. You can also use the same filters as above to get them for only one market, or for one side, etc. Pagination works in the same way as well.

## Leaderboards

### Total volume for a competition

```http
GET /competition_metadata?select=*,volume&id=eq.COMP_ID
```

### Eligible traders AND top 100 traders

```http
GET /competition_leaderboard_users?competition_id=eq.COMP_ID&is_eligible=eq.true&limit=100
Prefer: count=exact
```

The body will be a JSON that contains every one of the top 100 users.

The count of eligible traders will be in the response header named `Content-Range` as follows: `Content-Range: 0-X/Y` where X is the number of returned rows - 1, and Y is the total number of eligible traders.

### User information

```http
GET /competition_leaderboard_users?competition_id=eq.COMP_ID&user=eq.ADDR
```
