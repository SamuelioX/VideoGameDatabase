SELECT video_game_info.*, group_concat(system_info.name) AS 'System Name',
system_info.id AS 'System ID', 
developer.name AS 'developer name',
publisher.name AS 'publisher name',
genre_info.genre AS 'genre'
FROM video_game_info
	LEFT JOIN game_system on video_game_info.id = game_system.game_id 
    LEFT JOIN system_info on system_info.id = game_system.system_id
    LEFT JOIN game_developer on video_game_info.id = game_developer.game_id
	LEFT JOIN game_publisher on video_game_info.id = game_publisher.game_id
    LEFT JOIN game_genre on video_game_info.id = game_genre.game_id
    LEFT JOIN developer on developer.id = game_developer.developer_id
    LEFT JOIN publisher on publisher.id = game_publisher.publisher_id
    LEFT JOIN genre_info on genre_info.id = game_genre.genre_id
    GROUP BY video_game_info.id;