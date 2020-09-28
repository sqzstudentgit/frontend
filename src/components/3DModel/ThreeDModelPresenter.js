import React, { Suspense, useRef} from "react";
import {
  Canvas,
  useLoader,
  useFrame,
  useThree,
} from "react-three-fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three'

// import bottle from "../../WaterBottle.glb";
// import arwing from "../../arwing.glb";
import model1 from "./models/model.glb";
// import model2 from "../../model2.glb";
// import model3 from "../../model.glb";


function CameraControls ()  {
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
  camera,
  gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

function Shadow_Light (position,intensity) {
  //Create a PointLight and turn on shadows for the light
  const light = new THREE.DirectionalLight(0xffffff, 0.5, 100)
  light.position.set(10, 10, 10)
  light.castShadow = true // default false
  light.receiveShadow = true
  //Set up shadow properties for the light
  light.shadow.mapSize.width = 5240 // default
  light.shadow.mapSize.height = 5240 // default
  //light.shadow.camera.near = 0.5 // default
  light.shadow.camera.far = 50 // default
  light.shadow.camera.left = -5
  light.shadow.camera.right = 5
  light.shadow.camera.top = 5
  light.shadow.camera.bottom = -5
  light.shadow.radius = 10;
  light.shadow.bias = 0;

  return <primitive object={light}/>
}

function Light2 (position,intensity) {
  //Create a PointLight and turn on shadows for the light
  const light = new THREE.DirectionalLight(0xffffff, 0.2, 100)
  light.position.set(-10, -10, -10)

  return <primitive object={light}/>
}

// Function to add the offset in the loaded model
function LoadModel3_shadow(props) {
  const gltf = useLoader(GLTFLoader, model1);


  gltf.scene.traverse(function(child) {
      child.castShadow = true;
      child.receiveShadow = true;
  });

  gltf.castShadow = true;
  gltf.receiveShadow = true;
  gltf.scene.castShadow = true;
  gltf.scene.receiveShadow = true;

  gltf.position = [0,0,0];

  const primitiveProps = {
    object: gltf.scene,
    position: props.position || [0,0,0],
    rotation: props.rotation || [0,0,0],
    scale: props.scale || [1,1,1],
    castShadow: true,
    receiveShadow: true,
  };


  //return <primitive object={gltf.scene} />
  
  return <mesh> <primitive {...primitiveProps}/> </mesh>;
  
}


// Auto calculate model distance and height for camera position
function LoadModel4 (props) {
  const gltf = useLoader(GLTFLoader, bottle);

  console.log(gltf.scene);
  
  console.log("====================");
  var bb;

  gltf.scene.traverse(function(child) {
      child.castShadow = true;
      child.receiveShadow = true;
      if ( child instanceof THREE.Mesh  ) 
      {
        //if(bb==null) 
        bb = (child.geometry.boundingBox);
        
      }
  });

  console.log("====================");

  //const [geometry, setGeometry] = useState();
  const geometryRef = useRef();
  const groupRef = useRef();

  const geometry = geometryRef.current;
  
  const ref = useRef();
  gltf.castShadow = true;
  gltf.receiveShadow = true;
  gltf.scene.castShadow = true;
  gltf.scene.receiveShadow = true;

  //gltf.position = [0,0,0];
  const {
    camera,
    gl: { domElement },
  } = useThree();

  
  //camera.position.x = 0;
  //camera.position.y = 0;
  //camera.position.z = 0;

  /*
  camera.attach(gltf.scene)
  gltf.scene.position.x = 0;    
  gltf.scene.position.y = 0;
  gltf.scene.position.z = 0;
  

  const [state, setstate] = useState(0);
  const localPos = gltf.scene.localToWorld(camera.worldToLocal(camera.position));

  gltf.scene.position.x = localPos.x;
  gltf.scene.position.y = localPos.y;
  gltf.scene.position.z = localPos.z-0.5;
  

  camera.add(gltf.scene)
  gltf.scene.position.x = 0;    
  gltf.scene.position.y = 0;
  gltf.scene.position.z = 0;
  
  gltf.scene.position.z = 5;
    
  console.log("camera.position");
  console.log(camera.position);
    
  console.log("model.position");
  console.log(gltf.scene.position);

  console.log("global position of camera");
  console.log(camera.getWorldPosition(camera.position));

  console.log("model.globalPos");
  console.log(gltf.scene.getWorldPosition(gltf.scene.position));
  */


  camera.add( gltf.scene );
  gltf.scene.position.set(0, 0, 0);
    
  var result = {};

  gltf.scene.traverse( n=> { 
    // traverseScene(n, result);
    if (n instanceof THREE.Camera) {
      if (!result.cameras)
        result.cameras = [];
      
      result.cameras.push(n);
    }
    // Look for lights
    if (n instanceof THREE.Light) {
      if (!result.lights)
        result.lights = [];
      
      result.lights.push(n);
    }

  });

  if (result.cameras && result.cameras.length){
      this.camera = result.cameras[0];
      this.camera.position.copy( 
        this.camera.position.clone().add(new THREE.Vector3(0,0,.01))
    )

  }else {
    
    let boundingBox = bb;// geometry.computeBoundingBox();
    
    console.log ("+++++++++++++++++")

    console.log(boundingBox);

    let front = boundingBox.max;
    let cz = boundingBox.max.z - boundingBox.min.z;
    // debugger
    camera.position.set(front.x, front.y, front.z+cz*1);
    
  }

  if (result.lights && result.lights.length) {
  }
  else{ }

  //---------------------------------

  
  
  const primitiveProps = {
		geometryRef,
    object: gltf.scene,
    castShadow: true,
    receiveShadow: true,
  };
  
  return <mesh > <primitive {...primitiveProps} /> </mesh>;
}

function Loading() {
  const ref = useRef()
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01))

  return (
    <mesh visible position={[0, 0, 1]} rotation={[0, 0, 0]} ref={ref}>
      <sphereGeometry attach="geometry" args={[0, 0, 0]} />
      <meshStandardMaterial
        attach="material"
        color="yellow"
        transparent
        opacity  ={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}




class ThreeDModelPresenter extends React.Component 
{
    render() {
        return (
      
          <Canvas colorManagement shadowMap> 
      
            <CameraControls />
    
            <ambientLight intensity={0.17} />
            <Shadow_Light/>
            <Light2/>
      
            <Suspense fallback={<Loading />}>


            <LoadModel3_shadow position={[-6.5,-0.5,10]} scale={[3,3,3]} rotation={0,0,0} />
            {/* <LoadModel4 /> */}

            </Suspense>

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
              <planeBufferGeometry attach="geometry" args={[100, 100]} />
              <shadowMaterial attach="material" transparent opacity={0.4} />
            </mesh>

          </Canvas>
      
      
        )
    }

}
export default ThreeDModelPresenter;


