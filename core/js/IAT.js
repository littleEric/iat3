template = {};
sub = '';

function randomString(length) {
	var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars.charAt(Math.floor(Math.random() * (chars.length - 1)));
    return result;
}

// Loads the input file and starts introduction
function initialize()
{	
	// get active template & load data into global variable
	$.getJSON("templates/active.txt", function(input) {
		$.getJSON("templates/"+input.active+"/input.txt", function(data) { 
			template = data;
            loadInstructions("one");
		});
	});
}

function loadInstructions(stage)
{
	switch(stage)
	{
		case 'one':
			if(sub.search('/[^a-zA-Z0-9]/g')==-1)
			{
				$.get("core/instruct1.html", function(data) {
					$("#instructions").html(data);
				});
			}
			else
			{
				alert("Please enter a valid subject ID");
			}
			break;
		case 'two':
			$.get("core/instruct2.html", function(data) {
				$("#instructions").html(data);
				
                $("#clabel1").html(template.cat1.label);
		        $("#clabel2").html(template.cat2.label);
		        $("#clabelA").html(template.catA.label);
		        $("#clabelB").html(template.catB.label);
			});
			break;
		case 'IAT':
			$.get("core/IAT.html", function(data) {
				$('body').html(data);
				document.onkeypress = keyHandler; 
				startIAT();
			});
			break;
	}
}

// Initialize variables, build page & data object, display instructions
function startIAT()
{
	currentState = "instruction";
	session = 0;
	roundnum = 0;
	
	// default to show results to participant
	if (!('showResult' in template))
	{
	    template.showResult = "show";
	}
	
	// make the target or association words green
	if (Math.random() < 0.5)
	{
		openA = "<font color=blue>";
		closeA = "</font>";
		open1 = "";
		close1 = "";
	}
	else
	{		
		open1 = "<font color=blue>";
		close1 = "</font>";
		openA = "";
		closeA = "";
	}
	buildPage();
	roundArray = initRounds();
    instructionPage();
    
}

// Adds all images to page (initially hidden) so they are pre-loaded for IAT
function buildPage()
{
	if (template.catA.itemtype == "img")
	{
		for (i in template.catA.items)
		{
			var itemstr = '<img id="'+template.catA.datalabel+i+'" class="IATitem" src="templates/'+template.name+'/img/'+template.catA.items[i]+'">';
			$("#exp_instruct").after(itemstr);
		}
	}
	if (template.catB.itemtype == "img")
	{
		for (i in template.catB.items)
		{
			var itemstr = '<img id="'+template.catB.datalabel+i+'" class="IATitem" src="templates/'+template.name+'/img/'+template.catB.items[i]+'">';
			$("#exp_instruct").after(itemstr);
		}
	}
	if (template.cat1.itemtype == "img")
	{
		for (i in template.cat1.items)
		{
			var itemstr = '<img id="'+template.cat1.datalabel+i+'" class="IATitem" src="templates/'+template.name+'/img/'+template.cat1.items[i]+'">';
			$("#exp_instruct").after(itemstr);
		}
	}
	if (template.cat2.itemtype == "img")
	{
		for (i in template.cat2.items)
		{
			var itemstr = '<img id="'+template.cat2.datalabel+i+'" class="IATitem" src="templates/'+template.name+'/img/'+template.cat2.items[i]+'">';
			$("#exp_instruct").after(itemstr);
		}
	}
}

// Round object
function IATround()
{
	this.starttime = 0;
	this.endtime = 0;
	this.itemtype = "none";
	this.category = "none";
	this.catIndex = 0;
	this.correct = 0;
	this.errors = 0;
}

