SELECT
  id,
  SUM((r = 0) * c) AS p0,
  SUM((r = 1) * c) AS p1,
  SUM((r = 2) * c) AS p2
FROM (
  SELECT
    id, r,
    COUNT(*) AS c
  FROM (
    SELECT
      poll_id AS id,
      react as r
    FROM poll_reacts
  )
  GROUP BY id, r
)
GROUP BY id