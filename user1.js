var stokeList = [];
var MyData = {"data":[]};
var filteres = [];
var scanFormats = {};
var const_result_user = [];
$.ajax({
	type: 'post',
	async: false,
	url: "get_scan_format.php",
	dataType: 'JSON',
	success: function(result){
		scanFormats = result;
	}
});

$.ajax({
	type: 'post',
	async: false,
	url: "get_constent.php",
	dataType: 'JSON',
	success: function(result){
		const_result_user = result;
	}
});

         var wsUri = "ws://nimblestream.lisuns.com:4526/";
  var password = "9585932a-74c6-48c1-9a24-29a9bbe18256";
  var output;
  var isAuthenticate = false;

  function init()
  {
    output = document.getElementById("output");
    testWebSocket();
  }

  function testWebSocket()
  {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) { onOpen(evt) };
    websocket.onclose = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror = function(evt) { onError(evt) };
  }

  function onOpen(evt)
  {
    writeToScreen("CONNECTED");
    Authenticate();  
  }

  function onClose(evt)
  {
    writeToScreen("DISCONNECTED");
  }

  function onMessage(evt)
  {
    writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data+'</span>');
    var event = JSON.parse(evt.data);
	//console.log(event)
	if(event.High>1)
	{
	//alert("hi");
	console.log("Open:- "+event.Open);
	console.log("High:- "+event.High);
	console.log("Low:- "+event.Low);
	console.log("Close:- "+event.Close);
	}
	if(typeof event.InstrumentIdentifier != "undefined") {
		var res =   {  
			"symbol": "" + event.InstrumentIdentifier,
			"open" : "" + event.Open,
			"high": "" + event.High,
			"low": "" + event.Low,
			"ltP": "" + event.Close,
			"ATP": "" + event.AverageTradedPrice
			};

		for(var i = 0; i < MyData.data.length; i++){
			if(MyData.data[i]['symbol'] == event.InstrumentIdentifier ||MyData.data[i]['symbol'] =='undefined' ){
				MyData.data.splice(i, 1);
			}
		}
		
		MyData.data.push(res);
	}				
	
	if(MyData.data.length == stokeList.length){
		getConstat();
		
		$.each(scanFormats, function(index, item){
			showData(item);
		});
	}
	
    if (event.MessageType == "AuthenticateResult")
        if (event.Complete)
        {
            isAuthenticate = true;
            writeToScreen("AUTHENTICATE!!!");
            
            setTimeout(doTest, 2000);
            
            setTimeout(doClose, 120000);
        }
		
				
  }

  function onError(evt)
  {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
  }

  function doSend(message)
  {
    var jsonmessage = JSON.stringify(message);
    writeToScreen("SENT: " + jsonmessage);
    websocket.send(jsonmessage);
	
	//console.log(jsonmessage);
  }
  
  function doClose()
  {
      
	  setTimeout(function(){ websocket.close(); }, 50);
  }

// message --------------------------------------------
function Authenticate()
  {
     writeToScreen("Authenticate");
    var message = 
    {
       MessageType: "Authenticate",
       Password: password
     };
    doSend(message);
  }
  
function doTest()
{
	stokeList = ["ACC-I","AJANTPHARM-I","APOLLOHOSP-I","ASIANPAINT-I","AUROPHARMA-I","AXISBANK-I","BAJAJ-AUTO-I","BAJAJFINSV-I","BAJFINANCE-I","BATAINDIA-I","BEML-I","CANBK-I","CEATLTD-I","CENTURYTEX-I","CHOLAFIN-I","DHFL-I","DRREDDY-I","ESCORTS-I","HAVELLS-I","HDFC-I","HDFCBANK-I","HINDUNILVR-I","IBULHSGFIN-I","ICICIBANK-I","IGL-I","INDIGO-I","INDUSINDBK-I","INFY-I","JETAIRWAYS-I","JUBLFOOD-I","JUSTDIAL-I","KOTAKBANK-I","LICHSGFIN-I","LT-I","M&MFIN-I","MARUTI-I","MCX-I","MGL-I","MINDTREE-I","NIITTECH-I","PVR-I","RAYMOND-I","RELCAPITAL-I","RELIANCE-I","RELINFRA-I","SIEMENS-I","SRF-I","SRTRANSFIN-I","SUNTV-I","TATAELXSI-I","TATASTEEL-I","TCS-I","TECHM-I","TITAN-I","TVSMOTOR-I","UBL-I","UPL-I","VOLTAS-I","WOCKPHARMA-I","YESBANK-I"];
	for(var i = 0; i< stokeList.length; i++){
		//SubscribeSnapshot();
		//SubscribeRealtime(stokeList[i])
		GetLastQuote(stokeList[i])
		//setTimeout(doClose, 4000);
	}
  
					
  //SubscribeSnapshot();
   //SubscribeRealtime();
   //GetServerInfo();
   //GetLimitation();
   //GetFundamentalData();
   //GetFundamentalSupportedIndicators();
   //GetFundamentalIndicators();
   //GetFundamentalInstruments();
   //GetSnapshot();
   //GetLastQuoteArray();
   //GetLastQuote();
   //GetMarketMessages();
   //GetExchangeMessages();
   //GetStrikePrices();
   //GetOptionTypes();
   //GetExpiryDates();
   //GetProducts();
   //GetInstrumentTypes();
   //GetInstruments();
   //GetExchanges();
   //GetHistory();
   //GetInstrumentsOnSearch();
}