// Create array for each session & round, with pre-randomized ordering of images
function initRounds()
{
    var roundArray = [];
    // for each session
    for (var i=0; i<7; i++)
    {
        roundArray[i] = [];
        switch (i)
        {
            case 0:
            case 4:
                stype = "target";
                numrounds = 20;
                break;
            case 1:    
                stype = "association";
                numrounds = 20;
                break;
            case 2:
            case 3:
            case 5:
            case 6:
                stype = "both";
                // numrounds = 40;
                numrounds = 20;
                break;
            
        }
		prevIndexA = -1; prevIndex1 = -1;
        for (var j = 0; j<numrounds; j++)
        {
            var round = new IATround();
            
            if (stype == "target")
            {
                round.category = (Math.random() < 0.5 ? template.catA.datalabel : template.catB.datalabel);
            }
            else if (stype == "association")
            {
                round.category = (Math.random() < 0.5 ? template.cat1.datalabel : template.cat2.datalabel);  
            }
            else if (stype == "both")
            {
				if (j % 2 == 0) { round.category = (Math.random() < 0.5 ? template.catA.datalabel : template.catB.datalabel); }
				else { round.category = (Math.random() < 0.5 ? template.cat1.datalabel : template.cat2.datalabel); }
            }
        	// pick a category
        	if (round.category == template.catA.datalabel) 
        	{ 
				round.itemtype = template.catA.itemtype;
				if (i < 4) { round.correct = 1; }
				else { round.correct = 2; }
				
				// pick an item different from the last
				do 
					{ round.catIndex = Math.floor(Math.random()*template.catA.items.length); }
	        	while (prevIndexA == round.catIndex)
	        	prevIndexA = round.catIndex;
        		
        	}
        	else if (round.category == template.catB.datalabel)
        	{ 
				round.itemtype = template.catB.itemtype;
				if (i < 4) { round.correct = 2; }
				else { round.correct = 1; }
				// pick an item different from the last
				do
	        	    { round.catIndex = Math.floor(Math.random()*template.catB.items.length); }
	        	while (prevIndexA == round.catIndex)
	        	prevIndexA = round.catIndex;
        	}
        	else if (round.category == template.cat1.datalabel)
        	{ 
				round.itemtype = template.cat1.itemtype;
        		round.correct = 1;
				// pick an item different from the last
				do
	        	    { round.catIndex = Math.floor(Math.random()*template.cat1.items.length); }
	        	while (prevIndex1 == round.catIndex)
	        	prevIndex1 = round.catIndex;
        	}
        	else if (round.category == template.cat2.datalabel)
        	{ 
				round.itemtype = template.cat2.itemtype;
        		round.correct = 2;
				// pick an item different from the last
				do
	        	    { round.catIndex = Math.floor(Math.random()*template.cat2.items.length); }
	        	while (prevIndex1 == round.catIndex)
	        	prevIndex1 = round.catIndex;
        	}	
        	
        	roundArray[i].push(round);
        }
    }
    
    return roundArray;
}

// insert instruction text based on stage in IAT
function instructionPage()
{	
	switch (session)
    {
		case 0:
			$('#left_cat').ready(function() { $('#left_cat').html(openA+template.catA.label+closeA); });
			$('#right_cat').ready(function() { $('#right_cat').html(openA+template.catB.label+closeA); });
			break;
        case 1:    
			$("#left_cat").html(open1+template.cat1.label+close1);
			$("#right_cat").html(open1+template.cat2.label+close1);
            break;
        case 2:
        case 3:
			$("#left_cat").html(openA+template.catA.label+closeA+'<br>or<br>'+open1+template.cat1.label+close1);
			$("#right_cat").html(openA+template.catB.label+closeA+'<br>or<br>'+open1+template.cat2.label+close1);
            break;
        case 4:
			$("#left_cat").html(openA+template.catB.label+closeA);
			$("#right_cat").html(openA+template.catA.label+closeA);
			break;
        case 5:
        case 6:
			$("#left_cat").html(openA+template.catB.label+closeA+'<br>or<br>'+open1+template.cat1.label+close1);
			$("#right_cat").html(openA+template.catA.label+closeA+'<br>or<br>'+open1+template.cat2.label+close1);
            break;
    }
	if (session == 7)
	{
		//清空左上角元素
        $("#hint").html("");
		$("#left_cat").html("");
		$("#right_cat").html("");
		$("#exp_instruct").html("<img src='core/spinner.gif'>");
		//写数据
		WriteFile();
		//若showResult值为"show",则计算并显示结果页
		if(template.showResult == "show")
		{
            //不显示结果，跳转到最后一页
			window.location.replace("thanks.php");
			//calculateIAT();
		}
		else
		{
            // resulttext = "<div style='text-align:center;padding:20px'>Thanks for participating!</div>";
            // $("#picture_frame").html(resulttext);
		}
	}
	else
	{
		$.get("core/gInstruct"+(session+1)+".html", function(data) { $('#exp_instruct').html(data); });
	}
}

