CREATE TABLE `userinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `birthyear` varchar(32) NOT NULL,
  `tel` varchar(32) NOT NULL,
  `industry` varchar(32) NOT NULL,
  `job` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8