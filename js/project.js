/*-----------------------------------------------------------------*/
/*	Buttons
/*-----------------------------------------------------------------*/

/**
 * Turning off the default behaviour of the buttons, that are actually link elements 
 */
$( document ).ready( function() {
	
	buttonsPreventDefault();

} );


/*-----------------------------------------------------------------*/
/*	Main navigation
/*-----------------------------------------------------------------*/

$( document ).ready( function() {
	let mainNav = $( "#main-nav" ),
		wasNavOpen = false;

	/**
	 * Clicking on the navigation open/close button:
	 * adds/removes a class to the navigation itself, that toggles its visibility and
	 * saves the current state of the navigation in a variable
	 */
	$( "header" ).on( "click", function( e ) {
		let target = $( e.target );
		if ( target.is( "#main-nav .button.open" ) ) {
			toggle( mainNav );
			wasNavOpen = !wasNavOpen;
		}
	} );
	
	/**
	 * In case the navigation is turned on, scrolling the page down turns it off and
	 * scrolling up to the top turns it back on 
	 */
	$( document ).on( "scroll", function() {
		toggleNavBasedOn( window.pageYOffset > 0, wasNavOpen, mainNav );
	} );
	
	/**
	 * Initializing main navigation smooth scrolling functionallity, 
	 * selecting main nav current button
	 */
	UIkit.scrollspyNav( mainNav, {
		cls: CURRENT_ITEM_CLASS,
		scroll: true
	} );
} );


/*-----------------------------------------------------------------*/
/*	Main slider
/*-----------------------------------------------------------------*/

$( document ).ready( function() {
	let slider = $( "#slider .content" );
	
	/**
	 * Initializing the slider with dots only
	 */
	attachSliderFunctionallityTo( slider, sliderSlideOptions );
	attachRandomAccessFunctionallity( slider );
	
	/**
	 * Implementing slider content animation
	 *
	 * Listening for slider's "afterChange" event, triggered by current slide entering the viewport and 
	 * removing a class from the previous slide, while adding the same class to the current slide
	 * 
	 * The previous and the current slide are compared and 
	 * the highlighting class is moved from the previous slide to the next one 
	 * only in case of an actual slide transition,
	 * but not when the current slide dragging distance is under the transition threshold,
	 * and despite the slide moving and an "afterChange" event is fired, the slide returns back and does not change
	 */
	transitionContent( slider );
	slider.on( "afterChange", function( event, slick, currentSlide ) {
		transitionContent( slider );
	} );
	
	/**
	 * Clicking on a slide button calls UIkit's scrollTo method to direct to the corresponding service section
	 */
	$( "#slider" ).on( "click", function( e ) {
		toTargetWhenIsButton( e.target );
	} );

	/**
	 * Turning off the slider on scrolling the page down,
	 * because of the slider variable height on slide transition 
	 */	
	$( document ).on( "scroll", function( e ) {
		turnOffSliderWhen( window.pageYOffset > 0, slider );
	} );
	
} );


/*-----------------------------------------------------------------*/
/*	About
/*-----------------------------------------------------------------*/

$( document ).ready( function() {
	let about = $( "#about .body" );
	
	about.slick( aboutSlideOptions );
	
	about.on( "click", function( e ) {
		let target = $( e.target );
			
		if ( target.is( ".header .button.open" ) ) {
			openSlider( about );
		} else if ( target.is( ".main > .button.close" ) ) {
			closeSlider( about );
		}
		
	} );
} );


/*-----------------------------------------------------------------*/
/*	Services
/*-----------------------------------------------------------------*/

$( document ).ready( function() {
	
	toggleServiceDescription();
	
} );


/*-----------------------------------------------------------------*/
/*	Contact info
/*-----------------------------------------------------------------*/

/**
 * Initializing the contact info section functionallity
 */
$( document ).ready( function() {
	let contactInfo = $( "#contact-info .contact-info-items" ), 
		randomAccess = contactInfo.siblings( ".controls" ).find( ".random-access" );
	attachSliderFunctionallityTo( contactInfo, contactInfoSlideOptions );
	attachRandomAccessFunctionallity( contactInfo );
	randomAccess.on( "click", function( e ) {
		let target = $( e.target );
		if ( target.is( ".random-access button" ) ) {
			contactInfo.slick( "slickPause" );
		}
		
	} );
} );


/*-----------------------------------------------------------------*/
/*	UI Kit
/*-----------------------------------------------------------------*/

/**
 * Initializing UI Kit Scroll component allows specifying custom speed for the animated scroll
 */
$( document ).ready( function() {
	UIkit.component( 'scroll', UIkit.component( 'scroll' ).extend( {
		data: {
			duration: 400
		}
	} ) );
} );


/*-----------------------------------------------------------------*/
/*	Scroll to top button
/*-----------------------------------------------------------------*/

$( document ).ready( function() {
	let scrollToTopButton = $( "header .scroll-to-top" );
	
	/**
	 * Initializing scroll-to-top button smooth scrolling functionallity
	 */
	UIkit.scroll( scrollToTopButton );
	
	/**
	 * Adding and removing designated class to scroll-to-top button
	 * for revealing or hiding the button, depending on the page scroll position
	 */
	scrollToTopToggle( scrollToTopButton );
} );


/*-----------------------------------------------------------------*/
/*	Form
/*-----------------------------------------------------------------*/

$( document ).ready( function() {
	let formFields = $( "#send-email form" ).children( "dl:not( :last-child )" );
	
	formFields.each( function( index, element ) {
		let fieldHolder = $( element ), 
			label = fieldHolder.find( "dt" ).children(), 
			field = fieldHolder.find( "dd" ).children();
		
		field.on( "focus", function() {
			fieldHolder.addClass( "focused" );
		} );
		
		field.on( "blur", function() {
			if ( field.val().length !== 0 ) {
				return;
			}
			fieldHolder.removeClass( "focused" );
		} );
		
	} );
		
} );































