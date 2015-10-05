
function MainLoop()
{
	requestAnimationFrame( MainLoop );
	draw_compass(SCENARIO.ms_Camera.rotation.z-Math.PI/2);

	if (GLOBAL.sim_status!=2 && GLOBAL.sim_status!=4){SCENARIO.Update();}
}

$( function() {
	WINDOW.Initialize();
	
	var parameters = {
		width: 2000,
		height: 2000,
		widthSegments: 250,
		heightSegments: 250,
		depth: 1500,
		param: 4,
		filterparam: 1
	};
	
	
	
	SCENARIO.Initialize( 'canvas-3d', parameters );
	WINDOW.ResizeCallback = function( inWidth, inHeight ) { SCENARIO.Resize( inWidth, inHeight ); };
	SCENARIO.Resize( WINDOW.ms_Width, WINDOW.ms_Height );
	OBJECTS.init();
	OBJECTS.preload3DModels();
	var axis_helper=new THREE.AxisHelper(5);
	SCENARIO.ms_Scene.add(axis_helper);
//	var gui = new dat.GUI();
//	gui.add(GLOBAL.uiControls,"sea").onChange( function (newValue){
//	SCENARIO.ms_waterObject.visible=GLOBAL.uiControls.sea;
//	});
	init_compass();
	MainLoop();
	
} );
