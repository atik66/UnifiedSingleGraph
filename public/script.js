// ---------- Properties ----------
const p = [
  "<http://www.w3.org/2000/01/rdf-schema#label>",
  "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>",
  "<http://www.w3.org/2003/01/geo/wgs84_pos#lat>",
  "<http://www.w3.org/2003/01/geo/wgs84_pos#long>",
  "<http://www.w3.org/2000/01/rdf-schema#comment>",
  "<http://dbpedia.org/property/latm>",
  "<http://dbpedia.org/property/longm>",
  "<http://xmlns.com/foaf/0.1/name>",
  "<http://dbpedia.org/ontology/abstract>",
  "<http://dbpedia.org/property/party>"
];

const poP = "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>";
const poO = [
  "<http://dbpedia.org/ontology/MusicalArtist>",
  "<http://dbpedia.org/ontology/Film>",
  "<http://dbpedia.org/ontology/Person>"
];

// ---------- Version selections ----------
const versionSelections = {
  bearA: Array.from({ length: 100 }, (_, i) => `${i + 1}`),
  bearB: {
    hourly: Array.from({ length: 1299 }, (_, i) => `${i + 1}`),
    daily: Array.from({ length: 89 }, (_, i) => `${i + 1}`),
    instant: Array.from({ length: 21093 }, (_, i) => `${i + 1}`),
  },
  bearC: Array.from({ length: 33 }, (_, i) => `${i + 1}`),
};

