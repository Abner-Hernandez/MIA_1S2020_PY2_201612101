OPTIONS (SKIP=1)
LOAD DATA
INFILE 'FileData/entrevista_con_prueba_psicometrica.csv'
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