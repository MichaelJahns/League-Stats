\c leaguestats

CREATE TABLE users (
    summonerName VARCHAR(20),
    summonerLevel smallint,
    profileIconId smallint,
    summonerId VARCHAR(255),
    accountId VARCHAR(255),
    puuId VARCHAR(255),
    revisionDate bigint
);

INSERT INTO users (summonerName, summonerLevel, profileIconId, summonerId, accountId, puuId, revisionDate)
VALUES ('Imaqtpie' , 306 , 588 , "z8fzE-e6fExYNs32R4pdHDJ7MP9qlpcjMCYvuvV125I0Avg" , "HQDQs3wBIRk9L4S-gyw97_kqD8bs1Mziqxu-BhEIvu1pqQ" , "Sx2l8hnwqBjO1LJDK9tMK08UtZd6AAIJqT7-k5qrDOofLSGXjylR0umJIjW0YBpkHBSknS1O1b-bvw" , 1548363353000);