// ---------- Bear C queries ----------
const bearCQueries = {
  vm: {1: `PREFIX owl: <http://www.w3.org/2002/07/owl/>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
            PREFIX dcat: <http://www.w3.org/ns/dcat#>
            PREFIX dc: <http://purl.org/dc/elements/1.1/>

            SELECT DISTINCT ?dataset ?distribution ?URL from <BearC.ttl> WHERE {
              ?dataset rdf:type ?c1.
              ?c1 owl:valueAs dcat:Dataset .
              ?dataset dcat:distribution ?c2.
              ?c2 owl:valueAs ?distribution .
              ?distribution dcat:accessURL ?c3.
              ?c3 owl:valueAs ?URL .
              ?c3 owl:timeinfo ?time.
              ?time owl:fromdate ?fromdate.
              ?time owl:todate ?todate.
          FILTER (
           (BOUND(?fromdate) && xsd:integer(?fromdate) <= version) &&
           (BOUND(?todate) && (xsd:integer(?todate) >= version || ?todate = "9999"))
         )
    }`,
    2: `PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/terms/>

SELECT DISTINCT ?dataset ?modified_date from <BearC.ttl>  WHERE {
 
    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset .
    ?dataset dc:modified ?c2.
    ?c2 owl:valueAs ?modified_date .   
    ?c2 owl:timeinfo ?time2.
    
    ?time2 owl:fromdate ?fromdate2.
    ?time2 owl:todate ?todate2.
   
   FILTER (
  ( xsd:integer(?fromdate2) <= version) &&
  (xsd:integer(?todate2) >= version || ?todate2="9999") 
)
}`,
3: `PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX vcard: <http://www.w3.org/2006/vcard/ns#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT DISTINCT ?dataset ?contact ?name ?email from <BearC.ttl> WHERE
{
    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset .
    ?dataset dcat:contactPoint ?c2.
    ?c2 owl:valueAs ?contact .
    ?contact vcard:fn ?c3.
    ?c3 owl:valueAs ?name.
     OPTIONAL{
        ?contact vcard:hasEmail ?c4 .
        ?c4 owl:valueAs ?email.
        ?c4 owl:timeinfo ?time4.
        ?time4 owl:fromdate ?fromdate4.
    ?time4 owl:todate ?todate4.
  FILTER(
     (BOUND(?fromdate4) && xsd:integer(?fromdate4) <= version) &&
     (BOUND(?todate4) && xsd:integer(?todate4) >= version || ?todate4="9999")
)

  }

    
    ?c2 owl:timeinfo ?time2.
    ?c3 owl:timeinfo ?time3.

    ?time2 owl:fromdate ?fromdate2.
    ?time2 owl:todate ?todate2.
    ?time3 owl:fromdate ?fromdate3.
    ?time3 owl:todate ?todate3.
 
  
FILTER (
  (BOUND(?fromdate2) && xsd:integer(?fromdate2) <= version) &&
  (BOUND(?fromdate3) && xsd:integer(?fromdate3) <= version) &&
  (BOUND(?todate2) && xsd:integer(?todate2) >= version || ?todate2="9999") &&
  (BOUND(?todate3) && xsd:integer(?todate3) >= version || ?todate3="9999")

)
}`,
4: `PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/terms/>
PREFIX eu: <http://ec.europa.eu/geninfo/>
SELECT DISTINCT ?dataset ?distribution ?URL  from <BearC.ttl>  WHERE {
 
    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset .
    ?dataset dc:title ?c2.
    ?c2 owl:valueAs ?title .
    ?dataset dcat:distribution ?c3.
    ?c3 owl:valueAs ?distribution.
    ?distribution dcat:accessURL ?c4.
    ?c4 owl:valueAs ?URL .
    ?distribution dc:license ?c5.
    ?c5 owl:valueAs eu:legal_notices_en.htm .
    FILTER regex(?title, "region")
    ?c2 owl:timeinfo ?time1.
    ?c3 owl:timeinfo ?time2.
    ?time1 owl:fromdate ?fromdate1.
    ?time1 owl:todate ?todate1.
    ?time2 owl:fromdate ?fromdate2.
    ?time2 owl:todate ?todate2.
   
  
FILTER (
 
  (BOUND(?fromdate1) && xsd:integer(?fromdate1) <= version ) &&
  (BOUND(?fromdate2) && xsd:integer(?fromdate2) <= version)&& 


 
  (BOUND(?todate1) && xsd:integer(?todate1) >=version || ?todate1="9999") &&
  (BOUND(?todate2) && xsd:integer(?todate2) >=version || ?todate2="9999") 

)
}`,
5:`PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/terms/>
SELECT DISTINCT ?dataset ?distribution ?URL  from <BearC.ttl>  WHERE
{
  {
    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset .
    ?dataset dc:title ?c2.
    ?c2 owl:valueAs ?title .
    ?dataset dcat:distribution ?c3.
    ?c3 owl:valueAs ?distribution .
    ?distribution dcat:accessURL ?c4.
    ?c4 owl:valueAs ?URL .
    ?distribution dc:description ?c5.
    ?c5 owl:valueAs "Austria" .

    ?c1 owl:timeinfo ?time1.
    ?c2 owl:timeinfo ?time2.
    ?c3 owl:timeinfo ?time3.
    ?c4 owl:timeinfo ?time4.
    ?c5 owl:timeinfo ?time5.

    ?time1 owl:fromdate ?fromdate1.
    ?time1 owl:todate ?todate1.
    ?time2 owl:fromdate ?fromdate2.
    ?time2 owl:todate ?todate2.
    ?time3 owl:fromdate ?fromdate3.
    ?time3 owl:todate ?todate3.
    ?time4 owl:fromdate ?fromdate4.
    ?time4 owl:todate ?todate4.
    ?time5 owl:fromdate ?fromdate5.
    ?time5 owl:todate ?todate5.
FILTER (
  (BOUND(?fromdate1) && xsd:integer(?fromdate1) <= version) &&
  (BOUND(?fromdate2) && xsd:integer(?fromdate2) <= version) &&
  (BOUND(?fromdate3) && xsd:integer(?fromdate3) <= version) &&
  (BOUND(?fromdate4) && xsd:integer(?fromdate4) <= version)  &&
  (BOUND(?fromdate5) && xsd:integer(?fromdate5) <= version) &&
  (BOUND(?todate1) && xsd:integer(?todate1) >=version || ?todate1="9999") &&
  (BOUND(?todate2) && xsd:integer(?todate2) >=version || ?todate2="9999") &&
  (BOUND(?todate3) && xsd:integer(?todate3) >=version || ?todate3="9999") &&
  (BOUND(?todate4) && xsd:integer(?todate4) >=version || ?todate4="9999") &&
  (BOUND(?todate5) && xsd:integer(?todate5) >=version || ?todate5="9999") 
)


  }
  UNION
  {
     ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset .
    ?dataset dc:title ?c2.
    ?c2 owl:valueAs ?title .
    ?dataset dcat:distribution ?c3.
    ?c3 owl:valueAs ?distribution .
    ?distribution dcat:accessURL ?c4.
    ?c4 owl:valueAs ?URL .
    ?distribution dc:description ?c5.
    ?c5 owl:valueAs "Germany".

    ?c1 owl:timeinfo ?time1.
    ?c2 owl:timeinfo ?time2.
    ?c3 owl:timeinfo ?time3.
    ?c4 owl:timeinfo ?time4.
    ?c5 owl:timeinfo ?time5.

    ?time1 owl:fromdate ?fromdate1.
    ?time1 owl:todate ?todate1.
    ?time2 owl:fromdate ?fromdate2.
    ?time2 owl:todate ?todate2.
    ?time3 owl:fromdate ?fromdate3.
    ?time3 owl:todate ?todate3.
    ?time4 owl:fromdate ?fromdate4.
    ?time4 owl:todate ?todate4.
    ?time5 owl:fromdate ?fromdate5.
    ?time5 owl:todate ?todate5.
FILTER (
  (BOUND(?fromdate1) && xsd:integer(?fromdate1) <= version ) &&
  (BOUND(?fromdate2) && xsd:integer(?fromdate2) <= version  ) &&
  (BOUND(?fromdate3) && xsd:integer(?fromdate3) <= version ) &&
  (BOUND(?fromdate4) && xsd:integer(?fromdate4) <= version )  &&
  (BOUND(?fromdate5) && xsd:integer(?fromdate5) <= version ) &&
  (BOUND(?todate1) && xsd:integer(?todate1) >=version  || ?todate1="9999") &&
  (BOUND(?todate2) && xsd:integer(?todate2)>=version || ?todate2="9999") &&
 (BOUND(?todate3) && xsd:integer(?todate3) >=version  || ?todate3="9999") &&
 (BOUND(?todate4) && xsd:integer(?todate4) >=version  || ?todate4="9999") &&
  (BOUND(?todate5) && xsd:integer(?todate5) >= version  || ?todate5="9999")
)
    
  }
}`,
6:`PREFIX owl: <http://www.w3.org/2002/07/owl/>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
  PREFIX dcat: <http://www.w3.org/ns/dcat#>
  PREFIX dc: <http://purl.org/dc/terms/>
  SELECT DISTINCT ?dataset ?distribution ?URL  from <BearC.ttl>  WHERE
  {
    
    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset.
    ?dataset dc:title ?c2.
    ?c2 owl:valueAs ?title .
    ?dataset dc:issued ?c3.
    ?c3 owl:valueAs ?date .
    ?dataset dc:modified ?c4.
    ?c4 owl:valueAs ?date.

    ?c1 owl:timeinfo ?time1.
    ?c2 owl:timeinfo ?time2.
    ?c3 owl:timeinfo ?time3.
    ?c4 owl:timeinfo ?time4.
   

    ?time1 owl:fromdate ?fromdate1.
    ?time1 owl:todate ?todate1.
    ?time2 owl:fromdate ?fromdate2.
    ?time2 owl:todate ?todate2.
    ?time3 owl:fromdate ?fromdate3.
    ?time3 owl:todate ?todate3.
    ?time4 owl:fromdate ?fromdate4.
    ?time4 owl:todate ?todate4.
    
FILTER (
  (BOUND(?fromdate1) && xsd:integer(?fromdate1) <= version) &&
  (BOUND(?fromdate2) && xsd:integer(?fromdate2) <= version) &&
  (BOUND(?fromdate3) && xsd:integer(?fromdate3) <= version) &&
  (BOUND(?fromdate4) && xsd:integer(?fromdate4) <= version)  &&
  (BOUND(?todate1) && xsd:integer(?todate1) >=version || ?todate1="9999") &&
  (BOUND(?todate2) && xsd:integer(?todate2)>=version || ?todate2="9999") &&
  (BOUND(?todate3) && xsd:integer(?todate3) >=version || ?todate3="9999") &&
  (BOUND(?todate4) && xsd:integer(?todate4) >=version || ?todate4="9999") 

)
   }`,

7:`PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/terms/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX owl: <http://www.w3.org/2002/07/owl/>

SELECT DISTINCT ?dataset ?distribution ?title ?URL  from <BearC.ttl> WHERE { 

    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset .
    ?dataset dc:title ?c2.
    ?c2 owl:valueAs ?title .
    ?dataset dc:issued ?c3.
    ?c3 owl:valueAs ?date .
    ?dataset dcat:distribution ?c4.
    ?c4 owl:valueAs ?distribution .
    ?distribution dcat:accessURL ?c5.
    ?c5 owl:valueAs ?URL .
    FILTER (?date>"2014-12-31T23:59:59"^^xsd:dateTime)


    ?c1 owl:timeinfo ?time1.
    ?c2 owl:timeinfo ?time2.
    ?c3 owl:timeinfo ?time3.
    ?c4 owl:timeinfo ?time4.
    ?c5 owl:timeinfo ?time5.
   
    

    ?time1 owl:fromdate ?fromdate1.
    ?time1 owl:todate ?todate1.
    ?time2 owl:fromdate ?fromdate2.
    ?time2 owl:todate ?todate2.
    ?time3 owl:fromdate ?fromdate3.
    ?time3 owl:todate ?todate3.
    ?time4 owl:fromdate ?fromdate4.
    ?time4 owl:todate ?todate4.
    ?time5 owl:fromdate ?fromdate5.
    ?time5 owl:todate ?todate5.
    


   FILTER (
  (BOUND(?fromdate1) && xsd:integer(?fromdate1) <= version) &&
  (BOUND(?fromdate2) && xsd:integer(?fromdate2) <= version) &&
  (BOUND(?fromdate3) && xsd:integer(?fromdate3) <= version) &&
  (BOUND(?fromdate4) && xsd:integer(?fromdate4) <= version)  &&
  (BOUND(?fromdate5) && xsd:integer(?fromdate5) <= version) &&
  (BOUND(?todate1) && xsd:integer(?todate1) >= version || ?todate1="9999") &&
  (BOUND(?todate2) && xsd:integer(?todate2) >= version || ?todate2="9999") &&
  (BOUND(?todate3) && xsd:integer(?todate3) >=version || ?todate3="9999") &&
  (BOUND(?todate4) && xsd:integer(?todate4) >=version || ?todate4="9999") &&
  (BOUND(?todate5) && xsd:integer(?todate5) >=version || ?todate5="9999") 


)


}`,

8: `PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/terms/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT DISTINCT ?dataset ?distribution ?filetitle ?description  from <BearC.ttl>  WHERE {
    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset .
    ?dataset dc:title ?c2.
    ?c2 owl:valueAs ?title .
    ?dataset dcat:distribution ?c3.
    ?c3 owl:valueAs ?distribution .
    ?distribution dcat:accessURL ?c4.
    ?c4 owl:valueAs ?URL .
    ?distribution dcat:mediaType ?c5.
    ?c5 owl:valueAs "text/csv" .
    ?distribution dc:title ?c6.
    ?c6 owl:valueAs ?filetitle .
    ?distribution dc:description ?c7.
    ?c7 owl:valueAs ?description .

    ?c1 owl:timeinfo ?time1.
    ?c2 owl:timeinfo ?time2.
    ?c3 owl:timeinfo ?time3.
    ?c4 owl:timeinfo ?time4.
    ?c5 owl:timeinfo ?time5.
    ?c6 owl:timeinfo ?time6.
    ?c7 owl:timeinfo ?time7.


    ?time1 owl:fromdate ?fromdate1.
    ?time1 owl:todate ?todate1.
    ?time2 owl:fromdate ?fromdate2.
    ?time2 owl:todate ?todate2.
    ?time3 owl:fromdate ?fromdate3.
    ?time3 owl:todate ?todate3.
    ?time4 owl:fromdate ?fromdate4.
    ?time4 owl:todate ?todate4.
    ?time5 owl:fromdate ?fromdate5.
    ?time5 owl:todate ?todate5.
    ?time6 owl:fromdate ?fromdate6.
    ?time6 owl:todate ?todate6.
    ?time7 owl:fromdate ?fromdate7.
    ?time7 owl:todate ?todate7.

     
FILTER (
  (BOUND(?fromdate1) && xsd:integer(?fromdate1) <= version) &&
  (BOUND(?fromdate2) && xsd:integer(?fromdate2) <= version) &&
  (BOUND(?fromdate3) && xsd:integer(?fromdate3) <= version) &&
  (BOUND(?fromdate4) && xsd:integer(?fromdate4) <= version)  &&
  (BOUND(?fromdate5) && xsd:integer(?fromdate5) <= version) &&
  (BOUND(?fromdate6) && xsd:integer(?fromdate6) <= version) &&
  (BOUND(?fromdate7) && xsd:integer(?fromdate7) <= version) &&
  (BOUND(?todate1) && xsd:integer(?todate1) >= version || ?todate1="9999") &&
  (BOUND(?todate2) && xsd:integer(?todate2) >= version || ?todate2="9999") &&
  (BOUND(?todate3) && xsd:integer(?todate3) >= version || ?todate3="9999") &&
  (BOUND(?todate4) && xsd:integer(?todate4) >= version || ?todate4="9999") &&
  (BOUND(?todate5) && xsd:integer(?todate5) >= version || ?todate5="9999") &&
  (BOUND(?todate6) && xsd:integer(?todate6) >= version || ?todate6="9999") &&
  (BOUND(?todate7) && xsd:integer(?todate7) >= version || ?todate7="9999") 

)

}`,
9:`  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/terms/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl/>

SELECT DISTINCT ?dataset ?URL1 ?titleFile1 ?description1  from <BearC.ttl> WHERE {

    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset .
    ?dataset dc:title ?c2.
    ?c2 owl:valueAs ?title .
    ?distr1 dcat:distribution ?c3.
    ?c3 owl:valueAs ?dataset.
    ?distr1 dcat:accessURL ?c4.
    ?c4 owl:valueAs ?URL1 .
    ?distr1 dcat:mediaType ?c5.
    ?c5 owl:valueAs "text/csv" .
    ?distr1 dc:title ?c6.
    ?c6 owl:valueAs ?titleFile1.
    ?distr1 dc:description ?c7.
    ?c7 owl:valueAs ?description1 .
    ?distr2 dcat:distribution ?c8.
    ?c8 owl:valueAs ?dataset .
    ?distr2 dcat:accessURL ?c9.
    ?c9 owl:valueAs ?URL2 .
    ?distr2 dcat:mediaType ?c10.
    ?c10 owl:valueAs "text/tab-separated-values" .
    ?distr2 dc:title ?c11.
    ?c11 owl:valueAs ?titleFile2 .
    ?distr2 dc:description ?c12.
    ?c12 owl:valueAs ?description2 .


    ?c1 owl:timeinfo ?time1.
    ?c2 owl:timeinfo ?time2.
    ?c3 owl:timeinfo ?time3.
    ?c4 owl:timeinfo ?time4.
    ?c5 owl:timeinfo ?time5.
    ?c6 owl:timeinfo ?time6.
    ?c7 owl:timeinfo ?time7.
    ?c8 owl:timeinfo ?time8.
    ?c9 owl:timeinfo ?time9.
    ?c10 owl:timeinfo ?time10.
    ?c11 owl:timeinfo ?time11.
    ?c12 owl:timeinfo ?time12.

    ?time1 owl:fromdate ?fromdate1.
    ?time1 owl:todate ?todate1.
    ?time2 owl:fromdate ?fromdate2.
    ?time2 owl:todate ?todate2.
    ?time3 owl:fromdate ?fromdate3.
    ?time3 owl:todate ?todate3.
    ?time4 owl:fromdate ?fromdate4.
    ?time4 owl:todate ?todate4.
    ?time5 owl:fromdate ?fromdate5.
    ?time5 owl:todate ?todate5.
    ?time6 owl:fromdate ?fromdate6.
    ?time6 owl:todate ?todate6.
    ?time7 owl:fromdate ?fromdate7.
    ?time7 owl:todate ?todate7.
    ?time8 owl:fromdate ?fromdate8.
    ?time8 owl:todate ?todate8.
    ?time9 owl:fromdate ?fromdate9.
    ?time9 owl:todate ?todate9.
    ?time10 owl:fromdate ?fromdate10.
    ?time10 owl:todate ?todate10.
    ?time11 owl:fromdate ?fromdate11.
    ?time11 owl:todate ?todate11.
    ?time12 owl:fromdate ?fromdate12.
    ?time12 owl:todate ?todate12.



FILTER (
  (BOUND(?fromdate1) && xsd:integer(?fromdate1) <= version) &&
  (BOUND(?fromdate2) && xsd:integer(?fromdate2) <= version) &&
  (BOUND(?fromdate3) && xsd:integer(?fromdate3) <= version) &&
  (BOUND(?fromdate4) && xsd:integer(?fromdate4) <= version)  &&
  (BOUND(?fromdate5) && xsd:integer(?fromdate5) <= version) &&
  (BOUND(?fromdate6) && xsd:integer(?fromdate6) <= version) &&
  (BOUND(?fromdate7) && xsd:integer(?fromdate7) <= version) &&
  (BOUND(?fromdate8) && xsd:integer(?fromdate8) <= version) &&
  (BOUND(?fromdate9) && xsd:integer(?fromdate9) <= version) &&
  (BOUND(?fromdate10) && xsd:integer(?fromdate10) <= version) &&
  (BOUND(?fromdate11) && xsd:integer(?fromdate11) <= version) &&
  (BOUND(?fromdate12) && xsd:integer(?fromdate12) <= version) &&
  (BOUND(?todate1) && xsd:integer(?todate1) >=version || ?todate1="9999") &&
  (BOUND(?todate2) && xsd:integer(?todate2) >=version || ?todate2="9999") &&
  (BOUND(?todate3) && xsd:integer(?todate3) >=version || ?todate3="9999") &&
  (BOUND(?todate4) && xsd:integer(?todate4) >=version || ?todate4="9999") &&
  (BOUND(?todate5) && xsd:integer(?todate5) >=version || ?todate5="9999") &&
  (BOUND(?todate6) && xsd:integer(?todate6) >=version || ?todate6="9999") &&
  (BOUND(?todate7) && xsd:integer(?todate7) >=version || ?todate7="9999") &&
  (BOUND(?todate8) && xsd:integer(?todate8) >=version || ?todate8="9999") &&
  (BOUND(?todate9) && xsd:integer(?todate9) >=version || ?todate9="9999") &&
  (BOUND(?todate10) && xsd:integer(?todate10) >=version || ?todate10="9999") &&
  (BOUND(?todate11) && xsd:integer(?todate11) >=version || ?todate11="9999") &&
  (BOUND(?todate12) && xsd:integer(?todate12) >=version || ?todate12="9999")
  )

   
}`,

10:`PREFIX dcat: <http://www.w3.org/ns/dcat#>
  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX dc: <http://purl.org/dc/terms/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl/>
SELECT DISTINCT ?dataset ?distribution ?URL ?mediaType ?description from <BearC.ttl> WHERE 
{
    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset .
    ?dataset dc:title ?c2.
    ?c2 owl:valueAs ?title .
    ?dataset dcat:distribution ?c3.
    ?c3 owl:valueAs ?distribution .
    ?distribution dcat:accessURL ?c4.
    ?c4 owl:valueAs ?URL .
    ?distribution dcat:mediaType ?c5.
    ?c5 owl:valueAs ?mediaType .
    ?distribution dc:title ?c6.
    ?c6 owl:valueAs ?filetitle .
    ?distribution dc:description ?c7.
    ?c7 owl:valueAs ?description .

     ?c1 owl:timeinfo ?time1.
    ?c2 owl:timeinfo ?time2.
    ?c3 owl:timeinfo ?time3.
    ?c4 owl:timeinfo ?time4.
    ?c5 owl:timeinfo ?time5.
    ?c6 owl:timeinfo ?time6.
    ?c7 owl:timeinfo ?time7.


    ?time1 owl:fromdate ?fromdate1.
    ?time1 owl:todate ?todate1.
    ?time2 owl:fromdate ?fromdate2.
    ?time2 owl:todate ?todate2.
    ?time3 owl:fromdate ?fromdate3.
    ?time3 owl:todate ?todate3.
    ?time4 owl:fromdate ?fromdate4.
    ?time4 owl:todate ?todate4.
    ?time5 owl:fromdate ?fromdate5.
    ?time5 owl:todate ?todate5.
    ?time6 owl:fromdate ?fromdate6.
    ?time6 owl:todate ?todate6.
    ?time7 owl:fromdate ?fromdate7.
    ?time7 owl:todate ?todate7.

     
FILTER (
  (BOUND(?fromdate1) && xsd:integer(?fromdate1) <= version) &&
  (BOUND(?fromdate2) && xsd:integer(?fromdate2) <= version) &&
  (BOUND(?fromdate3) && xsd:integer(?fromdate3) <= version) &&
  (BOUND(?fromdate4) && xsd:integer(?fromdate4) <= version)  &&
  (BOUND(?fromdate5) && xsd:integer(?fromdate5) <= version) &&
  (BOUND(?fromdate6) && xsd:integer(?fromdate6) <= version) &&
  (BOUND(?fromdate7) && xsd:integer(?fromdate7) <= version) &&
  (BOUND(?todate1) && xsd:integer(?todate1) >=version || ?todate1="9999") &&
  (BOUND(?todate2) && xsd:integer(?todate2) >=version || ?todate2="9999") &&
  (BOUND(?todate3) && xsd:integer(?todate3) >=version || ?todate3="9999") &&
  (BOUND(?todate4) && xsd:integer(?todate4) >=version || ?todate4="9999") &&
  (BOUND(?todate5) && xsd:integer(?todate5) >=version || ?todate5="9999") &&
  (BOUND(?todate6) && xsd:integer(?todate6) >=version || ?todate6="9999") &&
  (BOUND(?todate7) && xsd:integer(?todate7) >=version || ?todate7="9999") 

)


}
ORDER BY ?filetitle
LIMIT 100 OFFSET 100`
},
  dm: { 1: `PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>

SELECT DISTINCT ?dataset ?distribution ?URL from <BearC.ttl>
WHERE {
  ?dataset rdf:type ?c1.
  ?c1 owl:valueAs dcat:Dataset.
  ?dataset dcat:distribution ?c2.
  ?c2 owl:valueAs ?distribution.
  ?distribution dcat:accessURL ?c3.
  ?c3 owl:valueAs ?URL.

  # Ensure the triple was valid in version 10
  {
 
    ?c1 owl:timeinfo ?timeC1.
    ?timeC1 owl:fromdate ?fromC1; owl:todate ?toC1.
    FILTER( xsd:integer(?fromC1) <= fromVersion && xsd:integer(?toC1) >= fromVersion )

    ?c2 owl:timeinfo ?timeC2.
    ?timeC2 owl:fromdate ?fromC2; owl:todate ?toC2.
    FILTER( xsd:integer(?fromC2) <= fromVersion && xsd:integer(?toC2) >= fromVersion )

    ?c3 owl:timeinfo ?timeC3.
    ?timeC3 owl:fromdate ?fromC3; owl:todate ?toC3.
    FILTER( xsd:integer(?fromC3) <= fromVersion && xsd:integer(?toC3) >= fromVersion )
  }

  # Exclude the triple if it was revalidated in version 33
  FILTER NOT EXISTS {
    ?c1 owl:timeinfo ?timeC1_2.
    ?timeC1_2 owl:fromdate ?fromC1_2; owl:todate ?toC1_2.
    FILTER( xsd:integer(?fromC1_2) <= toVersion && xsd:integer(?toC1_2) >= toVersion )

    ?c2 owl:timeinfo ?timeC2_2.
    ?timeC2_2 owl:fromdate ?fromC2_2; owl:todate ?toC2_2.
    FILTER( xsd:integer(?fromC2_2) <= toVersion && xsd:integer(?toC2_2) >= toVersion )

    ?c3 owl:timeinfo ?timeC3_2.
    ?timeC3_2 owl:fromdate ?fromC3_2; owl:todate ?toC3_2.
    FILTER( xsd:integer(?fromC3_2) <= toVersion && xsd:integer(?toC3_2) >= toVersion )
  }
}`,

2: `PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/terms/>

SELECT DISTINCT ?dataset ?modified_date FROM <BearC.ttl> WHERE {
 
    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset .
    ?dataset dc:modified ?c2.
    ?c2 owl:valueAs ?modified_date .  
    {
 
    ?c1 owl:timeinfo ?timeC1.
    ?timeC1 owl:fromdate ?fromC1; owl:todate ?toC1.
    FILTER( xsd:integer(?fromC1) <= fromVersion && xsd:integer(?toC1) >= fromVersion )

    ?c2 owl:timeinfo ?timeC2.
    ?timeC2 owl:fromdate ?fromC2; owl:todate ?toC2.
    FILTER( xsd:integer(?fromC2) <= fromVersion && xsd:integer(?toC2) >= fromVersion )
   
  }

  # Exclude the triple if it was revalidated in version 33
  FILTER NOT EXISTS {
    ?c1 owl:timeinfo ?timeC1_2.
    ?timeC1_2 owl:fromdate ?fromC1_2; owl:todate ?toC1_2.
    FILTER( xsd:integer(?fromC1_2) <= toVersion  && xsd:integer(?toC1_2) >= toVersion )

    ?c2 owl:timeinfo ?timeC2_2.
    ?timeC2_2 owl:fromdate ?fromC2_2; owl:todate ?toC2_2.
    FILTER( xsd:integer(?fromC2_2) <= toVersion && xsd:integer(?toC2_2) >= toVersion )

  }

}`,
3: `PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX vcard: <http://www.w3.org/2006/vcard/ns#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT DISTINCT ?dataset ?contact ?name ?email FROM <BearC.ttl>
WHERE {
    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset.
    ?dataset dcat:contactPoint ?c2.
    ?c2 owl:valueAs ?contact.

    ?contact vcard:fn ?c3.
    ?c3 owl:valueAs ?name.

    OPTIONAL {
        ?contact vcard:hasEmail ?c4.
        ?c4 owl:valueAs ?email.

        ?c4 owl:timeinfo ?timeC4.
        ?timeC4 owl:fromdate ?fromC4; owl:todate ?toC4.
        FILTER(xsd:integer(?fromC4) <= fromVersion && xsd:integer(?toC4) >= fromVersion)
    }

    # Ensure validity at version 10
 {   ?c1 owl:timeinfo ?timeC1.  
    ?timeC1 owl:fromdate ?fromC1; owl:todate ?toC1.  
    FILTER(xsd:integer(?fromC1) <= fromVersion && xsd:integer(?toC1) >= fromVersion)

    ?c2 owl:timeinfo ?timeC2.  
    ?timeC2 owl:fromdate ?fromC2; owl:todate ?toC2.  
    FILTER(xsd:integer(?fromC2) <= fromVersion && xsd:integer(?toC2) >= fromVersion)

    ?c3 owl:timeinfo ?timeC3.  
    ?timeC3 owl:fromdate ?fromC3; owl:todate ?toC3.  
    FILTER(xsd:integer(?fromC3) <= fromVersion && xsd:integer(?toC3) >= fromVersion)
}
    # Exclude datasets revalidated in version 33
    FILTER NOT EXISTS {
        ?c1 owl:timeinfo ?timeC1_2.
        ?timeC1_2 owl:fromdate ?fromC1_2; owl:todate ?toC1_2.
        FILTER(xsd:integer(?fromC1_2) <= toVersion && xsd:integer(?toC1_2) >= toVersion)

        ?c2 owl:timeinfo ?timeC2_2.
        ?timeC2_2 owl:fromdate ?fromC2_2; owl:todate ?toC2_2.
        FILTER(xsd:integer(?fromC2_2) <= toVersion && xsd:integer(?toC2_2) >= toVersion)

        ?c3 owl:timeinfo ?timeC3_2.
        ?timeC3_2 owl:fromdate ?fromC3_2; owl:todate ?toC3_2.
        FILTER(xsd:integer(?fromC3_2) <= toVersion && xsd:integer(?toC3_2) >= toVersion)
 

   
    }
}`,
4:`PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/terms/>
PREFIX eu: <http://ec.europa.eu/geninfo/>
SELECT DISTINCT ?dataset ?title ?distribution ?URL FROM <BearC.ttl> WHERE {
 
    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset .
    ?dataset dc:title ?c2.
    ?c2 owl:valueAs ?title .
    ?dataset dcat:distribution ?c3.
    ?c3 owl:valueAs ?distribution.
    ?distribution dcat:accessURL ?c4.
    ?c4 owl:valueAs ?URL .
    ?distribution dc:license ?c5.
    ?c5 owl:valueAs eu:legal_notices_en.htm .
    FILTER regex(?title, "region")

 { 
  ?c1 owl:timeinfo ?timeC1.  ?timeC1 owl:fromdate ?fromC1; owl:todate ?toC1.  FILTER(xsd:integer(?fromC1) <= fromVersion && xsd:integer(?toC1) >= fromVersion)
  ?c2 owl:timeinfo ?timeC2.  ?timeC2 owl:fromdate ?fromC2; owl:todate ?toC2.  FILTER(xsd:integer(?fromC2) <= fromVersion && xsd:integer(?toC2) >= fromVersion)
  ?c3 owl:timeinfo ?timeC3.  ?timeC3 owl:fromdate ?fromC3; owl:todate ?toC3.  FILTER(xsd:integer(?fromC3) <= fromVersion && xsd:integer(?toC3) >= fromVersion)
  ?c4 owl:timeinfo ?timeC4.  ?timeC4 owl:fromdate ?fromC4; owl:todate ?toC4.  FILTER(xsd:integer(?fromC4) <= fromVersion && xsd:integer(?toC4) >= fromVersion)
  ?c5 owl:timeinfo ?timeC5.  ?timeC5 owl:fromdate ?fromC5; owl:todate ?toC5.  FILTER(xsd:integer(?fromC5) <= fromVersion && xsd:integer(?toC5) >= fromVersion)
}

 FILTER NOT EXISTS {

    ?c1 owl:timeinfo ?timeC1_2.  ?timeC1_2 owl:fromdate ?fromC1_2; owl:todate ?toC1_2.  FILTER(xsd:integer(?fromC1_2) <= toVersion && xsd:integer(?toC1_2) >= toVersion)
    ?c2 owl:timeinfo ?timeC2_2.  ?timeC2_2 owl:fromdate ?fromC2_2; owl:todate ?toC2_2.  FILTER(xsd:integer(?fromC2_2) <=toVersion && xsd:integer(?toC2_2) >= toVersion)
    ?c3 owl:timeinfo ?timeC3_2.  ?timeC3_2 owl:fromdate ?fromC3_2; owl:todate ?toC3_2.  FILTER(xsd:integer(?fromC3_2) <= toVersion && xsd:integer(?toC3_2) >= toVersion)
    ?c4 owl:timeinfo ?timeC4_2.  ?timeC4_2 owl:fromdate ?fromC4_2; owl:todate ?toC4_2.  FILTER(xsd:integer(?fromC4_2) <= toVersion && xsd:integer(?toC4_2) >= toVersion)
    ?c5 owl:timeinfo ?timeC5_2.  ?timeC5_2 owl:fromdate ?fromC5_2; owl:todate ?toC5_2.  FILTER(xsd:integer(?fromC5_2) <= toVersion && xsd:integer(?toC5_2) >= toVersion)
}
}`,
5:`PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/terms/>
SELECT DISTINCT ?dataset ?title ?distribution ?URL FROM <BearC.ttl> WHERE
{
  {
    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset .
    ?dataset dc:title ?c2.
    ?c2 owl:valueAs ?title .
    ?dataset dcat:distribution ?c3.
    ?c3 owl:valueAs ?distribution .
    ?distribution dcat:accessURL ?c4.
    ?c4 owl:valueAs ?URL .
    ?distribution dc:description ?c5.
    ?c5 owl:valueAs "Austria" .
{ 
  ?c1 owl:timeinfo ?timeC1.  ?timeC1 owl:fromdate ?fromC1; owl:todate ?toC1.  FILTER(xsd:integer(?fromC1) <= fromVersion && xsd:integer(?toC1) >= fromVersion)
  ?c2 owl:timeinfo ?timeC2.  ?timeC2 owl:fromdate ?fromC2; owl:todate ?toC2.  FILTER(xsd:integer(?fromC2) <= fromVersion && xsd:integer(?toC2) >= fromVersion)
  ?c3 owl:timeinfo ?timeC3.  ?timeC3 owl:fromdate ?fromC3; owl:todate ?toC3.  FILTER(xsd:integer(?fromC3) <= fromVersion && xsd:integer(?toC3) >= fromVersion)
  ?c4 owl:timeinfo ?timeC4.  ?timeC4 owl:fromdate ?fromC4; owl:todate ?toC4.  FILTER(xsd:integer(?fromC4) <= fromVersion && xsd:integer(?toC4) >= fromVersion)
  ?c5 owl:timeinfo ?timeC5.  ?timeC5 owl:fromdate ?fromC5; owl:todate ?toC5.  FILTER(xsd:integer(?fromC5) <= fromVersion && xsd:integer(?toC5) >= fromVersion)
}
FILTER NOT EXISTS {

    ?c1 owl:timeinfo ?timeC1_2.  ?timeC1_2 owl:fromdate ?fromC1_2; owl:todate ?toC1_2.  FILTER(xsd:integer(?fromC1_2) <= toVersion && xsd:integer(?toC1_2) >= toVersion)
    ?c2 owl:timeinfo ?timeC2_2.  ?timeC2_2 owl:fromdate ?fromC2_2; owl:todate ?toC2_2.  FILTER(xsd:integer(?fromC2_2) <= toVersion && xsd:integer(?toC2_2) >= toVersion)
    ?c3 owl:timeinfo ?timeC3_2.  ?timeC3_2 owl:fromdate ?fromC3_2; owl:todate ?toC3_2.  FILTER(xsd:integer(?fromC3_2) <= toVersion && xsd:integer(?toC3_2) >= toVersion)
    ?c4 owl:timeinfo ?timeC4_2.  ?timeC4_2 owl:fromdate ?fromC4_2; owl:todate ?toC4_2.  FILTER(xsd:integer(?fromC4_2) <= toVersion && xsd:integer(?toC4_2) >= toVersion)
    ?c5 owl:timeinfo ?timeC5_2.  ?timeC5_2 owl:fromdate ?fromC5_2; owl:todate ?toC5_2.  FILTER(xsd:integer(?fromC5_2) <= toVersion && xsd:integer(?toC5_2) >= toVersion)
 }
}

UNION
  {
     ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset .
    ?dataset dc:title ?c2.
    ?c2 owl:valueAs ?title .
    ?dataset dcat:distribution ?c3.
    ?c3 owl:valueAs ?distribution .
    ?distribution dcat:accessURL ?c4.
    ?c4 owl:valueAs ?URL .
    ?distribution dc:description ?c5.
    ?c5 owl:valueAs "Germany".
{ 
  ?c1 owl:timeinfo ?timeC1.  ?timeC1 owl:fromdate ?fromC1; owl:todate ?toC1.  FILTER(xsd:integer(?fromC1) <= fromVersion && xsd:integer(?toC1) >= fromVersion)
  ?c2 owl:timeinfo ?timeC2.  ?timeC2 owl:fromdate ?fromC2; owl:todate ?toC2.  FILTER(xsd:integer(?fromC2) <= fromVersion && xsd:integer(?toC2) >= fromVersion)
  ?c3 owl:timeinfo ?timeC3.  ?timeC3 owl:fromdate ?fromC3; owl:todate ?toC3.  FILTER(xsd:integer(?fromC3) <= fromVersion && xsd:integer(?toC3) >= fromVersion)
  ?c4 owl:timeinfo ?timeC4.  ?timeC4 owl:fromdate ?fromC4; owl:todate ?toC4.  FILTER(xsd:integer(?fromC4) <= fromVersion && xsd:integer(?toC4) >= fromVersion)
  ?c5 owl:timeinfo ?timeC5.  ?timeC5 owl:fromdate ?fromC5; owl:todate ?toC5.  FILTER(xsd:integer(?fromC5) <= fromVersion && xsd:integer(?toC5) >= fromVersion)
}
FILTER NOT EXISTS {

    ?c1 owl:timeinfo ?timeC1_2.  ?timeC1_2 owl:fromdate ?fromC1_2; owl:todate ?toC1_2.  FILTER(xsd:integer(?fromC1_2) <= toVersion && xsd:integer(?toC1_2) >= toVersion)
    ?c2 owl:timeinfo ?timeC2_2.  ?timeC2_2 owl:fromdate ?fromC2_2; owl:todate ?toC2_2.  FILTER(xsd:integer(?fromC2_2) <= toVersion && xsd:integer(?toC2_2) >= toVersion)
    ?c3 owl:timeinfo ?timeC3_2.  ?timeC3_2 owl:fromdate ?fromC3_2; owl:todate ?toC3_2.  FILTER(xsd:integer(?fromC3_2) <= toVersion && xsd:integer(?toC3_2) >= toVersion)
    ?c4 owl:timeinfo ?timeC4_2.  ?timeC4_2 owl:fromdate ?fromC4_2; owl:todate ?toC4_2.  FILTER(xsd:integer(?fromC4_2) <= toVersion && xsd:integer(?toC4_2) >= toVersion)
    ?c5 owl:timeinfo ?timeC5_2.  ?timeC5_2 owl:fromdate ?fromC5_2; owl:todate ?toC5_2.  FILTER(xsd:integer(?fromC5_2) <= toVersion && xsd:integer(?toC5_2) >= toVersion)
 }
}

}`,

6:`PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/terms/>
SELECT DISTINCT ?dataset ?title ?date FROM <BearC.ttl> WHERE {

    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset.
    ?dataset dc:title ?c2.
    ?c2 owl:valueAs ?title .
    ?dataset dc:issued ?c3.
    ?c3 owl:valueAs ?date .
    ?dataset dc:modified ?c4.
    ?c4 owl:valueAs ?date.

{ 
  ?c1 owl:timeinfo ?timeC1.  ?timeC1 owl:fromdate ?fromC1; owl:todate ?toC1.  FILTER(xsd:integer(?fromC1) <= fromVersion && xsd:integer(?toC1) >= fromVersion)
  ?c2 owl:timeinfo ?timeC2.  ?timeC2 owl:fromdate ?fromC2; owl:todate ?toC2.  FILTER(xsd:integer(?fromC2) <= fromVersion && xsd:integer(?toC2) >= fromVersion)
  ?c3 owl:timeinfo ?timeC3.  ?timeC3 owl:fromdate ?fromC3; owl:todate ?toC3.  FILTER(xsd:integer(?fromC3) <= fromVersion && xsd:integer(?toC3) >= fromVersion)
  ?c4 owl:timeinfo ?timeC4.  ?timeC4 owl:fromdate ?fromC4; owl:todate ?toC4.  FILTER(xsd:integer(?fromC4) <= fromVersion && xsd:integer(?toC4) >= fromVersion)
}
  # Exclude if any of the 12 components were revalidated in version 33
  FILTER NOT EXISTS {

    ?c1 owl:timeinfo ?timeC1_2.  ?timeC1_2 owl:fromdate ?fromC1_2; owl:todate ?toC1_2.  FILTER(xsd:integer(?fromC1_2) <= toVersion && xsd:integer(?toC1_2) >= toVersion)
    ?c2 owl:timeinfo ?timeC2_2.  ?timeC2_2 owl:fromdate ?fromC2_2; owl:todate ?toC2_2.  FILTER(xsd:integer(?fromC2_2) <= toVersion && xsd:integer(?toC2_2) >= toVersion)
    ?c3 owl:timeinfo ?timeC3_2.  ?timeC3_2 owl:fromdate ?fromC3_2; owl:todate ?toC3_2.  FILTER(xsd:integer(?fromC3_2) <= toVersion && xsd:integer(?toC3_2) >= toVersion)
    ?c4 owl:timeinfo ?timeC4_2.  ?timeC4_2 owl:fromdate ?fromC4_2; owl:todate ?toC4_2.  FILTER(xsd:integer(?fromC4_2) <= toVersion && xsd:integer(?toC4_2) >= toVersion)

    
  }

}`,
7: `PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/terms/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX owl: <http://www.w3.org/2002/07/owl/>

SELECT DISTINCT ?dataset ?title ?distribution ?URL FROM <BearC.ttl> WHERE { 

    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset .
    ?dataset dc:title ?c2.
    ?c2 owl:valueAs ?title .
    ?dataset dc:issued ?c3.
    ?c3 owl:valueAs ?date .
    ?dataset dcat:distribution ?c4.
    ?c4 owl:valueAs ?distribution .
    ?distribution dcat:accessURL ?c5.
    ?c5 owl:valueAs ?URL .
    FILTER (?date>"2014-12-31T23:59:59"^^xsd:dateTime)

{ 
  ?c1 owl:timeinfo ?timeC1.  ?timeC1 owl:fromdate ?fromC1; owl:todate ?toC1.  FILTER(xsd:integer(?fromC1) <= fromVersion && xsd:integer(?toC1) >= fromVersion )
  ?c2 owl:timeinfo ?timeC2.  ?timeC2 owl:fromdate ?fromC2; owl:todate ?toC2.  FILTER(xsd:integer(?fromC2) <= fromVersion  && xsd:integer(?toC2) >= fromVersion )
  ?c3 owl:timeinfo ?timeC3.  ?timeC3 owl:fromdate ?fromC3; owl:todate ?toC3.  FILTER(xsd:integer(?fromC3) <= fromVersion  && xsd:integer(?toC3) >= fromVersion )
  ?c4 owl:timeinfo ?timeC4.  ?timeC4 owl:fromdate ?fromC4; owl:todate ?toC4.  FILTER(xsd:integer(?fromC4) <= fromVersion  && xsd:integer(?toC4) >= fromVersion )
  ?c5 owl:timeinfo ?timeC5.  ?timeC5 owl:fromdate ?fromC5; owl:todate ?toC5.  FILTER(xsd:integer(?fromC5) <= fromVersion  && xsd:integer(?toC5) >= fromVersion )
 }
  # Exclude if any of the 12 components were revalidated in version 33
  FILTER NOT EXISTS {

    ?c1 owl:timeinfo ?timeC1_2.  ?timeC1_2 owl:fromdate ?fromC1_2; owl:todate ?toC1_2.  FILTER(xsd:integer(?fromC1_2) <= toVersion && xsd:integer(?toC1_2) >= toVersion)
    ?c2 owl:timeinfo ?timeC2_2.  ?timeC2_2 owl:fromdate ?fromC2_2; owl:todate ?toC2_2.  FILTER(xsd:integer(?fromC2_2) <= toVersion && xsd:integer(?toC2_2) >= toVersion)
    ?c3 owl:timeinfo ?timeC3_2.  ?timeC3_2 owl:fromdate ?fromC3_2; owl:todate ?toC3_2.  FILTER(xsd:integer(?fromC3_2) <= toVersion && xsd:integer(?toC3_2) >= toVersion)
    ?c4 owl:timeinfo ?timeC4_2.  ?timeC4_2 owl:fromdate ?fromC4_2; owl:todate ?toC4_2.  FILTER(xsd:integer(?fromC4_2) <= toVersion && xsd:integer(?toC4_2) >= toVersion)
    ?c5 owl:timeinfo ?timeC5_2.  ?timeC5_2 owl:fromdate ?fromC5_2; owl:todate ?toC5_2.  FILTER(xsd:integer(?fromC5_2) <= toVersion && xsd:integer(?toC5_2) >= toVersion)
    
  }
}`,
8:`PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/terms/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT DISTINCT ?dataset ?title ?distribution ?URL ?filetitle ?description FROM <BearC.ttl> WHERE {
    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset .
    ?dataset dc:title ?c2.
    ?c2 owl:valueAs ?title .
    ?dataset dcat:distribution ?c3.
    ?c3 owl:valueAs ?distribution .
    ?distribution dcat:accessURL ?c4.
    ?c4 owl:valueAs ?URL .
    ?distribution dcat:mediaType ?c5.
    ?c5 owl:valueAs "text/csv" .
    ?distribution dc:title ?c6.
    ?c6 owl:valueAs ?filetitle .
    ?distribution dc:description ?c7.
    ?c7 owl:valueAs ?description .

{ 
  ?c1 owl:timeinfo ?timeC1.  ?timeC1 owl:fromdate ?fromC1; owl:todate ?toC1.  FILTER(xsd:integer(?fromC1) <= fromVersion && xsd:integer(?toC1) >= fromVersion)
  ?c2 owl:timeinfo ?timeC2.  ?timeC2 owl:fromdate ?fromC2; owl:todate ?toC2.  FILTER(xsd:integer(?fromC2) <= fromVersion && xsd:integer(?toC2) >= fromVersion)
  ?c3 owl:timeinfo ?timeC3.  ?timeC3 owl:fromdate ?fromC3; owl:todate ?toC3.  FILTER(xsd:integer(?fromC3) <= fromVersion && xsd:integer(?toC3) >= fromVersion)
  ?c4 owl:timeinfo ?timeC4.  ?timeC4 owl:fromdate ?fromC4; owl:todate ?toC4.  FILTER(xsd:integer(?fromC4) <= fromVersion && xsd:integer(?toC4) >= fromVersion)
  ?c5 owl:timeinfo ?timeC5.  ?timeC5 owl:fromdate ?fromC5; owl:todate ?toC5.  FILTER(xsd:integer(?fromC5) <= fromVersion && xsd:integer(?toC5) >= fromVersion)
  ?c6 owl:timeinfo ?timeC6.  ?timeC6 owl:fromdate ?fromC6; owl:todate ?toC6.  FILTER(xsd:integer(?fromC6) <= fromVersion && xsd:integer(?toC6) >= fromVersion)
  ?c7 owl:timeinfo ?timeC7.  ?timeC7 owl:fromdate ?fromC7; owl:todate ?toC7.  FILTER(xsd:integer(?fromC7) <= fromVersion && xsd:integer(?toC7) >= fromVersion)
}
  # Exclude if any of the 12 components were revalidated in version 33
  FILTER NOT EXISTS {

    ?c1 owl:timeinfo ?timeC1_2.  ?timeC1_2 owl:fromdate ?fromC1_2; owl:todate ?toC1_2.  FILTER(xsd:integer(?fromC1_2) <= toVersion && xsd:integer(?toC1_2) >= toVersion)
    ?c2 owl:timeinfo ?timeC2_2.  ?timeC2_2 owl:fromdate ?fromC2_2; owl:todate ?toC2_2.  FILTER(xsd:integer(?fromC2_2) <= toVersion && xsd:integer(?toC2_2) >= toVersion)
    ?c3 owl:timeinfo ?timeC3_2.  ?timeC3_2 owl:fromdate ?fromC3_2; owl:todate ?toC3_2.  FILTER(xsd:integer(?fromC3_2) <= toVersion && xsd:integer(?toC3_2) >= toVersion)
    ?c4 owl:timeinfo ?timeC4_2.  ?timeC4_2 owl:fromdate ?fromC4_2; owl:todate ?toC4_2.  FILTER(xsd:integer(?fromC4_2) <= toVersion && xsd:integer(?toC4_2) >= toVersion)
    ?c5 owl:timeinfo ?timeC5_2.  ?timeC5_2 owl:fromdate ?fromC5_2; owl:todate ?toC5_2.  FILTER(xsd:integer(?fromC5_2) <= toVersion && xsd:integer(?toC5_2) >= toVersion)
    ?c6 owl:timeinfo ?timeC6_2.  ?timeC6_2 owl:fromdate ?fromC6_2; owl:todate ?toC6_2.  FILTER(xsd:integer(?fromC6_2) <= toVersion && xsd:integer(?toC6_2) >= toVersion)
    ?c7 owl:timeinfo ?timeC7_2.  ?timeC7_2 owl:fromdate ?fromC7_2; owl:todate ?toC7_2.  FILTER(xsd:integer(?fromC7_2) <= toVersion && xsd:integer(?toC7_2) >= toVersion)

    
  }
}`,

9:`PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/terms/>

SELECT DISTINCT ?dataset ?title ?distr1 ?URL1 ?titleFile1 ?description1 ?distr2 ?URL2 ?titleFile2 ?description2 FROM <BearC.ttl>
WHERE {
  ?dataset rdf:type ?c1.
  ?c1 owl:valueAs dcat:Dataset.
  ?dataset dc:title ?c2.
  ?c2 owl:valueAs ?title.


  ?distr1 dcat:distribution ?c3.
  ?c3 owl:valueAs ?dataset.
  ?distr1 dcat:accessURL ?c4.
  ?c4 owl:valueAs ?URL1.
  ?distr1 dcat:mediaType ?c5.
  ?c5 owl:valueAs "text/csv".
  ?distr1 dc:title ?c6.
  ?c6 owl:valueAs ?titleFile1.
  ?distr1 dc:description ?c7.
  ?c7 owl:valueAs ?description1.


  ?distr2 dcat:distribution ?c8.
  ?c8 owl:valueAs ?dataset.
  ?distr2 dcat:accessURL ?c9.
  ?c9 owl:valueAs ?URL2.
  ?distr2 dcat:mediaType ?c10.
  ?c10 owl:valueAs "text/tab-separated-values".
  ?distr2 dc:title ?c11.
  ?c11 owl:valueAs ?titleFile2.
  ?distr2 dc:description ?c12.
  ?c12 owl:valueAs ?description2.

 { 
  ?c1 owl:timeinfo ?timeC1.  ?timeC1 owl:fromdate ?fromC1; owl:todate ?toC1.  FILTER(xsd:integer(?fromC1) <= fromVersion && xsd:integer(?toC1) >= fromVersion)
  ?c2 owl:timeinfo ?timeC2.  ?timeC2 owl:fromdate ?fromC2; owl:todate ?toC2.  FILTER(xsd:integer(?fromC2) <= fromVersion && xsd:integer(?toC2) >= fromVersion)
  ?c3 owl:timeinfo ?timeC3.  ?timeC3 owl:fromdate ?fromC3; owl:todate ?toC3.  FILTER(xsd:integer(?fromC3) <= fromVersion && xsd:integer(?toC3) >= fromVersion)
  ?c4 owl:timeinfo ?timeC4.  ?timeC4 owl:fromdate ?fromC4; owl:todate ?toC4.  FILTER(xsd:integer(?fromC4) <= fromVersion && xsd:integer(?toC4) >= fromVersion)
  ?c5 owl:timeinfo ?timeC5.  ?timeC5 owl:fromdate ?fromC5; owl:todate ?toC5.  FILTER(xsd:integer(?fromC5) <= fromVersion && xsd:integer(?toC5) >= fromVersion)
  ?c6 owl:timeinfo ?timeC6.  ?timeC6 owl:fromdate ?fromC6; owl:todate ?toC6.  FILTER(xsd:integer(?fromC6) <= fromVersion && xsd:integer(?toC6) >= fromVersion)
  ?c7 owl:timeinfo ?timeC7.  ?timeC7 owl:fromdate ?fromC7; owl:todate ?toC7.  FILTER(xsd:integer(?fromC7) <= fromVersion && xsd:integer(?toC7) >= fromVersion)
  ?c8 owl:timeinfo ?timeC8.  ?timeC8 owl:fromdate ?fromC8; owl:todate ?toC8.  FILTER(xsd:integer(?fromC8) <= fromVersion && xsd:integer(?toC8) >= fromVersion)
  ?c9 owl:timeinfo ?timeC9.  ?timeC9 owl:fromdate ?fromC9; owl:todate ?toC9.  FILTER(xsd:integer(?fromC9) <= fromVersion && xsd:integer(?toC9) >= fromVersion)
  ?c10 owl:timeinfo ?timeC10. ?timeC10 owl:fromdate ?fromC10; owl:todate ?toC10. FILTER(xsd:integer(?fromC10) <= fromVersion && xsd:integer(?toC10) >= fromVersion)
  ?c11 owl:timeinfo ?timeC11. ?timeC11 owl:fromdate ?fromC11; owl:todate ?toC11. FILTER(xsd:integer(?fromC11) <= fromVersion && xsd:integer(?toC11) >= fromVersion)
  ?c12 owl:timeinfo ?timeC12. ?timeC12 owl:fromdate ?fromC12; owl:todate ?toC12. FILTER(xsd:integer(?fromC12) <= fromVersion && xsd:integer(?toC12) >= fromVersion)
}
  # Exclude if any of the 12 components were revalidated in version 33
  FILTER NOT EXISTS {

    ?c1 owl:timeinfo ?timeC1_2.  ?timeC1_2 owl:fromdate ?fromC1_2; owl:todate ?toC1_2.  FILTER(xsd:integer(?fromC1_2) <= toVersion && xsd:integer(?toC1_2) >= toVersion)
    ?c2 owl:timeinfo ?timeC2_2.  ?timeC2_2 owl:fromdate ?fromC2_2; owl:todate ?toC2_2.  FILTER(xsd:integer(?fromC2_2) <= toVersion && xsd:integer(?toC2_2) >= toVersion)
    ?c3 owl:timeinfo ?timeC3_2.  ?timeC3_2 owl:fromdate ?fromC3_2; owl:todate ?toC3_2.  FILTER(xsd:integer(?fromC3_2) <= toVersion && xsd:integer(?toC3_2) >= toVersion)
    ?c4 owl:timeinfo ?timeC4_2.  ?timeC4_2 owl:fromdate ?fromC4_2; owl:todate ?toC4_2.  FILTER(xsd:integer(?fromC4_2) <= toVersion && xsd:integer(?toC4_2) >= toVersion)
    ?c5 owl:timeinfo ?timeC5_2.  ?timeC5_2 owl:fromdate ?fromC5_2; owl:todate ?toC5_2.  FILTER(xsd:integer(?fromC5_2) <= toVersion && xsd:integer(?toC5_2) >= toVersion)
    ?c6 owl:timeinfo ?timeC6_2.  ?timeC6_2 owl:fromdate ?fromC6_2; owl:todate ?toC6_2.  FILTER(xsd:integer(?fromC6_2) <= toVersion && xsd:integer(?toC6_2) >= toVersion)
    ?c7 owl:timeinfo ?timeC7_2.  ?timeC7_2 owl:fromdate ?fromC7_2; owl:todate ?toC7_2.  FILTER(xsd:integer(?fromC7_2) <= toVersion && xsd:integer(?toC7_2) >= toVersion)
    ?c8 owl:timeinfo ?timeC8_2.  ?timeC8_2 owl:fromdate ?fromC8_2; owl:todate ?toC8_2.  FILTER(xsd:integer(?fromC8_2) <= toVersion && xsd:integer(?toC8_2) >= toVersion)
    ?c9 owl:timeinfo ?timeC9_2.  ?timeC9_2 owl:fromdate ?fromC9_2; owl:todate ?toC9_2.  FILTER(xsd:integer(?fromC9_2) <= toVersion && xsd:integer(?toC9_2) >= toVersion)
    ?c10 owl:timeinfo ?timeC10_2.  ?timeC10_2 owl:fromdate ?fromC10_2; owl:todate ?toC10_2.  FILTER(xsd:integer(?fromC10_2) <= toVersion && xsd:integer(?toC10_2) >= toVersion)
    ?c11 owl:timeinfo ?timeC11_2.  ?timeC11_2 owl:fromdate ?fromC11_2; owl:todate ?toC11_2.  FILTER(xsd:integer(?fromC11_2) <= toVersion && xsd:integer(?toC11_2) >= toVersion)
    ?c12 owl:timeinfo ?timeC12_2.  ?timeC12_2 owl:fromdate ?fromC12_2; owl:todate ?toC12_2.  FILTER(xsd:integer(?fromC12_2) <= toVersion && xsd:integer(?toC12_2) >= toVersion)

    
  }
}`,
10:`PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/terms/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT DISTINCT ?dataset ?title ?distribution ?URL ?mediaType ?filetitle ?description FROM <BearC.ttl> WHERE 
{
    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset .
    ?dataset dc:title ?c2.
    ?c2 owl:valueAs ?title .
    ?dataset dcat:distribution ?c3.
    ?c3 owl:valueAs ?distribution .
    ?distribution dcat:accessURL ?c4.
    ?c4 owl:valueAs ?URL .
    ?distribution dcat:mediaType ?c5.
    ?c5 owl:valueAs ?mediaType .
    ?distribution dc:title ?c6.
    ?c6 owl:valueAs ?filetitle .
    ?distribution dc:description ?c7.
    ?c7 owl:valueAs ?description .
 { 
  ?c1 owl:timeinfo ?timeC1.  ?timeC1 owl:fromdate ?fromC1; owl:todate ?toC1.  FILTER(xsd:integer(?fromC1) <= fromVersion && xsd:integer(?toC1) >= fromVersion)
  ?c2 owl:timeinfo ?timeC2.  ?timeC2 owl:fromdate ?fromC2; owl:todate ?toC2.  FILTER(xsd:integer(?fromC2) <= fromVersion && xsd:integer(?toC2) >= fromVersion)
  ?c3 owl:timeinfo ?timeC3.  ?timeC3 owl:fromdate ?fromC3; owl:todate ?toC3.  FILTER(xsd:integer(?fromC3) <= fromVersion && xsd:integer(?toC3) >= fromVersion)
  ?c4 owl:timeinfo ?timeC4.  ?timeC4 owl:fromdate ?fromC4; owl:todate ?toC4.  FILTER(xsd:integer(?fromC4) <= fromVersion && xsd:integer(?toC4) >= fromVersion)
  ?c5 owl:timeinfo ?timeC5.  ?timeC5 owl:fromdate ?fromC5; owl:todate ?toC5.  FILTER(xsd:integer(?fromC5) <= fromVersion && xsd:integer(?toC5) >= fromVersion)
  ?c6 owl:timeinfo ?timeC6.  ?timeC6 owl:fromdate ?fromC6; owl:todate ?toC6.  FILTER(xsd:integer(?fromC6) <= fromVersion && xsd:integer(?toC6) >= fromVersion)
  ?c7 owl:timeinfo ?timeC7.  ?timeC7 owl:fromdate ?fromC7; owl:todate ?toC7.  FILTER(xsd:integer(?fromC7) <= fromVersion && xsd:integer(?toC7) >= fromVersion)
}
  # Exclude if any of the 12 components were revalidated in version 33
  FILTER NOT EXISTS {

    ?c1 owl:timeinfo ?timeC1_2.  ?timeC1_2 owl:fromdate ?fromC1_2; owl:todate ?toC1_2.  FILTER(xsd:integer(?fromC1_2) <= toVersion && xsd:integer(?toC1_2) >= toVersion)
    ?c2 owl:timeinfo ?timeC2_2.  ?timeC2_2 owl:fromdate ?fromC2_2; owl:todate ?toC2_2.  FILTER(xsd:integer(?fromC2_2) <= toVersion && xsd:integer(?toC2_2) >= toVersion)
    ?c3 owl:timeinfo ?timeC3_2.  ?timeC3_2 owl:fromdate ?fromC3_2; owl:todate ?toC3_2.  FILTER(xsd:integer(?fromC3_2) <= toVersion && xsd:integer(?toC3_2) >= toVersion)
    ?c4 owl:timeinfo ?timeC4_2.  ?timeC4_2 owl:fromdate ?fromC4_2; owl:todate ?toC4_2.  FILTER(xsd:integer(?fromC4_2) <= toVersion && xsd:integer(?toC4_2) >= toVersion)
    ?c5 owl:timeinfo ?timeC5_2.  ?timeC5_2 owl:fromdate ?fromC5_2; owl:todate ?toC5_2.  FILTER(xsd:integer(?fromC5_2) <= toVersion && xsd:integer(?toC5_2) >= toVersion)
    ?c6 owl:timeinfo ?timeC6_2.  ?timeC6_2 owl:fromdate ?fromC6_2; owl:todate ?toC6_2.  FILTER(xsd:integer(?fromC6_2) <= toVersion && xsd:integer(?toC6_2) >= toVersion)
    ?c7 owl:timeinfo ?timeC7_2.  ?timeC7_2 owl:fromdate ?fromC7_2; owl:todate ?toC7_2.  FILTER(xsd:integer(?fromC7_2) <= toVersion && xsd:integer(?toC7_2) >= toVersion)    
  }
} ORDER BY ?filetitle
LIMIT 100 OFFSET 100`
},

  vq: {1:`PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>


SELECT DISTINCT ?subject ?property ?value ?from ?to  FROM <BearC.ttl> WHERE {
 
   ?dataset rdf:type ?c1.
     ?c1 owl:valueAs dcat:Dataset.
    OPTIONAL { 
      ?c1 owl:timeinfo ?timeC1.
      ?timeC1 owl:fromdate ?from1; 
              owl:todate   ?to1.
    }
    BIND(?dataset AS ?subject)
    BIND(rdf:type AS ?property)
    BIND(dcat:Dataset AS ?value)
    BIND(?from1 AS ?from)
    BIND(?to1 AS ?to)
 
     ?dataset dcat:distribution ?c2.
      ?c2 owl:valueAs ?distribution.
 OPTIONAL { 
      ?c2 owl:timeinfo ?timeC2.
      ?timeC2 owl:fromdate ?from2; 
              owl:todate   ?to2.
    }
    BIND(?dataset AS ?subject)
    BIND(dcat:distribution AS ?property)
    BIND(?distribution AS ?value)
    BIND(?from2 AS ?from)
    BIND(?to2 AS ?to)

?distribution dcat:accessURL ?c3.
    ?c3 owl:valueAs ?URL .
 ?c3 owl:valueAs ?date.
    OPTIONAL { 
      ?c3 owl:timeinfo ?timeC3.
      ?timeC3 owl:fromdate ?from3; 
              owl:todate   ?to3.
    }
    BIND(?distribution AS ?subject)
    BIND(dcat:accessURL AS ?property)
    BIND(?URL AS ?value)
    BIND(?from3 AS ?from)
    BIND(?to3 AS ?to)

}`,

2:`PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/terms/>

SELECT DISTINCT ?subject ?property ?value ?from ?to  FROM <BearC.ttl> WHERE {
 
    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset .

    OPTIONAL { 
      ?c1 owl:timeinfo ?timeC1.
      ?timeC1 owl:fromdate ?from1; 
              owl:todate   ?to1.
    }
    BIND(?dataset AS ?subject)
    BIND(rdf:type AS ?property)
    BIND(dcat:Dataset AS ?value)
    BIND(?from1 AS ?from)
    BIND(?to1 AS ?to)



    ?dataset dc:modified ?c2.
    ?c2 owl:valueAs ?modified_date .  
  OPTIONAL { 
      ?c2 owl:timeinfo ?timeC2.
      ?timeC2 owl:fromdate ?from2; 
              owl:todate   ?to2.
    }
    BIND(?dataset AS ?subject)
    BIND(dc:modified AS ?property)
    BIND(?modified_date AS ?value)
    BIND(?from2 AS ?from)
    BIND(?to2 AS ?to)



}`,
3:`PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX vcard: <http://www.w3.org/2006/vcard/ns#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT DISTINCT ?subject ?property ?value ?from ?to FROM <BearC.ttl>
WHERE {


    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset.

 OPTIONAL { 
      ?c1 owl:timeinfo ?timeC1.
      ?timeC1 owl:fromdate ?from1; 
              owl:todate   ?to1.
    }
    BIND(?dataset AS ?subject)
    BIND(rdf:type AS ?property)
    BIND(dcat:Dataset AS ?value)
    BIND(?from1 AS ?from)
    BIND(?to1 AS ?to)



    ?dataset dcat:contactPoint ?c2.
    ?c2 owl:valueAs ?contact.
OPTIONAL { 
      ?c2 owl:timeinfo ?timeC2.
      ?timeC2 owl:fromdate ?from2; 
              owl:todate   ?to2.
    }
    BIND(?dataset AS ?subject)
    BIND(dcat:contactPoint AS ?property)
    BIND(?contact AS ?value)
    BIND(?from2 AS ?from)
    BIND(?to2 AS ?to)

    ?contact vcard:fn ?c3.
    ?c3 owl:valueAs ?name.

OPTIONAL { 
      ?c3 owl:timeinfo ?timeC3.
      ?timeC3 owl:fromdate ?from3; 
              owl:todate  ?to3.
    }

    BIND(?contact AS ?subject)
    BIND(vcard:fn AS ?property)
    BIND(?name AS ?value)
    BIND(?from3 AS ?from)
    BIND(?to3 AS ?to)


    OPTIONAL {
        ?contact vcard:hasEmail ?c4.
        ?c4 owl:valueAs ?email.

        ?c4 owl:timeinfo ?timeC4.
        ?timeC4 owl:fromdate ?from4; owl:todate ?to4.
        
    }
    BIND(?contact AS ?subject)
    BIND(vcard:hasEmail AS ?property)
    BIND(?email AS ?value)
    BIND(?from4 AS ?from)
    BIND(?to4 AS ?to)


 
}`,
4:`PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/terms/>
PREFIX eu: <http://ec.europa.eu/geninfo/>
SELECT DISTINCT ?subject ?property ?value ?from ?to FROM <BearC.ttl>
 WHERE {

    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset.
   
    OPTIONAL { 
      ?c1 owl:timeinfo ?timeC1.
      ?timeC1 owl:fromdate ?from1; 
              owl:todate   ?to1.
    }
    BIND(?dataset AS ?subject)
    BIND(rdf:type AS ?property)
    BIND(dcat:Dataset AS ?value)
    BIND(?from1 AS ?from)
    BIND(?to1 AS ?to)


    ?dataset dc:title ?c2.
    ?c2 owl:valueAs ?title .
OPTIONAL { 
      ?c2 owl:timeinfo ?timeC2.
      ?timeC2 owl:fromdate ?from2; 
              owl:todate   ?to2.
    }
    BIND(?dataset AS ?subject)
    BIND(dc:title AS ?property)
    BIND(?title AS ?value)
    BIND(?from2 AS ?from)
    BIND(?to2 AS ?to)


    ?dataset dcat:distribution ?c3.
    ?c3 owl:valueAs ?distribution.
OPTIONAL { 
      ?c3 owl:timeinfo ?timeC3.
      ?timeC3 owl:fromdate ?from3; 
              owl:todate  ?to3.
    }

    BIND(?dataset AS ?subject)
    BIND(dcat:distribution AS ?property)
    BIND(?distribution AS ?value)
    BIND(?from3 AS ?from)
    BIND(?to3 AS ?to)

    ?distribution dcat:accessURL ?c4.
    ?c4 owl:valueAs ?URL .
    OPTIONAL { 
      ?c4 owl:timeinfo ?timeC4.
      ?timeC4 owl:fromdate ?from4; 
              owl:todate   ?to4.
    }
    BIND(?distribution AS ?subject)
    BIND(dcat:accessURL AS ?property)
    BIND(?URL AS ?value)
    BIND(?from4 AS ?from)
    BIND(?to4 AS ?to)

    ?distribution dc:license ?c5.
    ?c5 owl:valueAs eu:legal_notices_en.htm .

   OPTIONAL { 
      ?c5 owl:timeinfo ?timeC5.
      ?timeC5 owl:fromdate ?from5; 
              owl:todate   ?to5.
    }
    BIND(?distribution AS ?subject)
    BIND(dc:license AS ?property)
    BIND(eu:legal_notices_en.htm AS ?value)
    BIND(?from5 AS ?from)
    BIND(?to5 AS ?to)

    FILTER regex(?title, "region")

}`,
5:`PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc:   <http://purl.org/dc/terms/>
PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd:  <http://www.w3.org/2001/XMLSchema#>
PREFIX owl:  <http://www.w3.org/2002/07/owl/>

SELECT DISTINCT ?subject ?property ?value ?from ?to FROM <BearC.ttl>
  
{
{
    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset .

    OPTIONAL { 
      ?c1 owl:timeinfo ?timeC1.
      ?timeC1 owl:fromdate ?from1; 
              owl:todate   ?to1.
    }
    BIND(?dataset AS ?subject)
    BIND(rdf:type AS ?property)
    BIND(dcat:Dataset AS ?value)
    BIND(?from1 AS ?from)
    BIND(?to1 AS ?to)

    ?dataset dc:title ?c2.
    ?c2 owl:valueAs ?title .
OPTIONAL { 
      ?c2 owl:timeinfo ?timeC2.
      ?timeC2 owl:fromdate ?from2; 
              owl:todate   ?to2.
    }
    BIND(?dataset AS ?subject)
    BIND(dc:title AS ?property)
    BIND(?title AS ?value)
    BIND(?from2 AS ?from)
    BIND(?to2 AS ?to)


   ?dataset dcat:distribution ?c3.
    ?c3 owl:valueAs ?distribution .
OPTIONAL { 
      ?c3 owl:timeinfo ?timeC3.
      ?timeC3 owl:fromdate ?from3; 
              owl:todate  ?to3.
    }

    BIND(?dataset AS ?subject)
    BIND(dcat:distribution AS ?property)
    BIND(?distribution AS ?value)
    BIND(?from3 AS ?from)
    BIND(?to3 AS ?to)


    ?distribution dcat:accessURL ?c4.
    ?c4 owl:valueAs ?URL .
 OPTIONAL { 
      ?c4 owl:timeinfo ?timeC4.
      ?timeC4 owl:fromdate ?from4; 
              owl:todate   ?to4.
    }
    BIND(?distribution AS ?subject)
    BIND(dcat:accessURL AS ?property)
    BIND(?URL AS ?value)
    BIND(?from4 AS ?from)
    BIND(?to4 AS ?to)


    ?distribution dc:description ?c5.
    ?c5 owl:valueAs "Austria" .
 OPTIONAL { 
      ?c5 owl:timeinfo ?timeC5.
      ?timeC5 owl:fromdate ?from5; 
              owl:todate   ?to5.
    }
    BIND(?distribution AS ?subject)
    BIND(dc:description AS ?property)
    BIND("Austria" AS ?value)
    BIND(?from5 AS ?from)
    BIND(?to5 AS ?to)


}
UNION{

    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset .

    OPTIONAL { 
      ?c1 owl:timeinfo ?timeC1.
      ?timeC1 owl:fromdate ?from1; 
              owl:todate   ?to1.
    }
    BIND(?dataset AS ?subject)
    BIND(rdf:type AS ?property)
    BIND(dcat:Dataset AS ?value)
    BIND(?from1 AS ?from)
    BIND(?to1 AS ?to)

    ?dataset dc:title ?c2.
    ?c2 owl:valueAs ?title .
OPTIONAL { 
      ?c2 owl:timeinfo ?timeC2.
      ?timeC2 owl:fromdate ?from2; 
              owl:todate   ?to2.
    }
    BIND(?dataset AS ?subject)
    BIND(dc:title AS ?property)
    BIND(?title AS ?value)
    BIND(?from2 AS ?from)
    BIND(?to2 AS ?to)

   ?dataset dcat:distribution ?c3.
    ?c3 owl:valueAs ?distribution .
OPTIONAL { 
      ?c3 owl:timeinfo ?timeC3.
      ?timeC3 owl:fromdate ?from3; 
              owl:todate  ?to3.
    }

    BIND(?dataset AS ?subject)
    BIND(dcat:distribution AS ?property)
    BIND(?distribution AS ?value)
    BIND(?from3 AS ?from)
    BIND(?to3 AS ?to)

{
    ?distribution dcat:accessURL ?c4.
    ?c4 owl:valueAs ?URL .
 OPTIONAL { 
      ?c4 owl:timeinfo ?timeC4.
      ?timeC4 owl:fromdate ?from4; 
              owl:todate   ?to4.
    }
    BIND(?distribution AS ?subject)
    BIND(dcat:accessURL AS ?property)
    BIND(?URL AS ?value)
    BIND(?from4 AS ?from)
    BIND(?to4 AS ?to)


    ?distribution dc:description ?c5.
    ?c5 owl:valueAs "Germany" .
 OPTIONAL { 
      ?c5 owl:timeinfo ?timeC5.
      ?timeC5 owl:fromdate ?from5; 
              owl:todate   ?to5.
    }
    BIND(?distribution AS ?subject)
    BIND(dc:description AS ?property)
    BIND("Germany" AS ?value)
    BIND(?from5 AS ?from)
    BIND(?to5 AS ?to)

}


   

}`,
6:`PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/terms/>
SELECT DISTINCT ?subject ?property ?value ?from ?to FROM <BearC.ttl> WHERE {

    
    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset .
    OPTIONAL { 
      ?c1 owl:timeinfo ?timeC1.
      ?timeC1 owl:fromdate ?from1; 
              owl:todate   ?to1.
    }
    BIND(?dataset AS ?subject)
    BIND(rdf:type AS ?property)
    BIND(dcat:Dataset AS ?value)
    BIND(?from1 AS ?from)
    BIND(?to1 AS ?to)
  
    ?dataset dc:title ?c2.
    ?c2 owl:valueAs ?title .
    OPTIONAL { 
      ?c2 owl:timeinfo ?timeC2.
      ?timeC2 owl:fromdate ?from2; 
              owl:todate   ?to2.
  
              }
    BIND(?dataset AS ?subject)
    BIND(dc:title AS ?property)
    BIND(?title AS ?value)
    BIND(?from2 AS ?from)
    BIND(?to2 AS ?to)
  

  
    ?dataset dc:issued ?c3.
    ?c3 owl:valueAs ?date .

    OPTIONAL { 
      ?c3 owl:timeinfo ?timeC3.
      ?timeC3 owl:fromdate ?from3; 
              owl:todate  ?to3.
    }

    BIND(?dataset AS ?subject)
    BIND(dc:issued AS ?property)
    BIND(?date AS ?value)
    BIND(?from3 AS ?from)
    BIND(?to3 AS ?to)
 

    ?dataset dc:modified ?c4.
    ?c4 owl:valueAs ?date.
OPTIONAL { 
      ?c4 owl:timeinfo ?timeC4.
      ?timeC4 owl:fromdate ?from4; 
              owl:todate   ?to4.
    }
    BIND(?dataset AS ?subject)
    BIND(dc:modified AS ?property)
    BIND(?date AS ?value)
    BIND(?from4 AS ?from)
    BIND(?to4 AS ?to)



}`,
7:`PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/terms/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX owl: <http://www.w3.org/2002/07/owl/>

SELECT DISTINCT ?subject ?property ?value ?from ?to FROM <BearC.ttl> WHERE 
{ 
  
    ?dataset rdf:type ?c1.
    ?c1 owl:valueAs dcat:Dataset .
    OPTIONAL { 
      ?c1 owl:timeinfo ?timeC1.
      ?timeC1 owl:fromdate ?from1; 
              owl:todate   ?to1.
    }
    BIND(?dataset AS ?subject)
    BIND(rdf:type AS ?property)
    BIND(dcat:Dataset AS ?value)
    BIND(?from1 AS ?from)
    BIND(?to1 AS ?to)

    ?dataset dc:title ?c2.
    ?c2 owl:valueAs ?title .
    OPTIONAL { 
      ?c2 owl:timeinfo ?timeC2.
      ?timeC2 owl:fromdate ?from2; 
              owl:todate   ?to2.
    }
    BIND(?dataset AS ?subject)
    BIND(dc:title AS ?property)
    BIND(?title AS ?value)
    BIND(?from2 AS ?from)
    BIND(?to2 AS ?to)
  

    ?dataset dc:issued ?c3.
    ?c3 owl:valueAs ?date .

    OPTIONAL { 
      ?c3 owl:timeinfo ?timeC3.
      ?timeC3 owl:fromdate ?from3; 
              owl:todate  ?to3.
    }

    BIND(?dataset AS ?subject)
    BIND(dc:issued AS ?property)
    BIND(?date AS ?value)
    BIND(?from3 AS ?from)
    BIND(?to3 AS ?to)
 

    ?dataset dcat:distribution ?c4.
    ?c4 owl:valueAs ?distribution.
    OPTIONAL { 
      ?c4 owl:timeinfo ?timeC4.
      ?timeC4 owl:fromdate ?from4; 
              owl:todate   ?to4.
    }
    BIND(?dataset AS ?subject)
    BIND(dcat:distribution AS ?property)
    BIND(?distribution AS ?value)
    BIND(?from4 AS ?from)
    BIND(?to4 AS ?to)
 


    ?distribution dcat:accessURL ?c5.
    ?c5 owl:valueAs ?URL .
    OPTIONAL { 
      ?c5 owl:timeinfo ?timeC5.
      ?timeC5 owl:fromdate ?from5; 
              owl:todate   ?to5.
    }
    BIND(?distribution AS ?subject)
    BIND(dcat:accessURL AS ?property)
    BIND(?URL AS ?value)
    BIND(?from5 AS ?from)    # Bind the correct 'from' value for accessURL
    BIND(?to5 AS ?to)        # Bind the correct 'to' value for accessURL
  
  FILTER (?date>"2014-12-31T23:59:59"^^xsd:dateTime)
}`,

8:`PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/terms/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT DISTINCT ?subject ?property ?value ?from ?to FROM <BearC.ttl> WHERE {
  
    ?dataset rdf:type ?c1. 
    ?c1 owl:valueAs dcat:Dataset.
   OPTIONAL { 
      ?c1 owl:timeinfo ?timeC1.
      ?timeC1 owl:fromdate ?from1; 
              owl:todate   ?to1.
    }
    BIND(?dataset AS ?subject)
    BIND(rdf:type AS ?property)
    BIND(dcat:Dataset AS ?value)
    BIND(?from1 AS ?from)
    BIND(?to1 AS ?to)

    ?dataset dc:title ?c2.
    ?c2 owl:valueAs ?title .
OPTIONAL { 
      ?c2 owl:timeinfo ?timeC2.
      ?timeC2 owl:fromdate ?from2; 
              owl:todate   ?to2.
    }
    BIND(?dataset AS ?subject)
    BIND(dc:title AS ?property)
    BIND(?title AS ?value)
    BIND(?from2 AS ?from)
    BIND(?to2 AS ?to)



    ?dataset dcat:distribution ?c3.
    ?c3 owl:valueAs ?distribution .
OPTIONAL { 
      ?c3 owl:timeinfo ?timeC3.
      ?timeC3 owl:fromdate ?from3; 
              owl:todate  ?to3.
    }

    BIND(?dataset AS ?subject)
    BIND(dcat:distribution AS ?property)
    BIND(?distribution AS ?value)
    BIND(?from3 AS ?from)
    BIND(?to3 AS ?to)


    ?distribution dcat:accessURL ?c4.
    ?c4 owl:valueAs ?URL .
OPTIONAL { 
      ?c4 owl:timeinfo ?timeC4.
      ?timeC4 owl:fromdate ?from4; 
              owl:todate   ?to4.
    }
    BIND(?distribution AS ?subject)
    BIND(dcat:accessURL AS ?property)
    BIND(?URL AS ?value)
    BIND(?from4 AS ?from)
    BIND(?to4 AS ?to)



    ?distribution dcat:mediaType ?c5.
    ?c5 owl:valueAs "text/csv" .
OPTIONAL { 
      ?c5 owl:timeinfo ?timeC5.
      ?timeC5 owl:fromdate ?from5; 
              owl:todate   ?to5.
    }
    BIND(?distribution AS ?subject)
    BIND(dcat:mediaType AS ?property)
    BIND("text/csv" AS ?value)
    BIND(?from5 AS ?from)    # Bind the correct 'from' value for accessURL
    BIND(?to5 AS ?to)



    ?distribution dc:title ?c6.
    ?c6 owl:valueAs ?filetitle .
OPTIONAL { 
      ?c6 owl:timeinfo ?timeC6.
      ?timeC6 owl:fromdate ?from6; 
              owl:todate   ?to6.
    }
    BIND(?distribution AS ?subject)
    BIND(dc:title AS ?property)
    BIND(?filetitle AS ?value)
    BIND(?from6 AS ?from)    # Bind the correct 'from' value for accessURL
    BIND(?to6 AS ?to)


    ?distribution dc:description ?c7.
    ?c7 owl:valueAs ?description .
OPTIONAL { 
      ?c7 owl:timeinfo ?timeC7.
      ?timeC7 owl:fromdate ?from7; 
              owl:todate   ?to7.
    }
    BIND(?distribution AS ?subject)
    BIND(dc:description AS ?property)
    BIND(?description AS ?value)
    BIND(?from7 AS ?from)    # Bind the correct 'from' value for accessURL
    BIND(?to7 AS ?to)


  
}`,
9:`PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/terms/>

SELECT DISTINCT ?subject ?property ?value ?from ?to FROM <BearC.ttl>
WHERE {


  ?dataset rdf:type ?c1.
  ?c1 owl:valueAs dcat:Dataset.
 
   ?c1 owl:valueAs dcat:Dataset.
    OPTIONAL { 
      ?c1 owl:timeinfo ?timeC1.
      ?timeC1 owl:fromdate ?from1; 
              owl:todate   ?to1.
    }
    BIND(?dataset AS ?subject)
    BIND(rdf:type AS ?property)
    BIND(dcat:Dataset AS ?value)
    BIND(?from1 AS ?from)
    BIND(?to1 AS ?to)



    
  ?dataset dc:title ?c2.
  ?c2 owl:valueAs ?title.
OPTIONAL { 
      ?c2 owl:timeinfo ?timeC2.
      ?timeC2 owl:fromdate ?from2; 
              owl:todate   ?to2.
    }
    BIND(?dataset AS ?subject)
    BIND(dc:title AS ?property)
    BIND(?title AS ?value)
    BIND(?from2 AS ?from)
    BIND(?to2 AS ?to)


  ?distr1 dcat:distribution ?c3.
  ?c3 owl:valueAs ?dataset.
  OPTIONAL { 
      ?c3 owl:timeinfo ?timeC3.
      ?timeC3 owl:fromdate ?from3; 
              owl:todate  ?to3.
    }

    BIND(?distr1 AS ?subject)
    BIND(dcat:distribution AS ?property)
    BIND(?dataset AS ?value)
    BIND(?from3 AS ?from)
    BIND(?to3 AS ?to)

    
  ?distr1 dcat:accessURL ?c4.
  ?c4 owl:valueAs ?URL1.
OPTIONAL { 
      ?c4 owl:timeinfo ?timeC4.
      ?timeC4 owl:fromdate ?from4; 
              owl:todate   ?to4.
    }
    BIND(?distr1 AS ?subject)
    BIND(dcat:accessURL AS ?property)
    BIND(?URL1 AS ?value)
    BIND(?from4 AS ?from)
    BIND(?to4 AS ?to)


  ?distr1 dcat:mediaType ?c5.
  ?c5 owl:valueAs "text/csv".
OPTIONAL { 
      ?c5 owl:timeinfo ?timeC5.
      ?timeC5 owl:fromdate ?from5; 
              owl:todate   ?to5.
    }
    BIND(?distr1 AS ?subject)
    BIND(dcat:mediaType AS ?property)
    BIND("text/csv" AS ?value)
    BIND(?from5 AS ?from)    # Bind the correct 'from' value for accessURL
    BIND(?to5 AS ?to)
 

  ?distr1 dc:title ?c6.
  ?c6 owl:valueAs ?titleFile1.
OPTIONAL { 
      ?c6 owl:timeinfo ?timeC6.
      ?timeC6 owl:fromdate ?from6; 
              owl:todate   ?to6.
    }
    BIND(?distr1 AS ?subject)
    BIND(dc:title AS ?property)
    BIND(?titleFile1 AS ?value)
    BIND(?from6 AS ?from)    # Bind the correct 'from' value for accessURL
    BIND(?to6 AS ?to)
 
    
  ?distr1 dc:description ?c7.
  ?c7 owl:valueAs ?description1.
OPTIONAL { 
      ?c7 owl:timeinfo ?timeC7.
      ?timeC7 owl:fromdate ?from7; 
              owl:todate   ?to7.
    }
    BIND(?distr1 AS ?subject)
    BIND(dc:description AS ?property)
    BIND(?description1 AS ?value)
    BIND(?from7 AS ?from)    # Bind the correct 'from' value for accessURL
    BIND(?to7 AS ?to)



  ?distr2 dcat:distribution ?c8.
  ?c8 owl:valueAs ?dataset.
OPTIONAL { 
      ?c8 owl:timeinfo ?timeC8.
      ?timeC8 owl:fromdate ?from8; 
              owl:todate   ?to8.
    }
    BIND(?distr2 AS ?subject)
    BIND(dcat:distribution AS ?property)
    BIND(?dataset AS ?value)
    BIND(?from8 AS ?from)    # Bind the correct 'from' value for accessURL
    BIND(?to8 AS ?to)


  ?distr2 dcat:accessURL ?c9.
  ?c9 owl:valueAs ?URL2.
OPTIONAL { 
      ?c9 owl:timeinfo ?timeC9.
      ?timeC9 owl:fromdate ?from9; 
              owl:todate   ?to9.
    }
    BIND(?distr2 AS ?subject)
    BIND(dcat:accessURL AS ?property)
    BIND(?URL2 AS ?value)
    BIND(?from9 AS ?from)
    BIND(?to9 AS ?to)

 

  ?distr2 dcat:mediaType ?c10.
  ?c10 owl:valueAs "text/tab-separated-values".
OPTIONAL { 
      ?c10 owl:timeinfo ?timeC10.
      ?timeC10 owl:fromdate ?from10; 
              owl:todate   ?to10.
    }
    BIND(?distr2 AS ?subject)
    BIND(dcat:mediaType AS ?property)
    BIND("text/tab-separated-values" AS ?value)
    BIND(?from10 AS ?from)
    BIND(?to10 AS ?to)


  ?distr2 dc:title ?c11.
  ?c11 owl:valueAs ?titleFile2.
OPTIONAL { 
      ?c11 owl:timeinfo ?timeC11.
      ?timeC11 owl:fromdate ?from11; 
              owl:todate   ?to11.
    }
    BIND(?distr2 AS ?subject)
    BIND(dc:title AS ?property)
    BIND(?titleFile2 AS ?value)
    BIND(?from11 AS ?from)
    BIND(?to11 AS ?to)
 

  ?distr2 dc:description ?c12.
  ?c12 owl:valueAs ?description2.
OPTIONAL { 
      ?c12 owl:timeinfo ?timeC12.
      ?timeC12 owl:fromdate ?from12; 
              owl:todate   ?to12.
    }
    BIND(?distr2 AS ?subject)
    BIND(dc:description AS ?property)
    BIND(?description2 AS ?value)
    BIND(?from12 AS ?from)
    BIND(?to12 AS ?to)



 
}`,
10:`PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dc: <http://purl.org/dc/terms/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT DISTINCT ?subject ?property ?value ?from ?to FROM <BearC.ttl> WHERE {
  

  ?dataset rdf:type ?c1. 
    ?c1 owl:valueAs dcat:Dataset.
   OPTIONAL { 
      ?c1 owl:timeinfo ?timeC1.
      ?timeC1 owl:fromdate ?from1; 
              owl:todate   ?to1.
    }
    BIND(?dataset AS ?subject)
    BIND(rdf:type AS ?property)
    BIND(dcat:Dataset AS ?value)
    BIND(?from1 AS ?from)
    BIND(?to1 AS ?to)
 


    ?dataset dc:title ?c2.
    ?c2 owl:valueAs ?title .
OPTIONAL { 
      ?c2 owl:timeinfo ?timeC2.
      ?timeC2 owl:fromdate ?from2; 
              owl:todate   ?to2.
    }
    BIND(?dataset AS ?subject)
    BIND(dc:title AS ?property)
    BIND(?title AS ?value)
    BIND(?from2 AS ?from)
    BIND(?to2 AS ?to)


    ?dataset dcat:distribution ?c3.
    ?c3 owl:valueAs ?distribution .
OPTIONAL { 
      ?c3 owl:timeinfo ?timeC3.
      ?timeC3 owl:fromdate ?from3; 
              owl:todate  ?to3.
    }

    BIND(?dataset AS ?subject)
    BIND(dcat:distribution AS ?property)
    BIND(?distribution AS ?value)
    BIND(?from3 AS ?from)
    BIND(?to3 AS ?to)


    ?distribution dcat:accessURL ?c4.
    ?c4 owl:valueAs ?URL .
OPTIONAL { 
      ?c4 owl:timeinfo ?timeC4.
      ?timeC4 owl:fromdate ?from4; 
              owl:todate   ?to4.
    }
    BIND(?distribution AS ?subject)
    BIND(dcat:accessURL AS ?property)
    BIND(?URL AS ?value)
    BIND(?from4 AS ?from)
    BIND(?to4 AS ?to)



    ?distribution dcat:mediaType ?c5.
    ?c5 owl:valueAs ?mediatype .
OPTIONAL { 
      ?c5 owl:timeinfo ?timeC5.
      ?timeC5 owl:fromdate ?from5; 
              owl:todate   ?to5.
    }
    BIND(?distribution AS ?subject)
    BIND(dcat:mediaType AS ?property)
    BIND( ?mediatype AS ?value)
    BIND(?from5 AS ?from)    # Bind the correct 'from' value for accessURL
    BIND(?to5 AS ?to)



    ?distribution dc:title ?c6.
    ?c6 owl:valueAs ?filetitle .
OPTIONAL { 
      ?c6 owl:timeinfo ?timeC6.
      ?timeC6 owl:fromdate ?from6; 
              owl:todate   ?to6.
    }
    BIND(?distribution AS ?subject)
    BIND(dc:title AS ?property)
    BIND(?filetitle AS ?value)
    BIND(?from6 AS ?from)    # Bind the correct 'from' value for accessURL
    BIND(?to6 AS ?to)


    ?distribution dc:description ?c7.
    ?c7 owl:valueAs ?description .
OPTIONAL { 
      ?c7 owl:timeinfo ?timeC7.
      ?timeC7 owl:fromdate ?from7; 
              owl:todate   ?to7.
    }
    BIND(?distribution AS ?subject)
    BIND(dc:description AS ?property)
    BIND(?description AS ?value)
    BIND(?from7 AS ?from)    # Bind the correct 'from' value for accessURL
    BIND(?to7 AS ?to)


  
}

ORDER BY ?filetitle
LIMIT 100 OFFSET 100`,
}
};

