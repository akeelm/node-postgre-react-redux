SELECT row_to_json(usr) as users
FROM
(
  SELECT u.id, u.firstname, u.surname, u.password, u.email, u.emailverified,
    (
      SELECT json_agg(rls)
      FROM
      (
      	SELECT r.id, r.name
      	FROM roles r
      	JOIN rolerelations rr ON r.id = rr.roleid
      	WHERE rr.userid = u.id
      ) rls
    ) as roles
  FROM users as u
  WHERE u.email = $1
) usr;
