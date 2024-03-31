SELECT
  id,
  SUM(i) AS impact
FROM (
  SELECT
    author_id AS id,
    (5 + 10 * (status > 0) + 20 * (status = 5)) AS i
  FROM polls
  WHERE author_id > ''
)
GROUP BY id