// ---------- Bear B query generator ----------

function generateBearBQuery(pp, oo=null, queryType, version1, version2=null, datasetType) {
  // Determine FROM clause based on datasetType
  let fromClause = "";
  console.log(datasetType);
  if(datasetType === "hourly") {
    fromClause = "FROM <http://bike-csecu/hourly>";
  } else if(datasetType === "daily") {
    fromClause = "FROM <http://bike-csecu/daily>";
  } else if(datasetType === "instant") {
    fromClause = "FROM <http://bike-csecu/instant>";
  }

  if(queryType === "vm") {
    return `
PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX bike: <http://www.bike-csecu.com/version/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT ?s ?o ${fromClause} WHERE {
  ?s ${pp} ?c1.
  ${oo ? `?c1 owl:sameAs ${oo}.` : "?c1 owl:sameAs ?o."}
  ?c1 bike:timemeta ?time.
  ?time bike:fromdate ?fromdate; bike:todate ?todate.
  FILTER((xsd:integer(?fromdate) <= ${version1}) && (xsd:integer(?todate) >= ${version1}))
}`;
  } 
  else if(queryType === "dm") {
    return `
PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX bike: <http://www.bike-csecu.com/version/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT (COUNT(*) AS ?count) ${fromClause} WHERE {
  ?s ${pp} ?c1.
  ${oo ? `?c1 owl:sameAs ${oo}.` : "?c1 owl:sameAs ?o."}
  {
    ?c1 bike:timemeta ?timeC1.
    ?timeC1 bike:fromdate ?fromC1; bike:todate ?toC1.
    FILTER(xsd:integer(?fromC1) <= ${version1} && xsd:integer(?toC1) >= ${version1})
  }
  FILTER NOT EXISTS {
    ?c1 bike:timemeta ?timeC1_2.
    ?timeC1_2 bike:fromdate ?fromC1_2; bike:todate ?toC1_2.
    FILTER(xsd:integer(?fromC1_2) <= ${version2} && xsd:integer(?toC1_2) >= ${version2})
  }
}`;
  } 
  else if(queryType === "vq") {
    return `
PREFIX owl: <http://www.w3.org/2002/07/owl/>
PREFIX bike: <http://www.bike-csecu.com/version/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT ?s ?o ${fromClause} WHERE {
  ?s ${pp} ?c1.
  ${oo ? `?c1 owl:sameAs ${oo}.` : "?c1 owl:sameAs ?o."}
  ?c1 bike:timemeta ?time.
  ?time bike:fromdate ?fromdate; bike:todate ?todate.
}`;
  }
}