/*function SubscribeSnapshot(stokeName)
{
     var request = 
            {
                MessageType: "SubscribeSnapshot",
                Exchange: "NFO",
                InstrumentIdentifier: stokeName,
                Periodicity: "MINUTE",
				Unsubscribe: "false"
				};
			console.log(request);
     doSend(request);
}
*/

function SubscribeRealtime(stokeName)
{
     var request = 
            {
                MessageType: "SubscribeRealtime",
                Exchange: "NFO",
                InstrumentIdentifier: stokeName,
            };
     doSend(request);
	 console.log(request);
}

function GetServerInfo()
{
     var request = 
            {
                MessageType: "GetServerInfo"
            };
     doSend(request);
}

function GetLimitation()
{
     var request = 
            {
                MessageType: "GetLimitation"
            };
     doSend(request);
}

function GetFundamentalData()
{
     var request = 
            {
                MessageType: "GetFundamentalData",
                Instrument: "GPPL",
                IndicatorCode: "GPPL",
                FrequrencyCode: "A"
            };
     doSend(request);
}

function GetFundamentalSupportedIndicators()
{
     var request = 
            {
                MessageType: "GetFundamentalSupportedIndicators",
                Instrument: "GPPL"
            };
     doSend(request);
}

function GetFundamentalIndicators()
{
     var request = 
            {
                MessageType: "GetFundamentalIndicators"
            };
     doSend(request);
}

function GetFundamentalInstruments()
{
     var request = 
            {
                MessageType: "GetFundamentalInstruments"
            };
     doSend(request);
}

function GetSnapshot()
{
     var request = 
            {
                MessageType: "GetSnapshot",
                Exchange: "NFO",
                Periodicity: "MINUTE",
                Period: 1,
                InstrumentIdentifiers: [{Value:"FUTSTK_RPOWER_28SEP2017_XX_0"}, {Value:"FUTSTK_RPOWER_28SEP2017_XX_0"}]
            };
     doSend(request);
}

function GetLastQuoteArray()
{
     var request = 
            {
                MessageType: "GetLastQuoteArray",
                Exchange: "NFO",
                InstrumentIdentifiers: [{Value:"FUTSTK_RPOWER_28SEP2017_XX_0"}, {Value:"FUTSTK_RPOWER_28SEP2017_XX_0"}]
            };
     doSend(request);
}

function GetLastQuote(stokeName)
{
     var request = 
            {
                MessageType: "GetLastQuote",
                Exchange: "NFO",
                InstrumentIdentifier: stokeName
            };
     doSend(request);
}

function GetMarketMessages()
{
     var request = 
            {
                MessageType: "GetMarketMessages",
                Exchange: "NFO"
            };
     doSend(request);
}

function GetExchangeMessages()
{
     var request = 
            {
                MessageType: "GetExchangeMessages",
                Exchange: "NFO"
            };
     doSend(request);
}

function GetStrikePrices()
{
     var request = 
            {
                MessageType: "GetStrikePrices",
                Exchange: "NFO"
            };
     doSend(request);
}

function GetOptionTypes()
{
     var request = 
            {
                MessageType: "GetOptionTypes",
                Exchange: "NFO"
            };
     doSend(request);
}

function GetExpiryDates()
{
     var request = 
            {
                MessageType: "GetExpiryDates",
                Exchange: "NFO"
            };
     doSend(request);
}

function GetProducts()
{
     var request = 
            {
                MessageType: "GetProducts",
                Exchange: "NFO"
            };
     doSend(request);
}

function GetInstrumentTypes()
{
     var request = 
            {
                MessageType: "GetInstrumentTypes",
                Exchange: "NFO"
            };
     doSend(request);
}

function GetExchanges()
{
     var request = 
            {
                MessageType: "GetExchanges"
            };
     doSend(request);
}

function GetInstruments()
{
     var request = 
            {
                MessageType: "GetInstruments",
                Exchange: "NFO"
            };
     doSend(request);
}

function GetHistory()
{
     var request = 
            {
                MessageType: "GetHistory",
                Exchange: "NFO",
                InstrumentIdentifier: "OPTIDX_NIFTY_25JUN2020_PE_11000",
                Periodicity: "MINUTE",
                Period: 1,
                Max: 10
            };
     doSend(request);
}

