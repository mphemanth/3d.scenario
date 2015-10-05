var OBJECTS={
	
	init:function()
	{
	
	},
		
	loadColladaModel:function(path,scale,depth,offsetAngle,modelName){
	var dummy;
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	GLOBAL.modelStatusM1=GLOBAL.modelStatusM1+1;
	var  colladaReady = function( collada ) 
	{

		dummy = collada.scene;
		dummy.scale.x = dummy.scale.y = dummy.scale.z = scale;
		dummy.updateMatrix();
		var ob3d={'geometry':dummy};
		//load object to global object database & pass on offset angle 
		GLOBAL.models[modelName]=ob3d;
		GLOBAL.models[modelName]['depth']=depth;

		if (GLOBAL.modelName=='ship#2')
			{
			 console.log('loading comepleted');
			  GLOBAL.modelsReady=1;
			}
		
	}
	loader.load( GLOBAL.modelPath+path+'.dae',colladaReady);
	
	 
	},

	/* enabling multiple instances of objects */
	preload3DModels:function(){
	
	this.loadColladaModel('torpedo',0.1*GLOBAL.objScale,0,0,'torpedo');
	this.loadColladaModel('stealth',0.08*GLOBAL.objScale,10*GLOBAL.objScale,0,'ship#1');
	this.loadColladaModel('stealth',0.08*GLOBAL.objScale,10*GLOBAL.objScale,0,'ship#2');
	}	
}
	
	
				