// ---------- Populate subtype dropdown ----------
function updateSubtype(){
  const dataset = document.getElementById("dataset").value;
  const container = document.getElementById("subtypeContainer");
  const subtypeSelect = document.getElementById("subtype");
  subtypeSelect.innerHTML = "";
  if(dataset==="bearB"){
    container.style.display="block";
    ["hourly","daily","instant"].forEach(sub=>{
      const opt = document.createElement("option");
      opt.value=sub;
      opt.textContent=sub.charAt(0).toUpperCase()+sub.slice(1);
      subtypeSelect.appendChild(opt);
    });
  } else {
    container.style.display="none";
  }
}

// ---------- Update property list ----------


function updatePropertyList(){
  const dataset = document.getElementById("dataset").value;
  const container = document.getElementById("propertyContainer");
  const select = document.getElementById("propertySelect");
  select.innerHTML="";

  if(dataset==="bearB"){
    container.style.display="block";
    p.forEach(pp=>{
      const opt = document.createElement("option");
      opt.value=pp; opt.textContent=pp;
      select.appendChild(opt);
    });
    poO.forEach(oo=>{
      const opt = document.createElement("option");
      opt.value=`${poP}|${oo}`; opt.textContent=`${poP} ${oo}`;
      select.appendChild(opt);
    });

    // Hide queryNumber for Bear B
    document.getElementById("queryNumber").parentElement.style.display="none";

  } else { 
    container.style.display="none"; 

    // Show queryNumber for Bear C
    document.getElementById("queryNumber").parentElement.style.display="block";

    // Populate queryNumber for Bear C
    const queryType = document.getElementById("queryType").value;
    const queryNumberSelect = document.getElementById("queryNumber");
    queryNumberSelect.innerHTML="";
    Object.keys(bearCQueries[queryType]).forEach(qNum=>{
      const opt=document.createElement("option");
      opt.value=qNum;
      opt.textContent=`${queryType.toUpperCase()} Query ${qNum}`;
      queryNumberSelect.appendChild(opt);
    });
  }
}