function GetInstrumentsOnSearch()
{
var request = 
            {
                MessageType: "GetInstrumentsOnSearch",
                Exchange: "MCX",
                Search: "MC"
            };
     doSend(request);
}
//------------------------------------------------------


  function writeToScreen(message)
  {
    var pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
	//console.log(message.Open);
    //tableContent.appendChild(pre);
  }

  window.addEventListener("load", init, false);
 
 function showData(scanInfo){
	 
		 var items = [];
		 var maindata =[];
		 var canPush = false;
		 
		 var scan_mode = scanInfo['mode'];
		 var scan_name = scanInfo['scan_name'];
		 var sel_type = scanInfo['scan_type'];
		 
		 var sel_filter = scanInfo['filterfirst'];
		 var sel_operator = scanInfo['filterOparator'];
		 var sel_filter2 = scanInfo['filterlast'];
		 
		 var second_sel_filter 		= scanInfo['filter1first'];
		 var second_sel_operator 	= scanInfo['filter1firstOparator'];
		 var second_sel_filter2 	= scanInfo['filter1Second'];
		 var second_sel_filter_four = scanInfo['filter1secondOparator'];
		 var second_sel_operator_five = scanInfo['filter1third'];
		 var second_sel_filter_six 	= scanInfo['filter1persentage'];
		 
		 var third_sel_filter 		= scanInfo['filter2first'];
		 var third_sel_operator 	= scanInfo['filter2firstOparator'];
		 var third_sel_filter2 		= scanInfo['filter2Second'];
		 var third_sel_filter_four 	= scanInfo['filter2secondOparator'];
		 var third_sel_operator_five = scanInfo['filter2third'];
		 var third_sel_filter_six 	= scanInfo['filter2persentage'];
		 
		 var fourth_sel_filter 		= scanInfo['filter3first'];
		 var fourth_sel_operator 	= scanInfo['filter3firstOparator'];
		 var fourth_sel_filter2 	= scanInfo['filter3Second'];
		 var fourth_sel_filter_four = scanInfo['filter3secondOparator'];
		 var fourth_sel_operator_five = scanInfo['filter3third'];
		 var fourth_sel_filter_six 	= scanInfo['filter3persentage'];		 

		 var maindata = MyData.data;
		 var tableHeading = '<tr>';
			tableHeading += '<td colspan="10"><h3>' + scan_name + '</h3></td>';
			tableHeading += '</tr>';
		 
			tableHeading += '<tr>';
			tableHeading += '<th>Symbol</th>';
			tableHeading += '<th>Open</th>';
			tableHeading += '<th>Low</th>';
			tableHeading += '<th>High</th>';
			tableHeading += '<th>LtP</th>';
			tableHeading += '<th>ATP</th>';
			tableHeading += '<th>Volume</th>';
			tableHeading += '<th>Auto</th>';
			/* tableHeading += '<th>RCL</th>';
			tableHeading += '<th>RCLX</th>';
			tableHeading += '<th>RCLB</th>';
			tableHeading += '<th>RCLXB</th>';
			tableHeading += '<th>CLPU</th>';
			tableHeading += '<th>CLPD</th>';
			tableHeading += '<th>EH</th>';
			tableHeading += '<th>EL</th>'; */
			tableHeading += '<th>Entry Point</th>';
			tableHeading += '<th>Stop Loss</th>';
			tableHeading += '<th>On Going</th>';
			tableHeading += '<th>&nbsp;</th>';
			
			/*tableHeading += '<th>cAct</th>';
			tableHeading += '<th>yPC</th>';
			tableHeading += '<th>mPC</th>'; */
			tableHeading += '</tr>';
		
		items.push(tableHeading);
		/*for(var i = 0; i < maindata.length; i++)
		{
			
		}
		*/
		
		 for(var i = 0; i < maindata.length; i++)
		 {
			canPush = false;
			if(sel_type != ''){
			
				if(sel_filter != '' && sel_operator != '' && sel_filter2 != '')
				{
					if( second_sel_filter != '' && second_sel_operator != '' && second_sel_filter2 != '' && second_sel_filter_four != '' && second_sel_operator_five != '' && second_sel_filter_six != '')  
					{
						
						if( third_sel_filter != '' && third_sel_operator != '' && third_sel_filter2 != '' && third_sel_filter_four != '' && third_sel_operator_five != '' && third_sel_filter_six != '')
						{
							
							if( fourth_sel_filter != '' && fourth_sel_operator != '' && fourth_sel_filter2 != '' && fourth_sel_filter_four != '' && fourth_sel_operator_five != '' && fourth_sel_filter_six != '')
							{
								var ur_percent 	 = eval( pureNum(maindata[i][second_sel_filter2]) + second_sel_filter_four + (pureNum(maindata[i][second_sel_operator_five])/100*second_sel_filter_six) );
								var ur_percent_2 = eval( pureNum(maindata[i][third_sel_filter2]) + third_sel_filter_four + (pureNum(maindata[i][third_sel_operator_five])/100*third_sel_filter_six) );
								var ur_percent_3 = eval( pureNum(maindata[i][fourth_sel_filter2]) + fourth_sel_filter_four + (pureNum(maindata[i][fourth_sel_operator_five])/100*fourth_sel_filter_six) );
							
								if( sel_type == maindata[i]['auto'] && eval(pureNum(maindata[i][sel_filter]) + sel_operator + pureNum(maindata[i][sel_filter2])) && eval(pureNum(maindata[i][second_sel_filter]) + second_sel_operator + ur_percent) && eval(pureNum(maindata[i][third_sel_filter]) + third_sel_operator + ur_percent_2) && eval(pureNum(maindata[i][fourth_sel_filter]) + fourth_sel_operator + ur_percent_3) ){
									canPush = true;
								}
							}
							else if( fourth_sel_filter != '' && fourth_sel_operator != '' && fourth_sel_filter2 != '' )
							{
								var ur_percent 	 = eval( pureNum(maindata[i][second_sel_filter2]) + second_sel_filter_four + (pureNum(maindata[i][second_sel_operator_five])/100*second_sel_filter_six) );
								var ur_percent_2 = eval( pureNum(maindata[i][third_sel_filter2]) + third_sel_filter_four + (pureNum(maindata[i][third_sel_operator_five])/100*third_sel_filter_six) );
							
								if( sel_type == maindata[i]['auto'] && eval(pureNum(maindata[i][sel_filter]) + sel_operator + pureNum(maindata[i][sel_filter2])) && eval(pureNum(maindata[i][second_sel_filter]) + second_sel_operator + ur_percent) && eval(pureNum(maindata[i][third_sel_filter]) + third_sel_operator + ur_percent_2) && eval(pureNum(maindata[i][fourth_sel_filter]) + fourth_sel_operator + pureNum(maindata[i][fourth_sel_filter2])) ){
									canPush = true;
								}
							}
							else
							{
								var ur_percent 	 = eval( pureNum(maindata[i][second_sel_filter2]) + second_sel_filter_four + (pureNum(maindata[i][second_sel_operator_five])/100*second_sel_filter_six) );
								var ur_percent_2 = eval( pureNum(maindata[i][third_sel_filter2]) + third_sel_filter_four + (pureNum(maindata[i][third_sel_operator_five])/100*third_sel_filter_six) );
							
								if( sel_type == maindata[i]['auto'] && eval(pureNum(maindata[i][sel_filter]) + sel_operator + pureNum(maindata[i][sel_filter2])) && eval(pureNum(maindata[i][second_sel_filter]) + second_sel_operator + ur_percent) && eval(pureNum(maindata[i][third_sel_filter]) + third_sel_operator + ur_percent_2) ){
									canPush = true;
								}	
							}
							
						}
						else if( third_sel_filter != '' && third_sel_operator != '' && third_sel_filter2 != '' )
						{
							
							if( fourth_sel_filter != '' && fourth_sel_operator != '' && fourth_sel_filter2 != '' && fourth_sel_filter_four != '' && fourth_sel_operator_five != '' && fourth_sel_filter_six != '')
							{
								var ur_percent 	 = eval( pureNum(maindata[i][second_sel_filter2]) + second_sel_filter_four + (pureNum(maindata[i][second_sel_operator_five])/100*second_sel_filter_six) );
								var ur_percent_3 = eval( pureNum(maindata[i][fourth_sel_filter2]) + fourth_sel_filter_four + (pureNum(maindata[i][fourth_sel_operator_five])/100*fourth_sel_filter_six) );
								
								if( sel_type == maindata[i]['auto'] && eval(pureNum(maindata[i][sel_filter]) + sel_operator + pureNum(maindata[i][sel_filter2])) && eval(pureNum(maindata[i][second_sel_filter]) + second_sel_operator + ur_percent) && eval(pureNum(maindata[i][third_sel_filter]) + third_sel_operator + pureNum(maindata[i][third_sel_filter2])) && eval(pureNum(maindata[i][fourth_sel_filter]) + fourth_sel_operator + ur_percent_3) ){
									canPush = true;
								}
							}
							else if( fourth_sel_filter != '' && fourth_sel_operator != '' && fourth_sel_filter2 != '' )
							{
								var ur_percent 	 = eval( pureNum(maindata[i][second_sel_filter2]) + second_sel_filter_four + (pureNum(maindata[i][second_sel_operator_five])/100*second_sel_filter_six) );
								
								if( sel_type == maindata[i]['auto'] && eval(pureNum(maindata[i][sel_filter]) + sel_operator + pureNum(maindata[i][sel_filter2])) && eval(pureNum(maindata[i][second_sel_filter]) + second_sel_operator + ur_percent) && eval(pureNum(maindata[i][third_sel_filter]) + third_sel_operator + pureNum(maindata[i][third_sel_filter2])) && eval(pureNum(maindata[i][fourth_sel_filter]) + fourth_sel_operator + pureNum(maindata[i][fourth_sel_filter2])) ){
									canPush = true;
								}
							}
							else
							{
								var ur_percent 	 = eval( pureNum(maindata[i][second_sel_filter2]) + second_sel_filter_four + (pureNum(maindata[i][second_sel_operator_five])/100*second_sel_filter_six) );
								
								if( sel_type == maindata[i]['auto'] && eval(pureNum(maindata[i][sel_filter]) + sel_operator + pureNum(maindata[i][sel_filter2])) && eval(pureNum(maindata[i][second_sel_filter]) + second_sel_operator + ur_percent) && eval(pureNum(maindata[i][third_sel_filter]) + third_sel_operator + pureNum(maindata[i][third_sel_filter2]))){
									canPush = true;
								}	
							}
							
						}
						else
						{
							var ur_percent = eval( pureNum(maindata[i][second_sel_filter2]) + second_sel_filter_four + (pureNum(maindata[i][second_sel_operator_five])/100*second_sel_filter_six) );
						
							if( sel_type == maindata[i]['auto'] && eval(pureNum(maindata[i][sel_filter]) + sel_operator + pureNum(maindata[i][sel_filter2])) && eval(pureNum(maindata[i][second_sel_filter]) + second_sel_operator + ur_percent) ){
								canPush = true;
							}
						}
						
					}
					else if( second_sel_filter != '' && second_sel_operator != '' && second_sel_filter2 != '')  
					{	
						if( third_sel_filter != '' && third_sel_operator != '' && third_sel_filter2 != '' && third_sel_filter_four != '' && third_sel_operator_five != '' && third_sel_filter_six != '')  
						{
							
							if( fourth_sel_filter != '' && fourth_sel_operator != '' && fourth_sel_filter2 != '' && fourth_sel_filter_four != '' && fourth_sel_operator_five != '' && fourth_sel_filter_six != '')
							{
								var ur_percent_2 = eval( pureNum(maindata[i][third_sel_filter2]) + third_sel_filter_four + (pureNum(maindata[i][third_sel_operator_five])/100*third_sel_filter_six) );
								var ur_percent_3 = eval( pureNum(maindata[i][fourth_sel_filter2]) + fourth_sel_filter_four + (pureNum(maindata[i][fourth_sel_operator_five])/100*fourth_sel_filter_six) );
							
								if( sel_type == maindata[i]['auto'] && eval(pureNum(maindata[i][sel_filter]) + sel_operator + pureNum(maindata[i][sel_filter2])) && eval(pureNum(maindata[i][second_sel_filter]) + second_sel_operator + pureNum(maindata[i][second_sel_filter2])) && eval(pureNum(maindata[i][third_sel_filter]) + third_sel_operator + ur_percent_2) && eval(pureNum(maindata[i][fourth_sel_filter]) + fourth_sel_operator + ur_percent_3) ){
									canPush = true;
								}
							}
							else if( fourth_sel_filter != '' && fourth_sel_operator != '' && fourth_sel_filter2 != '' )
							{
								var ur_percent_2 = eval( pureNum(maindata[i][third_sel_filter2]) + third_sel_filter_four + (pureNum(maindata[i][third_sel_operator_five])/100*third_sel_filter_six) );
							
								if( sel_type == maindata[i]['auto'] && eval(pureNum(maindata[i][sel_filter]) + sel_operator + pureNum(maindata[i][sel_filter2])) && eval(pureNum(maindata[i][second_sel_filter]) + second_sel_operator + pureNum(maindata[i][second_sel_filter2])) && eval(pureNum(maindata[i][third_sel_filter]) + third_sel_operator + ur_percent_2) && eval(pureNum(maindata[i][fourth_sel_filter]) + fourth_sel_operator + pureNum(maindata[i][fourth_sel_filter2])) ){
									canPush = true;
								}
							}
							else
							{
								var ur_percent_2 = eval( pureNum(maindata[i][third_sel_filter2]) + third_sel_filter_four + (pureNum(maindata[i][third_sel_operator_five])/100*third_sel_filter_six) );
							
								if( sel_type == maindata[i]['auto'] && eval(pureNum(maindata[i][sel_filter]) + sel_operator + pureNum(maindata[i][sel_filter2])) && eval(pureNum(maindata[i][second_sel_filter]) + second_sel_operator + pureNum(maindata[i][second_sel_filter2])) && eval(pureNum(maindata[i][third_sel_filter]) + third_sel_operator + ur_percent_2) ){
									canPush = true;
								}
							}
							
						}
						else if( third_sel_filter != '' && third_sel_operator != '' && third_sel_filter2 != '' )
						{
							
							if( fourth_sel_filter != '' && fourth_sel_operator != '' && fourth_sel_filter2 != '' && fourth_sel_filter_four != '' && fourth_sel_operator_five != '' && fourth_sel_filter_six != '')
							{
								var ur_percent_3 = eval( pureNum(maindata[i][fourth_sel_filter2]) + fourth_sel_filter_four + (pureNum(maindata[i][fourth_sel_operator_five])/100*fourth_sel_filter_six) );
								
								if( sel_type == maindata[i]['auto'] && eval(pureNum(maindata[i][sel_filter]) + sel_operator + pureNum(maindata[i][sel_filter2])) && eval(pureNum(maindata[i][second_sel_filter]) + second_sel_operator + pureNum(maindata[i][second_sel_filter2])) && eval(pureNum(maindata[i][third_sel_filter]) + third_sel_operator + pureNum(maindata[i][third_sel_filter2])) && eval(pureNum(maindata[i][fourth_sel_filter]) + fourth_sel_operator + ur_percent_3) ){
									canPush = true;
								}
							}
							else if( fourth_sel_filter != '' && fourth_sel_operator != '' && fourth_sel_filter2 != '' )
							{
								if( sel_type == maindata[i]['auto'] && eval(pureNum(maindata[i][sel_filter]) + sel_operator + pureNum(maindata[i][sel_filter2])) && eval(pureNum(maindata[i][second_sel_filter]) + second_sel_operator + pureNum(maindata[i][second_sel_filter2])) && eval(pureNum(maindata[i][third_sel_filter]) + third_sel_operator + pureNum(maindata[i][third_sel_filter2])) && eval(pureNum(maindata[i][fourth_sel_filter]) + fourth_sel_operator + pureNum(maindata[i][fourth_sel_filter2])) ){
									canPush = true;
								}
							}
							else
							{
								if( sel_type == maindata[i]['auto'] && eval(pureNum(maindata[i][sel_filter]) + sel_operator + pureNum(maindata[i][sel_filter2])) && eval(pureNum(maindata[i][second_sel_filter]) + second_sel_operator + pureNum(maindata[i][second_sel_filter2])) && eval(pureNum(maindata[i][third_sel_filter]) + third_sel_operator + pureNum(maindata[i][third_sel_filter2])) ){
									canPush = true;
								}
							}
							
						}
						else
						{
							if( sel_type == maindata[i]['auto'] && eval(pureNum(maindata[i][sel_filter]) + sel_operator + pureNum(maindata[i][sel_filter2])) && eval(pureNum(maindata[i][second_sel_filter]) + second_sel_operator + pureNum(maindata[i][second_sel_filter2])) ){
								canPush = true;
							}
						}
						
					}
					else
					{ 
						if( sel_type == maindata[i]['auto'] && eval(pureNum(maindata[i][sel_filter]) + sel_operator + pureNum(maindata[i][sel_filter2])) ){
							canPush = true;
						}
					}
				}
				else
				{
					if( sel_type == maindata[i]['auto'] ){
						canPush = true;
					}
				}
				
				if(canPush){
					items.push(getRowData(i, scanInfo));
				}
			}
			else 
			{
				// if(typeof maindata[i]['const_values'] != 'undefined') {
						 items.push('<tr>');
						 /* $.each( maindata[i], function( key, val ) {
							items.push( "<td class='" + key + "'>" + val + "</td>" );
						 }); */
						 
						 items.push( "<td class='symbol'>" 	+ maindata[i]['symbol'] + "</td>" );
						 items.push( "<td class='open'>" 	+ maindata[i]['open'] 	+ "</td>" );
						 items.push( "<td class='low'>" 	+ maindata[i]['low'] 	+ "</td>" );
						 items.push( "<td class='high'>" 	+ maindata[i]['high'] 	+ "</td>" );
						 items.push( "<td class='ltP'>" 	+ maindata[i]['ltP'] 	+ "</td>" );
						 items.push( "<td class='ATP'>" 	+ maindata[i]['ATP'] 	+ "</td>" );
						  items.push( "<td class='Volume'>" + maindata[i]['low'] + "</td>" );
						  items.push( "<td class='Auto'>" 	+ maindata[i]['auto'] 	+ "</td>" );
						/*   items.push( "<td class='RCL'>" 	+ maindata[i]['RCL'] + "</td>" );
						  items.push( "<td class='RCLX'>" 	+ maindata[i]['RCLX'] 	+ "</td>" );
						  items.push( "<td class='RCLB'>" 	+ maindata[i]['RCLB'] 	+ "</td>" );
						  items.push( "<td class='RCLXB'>" 	+ maindata[i]['RCLXB'] 	+ "</td>" );
						  items.push( "<td class='CLPU'>" 	+ maindata[i]['CLPU'] 	+ "</td>" );
						  items.push( "<td class='CLPD'>" 	+ maindata[i]['CLPD'] 	+ "</td>" );
						  items.push( "<td class='EH'>" 	+ maindata[i]['EH'] 	+ "</td>" );
						  items.push( "<td class='EL'>" 	+ maindata[i]['EL'] 	+ "</td>" ); */
						 
						 items.push('</tr>'); 
				// }
			}
		 }
		  
		 $('#tableContent').html('');
		$( "<table/>", {
			 "class": "my-new-list",
			 html: items.join( "" )
		 }).appendTo( "#tableContent" );
		 
		/*  var filteredData = $('#tableContent table tr').length - 1;
		 $('#tableContent').prepend('<div>Total records showing: ' + filteredData + '</div>'); */
 }
 

 function getRowData(a, scanInfo){
	var maindata = MyData.data;
	
	var entry_sel_filter 	= scanInfo['entry_sel_filter'];	
	var entry_sel_operator 	= scanInfo['entry_sel_operator'];
	var entry_sel_filter2 	= scanInfo['entry_sel_filter2'];
	var entry_sel_filter_six = scanInfo['entry_sel_filter_six'];
	var entry_value = '-';
	
	
	if(entry_sel_filter != '' && entry_sel_operator != '' && entry_sel_filter2 != '' && entry_sel_filter_six != '')
	{
		var entry_percent = pureNum(maindata[a][entry_sel_filter2])/100*entry_sel_filter_six;
		entry_value	= eval( pureNum(maindata[a][entry_sel_filter]) + entry_sel_operator + entry_percent );	
	}
	else if(entry_sel_filter != '' && entry_sel_operator != '' && entry_sel_filter2 != '')
	{
		entry_value	= eval( pureNum(maindata[a][entry_sel_filter]) + entry_sel_operator + pureNum(maindata[a][entry_sel_filter2]) );	
	}
	else if(entry_sel_filter != '')
	{
		entry_value	= maindata[a][entry_sel_filter];
	}
	
	
	var stop_sel_filter 	= scanInfo['stop_sel_filter'];
	var stop_sel_operator 	= scanInfo['stop_sel_operator'];
	var stop_sel_filter2 	= scanInfo['stop_sel_filter2'];
	var stop_sel_filter_six = scanInfo['stop_sel_filter_six'];
	var stop_value = '-';
	
	if(stop_sel_filter != '' && stop_sel_operator != '' && stop_sel_filter2 != '' && stop_sel_filter_six != '')
	{
		var stop_percent = pureNum(maindata[a][stop_sel_filter2])/100*stop_sel_filter_six;
		stop_value	= eval( pureNum(maindata[a][stop_sel_filter]) + stop_sel_operator + stop_percent );	
	}
	else if(stop_sel_filter != '' && stop_sel_operator != '' && stop_sel_filter2 != '')
	{
		stop_value	= eval( pureNum(maindata[a][stop_sel_filter]) + stop_sel_operator + pureNum(maindata[a][stop_sel_filter2]) );	
	}
	else if(stop_sel_filter != '')
	{
		stop_value	= maindata[a][stop_sel_filter];
	}
	
	
	var going_sel_filter 	= scanInfo['going_sel_filter'];
	var going_sel_operator 	= scanInfo['going_sel_operator'];
	var going_sel_filter2 	= scanInfo['going_sel_filter2'];
	var going_sel_filter_six = scanInfo['going_sel_filter_six'];
	var going_value = '-';
	
	if(going_sel_filter != '' && going_sel_operator != '' && going_sel_filter2 != '' && going_sel_filter_six != '')
	{
		var going_percent = pureNum(maindata[a][going_sel_filter2])/100*going_sel_filter_six;
		going_value	= eval( pureNum(maindata[a][going_sel_filter]) + going_sel_operator + going_percent );	
	}
	else if(going_sel_filter != '' && going_sel_operator != '' && going_sel_filter2 != '')
	{
		going_value	= eval( pureNum(maindata[a][going_sel_filter]) + going_sel_operator + pureNum(maindata[a][going_sel_filter2]) );	
	}
	else if(going_sel_filter != '')
	{
		going_value	= maindata[a][going_sel_filter];
	}
	
	var itemsRow = '<tr>';
	 	 
	itemsRow += "<td class='symbol'>" 	+ maindata[a]['symbol'] + "</td>";
	itemsRow += "<td class='open'>" 	+ maindata[a]['open'] 	+ "</td>";
	itemsRow += "<td class='low'>" 		+ maindata[a]['low'] 	+ "</td>";
	itemsRow += "<td class='high'>" 	+ maindata[a]['high'] 	+ "</td>";
	itemsRow += "<td class='ltP'>" 		+ maindata[a]['ltP'] 	+ "</td>";
	itemsRow += "<td class='ATP'>" 		+ maindata[a]['ATP'] 	+ "</td>";
	itemsRow += "<td class='Volume'>" 	+ maindata[a]['low'] 	+ "</td>";
	itemsRow += "<td class='Auto'>" 	+ maindata[a]['auto'] 	+ "</td>";
	/* itemsRow += "<td class='RCL'>" 		+ maindata[a]['RCL'] 	+ "</td>";
	itemsRow += "<td class='RCLX'>" 	+ maindata[a]['RCLX'] 	+ "</td>";
	itemsRow += "<td class='RCLB'>" 	+ maindata[a]['RCLB'] 	+ "</td>";
	itemsRow += "<td class='RCLXB'>" 	+ maindata[a]['RCLXB'] 	+ "</td>";
	itemsRow += "<td class='CLPU'>" 	+ maindata[a]['CLPU'] 	+ "</td>";
	itemsRow += "<td class='CLPD'>" 	+ maindata[a]['CLPD'] 	+ "</td>";
	itemsRow += "<td class='EH'>" 		+ maindata[a]['EH'] 	+ "</td>";
	itemsRow += "<td class='EL'>" 		+ maindata[a]['EL'] 	+ "</td>"; */
	
	itemsRow += "<td class='Entry'>" 	+ entry_value 	+ "</td>";
	itemsRow += "<td class='Stop Loss'>"+ stop_value 	+ "</td>";
	itemsRow += "<td class='On Going'>" + going_value 	+ "</td>";
	
	 if(scanInfo['mode'] == 'Logn'){
		 itemsRow += '<td><input type="button" value="Buy" class="buy_button" /></td>'; 
	 }else if(scanInfo['mode'] == 'Short'){
		 itemsRow += '<td><input type="button" value="Sell" class="sel_button" /></td>'; 
	 } 
	 
	 itemsRow += '</tr>'; 
	 
	 return itemsRow;
 }

