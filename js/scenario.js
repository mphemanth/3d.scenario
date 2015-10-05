var SCENARIO =
{
	ms_Canvas: null,
	ms_Renderer: null,
	ms_Camera: null, 
	ms_Scene: null, 
	ms_Controls: null,
	ms_Water: null,
	ms_waterObject:null,
	ms_FilesDND: null,
	ms_Events:null,
	Enable: ( function() 
	{
        try 
		{
			var aCanvas = document.createElement( 'canvas' ); 
			return !! window.WebGLRenderingContext && ( aCanvas.getContext( 'webgl' ) || aCanvas.getContext( 'experimental-webgl' ) ); 
		} 
		catch( e ) { return false; } 
	} )(),
	
	Initialize: function( inIdCanvas, inParameters )
	{
		this.ms_Canvas = $( '#'+inIdCanvas );
		
		// Initialize Renderer, Camera and Scene
		this.ms_Renderer = this.Enable? new THREE.WebGLRenderer({antialias : true}) : new THREE.CanvasRenderer();
		this.ms_Canvas.html( this.ms_Renderer.domElement );
		this.ms_Scene = new THREE.Scene();

		this.ms_Camera = new THREE.PerspectiveCamera( 70.0, WINDOW.ms_Width / WINDOW.ms_Height, 0.5, 3000000 );
		this.ms_Camera.position.set( 0, Math.max( inParameters.width * 1.5, inParameters.height ) / 8, -inParameters.height );
		this.ms_Camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
		this.ms_Camera.position.set(-4200,2500,200);
		this.ms_Camera.rotation.set(-1.5302219,-0.50465,-1.487030);
		// Initialize Orbit control		
		this.ms_Controls = new THREE.OrbitControls( this.ms_Camera, this.ms_Renderer.domElement );
		this.ms_Controls.userPan = true;
		this.ms_Controls.userPanSpeed = 1.0;
		this.ms_Controls.maxDistance = 10000.0;
		//this.ms_Controls.maxPolarAngle = Math.PI * 0.495;
	
	
	
		// Add light
		var directionalLight = new THREE.DirectionalLight( 0xffff55, 1 );
		directionalLight.position.set( -600, 300, 600 );
		this.ms_Scene.add( directionalLight );
		
		// Load textures		
		var waterNormals = new THREE.ImageUtils.loadTexture('textures/waternormals.jpg' );
		waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping; 
		

		
		// Create the water effect
		this.ms_Water = new THREE.Water( this.ms_Renderer, this.ms_Camera, this.ms_Scene, {
			textureWidth: 512, 
			textureHeight: 512,
			waterNormals: waterNormals,
			alpha: 	0.7,
			sunDirection: directionalLight.position.normalize(),
			sunColor: 0xffffff,
			waterColor: 0x001c0d,
			distortionScale: 90.0,
		} );
		var aMeshMirror = new THREE.Mesh(
			new THREE.PlaneGeometry( inParameters.width * 500, inParameters.height * 500, 50, 50 ), 
			this.ms_Water.material
		);
		aMeshMirror.add( this.ms_Water );
		aMeshMirror.rotation.x = - Math.PI * 0.5;
		this.ms_waterObject=aMeshMirror;
		this.ms_Scene.add( aMeshMirror );
	
		this.LoadSkyBox();
	},

	LoadSkyBox: function()
	{
		
		var cubeMap = new THREE.Texture( [] );
				cubeMap.format = THREE.RGBFormat;
				cubeMap.flipY = false;

				var loader = new THREE.ImageLoader();
				loader.load( 'textures/skyboxsun25degtest.png', function ( image ) {

					var getSide = function ( x, y ) {

						var size = 1024;

						var canvas = document.createElement( 'canvas' );
						canvas.width = size;
						canvas.height = size;

						var context = canvas.getContext( '2d' );
						context.drawImage( image, - x * size, - y * size );

						return canvas;

					};

					cubeMap.image[ 0 ] = getSide( 2, 1 ); // px
					cubeMap.image[ 1 ] = getSide( 0, 1 ); // nx
					cubeMap.image[ 2 ] = getSide( 1, 0 ); // py
					cubeMap.image[ 3 ] = getSide( 1, 2 ); // ny
					cubeMap.image[ 4 ] = getSide( 1, 1 ); // pz
					cubeMap.image[ 5 ] = getSide( 3, 1 ); // nz
					cubeMap.needsUpdate = true;

				} );

				var cubeShader = THREE.ShaderLib['cube'];
				cubeShader.uniforms['tCube'].value = cubeMap;

				var skyBoxMaterial = new THREE.ShaderMaterial( {
					fragmentShader: cubeShader.fragmentShader,
					vertexShader: cubeShader.vertexShader,
					uniforms: cubeShader.uniforms,
					depthWrite: false,
					side: THREE.BackSide
				});

				var skyBox = new THREE.Mesh(
					new THREE.CubeGeometry( 1000000, 1000000, 1000000 ),
					skyBoxMaterial
				);
				
				
		
		this.ms_Scene.add( skyBox );
	},
	
		
	Display: function()
	{
		this.ms_Water.render();
		this.ms_Renderer.render( this.ms_Scene, this.ms_Camera );
	},
	
	Update: function()
	{
		
		this.ms_Water.material.uniforms.time.value += 1.0 / 60.0;
		this.ms_Controls.update();		
		this.Display();
	},
	
	Resize: function( inWidth, inHeight )
	{
		this.ms_Camera.aspect =  inWidth / inHeight;
		this.ms_Camera.updateProjectionMatrix();
		this.ms_Renderer.setSize( inWidth, inHeight );
		this.ms_Canvas.html( this.ms_Renderer.domElement );
		this.Display();
	}
};