// ---------- Update version fields ----------
function updateVersionFields(){
  const container = document.getElementById("versionFields");
  container.innerHTML="";
  const dataset = document.getElementById("dataset").value;
  const queryType = document.getElementById("queryType").value;
  const subtype = document.getElementById("subtype")?.value || "hourly";

  function addVersionField(labelText,id,options){
    const div=document.createElement("div"); div.className="form-group";
    const label=document.createElement("label"); label.setAttribute("for",id); label.textContent=labelText;
    const select=document.createElement("select"); select.id=id;
    options.forEach(v=>{ const opt = document.createElement("option"); opt.value=v; opt.textContent=v; select.appendChild(opt); });
    div.appendChild(label); div.appendChild(select);
    container.appendChild(div);
    select.addEventListener("change", displaySelectedQuery);
  }

  if(dataset==="bearB"){
    const options = versionSelections.bearB[subtype];
    if(queryType==="vm"){
      addVersionField("Select Version:", "version1", options);
    } else if(queryType==="dm"){
      addVersionField("From Version:", "version1", options);
      addVersionField("To Version:", "version2", options);
    }
  } else if(dataset==="bearC"){
    const options = versionSelections.bearC;
    if(queryType === "dm"){
        addVersionField("From Version:", "version1", options);
        addVersionField("To Version:", "version2", options);
    } else if(queryType === "vm"){
        addVersionField("Select Version:", "version1", options);
    }

}
}