// Calculates estimate of effect size to present results to participant
function calculateIAT()
{
    // calculate mean log(RT) for first key trial
	compatible = 0;
	for (i=1; i<roundArray[3].length; i++)
	{
		score = roundArray[3][i].endtime - roundArray[3][i].starttime;
		if (score < 300) { score = 300; }
		if (score > 3000) { score = 3000; }
		compatible += Math.log(score);
	}
	compatible /= (roundArray[3].length - 1);
	
	// calculate mean log(RT) for second key trial
	incompatible = 0;
	for (i=1; i<roundArray[6].length; i++)
	{
		score = roundArray[6][i].endtime - roundArray[6][i].starttime;
		if (score < 300) { score = 300; }
		if (score > 3000) { score = 3000; }
		incompatible += Math.log(score);
	}
    incompatible /= (roundArray[6].length - 1);
    
    // calculate variance log(RT) for first key trial
    cvar = 0;
	for (i=1; i<roundArray[3].length; i++)
	{
		score = roundArray[3][i].endtime - roundArray[3][i].starttime;
		if (score < 300) { score = 300; }
		if (score > 3000) { score = 3000; }
	    cvar += Math.pow((Math.log(score) - compatible),2);
	}
	
	// calculate variance log(RT) for second key trial
	ivar = 0;
	for (i=1; i<roundArray[6].length; i++)
	{
		score = roundArray[6][i].endtime - roundArray[6][i].starttime;
		if (score < 300) { score = 300; }
		if (score > 3000) { score = 3000; }
	    ivar += Math.pow((Math.log(score) - incompatible),2);
	}
	
	// calculate t-value
	tvalue = (incompatible - compatible) / Math.sqrt(((cvar/39) + (ivar/39))/40);
    
    // determine effect size from t-value and create corresponding text
	if (Math.abs(tvalue) > 2.89) { severity = " <b>much more</b> than "; }
	else if (Math.abs(tvalue) > 2.64) { severity = " <b>more</b> than "; }	
	else if (Math.abs(tvalue) > 1.99) { severity = " <b>a little more</b> than "; }
	else if (Math.abs(tvalue) > 1.66) { severity = " <b>just slightly more</b> than "; }
	else { severity = ""; }
	
	// put together feedback based on direction & magnitude
	if (tvalue < 0 && severity != "")
    { 
        resulttext = "<div style='text-align:center;padding:20px'>You associate "+openA+template.catB.label+closeA+" with "+open1+template.cat1.label+close1;
        resulttext += " and "+openA+template.catA.label+closeA+" with "+open1+template.cat2.label+close1+severity;
        resulttext += "you associate "+openA+template.catA.label+closeA+" with "+open1+template.cat1.label+close1;
        resulttext += " and "+openA+template.catB.label+closeA+" with "+open1+template.cat2.label+close1+".</div>"; 
        // resulttext += "<div>incompatible: "+incompatible+" ("+(ivar/39)+"); compatible: "+compatible+" ("+(cvar/39)+"); tvalue: "+tvalue+"</div>";
    }
    else if (tvalue > 0 && severity != "")
    { 
        resulttext = "<div style='text-align:center;padding:20px'>You associate "+openA+template.catA.label+closeA+" with "+open1+template.cat1.label+close1;
        resulttext += " and "+openA+template.catB.label+closeA+" with "+open1+template.cat2.label+close1+severity;
        resulttext += "you associate "+openA+template.catB.label+closeA+" with "+open1+template.cat1.label+close1;
        resulttext += " and "+openA+template.catA.label+closeA+" with "+open1+template.cat2.label+close1+".</div>"; 
        // resulttext += "<div>incompatible: "+incompatible+" ("+(ivar/39)+"); compatible: "+compatible+" ("+(cvar/39)+"); tvalue: "+tvalue+"</div>";
    }
    else
    { 
        resulttext = "<div style='text-align:center;padding:20px'>You do not associate "+openA+template.catA.label+closeA;
        resulttext += " with "+open1+template.cat1.label+close1+" any more or less than you associate ";
        resulttext += openA+template.catB.label+closeA+" with "+open1+template.cat1.label+close1+".</div>"; 
        // resulttext += "<div>incompatible: "+incompatible+" ("+(ivar/39)+"); compatible: "+compatible+" ("+(cvar/39)+"); tvalue: "+tvalue+"</div>";
    }
	$("#picture_frame").html(resulttext);
}

