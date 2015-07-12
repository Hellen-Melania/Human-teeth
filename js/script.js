$(document).ready(function(){
	var dataOfTeeth = [];
	var choosenTeeth = new Array();  
	var shiftOn = false;  //shift on/off
	var shiftCode = 16;
	
	var Reset = function(){            // init 
		var el = $('div.teeth:first');
		for(var i = 0; i < 32; i++){
			dataOfTeeth[i] = {
				id: el.attr('id'),
				name: el.attr('title'),
				imgWidth: el.css('width'),
				color: 'white',
				imgPosition: el.css('background-position'),
				choosenCondition: 0, //0-Healthy tooth, 1-Treated tooth, 2-Bad tooth, 3-Tooth removed	   
				medicalHistory:'',
				doctor:''
			};
		el.css('background', 'url("img/white-small.png")'); //reset image
		el.css('background-position', dataOfTeeth[i].imgPosition);
		
		if (i == 15){									//find bottom-jew teeth
			el = $('.bottom-jew').find(':first-child');		
		} else{		
			el = el.next('.teeth');		
			}
		}
	}; Reset();
	
	$('.clean').click( function(){
			Reset();
	});
	
	function FindIndexByKeyValue(arraytosearch, key, valuetosearch) { //find tooth by Id
		for (var i = 0; i < arraytosearch.length; i++) { 
			if (arraytosearch[i][key] == valuetosearch) {
				return i;
			}
		}
		return null;
	}
	
	$(document).keydown(function (e) {
		if (e.keyCode == shiftCode) {	shiftOn = true; }
	});
	$(document).keyup(function (e) {
		if (e.keyCode == shiftCode) {	shiftOn = false; }
	});
	
	$('.teeth').click(function() {		
			if($(this).css('opacity') == 1){
				$( this ).fadeTo( 'slow', 0.33 );
				var color;
				if (shiftOn == false){
					for (var i = 0; i < choosenTeeth.length; i++){
						$('#'+choosenTeeth[i]).fadeTo('slow', 1);
						$('.'+choosenTeeth[i]).detach();
						
						k = FindIndexByKeyValue(dataOfTeeth, 'id', choosenTeeth[i]);
						switch(dataOfTeeth[k].choosenCondition){
							case 0:
								color = 'white';
							break;
							case 1:
								color = 'green';
							break;
							case 2:
								color = 'red';
							break;	
							case 3:
								color = 'grey';
							break;
						}		
						$('#'+choosenTeeth[i]).css('background', 'url("img/'+color+'-small.png")');
						$('#'+dataOfTeeth[k].id).css('background-position', dataOfTeeth[k].imgPosition);  
					}
					choosenTeeth = [];
				}
				choosenTeeth.push($(this).attr('id'));
				
				var k = FindIndexByKeyValue(dataOfTeeth, 'id', $(this).attr('id'));
									
					var checked = ['','','',''];
					var doctor = true;
					
					switch(dataOfTeeth[k].choosenCondition){
						case 0:
							checked[0] = 'checked';
							color = 'white';
							doctor = false;
						break;
						case 1:
							checked[1] = 'checked';
							color = 'green';	
						break;
						case 2:
							checked[2] = 'checked';
							color = 'red';
							doctor = false;
						break;
						case 3:
							checked[3] = 'checked';
							color = 'grey';
						break;
					}
				
				var htmlcode = "<form class='teeth-form "+ $(this).attr('id') +"'>"
				    htmlcode += '<div class="teeth-form-img">';
					htmlcode += '<div id="info-'+$(this).attr('id')+'" class="teeth" title="'+$(this).attr('title')+'"></div>';
					htmlcode += '<h5 id="teeth-name">'+$(this).attr('title').substring(0,($(this).attr('title').length - 4))+'<br>'+$(this).attr('id').slice(-3)+'</h5>';
					htmlcode += '</div>';
					htmlcode += '<div class="teeth-form-history">';
					htmlcode += '<p><h3>Medical history</h3>';
					htmlcode += '<textarea name="comment" cols="30" rows="5" placeholder="Your medical history">'+dataOfTeeth[k].medicalHistory+'</textarea>';
					htmlcode += '<input class="saveForm" type="button" value="&#10003; Save and Close">';
					htmlcode += '</p>';					
					htmlcode += '</div>';
					htmlcode += '<div class="teeth-form-info">';
					htmlcode += '<h3>Condition tooth</h3>';
					htmlcode += '	<input class="show-doctor" type="radio" name="tooth" value="healthy tooth" '+checked[0]+'>Healthy tooth';
					htmlcode += '	<br>';
					htmlcode += '	<input class="show-doctor" type="radio" name="tooth" '+checked[1]+' value="treated tooth">Treated tooth';
					htmlcode += '	<br>';
					htmlcode += '	<input class="show-doctor" type="radio" name="tooth" value="bad tooth"'+checked[2]+'>Bad tooth';
					htmlcode += '	<br>';
					htmlcode += '	<input class="show-doctor" type="radio" name="tooth" value="tooth removed"'+checked[3]+'>Tooth removed';
					htmlcode += '	<br>';
					if ((color == 'white') || (color == 'red')){
						htmlcode += '	<p class="hide-doctor">';
					} else {
						htmlcode += '	<p class="show-doctor">';
					}
					htmlcode += '	<label><b>Doctor</b></label>';
					htmlcode += '	<input type="text" size="10" placeholder="Dr.House" value="'+dataOfTeeth[k].doctor+'"/>';
					htmlcode += '	</p>';
					htmlcode += '</div>';

					htmlcode += '</form>'; 
				$('.info-content').append(htmlcode);
				
				$(this).css('background', 'url("img/'+color+'-small.png")');  //-- tooth 
				$(this).css('background-position', dataOfTeeth[k].imgPosition); 
				
				$('#info-'+$(this).attr('id')).css('background', 'url("img/'+color+'-small.png")'); //-- tooth in form
				$('#info-'+$(this).attr('id')).css('background-position', dataOfTeeth[k].imgPosition);
				$('#info-'+$(this).attr('id')).css('width', dataOfTeeth[k].imgWidth);
				
				if(true) {
					$('#doctor-'+$(this).attr('id')).addClass( "show-doctor" );
				}	
			} else{
				$( this ).fadeTo( "slow", 1 );
				$("."+$(this).attr('id')).detach();
			}
	});
	
	$('body').on('click', 'input.saveForm', function(e) { 
		var key = $(this).parent().parent().attr('class').slice(-5);
		var k = FindIndexByKeyValue(dataOfTeeth, 'id', key);                    // index of choosen tooth in dataOfTeeth
		dataOfTeeth[k].medicalHistory = $(this).parent().find('textarea').val();
		dataOfTeeth[k].doctor = $(this).parent().next().find('input:last').val();
		
		var el = $(this).parent().next().find('input:first');
		for (var i = 0; i < 4; i++){
			if(el.is(':checked')) dataOfTeeth[k].choosenCondition = i;
			el = el.next().next();
		}
		if ((dataOfTeeth[k].choosenCondition == 1) || (dataOfTeeth[k].choosenCondition == 3)) {
			dataOfTeeth[k].doctor = $(this).parent().next().find('input:last').val(); 
		} 
		$(this).parent().parent().detach();
		$('#'+ dataOfTeeth[k].id).fadeTo('slow', 1); 		
	});

	$('body').on('click', 'input.show-doctor', function(e) { 
		var number = $(this).parent().find('input.show-doctor').index(this);
		var color;
		switch(number){
			case 0:
				color = 'white';
				break;
			case 1:
				color = 'green';							
				break;
			case 2:
				color = 'red';
				break;
			case 3:
				color = 'grey';
				break;
		}
		var k = FindIndexByKeyValue(dataOfTeeth, 'id', $(this).parent().parent().attr('class').slice(-5));							
		$('#'+dataOfTeeth[k].id).css('background', 'url("img/'+color+'-small.png")');  
		$('#'+dataOfTeeth[k].id).css('background-position', dataOfTeeth[k].imgPosition);   
		
		$('#info-'+dataOfTeeth[k].id).css('background', 'url("img/'+color+'-small.png")');
		$('#info-'+dataOfTeeth[k].id).css('background-position', dataOfTeeth[k].imgPosition);
		$('#info-'+dataOfTeeth[k].id).css('width', dataOfTeeth[k].imgWidth);
		
		if ((number == 1) || (number == 3)){
			$(this).parent().find('p:last').css("visibility", "visible");				
		} else{
			$(this).parent().find('p:last').css("visibility", "hidden");
			$(this).parent().find('input:last').val('');
		}	
		
	});	
});