// ---------- Display selected query ----------

function displaySelectedQuery(){
  const dataset = document.getElementById("dataset").value;
  const queryType = document.getElementById("queryType").value;
  const subtype = document.getElementById("subtype").value;
  let query="";
  
  if(dataset==="bearB"){
    const prop = document.getElementById("propertySelect").value || p[0];
    const version1 = document.getElementById("version1")?.value || 1;
    const version2 = document.getElementById("version2")?.value || null;
    let pp = prop.includes("|") ? prop.split("|")[0] : prop;
    let oo = prop.includes("|") ? prop.split("|")[1] : null;
    query = generateBearBQuery(pp, oo, queryType, version1, version2,subtype);
  } else if(dataset==="bearC"){
    const queryNumber = document.getElementById("queryNumber").value || 1;
    query = bearCQueries[queryType][queryNumber];
    const version1 = document.getElementById("version1")?.value || 1;
    const version2 = document.getElementById("version2")?.value || null;
    if(queryType === "dm"){
        query = query.replace(/fromVersion/g, version1).replace(/toVersion/g, version2);
    } else if (queryType === "vm"){
        query = query.replace(/version/g, version1);
    }
    else{
        query=query;
    }
}

  document.getElementById("selectedQueryText").value = query;
  document.getElementById("queryNumber").addEventListener("change", displaySelectedQuery);
}