// not currently used
function groupEvaluations()
{
	$('#demoglist').after(
		"Please rate how warm or cold you feel toward the following groups:\
		<br>\
		(0 = coldest feelings, 5 = neutral, 10 = warmest feelings)\
		<ol>\
		<li>\
		<p>"+template.catA.label+"</p>\
		<p>\
		<select id='catAwarm' name='catAwarm'> \
		<option value='unselected' selected='selected'></option>\
		<option value='0 coldest feelings'></option>\
		<option value='1'></option>\
		<option value='2'></option>\
		<option value='3'></option>\
		<option value='4'></option>\
		<option value='5 neutral'></option>\
		<option value='6'></option>\
		<option value='7'></option>\
		<option value='8'></option>\
		<option value='9'></option>\
		<option value='10 warmest feelings'></option>\
		</select>\
		</p> \
		</li>\
		<li>\
		<p>"+template.catB.label+"</p>\
		<p>\
		<select id='catBwarm' name='catBwarm'> \
		<option value='unselected' selected='selected'></option>\
		<option value='0 coldest feelings'></option>\
		<option value='1'></option>\
		<option value='2'></option>\
		<option value='3'></option>\
		<option value='4'></option>\
		<option value='5 neutral'></option>\
		<option value='6'></option>\
		<option value='7'></option>\
		<option value='8'></option>\
		<option value='9'></option>\
		<option value='10 warmest feelings'></option>\
		</select>\
		</p> \
		</li>\
		</ol>\
		");
}

function IsNumeric(input)
{
   return (input - 0) == input && input.length > 0;
}

// Converts the data for each session and round into a comma-delimited string
// and passes it to writeFile.php to be written by the server
function WriteFile()
{
	
	var subject = sub;
	subject = subject.length==0 ? "unknown" : subject;
	var str = "";
	for (i=0; i<roundArray.length; i++)
	{
		for (j=0;j<roundArray[i].length;j++)
		{
			str += i + "," + j + ",";
	        str += roundArray[i][j].category+",";
			str += roundArray[i][j].catIndex+",";
			str += roundArray[i][j].errors+",";
			str += (roundArray[i][j].endtime - roundArray[i][j].starttime)+"\n";
			var catIndex=roundArray[i][j].catIndex;
			var category=roundArray[i][j].category;
			var datai=i;
			var dataj=j;
			var mseconds=(roundArray[i][j].endtime - roundArray[i][j].starttime);
			
		}
	}

    $.ajax({
				type: "POST",
				url: "core/fileManager.php",
				data: {'op':'writeoutput', 'template':template.name, 'subject': subject, 'data': str},
				async:false,
				dataType: "json",
				success:function (msg) {
					console.log(msg);
                }
			});
	// "core/fileManager.php",
	// 	{ 'op':'writeoutput', 'template':template.name, 'subject': subject, 'data': str }
	// 	);
 	
	// notify user of success?
}


