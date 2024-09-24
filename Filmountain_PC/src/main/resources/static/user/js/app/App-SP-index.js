var resizeWebViewCalled = false;
var href = '/user/'; 
var src = "/assets/img/filmountain/";
var isRunning = false;
var isClicked = false;
var buttonIndex=0;
var investment_img = [
        '/assets/img/filmountain/serverImg/investment1.png',
        '/assets/img/filmountain/serverImg/investment2.png',
        '/assets/img/filmountain/serverImg/investment3.png',
        '/assets/img/filmountain/serverImg/investment4.png',
        '/assets/img/filmountain/serverImg/investment5.png'
      ];
var price_img = [
        '/assets/img/filmountain/serverImg/price1.png',
        '/assets/img/filmountain/serverImg/price2.png',
        '/assets/img/filmountain/serverImg/price3.png',
        '/assets/img/filmountain/serverImg/price4.png',
        '/assets/img/filmountain/serverImg/price5.png'
      ];
var status_img = [
        '/assets/img/filmountain/serverImg/status1.png',
        '/assets/img/filmountain/serverImg/status2.png',
        '/assets/img/filmountain/serverImg/status3.png',
        '/assets/img/filmountain/serverImg/status4.png',
        '/assets/img/filmountain/serverImg/status5.png'
      ];
var cash_img = [
        '/assets/img/filmountain/serverImg/cash1.png',
        '/assets/img/filmountain/serverImg/cash2.png',
        '/assets/img/filmountain/serverImg/cash3.png',
        '/assets/img/filmountain/serverImg/cash4.png',
        '/assets/img/filmountain/serverImg/cash5.png'
      ];  
var reward_img = [
        '/assets/img/filmountain/serverImg/reward1.png',
        '/assets/img/filmountain/serverImg/reward2.png',
        '/assets/img/filmountain/serverImg/reward3.png',
        '/assets/img/filmountain/serverImg/reward4.png',
        '/assets/img/filmountain/serverImg/reward5.png'
      ]; 
 
 var currentStage = 0;
function resizeWebView() {
						    var imageHeight = $('.custom_container').height();
						    var imageWidth = $('.custom_container').width();	    
						    $('.userApp_buttons').css('margin-left',imageWidth/3);
						    $('.userApp_buttons').css('padding-left',imageWidth/15);
						    $('.app_text').css('font-size',imageHeight/70);
							$('#footer_title').css('font-size',imageHeight/60);
							$('.footer_text').css('font-size',imageHeight/70); 
							
							$('.text_fil').each(function() {
							    var textValue = $(this).text(); 
							    var roundedValue = Math.round(parseFloat(textValue)); 
							    $(this).text(roundedValue + ' FIL');
							});
							 
						    if(imageHeight<700){
								$('#app_button1').css('padding-top',imageHeight/40);
							     $('#app_button2').css('padding-top',imageHeight/16);
							     $('#app_button3').css('padding-top',imageHeight/16);
							     $('#app_button4').css('padding-top',imageHeight/16);
							     $('#app_button5').css('padding-top',imageHeight/16);   
							}else if (imageHeight<800){
								$('#app_button1').css('padding-top',imageHeight/50);
							     $('#app_button2').css('padding-top',imageHeight/15.5);
							     $('#app_button3').css('padding-top',imageHeight/15.5);
							     $('#app_button4').css('padding-top',imageHeight/15.5);
							     $('#app_button5').css('padding-top',imageHeight/15.5);
							}else{
								$('#app_button1').css('padding-top',imageHeight/60);
							     $('#app_button2').css('padding-top',imageHeight/14);
							     $('#app_button3').css('padding-top',imageHeight/14.5);
							     $('#app_button4').css('padding-top',imageHeight/14.5);
							     $('#app_button5').css('padding-top',imageHeight/14.5);
							}
						    resizeWebViewCalled = true;
						    if($('#main_error').val()==""){
								 $('#userApp_view').css('visibility', 'visible').show();	  
							} 
						    $('.bottomProductBtn').css('visibility', 'visible').show();
						    $('#power_button').css('display', 'block').show();		
						    $('#debug').text('width: ' +imageWidth +'height: ' + imageHeight); 
						    $('.panel_buttons').css('filter', 'brightness(0.50)');
						    $('.app_text').css('filter', 'brightness(0.50)');
						}	
						     var productId =$('#hw_product_id').val();
    
						