// ---------- Execute Query ----------



// async function executeQuery() {
//   const query = document.getElementById("selectedQueryText").value;
//   document.getElementById("loader").style.display = "block";
//   document.getElementById("resultsContainer").innerHTML = "";
//   const startTime = performance.now();

//   try {
//     const response = await fetch("/execute-query", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ query })
//     });
//     const data = await response.json();
//     document.getElementById("loader").style.display = "none";
//     const endTime = performance.now();
//     document.getElementById("executionTime").textContent = `Execution Time: ${(endTime - startTime).toFixed(2)} ms`;

//     renderResults(data.results.bindings);
//   } catch (err) {
//     document.getElementById("loader").style.display = "none";
//     document.getElementById("resultsContainer").textContent = "Error executing query";
//     console.error(err);
//   }
// }







let currentData = [];
let currentPage = 1;
const rowsPerPage = 10;



async function executeQuery() {
  const query = document.getElementById("selectedQueryText").value;
  document.getElementById("loader").style.display = "block";
  document.getElementById("executionTime").textContent = "";
  document.getElementById("resultsContainer").innerHTML = "";
  document.getElementById("paginationControls").innerHTML = "";

  const startTime = performance.now();

  try {
    const response = await fetch("/api/execute-query", { // <-- FIXED PATH
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    document.getElementById("loader").style.display = "none";

    const endTime = performance.now();
    document.getElementById("executionTime").textContent =
      `Execution Time: ${(endTime - startTime).toFixed(2)} ms`;

    if (data.results && data.results.bindings) {
      currentData = data.results.bindings;
      currentPage = 1;
      renderPage(currentPage);
    } else {
      document.getElementById("resultsContainer").innerHTML =
        "<p>No results found</p>";
    }
  } catch (error) {
    document.getElementById("loader").style.display = "none";
    document.getElementById("resultsContainer").innerHTML =
      `<p style="color:red;">Error: ${error.message}</p>`;
  }
}


// async function executeQuery() {
//   const query = document.getElementById("selectedQueryText").value;
//   document.getElementById("loader").style.display = "block";
//   document.getElementById("executionTime").textContent = "";
//   document.getElementById("resultsContainer").innerHTML = "";
//   document.getElementById("paginationControls").innerHTML = "";

//   const startTime = performance.now();

//   try {
//     const response = await fetch("/execute-query", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ query })
//     });

//     const data = await response.json();
//     document.getElementById("loader").style.display = "none";

//     const endTime = performance.now();
//     document.getElementById("executionTime").textContent =
//       `Execution Time: ${(endTime - startTime).toFixed(2)} ms`;

//     if (data.results && data.results.bindings) {
//       currentData = data.results.bindings;
//       currentPage = 1;
//       renderPage(currentPage);
//     } else {
//       document.getElementById("resultsContainer").innerHTML =
//         "<p>No results found</p>";
//     }
//   } catch (error) {
//     document.getElementById("loader").style.display = "none";
//     document.getElementById("resultsContainer").innerHTML =
//       `<p style="color:red;">Error: ${error.message}</p>`;
//   }
// }

function renderPage(page) {
  currentPage = page;
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = currentData.slice(start, end);

  // Build table
  let tableHTML = "<table><thead><tr>";
  if (pageData.length > 0) {
    Object.keys(pageData[0]).forEach(key => {
      tableHTML += `<th>${key}</th>`;
    });
    tableHTML += "</tr></thead><tbody>";

    pageData.forEach(row => {
      tableHTML += "<tr>";
      Object.values(row).forEach(cell => {
        let value = cell.value;
        if (cell.type === "uri") {
          value = `<a href="${cell.value}" target="_blank">${cell.value}</a>`;
        }
        tableHTML += `<td>${value}</td>`;
      });
      tableHTML += "</tr>";
    });
    tableHTML += "</tbody></table>";
  } else {
    tableHTML = "<p>No results to display</p>";
  }

  document.getElementById("resultsContainer").innerHTML = tableHTML;

  // Render pagination
  renderPagination(currentData.length, page);
}



function renderPagination(totalRows, page) {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const maxVisible = 8; // show max 10 numbers in one row
  let paginationHTML = `<div class="pagination">`;

  // Prev button
  if (page > 1) {
    paginationHTML += `<button data-page="${page - 1}">&laquo; Prev</button>`;
  }

  let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
  let endPage = startPage + maxVisible - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  // Add first page and ellipsis
  if (startPage > 1) {
    paginationHTML += `<button data-page="1">1</button>`;
    if (startPage > 2) paginationHTML += `<span class="ellipsis">...</span>`;
  }

  // Page numbers
  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `<button data-page="${i}" ${i === page ? 'class="active"' : ''}>${i}</button>`;
  }

  // Add last page and ellipsis
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) paginationHTML += `<span class="ellipsis">...</span>`;
    paginationHTML += `<button data-page="${totalPages}">${totalPages}</button>`;
  }

  // Next button
  if (page < totalPages) {
    paginationHTML += `<button data-page="${page + 1}">Next &raquo;</button>`;
  }

  // Go to page
  paginationHTML += `
    <span class="goto-container">
      Go to: 
      <input type="number" id="gotoPageInput" min="1" max="${totalPages}" style="width:60px;">
      <button id="gotoPageBtn">Go</button>
    </span>
  `;

  paginationHTML += `</div>`;
  document.getElementById("paginationControls").innerHTML = paginationHTML;

  // Add events
  document.querySelectorAll("#paginationControls button[data-page]").forEach(btn => {
    btn.addEventListener("click", () => {
      renderPage(parseInt(btn.getAttribute("data-page")));
    });
  });

  // Go to page event
  document.getElementById("gotoPageBtn").addEventListener("click", () => {
    const inputVal = parseInt(document.getElementById("gotoPageInput").value);
    if (inputVal >= 1 && inputVal <= totalPages) {
      renderPage(inputVal);
    } else {
      alert("Invalid page number");
    }
  });
}


