/**INSERT INTO video_game_info (name, developer, publisher, rating, players, coop, ESRBrating) 
	VALUES ("Mega Man X2", "Capcom", "Capcom", 10.0, 2, 0, 'E');
    */
    /**
    INSERT INTO game_system (game_id, system_id)
    VALUES (1, 1); */
    /**
INSERT INTO system_info (name, year, publisher)
	VALUES ("PS2", "2000", "Sony");*/
 /**INSERT INTO game_system (game_id, system_id)
    VALUES (1, 2);*/
    /**
    INSERT INTO system_info (name, year, publisher)
	VALUES ("Gamecube", "2001", "Nintendo");*/
    /**
    INSERT INTO game_system (game_id, system_id)
    VALUES (2, 3);
    INSERT INTO game_system (game_id, system_id)
    VAL UES (2, 2);*/

    /**
SELECT video_game_info.*, group_concat(system_info.name) AS 'System Name', system_info.id AS 'System ID' FROM video_game_info
	INNER JOIN game_system on video_game_info.id = game_system.game_id 
    INNER JOIN system_info on system_info.id = game_system.system_id
    GROUP BY video_game_info.id;
    */
    /**
SELECT * FROM game_system;

SELECT system_info.name FROM game_system
	LEFT JOIN system_info ON system_info.id = game_system.system_id;
    
SELECT * FROM system_info;
*/
/**
SELECT video_game_info.*, group_concat(system_info.name) AS 'System Name', system_info.id AS 'System ID' FROM video_game_info
	INNER JOIN game_system on video_game_info.id = game_system.game_id 
    INNER JOIN system_info on system_info.id = game_system.system_id
    GROUP BY video_game_info.id;
SELECT video_game_info.*, group_concat(system_info.name) AS 'System Name', system_info.id AS 'System ID' FROM video_game_info
	LEFT JOIN game_system on video_game_info.id = game_system.game_id 
    LEFT JOIN system_info on system_info.id = game_system.system_id
    GROUP BY video_game_info.id;
    */
/**
SELECT video_game_info.*, group_concat(system_info.name) AS 'System Name', system_info.id AS 'System ID' FROM video_game_info
	INNER JOIN game_system on video_game_info.id = game_system.game_id 
    
    INNER JOIN system_info on system_info.id = game_system.system_id
    WHERE video_game_info.id = 1
    GROUP BY video_game_info.id;*/
    
SELECT * FROM video_game_info WHERE id = 1;
/**
INSERT INTO user (user_type, username, email, hashed_password) 
	VALUES (4, "admin", "admin@videogamedb.com", "password");*/
    /**
SELECT * FROM user;
SELECT * FROM status_type;
SELECT user.username, review.review_text, review.review_score, video_game_info.name FROM review 
	INNER JOIN video_game_info ON video_game_info.id = review.game_id
    INNER JOIN user ON review.user_id = user.id
    WHERE user_id = 1;
    */
    /**
INSERT INTO video_game_info (name, developer, publisher, rating, players, coop, ESRBrating) 
	VALUES ("Mega Man", "Capcom", "Capcom", 8.0, 2, 0, 'E');*/
/**DELETE FROM video_game_info WHERE name = "Mega Man" limit 1;*/
SELECT video_game_info.name FROM video_game_info 
	WHERE video_game_info.name LIKE '%Mega Man X%';

SELECT username from user;

/**
INSERT INTO user (user_type, username, email, hashed_password) 
	VALUES (4, "samuelio", "samuelio@videogamedb.com", "password");*/