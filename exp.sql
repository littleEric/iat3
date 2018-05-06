CREATE TABLE `userinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(32) DEFAULT NULL,
  `tel` varchar(32) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `birthyear` varchar(32) NOT NULL,
  `industry` varchar(32) NOT NULL,
  `job` varchar(32) NOT NULL,
  `ifmarried` varchar(32) DEFAULT NULL,
  `doe` varchar(20) DEFAULT NULL,
  `wt` varchar(20) DEFAULT NULL,
  `updata_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8