function pureNum(num) {
	return (num)?(Number(num.replace(',', ''))):0;
}
function getConstat(){
	var productArr = MyData.data;
	 /* $.ajax({
		type: 'post',
		async: false,
		url: "get_constent.php",
		dataType: 'JSON',
		success: function(result){ */
			
			/* for(var i = 0; i < productArr.length; i++){
				for(var j = 0; j < result.length; j++){
					if(productArr[i].symbol == result[j]['d_symbol']){
						console.log(result[j]['d_symbol']);
						productArr[i]['const_values'] = result[j];
					}
				}
			}*/
		
		for(var j = 0; j < productArr.length; j++){
			productArr[j]['RCL'] = "0";
			productArr[j]['RCLX'] = "0";
			productArr[j]['RCLB'] = "0";
			productArr[j]['RCLXB'] = "0";
			productArr[j]['RCLXB'] = "0";
			productArr[j]['CLPU'] = "0";
			productArr[j]['CLPD'] = "0";
			productArr[j]['EH'] = "0";
			productArr[j]['EL'] = "0";
			productArr[j]['auto'] = "0";
		}

			
			for(var i = 0; i < productArr.length; i++){
				$.each(const_result_user, function(index, item){
					
					var RCL 		= pureNum(productArr[i].open)	+ pureNum(item['d_VEL']);
					var RCLX 		= pureNum(productArr[i].open)	+ pureNum(item['d_VEL2']);
					var RCLB 		= (pureNum(productArr[i].open)	- pureNum(item['d_VEL'])).toFixed(2);
					var RCLXB 		= (pureNum(productArr[i].open)	- pureNum(item['d_VEL2'])).toFixed(2);
					var d_2YGHVLA 	= pureNum(item['d_2YGH'])		+ pureNum(item['d_VEL']);
					var d_2YGHVLD 	= (pureNum(item['d_2YGH'])		- pureNum(item['d_VEL'])).toFixed(2);
					var d_2YGHVL2A	= pureNum(item['d_2YGH'])	+ pureNum(item['d_VEL2']);
					var d_2YGHVL2D	= (pureNum(item['d_2YGH'])	- pureNum(item['d_VEL2'])).toFixed(2);
					var YGHVLA 		= pureNum(item['d_YGH'])	+ pureNum(item['d_VEL']);
					var YGHVLD 		= (pureNum(item['d_YGH'])	- pureNum(item['d_VEL'])).toFixed(2);
					var YGHVL2A 	= pureNum(item['d_YGH'])	+ pureNum(item['d_VEL2']);
					var YGHVL2D 	= (pureNum(item['d_YGH'])	- pureNum(item['d_VEL2'])).toFixed(2);
					var VHVLA 		= pureNum(item['d_VH'])		+ pureNum(item['d_VEL']);
					var VHVLD 		= (pureNum(item['d_VH'])	- pureNum(item['d_VEL'])).toFixed(2);
					var VHVL2A 		= pureNum(item['d_VH'])		+ pureNum(item['d_VEL2']);
					var VHVL2D 		= (pureNum(item['d_VH'])	- pureNum(item['d_VEL2'])).toFixed(2);
					var VLVLA 		= pureNum(item['d_VL'])		+ pureNum(item['d_VEL']);
					var VLVLD 		= (pureNum(item['d_VL'])	- pureNum(item['d_VEL'])).toFixed(2);
					var VLVL2A 		= pureNum(item['d_VL'])		+ pureNum(item['d_VEL2']);
					var VLVL2D 		= pureNum(item['d_VL'])		+ pureNum(item['d_VEL2']);
					var YGLVLA 		= pureNum(item['d_YGL'])	+ pureNum(item['d_VEL']);
					var YGLVLD 		= (pureNum(item['d_YGL'])	- pureNum(item['d_VEL'])).toFixed(2);
					var YGLVL2A 	= pureNum(item['d_YGL'])	+ pureNum(item['d_VEL2']);
					var YGLVL2D 	= (pureNum(item['d_YGL'])	- pureNum(item['d_VEL2'])).toFixed(2);
					var d_2YGLVLA 	= pureNum(item['d_2YGL'])	+ pureNum(item['d_VEL']);
					var d_2YGLVLD 	= (pureNum(item['d_2YGL'])	- pureNum(item['d_VEL'])).toFixed(2);
					var d_2YGLVL2A	= pureNum(item['d_2YGL'])	+ pureNum(item['d_VEL2']);
					var d_2YGLVL2D	= (pureNum(item['d_2YGL'])	- pureNum(item['d_VEL2'])).toFixed(2);
					var CLPU 		= (pureNum(productArr[i].open)	- pureNum(item['d_CL'])+pureNum(item['d_COL'])).toFixed(2);
					var CLPD 		= (pureNum(productArr[i].open)	- pureNum(item['d_CL']) +pureNum(item['d_3S'])).toFixed(2);
					var EH 			= pureNum(productArr[i].open)	- pureNum(item['d_CL'])+pureNum(item['d_YGH']);
					var EL 			= pureNum(productArr[i].open)	- pureNum(item['d_CL'])+pureNum(item['d_YGH']);
					
					var auto = '';
					if((pureNum(productArr[i].open)< pureNum(item['d_2YGH']))&&(pureNum(productArr[i].open)> pureNum(item['d_2YGH']))){
						auto = 'HD';
					}else if( (pureNum(productArr[i].open) < pureNum(item['d_YGH'])) && (pureNum(productArr[i].open) > pureNum(item['d_VH'])))  {
						auto = 'ODU';
					}else if( (pureNum(productArr[i].open) < pureNum(item['d_VH'])) && (pureNum(productArr[i].open) > pureNum(item['d_VL'])) )  {
						auto = 'OIR';
					}else if( (pureNum(productArr[i].open) < pureNum(item['d_VL'])) && (pureNum(productArr[i].open) > pureNum(item['d_YGL'])) )  {
						auto = 'ODD';
					}else if( (pureNum(productArr[i].open) > pureNum(item['d_2YGL'])) )  {
						auto = '7DH';
					}else{
						auto = '7DL';
					}
					
					console.log(RCL);
					if(item['d_symbol'] == productArr[i].symbol){
						productArr[i]['const_values'] = item;
						productArr[i]['RCL'] = "" + RCL;
						productArr[i]['RCLX'] = "" + RCLX;
						productArr[i]['RCLB'] = "" + RCLB;
						productArr[i]['RCLXB'] = "" + RCLXB;
						productArr[i]['RCLXB'] = "" + d_2YGHVLA;
						productArr[i]['CLPU'] = "" + CLPU;
						productArr[i]['CLPD'] = "" + CLPD;
						productArr[i]['EH'] = "" + EH;
						productArr[i]['EL'] = "" + EL;
						productArr[i]['auto'] = "" + auto;
						
						//productArr[i] = Object.assign(RCL,RCLX,RCLB,RCLXB,d_2YGHVLA,CLPU,CLPD,EH,EL, productArr[i]);
						productArr[i] = Object.assign(item, productArr[i]);
					}
				});
			}
				
			
			
			var const_var_zero = {"d_VEL":"0", "d_VEL2":"0", "d_VH":"0", "d_VL":"0", "d_UR":"0", "d_YGH":"0", "d_YGL":"0", "d_2YGH":"0", "d_2YGL":"0", "d_3YGH":"0", "d_3YGL":"0", "d_LP":"0", "d_2LP":"0", "d_3LP":"0", "d_COL":"0", "d_CL":"0", "d_3S":"0", "d_3SU":"0"};
			
			for(var i = 0; i < productArr.length; i++){
				if(!(productArr[i].hasOwnProperty('const_values'))){
					//productArr[i] = Object.assign(const_var_zero, productArr[i]);
					$.each(const_var_zero, function(index2, item2){
						productArr[i][index2] = item2;
					}
					);
				}
				
			}
			
			
			MyData.data = productArr;
			console.log('RS:');
			console.log(productArr);
			
		/* }
	}); */
}
 