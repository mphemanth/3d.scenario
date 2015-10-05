
function MainLoop()
{
	requestAnimationFrame( MainLoop );
	TWEEN.update();
	draw_compass(SCENARIO.ms_Camera.rotation.z-Math.PI/2);

	SCENARIO.Update();
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
	window.setTimeout(createTargets,2000);

	
} );

function createTargets()
{
TARGET.create(0,{'vtype':0,'x':10,'y':10,'z':10,'course':0,'geometry':''});
TARGET.create(1,{'vtype':0,'x':100,'y':800,'z':10,'course':0,'geometry':''});
TARGET.create(2,{'vtype':2,'x':100,'y':80,'z':10,'course':0,'geometry':''});

}
