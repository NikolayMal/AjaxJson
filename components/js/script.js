// Load in a document

function loadDoc() {
   const xhttp = new XMLHttpRequest();
   xhttp.onload = function() {
     document.getElementById("demo").innerHTML =
     this.responseText;
   }
   xhttp.open("GET", "information.txt", true);
   xhttp.send();
 }

function loadtablebutton() {
   const xhttp2 = new XMLHttpRequest();
   xhttp2.onload = function() {
      document.getElementById("showLoad").innerHTML = 
      this.responseText;  
   }
   xhttp2.open("GET", "tablebutton.txt", true);
   xhttp2.send();
   setTimeout(() => {tableCreate(tableLimiter=true), alert("Table has been loaded")}, 5000 );
}

// Popup
function oncallPopup() {
      document.getElementById("oncallPopup").classList.toggle("active");
}

// Show / Hide Table
function toggleTable() {
   var showDataDiv = document.getElementById("toggleTable");
   var buttonText = document.getElementById("tableToggle");

   if (showDataDiv.style.display === "block")
   {
      showDataDiv.style.display = "none";
      buttonText.value = "Show the Table";

   }
   else {
      showDataDiv.style.display = "block";
      buttonText.value = "Hide the Table"
   }
}

function tableCreate(tableLimiter) { // Load in all Json files
   $.getJSON('country-objects/country-by-capital-city.json', function (dataCapital, response) {
      $.getJSON('country-objects/country-by-continent.json', function (dataContinent, response) {
         $.getJSON('country-objects/country-by-costline.json', function (dataCostline, response) {
            $.getJSON('country-objects/country-by-currency-name.json', function (dataCurrency, response) {
               $.getJSON('country-objects/country-by-domain-tld.json', function (dataDomain, response) {
                  $.getJSON('country-objects/country-by-flag.json', function (dataFlag, response) {
                     var divContainer = document.getElementById("showData");
                     divContainer.innerHTML="";
                        var table = document.createElement("table");
                        var tableHeader = document.createElement("tr");
                        tableHeader.innerHTML = "<th>Country</th><th>Capital city</th><th>Continent</th><th>Currency</th><th>Domain</th><th>Flag</th>";
                        table.appendChild(tableHeader);
                        if(tableLimiter === true) { // Limit table to show 20 elements, or all.
                           var tableLength = 20;
                        }
                        if(tableLimiter === false) {
                           var tableLength = dataCapital.length-1;
                        }
                        for ( i = 0; i < tableLength-1; i = i + 1 )
                        { // Create the element and add it to the table
                           // console.log(dataCapital[i] + dataContinent[i].continent + dataCostline[i].costline + dataCurrency[i].currency_name + dataDomain[i].tld + dataFlag[i].flag_base64);
                           var row = document.createElement("tr");
                           var country = document.createElement("td");
                           country.innerHTML = dataCapital[i].country;
                           var capital = document.createElement("td");
                           capital.innerHTML = dataCapital[i].city;
                           var continent = document.createElement("td");
                           continent.innerHTML = dataContinent[i].continent;
                           var costline = document.createElement("td");
                           costline.innerHTML = dataCostline[i].costline;
                           var currency_name = document.createElement("td");
                           currency_name.innerHTML = dataCurrency[i].currency_name;
                           var tld = document.createElement("td");
                           tld.innerHTML = dataDomain[i].tld;
                           var flag_base64 = document.createElement("td");
                           flag_base64.innerHTML = "<img src='" + dataFlag[i].flag_base64 + "' width='50' height='50' >'";
                           row.appendChild(country);
                           row.appendChild(capital);
                           row.appendChild(continent);
                           row.appendChild(costline);
                           row.appendChild(currency_name);
                           row.appendChild(tld);
                           row.appendChild(flag_base64)
                           table.appendChild(row);
                        }
                        divContainer.appendChild(table);
                   })
               })
            })
         })
      })
   })
}