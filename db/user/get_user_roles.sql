SELECT r.name as role
FROM users u
JOIN rolerelations rr ON u.id = rr.userid
JOIN roles r ON r.id = rr.roleid
WHERE u.id=$1;