// function renderPagination(totalRows, page) {
//   const totalPages = Math.ceil(totalRows / rowsPerPage);
//   const maxVisible = 7;
//   let paginationHTML = `<div class="pagination">`;

//   if (page > 1) {
//     paginationHTML += `<button data-page="${page - 1}">&laquo; Prev</button>`;
//   }

//   let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
//   let endPage = startPage + maxVisible - 1;
//   if (endPage > totalPages) {
//     endPage = totalPages;
//     startPage = Math.max(1, endPage - maxVisible + 1);
//   }

//   if (startPage > 1) {
//     paginationHTML += `<button data-page="1">1</button>`;
//     if (startPage > 2) paginationHTML += `<span class="ellipsis">...</span>`;
//   }

//   for (let i = startPage; i <= endPage; i++) {
//     paginationHTML += `<button data-page="${i}" ${i === page ? 'class="active"' : ''}>${i}</button>`;
//   }

//   if (endPage < totalPages) {
//     if (endPage < totalPages - 1) paginationHTML += `<span class="ellipsis">...</span>`;
//     paginationHTML += `<button data-page="${totalPages}">${totalPages}</button>`;
//   }

//   if (page < totalPages) {
//     paginationHTML += `<button data-page="${page + 1}">Next &raquo;</button>`;
//   }

//   // "Go to page" input
//   paginationHTML += `
//     <span style="margin-left:10px;">Go to: 
//       <input type="number" id="gotoPageInput" min="1" max="${totalPages}" style="width:60px;">
//       <button id="gotoPageBtn">Go</button>
//     </span>
//   `;

//   paginationHTML += `</div>`;
//   document.getElementById("paginationControls").innerHTML = paginationHTML;

//   // Add events
//   document.querySelectorAll("#paginationControls button[data-page]").forEach(btn => {
//     btn.addEventListener("click", () => {
//       renderPage(parseInt(btn.getAttribute("data-page")));
//     });
//   });

//   // Go to page event
//   document.getElementById("gotoPageBtn").addEventListener("click", () => {
//     const inputVal = parseInt(document.getElementById("gotoPageInput").value);
//     if (inputVal >= 1 && inputVal <= totalPages) {
//       renderPage(inputVal);
//     } else {
//       alert("Invalid page number");
//     }
//   });
// }



// function renderResults(bindings) {
//   const rowsPerPage = 10;   // show 10 results per page
//   let currentPage = 1;

//   // Store keys (columns)
//   const keys = bindings.length > 0 ? Object.keys(bindings[0]) : [];

//   function renderPage(page) {
//     currentPage = page;
//     const start = (page - 1) * rowsPerPage;
//     const end = start + rowsPerPage;
//     const paginated = bindings.slice(start, end);

//     let html = "<table class='result-table'><thead><tr>";
//     keys.forEach(k => html += `<th>${k}</th>`);
//     html += "</tr></thead><tbody>";

//     if (paginated.length > 0) {
//       paginated.forEach(row => {
//         html += "<tr>";
//         keys.forEach(k => {
//           const cell = row[k].value;
//           if (row[k].type === "uri") {
//             html += `<td><a href="${cell}" target="_blank">${cell}</a></td>`;
//           } else {
//             html += `<td>${cell}</td>`;
//           }
//         });
//         html += "</tr>";
//       });
//     } else {
//       html += `<tr><td colspan="${keys.length}">No results</td></tr>`;
//     }
//     html += "</tbody></table>";

//     document.getElementById("resultsContainer").innerHTML = html;

//     renderPagination(bindings.length, page);
//   }

//   function renderPagination(totalRows, page) {
//     const totalPages = Math.ceil(totalRows / rowsPerPage);
//     let paginationHTML = "";

//     if (page > 1) {
//       paginationHTML += `<button data-page="${page - 1}">&laquo; Prev</button>`;
//     }

//     for (let i = 1; i <= totalPages; i++) {
//       paginationHTML += `<button data-page="${i}" ${i === page ? 'class="active"' : ''}>${i}</button>`;
//     }

//     if (page < totalPages) {
//       paginationHTML += `<button data-page="${page + 1}">Next &raquo;</button>`;
//     }

//     document.getElementById("paginationControls").innerHTML = paginationHTML;

//     // attach click events
//     document.querySelectorAll("#paginationControls button").forEach(btn => {
//       btn.addEventListener("click", () => {
//         renderPage(parseInt(btn.getAttribute("data-page")));
//       });
//     });
//   }

//   renderPage(currentPage);
// }








// ---------- Event Listeners ----------
document.getElementById("dataset").onchange = ()=>{
  updateSubtype(); updatePropertyList(); updateVersionFields(); displaySelectedQuery();
};
document.getElementById("queryType").onchange = ()=>{ updatePropertyList(); updateVersionFields(); displaySelectedQuery(); };
document.getElementById("propertySelect")?.addEventListener("change", displaySelectedQuery);
document.getElementById("subtype")?.addEventListener("change", ()=>{ updateVersionFields(); displaySelectedQuery(); });
document.getElementById("executeQueryButton").onclick = executeQuery;

// ---------- Initialize ----------
updateSubtype(); updatePropertyList(); updateVersionFields(); displaySelectedQuery();
