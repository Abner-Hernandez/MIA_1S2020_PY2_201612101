OPTIONS (SKIP=1)
LOAD DATA
INFILE 'masive.csv'
INTO TABLE TEMP_ENTREVISTA  
FIELDS TERMINATED BY ","
(
    codigo          ,
    nombre          ,
    precio          ,
    categoria       ,
    color           ,
    cantidad          
)
