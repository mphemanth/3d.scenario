var TARGET =
{

/*
this function up on invoking will create a target and launch it
in to scenario. it finds if the target is present already as part
of error checking. 
*/
handleVesselInfo:function(index,vessel)
{


if( GLOBAL.targets[index])
{
	//exsisting target
	if (GLOBAL.sim_status==4)
		{
		this.remove(index);
		}
	else
		{
		this.move(GLOBAL.targets[index],'Tween',index,vessel);
		}
	if( vessel.active==0)
		{
		this.remove(index);
		}


}
else
{
	// not existing target
	if( vessel.active==1)
		{
		this.create(index,vessel);
		GLOBAL.rflags[index]=1;

		}


}


},// end of handle message function
create: function(index,vessel)
{
	var v=vessel;

	var models=GLOBAL.models;
	var m;
	switch(vessel.vtype)
	{
	case 0: m=models['ship#1'];break;
	case 1:	m=models['submarine'];break;
	case 2:	m=models['torpedo'];break;
	default:m=models['ship#1'];break;
	}
	v['geometry']=m.geometry.clone();

	GLOBAL.targets[index]=v;
	console.log(GLOBAL.targets[index]);
	this.move(GLOBAL.targets[index],'noTween',index,vessel);
	SCENARIO.ms_Scene.add(GLOBAL.targets[index]['geometry']);
	delete m;
	delete v;
	delete models;

},//end of create function
move: function(obj,tween,index,v)
{

	//operating without tween function
	obj.geometry.position.x=-1*v.y;
	obj.geometry.position.z=-1*v.x;
	obj.geometry.position.y=-1*v.z;
	obj.geometry.rotation.y=(-1*v.course)*Math.PI/180;	//updating angle


}, // end of move function

remove: function(index)
{
	if(GLOBAL.rflags[index]==1)
	{
		SCENARIO.ms_Scene.remove(GLOBAL.targets[index].geometry);
		delete GLOBAL.targets[index];
		GLOBAL.rflags[index]=0;
	}

	

}//end of remove function


}//end of TARGET definition