$(document).ready(function() {
	   var $imgs = $('img[data-product-id="' + productId + '"]');
      var newImageUrl = '/assets/img/filmountain/nanodc/' + productId+'_on.png';
      $imgs.attr('src', newImageUrl);
      
	function buttonAnimation(button,img_list){
		var intervalId = setInterval(function() {
		          button.attr('src', img_list[currentStage]);
		          currentStage++;
		          if (currentStage >= img_list.length) {
		            clearInterval(intervalId);
		          }
		        }, 200);
	  }
	  $(window).resize(function() {
    		resizeWebView();
    console.log('창 크기가 변경되었습니다.');
	});
	  function handleButtonClick(clickedObject) {
         
         if(!isRunning){
				//runServer();
				//isRunning = true;
				return;
			}
			if(isClicked){
				return;
			}
			isClicked=true;
			href = '/user/';
			 playButtonSound();
		if($(clickedObject).attr('id') == 'app_button1'){
			src +="investment.png";
			href += 'investment'; 
			currentStage =1;
			$('#panel_investment').css('filter', 'brightness(1.5)'); 
			buttonAnimation($("#panel_investment"),investment_img);
			
		}else if($(clickedObject).attr('id') == 'app_button2'){
			src +="reward.png";
			href += 'reward';
			currentStage =1;
			$('#panel_reward').css('filter', 'brightness(1.5)'); 
			buttonAnimation($("#panel_reward"),reward_img);
		}else if($(clickedObject).attr('id') == 'app_button3'){
			src +="cash.png";
			href += 'cash';
			currentStage =1;
			$('#panel_cash').css('filter', 'brightness(1.5)'); 
			buttonAnimation($("#panel_cash"),cash_img);
		}else if($(clickedObject).attr('id') == 'app_button4'){
			src +="status.png";
			href += 'status'; 
			currentStage =1;
			$('#panel_status').css('filter', 'brightness(1.5)'); 
			buttonAnimation($("#panel_status"),status_img);
		}
		else if($(clickedObject).attr('id') == 'app_button5'){
			src +="price.png";
			//href = 'https://lightning.korbit.co.kr/trade/?market=fil-krw';
			href += 'price';
			currentStage =1;
			$('#panel_price').css('filter', 'brightness(1.5)'); 
			buttonAnimation($("#panel_price"),price_img);
		}
		 $('#panel').attr('src', src);
		$('#panel').css('visibility', 'visible');
        setTimeout(function() {
          window.location.href = href;
        }, 900);
         
      }
      function resetButton(clickedObject) {
		  if(!isRunning){
				return;
			}
         if($(clickedObject).attr('id') == 'app_button1'){
			$('#panel_investment').css('filter', 'brightness(1)'); 
			
		}else if($(clickedObject).attr('id') == 'app_button2'){
			$('#panel_reward').css('filter', 'brightness(1)'); 
		}else if($(clickedObject).attr('id') == 'app_button3'){
			$('#panel_cash').css('filter', 'brightness(1)'); 
		}else if($(clickedObject).attr('id') == 'app_button4'){
			$('#panel_status').css('filter', 'brightness(1)'); 
		}
		else if($(clickedObject).attr('id') == 'app_button5'){
			$('#panel_price').css('filter', 'brightness(1)'); 
		}
		
      }
      
      function handlePowerClick() {
		  if(!isRunning){
			runServer();
			isRunning = true;
			$('#power_button').attr('src', '/assets/img/filmountain/buttons/on.png');
			}
			else{
				offServer();
				playServerOnSound();
				isRunning = false;
				$('#power_button').attr('src', '/assets/img/filmountain/buttons/off.png');
			}
			$('#power_button').css('filter', 'brightness(1.5)'); 
		}
		 function resetPowerButton() {
		  $('#power_button').css('filter', 'brightness(1)'); 
		} 
      
	 $('.userApp_buttons')
    .on('mousedown touchstart', function(event) {
        event.preventDefault(this); 
        handleButtonClick(this);   
    })
    .on('mouseup mouseleave touchend touchcancel', function(event) {
        event.preventDefault(this);
        resetButton(this);
    });

$('#power_button')
    .on('mousedown touchstart', function(event) {
        event.preventDefault();
        handlePowerClick();
    })
    .on('mouseup mouseleave touchend touchcancel', function(event) {
        event.preventDefault();
        resetPowerButton();
    });
	
	
        if (!resizeWebViewCalled) {
            resizeWebView();
        }

		 function runServer() {
         playBGM();
         playServerOnSound();
			var elements = $('.panel_buttons');
			var textElements = $('.app_text');
			
			elements.each(function(index) {
			    var currentElement = $(this);
			    var currentTextElement = textElements.eq(index);
			
			    // Set a delay for each element
			    setTimeout(function() {
			        currentElement.css('filter', 'brightness(1)');
			        currentTextElement.css('filter', 'brightness(1)');
			    }, index * 200);
			});
      }
      
		$('.bottomProductBtn').click(function() {
			playDingSound();
		    var $btn = $(this);
		    $btn.fadeTo(100, 0.3, function() { 
		        var hw_product_id = parseInt($btn.data("product-id"));
		        setTimeout(function() {
		            $.ajax({
		                type: "POST",
		                url: "/user/userAppMainInfoBuilder",
		                contentType: "application/json",
		                data: JSON.stringify({ hw_product_id: hw_product_id }),  
		                success: function (data) {
							
							if(data.error=="session closed"){
								window.location.href = "/user/login";
							};
		                    $btn.fadeTo(100, 1); 
		                    $('#hw_product_id').val(hw_product_id);
		                    $('#main_yellow').attr("src", data.main_bg_src);
		                    $('#panel_hw_progress').attr("src", data.progress_src);
		                      $('.bottomProductBtn').each(function() {
						            var originalSrc = $(this).attr('src');
						            var newSrc = originalSrc.replace('_on.png', '.png');
						            $(this).attr('src', newSrc);
						        });    
		                      var $imgs = $('img[data-product-id="' + hw_product_id + '"]');
						      var newImageUrl = '/assets/img/filmountain/nanodc/' + hw_product_id+'_on.png';
						      $imgs.attr('src', newImageUrl);
						      $('#total_investment_fil_main').text(Math.round(data.investDetailForHw.total_investment_fil));
							  $('#total_reward_fil_main').text(Math.round(data.investDetailForHw.total_reward_fil));
							  $('#paid_fil_main').text(Math.round(data.investDetailForHw.total_reward_fil));
		                },
		                error: function(xhr, status, error) {
		                    $btn.fadeTo(100, 1);
		                }
		            });  
		        }); 
		    });
		});
		      
      
      
      function offServer() {
         stopBGM();
			var elements = $('.panel_buttons');
			var textElements = $('.app_text');
			
			elements.each(function(index) {
			    var currentElement = $(this);
			    var currentTextElement = textElements.eq(index);
			
			    // Set a delay for each element
			    setTimeout(function() {
			        currentElement.css('filter', 'brightness(0.75)');
			        currentTextElement.css('filter', 'brightness(0.75)');
			    }, index * 200);
			});
      }
	
  function playBGM() {
    $('#bgm')[0].play();
  }
  function stopBGM() {
    $('#bgm')[0].pause();
    $('#bgm')[0].currentTime = 0;
  }
  function playButtonSound(){
	   $('#buttonSound')[0].play();
  }
   function playDingSound(){
	   $('.ding')[buttonIndex].play();
	   buttonIndex= (buttonIndex +1) % ($('.ding').length);
  }
   function playServerOnSound(){
	   
	   $('#serverOnSound')[0].currentTime = 0;
	   $('#serverOnSound')[0].play();
  }
  

  
  
  
  
  
  
  
	});						
						
						
					