// This monitors for keyboard events
function keyHandler(kEvent)
{   
	// move from instructions to session on spacebar press
	var unicode;
	if (!kEvent) var kEvent = window.event;
	if (kEvent.keyCode) unicode = kEvent.keyCode;
	else if (kEvent.which) unicode = kEvent.which;
	if (currentState == "instruction" && unicode == 32)
    {
		currentState = "play";
		$('#exp_instruct').html('');
		displayItem();
    }
	// in session
	if (currentState == "play")
	{
		runSession(kEvent);
	}
}

// Get the stimulus for this session & round and display it
function displayItem()
{
	var tRound = roundArray[session][roundnum]; 
	tRound.starttime = new Date().getTime(); // the time the item was displayed
	if (tRound.itemtype == "img")
	{
		if (tRound.category == template.catA.datalabel)
			{ $("#"+template.catA.datalabel+tRound.catIndex).css("display","block"); }
		else if (tRound.category == template.catB.datalabel)
			{ $("#"+template.catB.datalabel+tRound.catIndex).css("display","block"); }
		else if (tRound.category == template.cat1.datalabel)
			{ $("#"+template.cat1.datalabel+tRound.catIndex).css("display","block"); }
		else if (tRound.category == template.cat2.datalabel)
			{ $("#"+template.cat2.datalabel+tRound.catIndex).css("display","block"); }
	}
	else if (tRound.itemtype == "txt")
	{
		if (tRound.category == template.catA.datalabel)
		{ 
			$("#word").html(openA+template.catA.items[tRound.catIndex]+closeA)
			$("#word").css("display","block"); 
		}
		else if (tRound.category == template.catB.datalabel)
		{ 
			$("#word").html(openA+template.catB.items[tRound.catIndex]+closeA)
			$("#word").css("display","block"); 
		}
		else if (tRound.category == template.cat1.datalabel)
		{ 
			$("#word").html(open1+template.cat1.items[tRound.catIndex]+close1)
			$("#word").css("display","block"); 
		}
		else if (tRound.category == template.cat2.datalabel)
		{ 
			$("#word").html(open1+template.cat2.items[tRound.catIndex]+close1)
			$("#word").css("display","block"); 
		}
	}
}

function runSession(kEvent)
{
	var rCorrect = roundArray[session][roundnum].correct;
	var unicode = kEvent.keyCode? kEvent.keyCode : kEvent.charCode;
	// keyE = (unicode == 69 || unicode == 101 );
	// keyI = (unicode == 73 || unicode == 105 );

    keyD = (unicode == 68 || unicode == 100 );
    keyK = (unicode == 75 || unicode == 107 );
	
	// if correct key (1 & E) or (2 & I)
	// if ((rCorrect == 1 && keyE) || (rCorrect == 2 && keyI))
    if ((rCorrect == 1 && keyD) || (rCorrect == 2 && keyK))
	{
		$("#wrong").css("display","none"); // remove X if it exists
		roundArray[session][roundnum].endtime = new Date().getTime(); // end time
		// if more rounds
		if (roundnum < roundArray[session].length-1)
		{
			roundnum++;
			$(".IATitem").css("display","none"); // hide all items
			displayItem(); // display chosen item
		}
		else
		{
    		$(".IATitem").css("display","none"); // hide all items
			currentState = "instruction"; // change state to instruction
			session++; // move to next session
			roundnum=0; // reset rounds to 0
		    instructionPage(); // show instruction page
		}
	}
	// incorrect key
	// else if ((rCorrect == 1 && keyI) || (rCorrect == 2 && keyE))
    else if ((rCorrect == 1 && keyK) || (rCorrect == 2 && keyD))
	{
		$("#wrong").css("display","block"); // show X
		roundArray[session][roundnum].errors++; // note error
	}
}
